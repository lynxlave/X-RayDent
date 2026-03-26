from __future__ import annotations

from datetime import datetime, timezone
from uuid import uuid4

from sqlalchemy import DateTime, String, create_engine, delete, select
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker

from backend.shared.app.settings import CommonSettings


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


def normalize_sqlalchemy_dsn(dsn: str) -> str:
    if dsn.startswith("postgresql://"):
        return dsn.replace("postgresql://", "postgresql+psycopg://", 1)
    if dsn.startswith("postgres://"):
        return dsn.replace("postgres://", "postgresql+psycopg://", 1)
    return dsn


class Base(DeclarativeBase):
    pass


class DoctorPatientRecordDB(Base):
    __tablename__ = "doctor_patients"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[str] = mapped_column(String(32), nullable=False)
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    birth_date: Mapped[str] = mapped_column(String(32), nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="active")
    study_file_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    study_uploaded_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    study_processed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)


class DoctorPatientCommentDB(Base):
    __tablename__ = "doctor_patient_comments"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    patient_id: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    study_id: Mapped[str | None] = mapped_column(String(64), nullable=True)
    doctor_name: Mapped[str] = mapped_column(String(255), nullable=False)
    comment: Mapped[str] = mapped_column(String(4000), nullable=False)
    recommendation: Mapped[str | None] = mapped_column(String(4000), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)


class DoctorPatientStudyDB(Base):
    __tablename__ = "doctor_patient_studies"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    patient_id: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    file_name: Mapped[str] = mapped_column(String(255), nullable=False)
    uploaded_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)
    processed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


class DoctorPatientFeedbackDB(Base):
    __tablename__ = "doctor_patient_feedback"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    patient_id: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    message: Mapped[str] = mapped_column(String(4000), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)


class Database:
    def __init__(self, settings: CommonSettings | None = None) -> None:
        self.settings = settings or CommonSettings(service_name="doctor-service")
        database_dsn = normalize_sqlalchemy_dsn(self.settings.postgres_dsn)
        connect_args = {"check_same_thread": False} if database_dsn.startswith("sqlite") else {}
        self.engine = create_engine(database_dsn, future=True, connect_args=connect_args)
        self.session_factory = sessionmaker(bind=self.engine, expire_on_commit=False, class_=Session)

    def create_schema(self) -> None:
        Base.metadata.create_all(self.engine)
        with self.engine.begin() as connection:
            if self.engine.dialect.name == "sqlite":
                existing_columns = {row[1] for row in connection.exec_driver_sql("PRAGMA table_info(doctor_patients)")}
                upload_column_type = "TIMESTAMP"
            else:
                existing_columns = {
                    row[0]
                    for row in connection.exec_driver_sql(
                        """
                        SELECT column_name
                        FROM information_schema.columns
                        WHERE table_name = 'doctor_patients'
                        """
                    )
                }
                upload_column_type = "TIMESTAMPTZ"

            if "study_uploaded_at" not in existing_columns:
                connection.exec_driver_sql(f"ALTER TABLE doctor_patients ADD COLUMN study_uploaded_at {upload_column_type} NULL")
            if "study_processed_at" not in existing_columns:
                connection.exec_driver_sql(f"ALTER TABLE doctor_patients ADD COLUMN study_processed_at {upload_column_type} NULL")
            if "email" not in existing_columns:
                connection.exec_driver_sql("ALTER TABLE doctor_patients ADD COLUMN email VARCHAR(255) NULL")

    def session(self) -> Session:
        return self.session_factory()

    def create_patient(
        self,
        *,
        full_name: str,
        phone: str,
        email: str | None,
        birth_date: str,
        patient_id: str | None = None,
        user_id: str | None = None,
        status: str = "active",
    ) -> DoctorPatientRecordDB:
        patient = DoctorPatientRecordDB(
            id=patient_id or f"patient-{uuid4().hex[:8]}",
            user_id=user_id or f"patient-user-{uuid4().hex[:8]}",
            full_name=full_name,
            phone=phone,
            email=email,
            birth_date=birth_date,
            status=status,
        )
        with self.session() as session:
            session.add(patient)
            session.commit()
            session.refresh(patient)
            return patient

    def list_patients(self) -> list[DoctorPatientRecordDB]:
        with self.session() as session:
            return list(session.scalars(select(DoctorPatientRecordDB).order_by(DoctorPatientRecordDB.created_at.desc())))

    def get_patient(self, patient_id: str) -> DoctorPatientRecordDB | None:
        with self.session() as session:
            return session.get(DoctorPatientRecordDB, patient_id)

    def delete_patients(self, patient_ids: list[str]) -> None:
        if not patient_ids:
            return
        with self.session() as session:
            session.execute(delete(DoctorPatientFeedbackDB).where(DoctorPatientFeedbackDB.patient_id.in_(patient_ids)))
            session.execute(delete(DoctorPatientStudyDB).where(DoctorPatientStudyDB.patient_id.in_(patient_ids)))
            session.execute(delete(DoctorPatientCommentDB).where(DoctorPatientCommentDB.patient_id.in_(patient_ids)))
            session.execute(delete(DoctorPatientRecordDB).where(DoctorPatientRecordDB.id.in_(patient_ids)))
            session.commit()

    def add_comment(self, *, patient_id: str, study_id: str | None, doctor_name: str, comment: str, recommendation: str | None) -> DoctorPatientCommentDB:
        record = DoctorPatientCommentDB(
            id=f"comment-{uuid4().hex[:10]}",
            patient_id=patient_id,
            study_id=study_id,
            doctor_name=doctor_name,
            comment=comment,
            recommendation=recommendation,
        )
        with self.session() as session:
            session.add(record)
            session.commit()
            session.refresh(record)
            return record

    def list_comments(self, patient_id: str) -> list[DoctorPatientCommentDB]:
        with self.session() as session:
            return list(
                session.scalars(
                    select(DoctorPatientCommentDB)
                    .where(DoctorPatientCommentDB.patient_id == patient_id)
                    .order_by(DoctorPatientCommentDB.created_at.desc())
                )
            )

    def list_studies(self, patient_id: str) -> list[DoctorPatientStudyDB]:
        with self.session() as session:
            return list(
                session.scalars(
                    select(DoctorPatientStudyDB)
                    .where(DoctorPatientStudyDB.patient_id == patient_id)
                    .order_by(DoctorPatientStudyDB.uploaded_at.desc())
                )
            )

    def add_feedback(self, *, patient_id: str, message: str) -> DoctorPatientFeedbackDB | None:
        with self.session() as session:
            patient = session.get(DoctorPatientRecordDB, patient_id)
            if patient is None:
                return None
            feedback = DoctorPatientFeedbackDB(
                id=f"feedback-{uuid4().hex[:10]}",
                patient_id=patient_id,
                message=message,
            )
            session.add(feedback)
            session.commit()
            session.refresh(feedback)
            return feedback

    def record_study_event(self, *, patient_id: str, file_name: str, event: str) -> DoctorPatientRecordDB | None:
        with self.session() as session:
            patient = session.get(DoctorPatientRecordDB, patient_id)
            if patient is None:
                return None

            if event == "uploaded":
                uploaded_at = utcnow()
                patient.study_file_name = file_name
                patient.study_uploaded_at = uploaded_at
                study = DoctorPatientStudyDB(
                    id=f"study-{uuid4().hex[:10]}",
                    patient_id=patient_id,
                    file_name=file_name,
                    uploaded_at=uploaded_at,
                )
                session.add(study)
            elif event == "processed":
                processed_at = utcnow()
                patient.study_processed_at = processed_at
                patient.status = "completed"
                latest_study = session.scalar(
                    select(DoctorPatientStudyDB)
                    .where(DoctorPatientStudyDB.patient_id == patient_id, DoctorPatientStudyDB.file_name == file_name)
                    .order_by(DoctorPatientStudyDB.uploaded_at.desc())
                )
                if latest_study is not None:
                    latest_study.processed_at = processed_at

            session.add(patient)
            session.commit()
            session.refresh(patient)
            return patient
