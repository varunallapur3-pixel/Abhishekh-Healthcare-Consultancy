import re
from typing import Optional
from pydantic import BaseModel, Field, field_validator

def sanitize_text(value: Optional[str]) -> Optional[str]:
    """Strip dangerous characters, HTML tags, and excessive whitespace."""
    if value is None:
        return None
    # Remove HTML tags
    cleaned = re.sub(r'<[^>]*?>', '', value)
    # Strip leading/trailing whitespace
    cleaned = cleaned.strip()
    return cleaned if cleaned else None

# Phone validation patterns:
# 1. Indian Mobile Number (with optional +91, 0, spaces, dashes)
INDIAN_PHONE_REGEX = re.compile(r'^(?:\+?91[\-\s]?|0)?[6-9]\d{9}$')
# 2. International E.164-compatible Number
INTL_PHONE_REGEX = re.compile(r'^\+?[1-9]\d{1,14}$')

class EnquiryCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100, description="Full name of client")
    phone: str = Field(..., min_length=7, max_length=25, description="Contact phone or mobile number")
    email: str = Field(..., min_length=5, max_length=150, description="Work email address")
    advisory_interest: Optional[str] = Field(None, max_length=100, description="Preferred practice domain")
    requirements: Optional[str] = Field(None, max_length=2000, description="Detailed requirements & facility scope")

    @field_validator("full_name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        sanitized = sanitize_text(v)
        if not sanitized or len(sanitized) < 2:
            raise ValueError("Full name must contain at least 2 characters.")
        # Check that it contains alphabetic characters
        if not re.search(r'[A-Za-z]', sanitized):
            raise ValueError("Full name must contain letters.")
        return sanitized

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        sanitized = sanitize_text(v)
        if not sanitized:
            raise ValueError("Phone number is required.")
        # Strip common formatting characters for regex matching
        digits_and_plus = re.sub(r'[\s\-\(\)\.]', '', sanitized)
        
        # Test Indian phone or international standard
        is_indian = INDIAN_PHONE_REGEX.match(digits_and_plus)
        is_intl = INTL_PHONE_REGEX.match(digits_and_plus)

        if not (is_indian or is_intl):
            raise ValueError(
                "Please provide a valid 10-digit Indian mobile number (e.g., 9663322617, +91 96633 22617) "
                "or a valid international phone number with country code."
            )
        return sanitized

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        sanitized = sanitize_text(v)
        if not sanitized:
            raise ValueError("Email address is required.")
        email_regex = re.compile(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
        if not email_regex.match(sanitized):
            raise ValueError("Please provide a valid work email address (e.g., name@organization.com).")
        return sanitized.lower()

    @field_validator("advisory_interest")
    @classmethod
    def sanitize_advisory(cls, v: Optional[str]) -> Optional[str]:
        return sanitize_text(v)

    @field_validator("requirements")
    @classmethod
    def sanitize_requirements(cls, v: Optional[str]) -> Optional[str]:
        return sanitize_text(v)

class EnquiryResponse(BaseModel):
    id: str
    reference_code: str
    full_name: str
    phone: str
    email: str
    advisory_interest: Optional[str] = None
    status: str
    created_at: str
    message: str
