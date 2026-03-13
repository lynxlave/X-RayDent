from __future__ import annotations

from datetime import datetime

from sqlalchemy import select

from app.repositories.db import Database, RefreshTokenRecord, UserAccount


class AuthRepository:
    def __init__(self, database: Database | None = None) -> None:
        self.database = database or Database()

    def find_patient_by_phone(self, phone: str) -> UserAccount | None:
        with self.database.session() as session:
            return session.execute(select(UserAccount).where(UserAccount.phone == phone)).scalar_one_or_none()

    def find_staff(self, username: str) -> UserAccount | None:
        with self.database.session() as session:
            return session.execute(select(UserAccount).where(UserAccount.username == username)).scalar_one_or_none()

    def is_phone_taken(self, phone: str) -> bool:
        return self.find_patient_by_phone(phone) is not None

    def create_doctor(
        self,
        user_id: str,
        full_name: str,
        phone: str,
        username: str,
        password_hash: str,
        specialty: str,
    ) -> UserAccount:
        with self.database.session() as session:
            if session.execute(select(UserAccount).where(UserAccount.username == username)).scalar_one_or_none():
                raise ValueError("Пользователь с таким логином уже существует.")
            if session.execute(select(UserAccount).where(UserAccount.phone == phone)).scalar_one_or_none():
                raise ValueError("Пользователь с таким номером телефона уже существует.")
            user = UserAccount(
                id=user_id,
                role="doctor",
                full_name=full_name,
                phone=phone,
                username=username,
                password_hash=password_hash,
                clinic_id="clinic-1",
                specialty=specialty,
            )
            session.add(user)
            session.commit()
            session.refresh(user)
            return user

    def save_refresh_token(self, token_id: str, user_id: str, expires_at) -> RefreshTokenRecord:
        with self.database.session() as session:
            record = RefreshTokenRecord(id=token_id, user_id=user_id, expires_at=expires_at)
            session.add(record)
            session.commit()
            session.refresh(record)
            return record

    def get_refresh_token(self, token_id: str) -> RefreshTokenRecord | None:
        with self.database.session() as session:
            return session.execute(select(RefreshTokenRecord).where(RefreshTokenRecord.id == token_id)).scalar_one_or_none()

    def revoke_refresh_token(self, token_id: str) -> None:
        with self.database.session() as session:
            record = session.execute(select(RefreshTokenRecord).where(RefreshTokenRecord.id == token_id)).scalar_one_or_none()
            if record:
                record.revoked = True
                session.commit()

    def get_user_by_id(self, user_id: str) -> UserAccount | None:
        with self.database.session() as session:
            return session.execute(select(UserAccount).where(UserAccount.id == user_id)).scalar_one_or_none()

    def update_login_failure(self, user_id: str, failed_attempts: int, lockout_level: int, locked_until: datetime | None) -> None:
        with self.database.session() as session:
            user = session.execute(select(UserAccount).where(UserAccount.id == user_id)).scalar_one_or_none()
            if not user:
                return
            user.failed_login_attempts = failed_attempts
            user.lockout_level = lockout_level
            user.locked_until = locked_until
            session.commit()

    def reset_login_failures(self, user_id: str) -> None:
        self.update_login_failure(user_id, failed_attempts=0, lockout_level=0, locked_until=None)
