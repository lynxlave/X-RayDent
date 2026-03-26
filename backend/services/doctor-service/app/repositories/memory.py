from backend.shared.app.fixtures import DOCTORS, USERS
from app.repositories.db import Database


class DoctorRepository:
    def __init__(self, database: Database | None = None) -> None:
        self.database = database or Database()

    def get_me(self):
        return {"user": USERS[1], "profile": DOCTORS[0]}

    def list_patients(self):
        items = []
        for patient in self.database.list_patients():
            comments = self.database.list_comments(patient.id)
            studies = self.database.list_studies(patient.id)
            latest_study = studies[0] if studies else None
            latest_comment = comments[0] if comments else None
            items.append(
                {
                    "id": patient.id,
                    "user_id": patient.user_id,
                    "full_name": patient.full_name,
                    "phone": patient.phone,
                    "email": patient.email,
                    "birth_date": patient.birth_date,
                    "status": patient.status,
                    "latest_comment": latest_comment.comment if latest_comment else None,
                    "latest_comment_author": latest_comment.doctor_name if latest_comment else None,
                    "study_file_name": latest_study.file_name if latest_study else None,
                    "study_uploaded_at": latest_study.uploaded_at.isoformat() if latest_study else None,
                    "study_processed_at": latest_study.processed_at.isoformat() if latest_study and latest_study.processed_at else None,
                }
            )
        return items

    def create_patient(self, payload):
        patient = self.database.create_patient(
            full_name=payload.full_name,
            phone=payload.phone,
            email=payload.email,
            birth_date=payload.birth_date,
        )
        return {
            "id": patient.id,
            "user_id": patient.user_id,
            "full_name": patient.full_name,
            "phone": patient.phone,
            "email": patient.email,
            "birth_date": patient.birth_date,
            "status": patient.status,
            "latest_comment": None,
            "latest_comment_author": None,
            "study_file_name": patient.study_file_name,
            "study_uploaded_at": patient.study_uploaded_at.isoformat() if patient.study_uploaded_at else None,
            "study_processed_at": patient.study_processed_at.isoformat() if patient.study_processed_at else None,
        }

    def get_patient_card(self, patient_id: str):
        patient = self.database.get_patient(patient_id)
        if patient is None:
            raise ValueError("Пациент не найден.")
        studies = self.database.list_studies(patient_id)
        latest_study = studies[0] if studies else None

        return {
            "patient": {
                "id": patient.id,
                "user_id": patient.user_id,
                "full_name": patient.full_name,
                "phone": patient.phone,
                "email": patient.email,
                "birth_date": patient.birth_date,
                "study_file_name": latest_study.file_name if latest_study else None,
                "study_uploaded_at": latest_study.uploaded_at.isoformat() if latest_study else None,
                "study_processed_at": latest_study.processed_at.isoformat() if latest_study and latest_study.processed_at else None,
            },
            "studies": [
                {
                    "id": study.id,
                    "file_name": study.file_name,
                    "uploaded_at": study.uploaded_at.isoformat(),
                    "processed_at": study.processed_at.isoformat() if study.processed_at else None,
                }
                for study in studies
            ],
            "reports": [],
            "results": [],
            "comments": [
                {
                    "id": comment.id,
                    "author_name": comment.doctor_name,
                    "comment": comment.comment,
                    "recommendation": comment.recommendation,
                    "created_at": comment.created_at.isoformat(),
                }
                for comment in self.database.list_comments(patient_id)
            ],
        }

    def add_comment(self, patient_id: str, payload):
        comment = self.database.add_comment(
            patient_id=patient_id,
            study_id=payload.study_id,
            doctor_name=payload.author_name,
            comment=payload.comment,
            recommendation=payload.recommendation,
        )
        return {
            "id": comment.id,
            "patient_id": patient_id,
            "study_id": payload.study_id,
            "author_name": comment.doctor_name,
            "comment": comment.comment,
            "recommendation": comment.recommendation,
            "saved": True,
            "created_at": comment.created_at.isoformat(),
        }

    def record_study_event(self, patient_id: str, payload):
        patient = self.database.record_study_event(patient_id=patient_id, file_name=payload.file_name, event=payload.event)
        if patient is None:
            raise ValueError("Пациент не найден.")
        return {
            "patient_id": patient.id,
            "file_name": patient.study_file_name,
            "event": payload.event,
            "uploaded_at": patient.study_uploaded_at.isoformat() if patient.study_uploaded_at else None,
            "processed_at": patient.study_processed_at.isoformat() if patient.study_processed_at else None,
            "status": patient.status,
        }

    def add_feedback(self, patient_id: str, payload):
        feedback = self.database.add_feedback(patient_id=patient_id, message=payload.message)
        if feedback is None:
            raise ValueError("Пациент не найден.")
        return {
            "saved": True,
            "message": "Спасибо за обратную связь, мы вернемся к вам с ответом.",
            "created_at": feedback.created_at.isoformat(),
        }

    def cleanup_legacy_fixture_patients(self):
        self.database.delete_patients([f"patient-{index}" for index in range(1, 9)])
