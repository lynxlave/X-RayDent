from pydantic import BaseModel, Field

from backend.shared.app.models import Role


class PhoneRequest(BaseModel):
    phone: str


class VerifyCodeRequest(BaseModel):
    phone: str
    code: str


class StaffLoginRequest(BaseModel):
    username: str
    password: str


class DoctorRegistrationRequest(BaseModel):
    full_name: str
    specialty: str
    phone: str
    username: str
    password: str = Field(min_length=8)


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class AuthToken(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    role: Role
    user_id: str
    full_name: str | None = None
    specialty: str | None = None
    username: str | None = None
