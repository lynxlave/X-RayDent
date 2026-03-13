import hashlib
from datetime import datetime, timedelta, timezone

from backend.shared.app.models import Role
from backend.shared.app.utils import generate_id

from app.repositories.memory import AuthRepository
from app.schemas.auth import (
    AuthToken,
    DoctorRegistrationRequest,
    PhoneRequest,
    RefreshTokenRequest,
    StaffLoginRequest,
    VerifyCodeRequest,
)
from app.domain.tokens import JwtManager


class AuthService:
    def __init__(self, repository: AuthRepository | None = None) -> None:
        self.repository = repository or AuthRepository()
        self.jwt_manager = JwtManager()

    def _hash_password(self, password: str) -> str:
        return hashlib.sha256(password.encode("utf-8")).hexdigest()

    def _utcnow(self) -> datetime:
        return datetime.now(timezone.utc)

    def _lockout_minutes_for_level(self, level: int) -> int:
        return 1 + max(level - 1, 0) * 2

    def _build_token_pair(self, user_id: str, role: Role) -> AuthToken:
        access_token, _ = self.jwt_manager.create_access_token(user_id, role.value)
        refresh_id = generate_id("refresh")
        refresh_token, refresh_expires_at = self.jwt_manager.create_refresh_token(user_id, refresh_id)
        self.repository.save_refresh_token(refresh_id, user_id, refresh_expires_at)
        user = self.repository.get_user_by_id(user_id)
        return AuthToken(
            access_token=access_token,
            refresh_token=refresh_token,
            role=role,
            user_id=user_id,
            full_name=user.full_name if user else None,
            specialty=user.specialty if user else None,
            username=user.username if user else None,
        )

    def request_code(self, payload: PhoneRequest) -> dict[str, str]:
        user = self.repository.find_patient_by_phone(payload.phone)
        if not user:
            raise ValueError("Пациент с таким номером не найден.")
        return {"status": "code_sent", "code": "0000"}

    def verify_patient_code(self, payload: VerifyCodeRequest) -> AuthToken:
        if payload.code != "0000":
            raise ValueError("Неверный код подтверждения.")
        user = self.repository.find_patient_by_phone(payload.phone)
        if not user:
            raise ValueError("Пациент с таким номером не найден.")
        return self._build_token_pair(user.id, Role.PATIENT)

    def staff_login(self, payload: StaffLoginRequest) -> AuthToken:
        user = self.repository.find_staff(payload.username)
        if not user:
            raise ValueError("Пользователь с таким логином не найден.")
        now = self._utcnow()
        if user.locked_until and user.locked_until > now:
            remaining_seconds = max(int((user.locked_until - now).total_seconds()), 1)
            raise ValueError(f"Аккаунт временно заблокирован. Повторите попытку через {remaining_seconds} сек.")
        if user.password_hash != self._hash_password(payload.password):
            failed_attempts = user.failed_login_attempts + 1
            if failed_attempts >= 3:
                next_level = user.lockout_level + 1
                lockout_minutes = self._lockout_minutes_for_level(next_level)
                locked_until = now + timedelta(minutes=lockout_minutes)
                self.repository.update_login_failure(
                    user.id,
                    failed_attempts=0,
                    lockout_level=next_level,
                    locked_until=locked_until,
                )
                raise ValueError(f"Аккаунт временно заблокирован на {lockout_minutes} мин. из-за неверных попыток входа.")
            self.repository.update_login_failure(
                user.id,
                failed_attempts=failed_attempts,
                lockout_level=user.lockout_level,
                locked_until=user.locked_until,
            )
            attempts_left = 3 - failed_attempts
            raise ValueError(f"Неверный логин или пароль. Осталось попыток до блокировки: {attempts_left}.")
        self.repository.reset_login_failures(user.id)
        return self._build_token_pair(user.id, Role(user.role))

    def register_doctor(self, payload: DoctorRegistrationRequest) -> AuthToken:
        user = self.repository.create_doctor(
            user_id=generate_id("doctor-user"),
            full_name=payload.full_name,
            phone=payload.phone,
            username=payload.username,
            password_hash=self._hash_password(payload.password),
            specialty=payload.specialty,
        )
        return self._build_token_pair(user.id, Role.DOCTOR)

    def refresh(self, payload: RefreshTokenRequest) -> AuthToken:
        token_payload = self.jwt_manager.decode(payload.refresh_token)
        if token_payload.get("type") != "refresh":
            raise ValueError("Некорректный тип токена.")
        token_id = token_payload.get("jti")
        user_id = token_payload.get("sub")
        if not token_id or not user_id:
            raise ValueError("Некорректные данные токена.")
        record = self.repository.get_refresh_token(token_id)
        if not record or record.revoked:
            raise ValueError("Refresh-токен недействителен.")
        self.repository.revoke_refresh_token(token_id)
        user = self.repository.get_user_by_id(user_id)
        if not user:
            raise ValueError("Пользователь не найден.")
        return self._build_token_pair(user.id, Role(user.role))
