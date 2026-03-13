from __future__ import annotations

from datetime import datetime, timezone
import hashlib

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, create_engine, inspect, select, text
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, relationship, sessionmaker

from backend.shared.app.models import Role
from backend.shared.app.settings import CommonSettings


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


class Base(DeclarativeBase):
    pass


class UserAccount(Base):
    __tablename__ = "auth_users"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    role: Mapped[str] = mapped_column(String(32), nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(32), nullable=True, unique=True)
    username: Mapped[str | None] = mapped_column(String(64), nullable=True, unique=True)
    password_hash: Mapped[str | None] = mapped_column(String(255), nullable=True)
    clinic_id: Mapped[str | None] = mapped_column(String(64), nullable=True)
    specialty: Mapped[str | None] = mapped_column(String(128), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    failed_login_attempts: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    lockout_level: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    locked_until: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)

    refresh_tokens: Mapped[list["RefreshTokenRecord"]] = relationship(back_populates="user")


class RefreshTokenRecord(Base):
    __tablename__ = "auth_refresh_tokens"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    user_id: Mapped[str] = mapped_column(ForeignKey("auth_users.id"), nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    revoked: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)

    user: Mapped[UserAccount] = relationship(back_populates="refresh_tokens")


class Database:
    def __init__(self, settings: CommonSettings | None = None) -> None:
        self.settings = settings or CommonSettings(service_name="auth-service")
        connect_args = {"check_same_thread": False} if self.settings.postgres_dsn.startswith("sqlite") else {}
        self.engine = create_engine(self.settings.postgres_dsn, future=True, connect_args=connect_args)
        self.session_factory = sessionmaker(bind=self.engine, expire_on_commit=False, class_=Session)

    def create_schema(self) -> None:
        Base.metadata.create_all(self.engine)
        self._ensure_auth_user_columns()

    def session(self) -> Session:
        return self.session_factory()

    def seed_defaults(self) -> None:
        with self.session() as session:
            defaults = [
                UserAccount(
                    id="patient-user-1",
                    role=Role.PATIENT.value,
                    full_name="Анна Пациент",
                    phone="+79990000001",
                ),
                UserAccount(
                    id="doctor-user-1",
                    role=Role.DOCTOR.value,
                    full_name="Иван Врач",
                    username="doctor",
                    password_hash=hash_password("password"),
                    phone="+79990000002",
                    clinic_id="clinic-1",
                    specialty="stomatolog-terapevt",
                ),
                UserAccount(
                    id="admin-user-1",
                    role=Role.CLINIC_ADMIN.value,
                    full_name="Мария Админ",
                    username="admin",
                    password_hash=hash_password("password"),
                    phone="+79990000003",
                    clinic_id="clinic-1",
                ),
            ]
            for default_user in defaults:
                existing = session.get(UserAccount, default_user.id)
                if existing:
                    existing.role = default_user.role
                    existing.full_name = default_user.full_name
                    existing.phone = default_user.phone
                    existing.username = default_user.username
                    existing.password_hash = default_user.password_hash
                    existing.clinic_id = default_user.clinic_id
                    existing.specialty = default_user.specialty
                    existing.failed_login_attempts = 0
                    existing.lockout_level = 0
                    existing.locked_until = None
                else:
                    session.add(default_user)
            session.commit()

    def _ensure_auth_user_columns(self) -> None:
        inspector = inspect(self.engine)
        if "auth_users" not in inspector.get_table_names():
            return

        existing_columns = {column["name"] for column in inspector.get_columns("auth_users")}
        statements: list[str] = []

        if "failed_login_attempts" not in existing_columns:
            statements.append("ALTER TABLE auth_users ADD COLUMN failed_login_attempts INTEGER NOT NULL DEFAULT 0")
        if "lockout_level" not in existing_columns:
            statements.append("ALTER TABLE auth_users ADD COLUMN lockout_level INTEGER NOT NULL DEFAULT 0")
        if "locked_until" not in existing_columns:
            statements.append("ALTER TABLE auth_users ADD COLUMN locked_until TIMESTAMP NULL")

        if not statements:
            return

        with self.engine.begin() as connection:
            for statement in statements:
                connection.execute(text(statement))
