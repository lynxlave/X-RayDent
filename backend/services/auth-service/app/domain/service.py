from backend.shared.app.models import Role

from app.repositories.memory import AuthRepository
from app.schemas.auth import AuthToken, PhoneRequest, StaffLoginRequest, VerifyCodeRequest


class AuthService:
    def __init__(self, repository: AuthRepository | None = None) -> None:
        self.repository = repository or AuthRepository()

    def request_code(self, payload: PhoneRequest) -> dict[str, str]:
        user = self.repository.find_patient_by_phone(payload.phone)
        if not user:
            raise ValueError("Patient not found")
        return {"status": "code_sent", "code": "0000"}

    def verify_patient_code(self, payload: VerifyCodeRequest) -> AuthToken:
        if payload.code != "0000":
            raise ValueError("Invalid verification code")
        user = self.repository.find_patient_by_phone(payload.phone)
        if not user:
            raise ValueError("Patient not found")
        return AuthToken(access_token="patient-token", role=Role.PATIENT, user_id=user.id)

    def staff_login(self, payload: StaffLoginRequest) -> AuthToken:
        if payload.password != "password":
            raise ValueError("Invalid credentials")
        user = self.repository.find_staff(payload.username)
        if not user:
            raise ValueError("Staff user not found")
        return AuthToken(access_token=f"{payload.username}-token", role=user.role, user_id=user.id)
