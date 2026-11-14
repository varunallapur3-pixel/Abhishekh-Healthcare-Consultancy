import uuid
import logging
from datetime import datetime, timezone
from typing import Dict, Any, List
import httpx
from fastapi import HTTPException, status
from app.config import settings
from app.schemas import EnquiryCreate

logger = logging.getLogger("enquiries.database")

# In-memory storage fallback for local development when Supabase credentials are pending
_LOCAL_ENQUIRY_STORE: List[Dict[str, Any]] = []

async def insert_enquiry(enquiry: EnquiryCreate) -> Dict[str, Any]:
    """
    Inserts a validated enquiry into Supabase PostgreSQL via Supabase REST API.
    Falls back to a thread-safe local store in development if Supabase keys are not yet configured.
    """
    now_utc = datetime.now(timezone.utc).isoformat()
    record_payload = {
        "full_name": enquiry.full_name,
        "phone": enquiry.phone,
        "email": enquiry.email,
        "advisory_interest": enquiry.advisory_interest,
        "requirements": enquiry.requirements,
        "status": "new",
    }

    if settings.is_supabase_configured:
        endpoint = f"{settings.SUPABASE_URL}/rest/v1/enquiries"
        headers = {
            "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
            "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        }

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.post(endpoint, json=record_payload, headers=headers)
                
                if response.status_code not in (200, 201):
                    logger.error(
                        "Supabase API error: HTTP %s - %s",
                        response.status_code,
                        response.text
                    )
                    raise HTTPException(
                        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                        detail="Failed to persist enquiry to database. Please try again later or contact us directly."
                    )

                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    inserted_row = data[0]
                    return inserted_row
                elif isinstance(data, dict):
                    return data
                else:
                    return {
                        "id": str(uuid.uuid4()),
                        "created_at": now_utc,
                        **record_payload
                    }

        except httpx.RequestError as exc:
            logger.error("Network error communicating with Supabase: %s", str(exc))
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Database service temporarily unreachable. Please try again shortly."
            )
    else:
        # Development fallback mode
        enquiry_id = str(uuid.uuid4())
        dev_record = {
            "id": enquiry_id,
            "created_at": now_utc,
            **record_payload
        }
        _LOCAL_ENQUIRY_STORE.append(dev_record)
        logger.warning(
            "SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not configured. "
            "Stored enquiry in local fallback store (ID: %s, Total: %d)",
            enquiry_id,
            len(_LOCAL_ENQUIRY_STORE)
        )
        return dev_record
