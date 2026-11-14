import logging
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from app.config import settings
from app.routers.enquiries import router as enquiries_router

# Setup structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("abhishekh_health.api")

app = FastAPI(
    title="Abhishekh Healthcare Consultancy API",
    description="Backend service for handling client consultation inquiries and Supabase storage.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS Middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Custom Validation Error Handler for cleaner client feedback
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = []
    for err in exc.errors():
        field = " -> ".join(str(loc) for loc in err["loc"] if loc != "body")
        msg = err["msg"]
        errors.append({"field": field, "message": msg})
    
    logger.warning("Validation error on %s: %s", request.url.path, errors)
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "detail": "Validation error in submitted enquiry.",
            "errors": errors
        }
    )

# Include Routers
app.include_router(enquiries_router)

@app.get("/", tags=["Root"])
async def root():
    return {
        "service": "Abhishekh Healthcare Consultancy Backend API",
        "version": "1.0.0",
        "status": "online",
        "docs": "/docs",
    }

@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "database": "Supabase PostgreSQL" if settings.is_supabase_configured else "Local Dev Mode"
    }
