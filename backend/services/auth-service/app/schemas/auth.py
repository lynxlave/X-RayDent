from pydantic import BaseModel

from backend.shared.app.models import Role


class PhoneRequest(BaseModel):
    phone: str


class VerifyCodeRequest(BaseModel):
    phone: str
    code: str


class StaffLoginRequest(BaseModel):
    username: str
    password: str


class AuthToken(BaseModel):
    access_token: str
    role: Role
    user_id: str
