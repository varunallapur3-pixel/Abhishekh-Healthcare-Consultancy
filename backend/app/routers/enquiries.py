import logging
from fastapi import APIRouter, Request, status
from app.schemas import EnquiryCreate, EnquiryResponse
from app.rate_limiter import limiter
from app.database import insert_enquiry
from app.config import settings

logger = logging.getLogger("enquiries.router")

router = APIRouter(prefix="/api/enquiries", tags=["Consultation Enquiries"])

@router.post(
    "",
    response_model=EnquiryResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a healthcare consultation enquiry",
    description="Validates and registers an institutional healthcare consultation enquiry into Supabase PostgreSQL.",
)
async def create_enquiry(enquiry: EnquiryCreate, request: Request) -> EnquiryResponse:
    # 1. Enforce rate limiting to prevent spam
    await limiter.check_rate_limit(request)

    # 2. Persist enquiry into Supabase PostgreSQL (or fallback store in dev)
    saved_record = await insert_enquiry(enquiry)

    # 3. Format reference identifier
    raw_id = str(saved_record.get("id", ""))
    ref_code = f"ENQ-{raw_id[:8].upper()}" if len(raw_id) >= 8 else "ENQ-CONFIRMED"

    logger.info("Successfully recorded enquiry: %s for %s (%s)", ref_code, enquiry.full_name, enquiry.email)

    return EnquiryResponse(
        id=raw_id,
        reference_code=ref_code,
        full_name=saved_record.get("full_name", enquiry.full_name),
        phone=saved_record.get("phone", enquiry.phone),
        email=saved_record.get("email", enquiry.email),
        advisory_interest=saved_record.get("advisory_interest", enquiry.advisory_interest),
        status=saved_record.get("status", "new"),
        created_at=str(saved_record.get("created_at", "")),
        message="Your consultation enquiry has been successfully registered. Our advisory desk will reach out shortly."
    )

@router.get(
    "/health",
    status_code=status.HTTP_200_OK,
    summary="Enquiry service health check",
)
async def enquiry_health():
    return {
        "status": "healthy",
        "service": "Abhishekh Healthcare Consultancy Enquiry API",
        "database_backend": "Supabase PostgreSQL" if settings.is_supabase_configured else "Local Dev Fallback Mode",
    }
