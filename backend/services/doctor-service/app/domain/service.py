from app.repositories.memory import DoctorRepository
from app.schemas.doctor import DoctorCommentRequest, DoctorCreatePatientRequest


class DoctorService:
    def __init__(self, repository: DoctorRepository | None = None) -> None:
        self.repository = repository or DoctorRepository()

    def get_me(self):
        return self.repository.get_me()

    def list_patients(self):
        return self.repository.list_patients()

    def create_patient(self, payload: DoctorCreatePatientRequest):
        return self.repository.create_patient(payload)

    def get_patient_card(self, patient_id: str):
        return self.repository.get_patient_card(patient_id)

    def add_comment(self, patient_id: str, payload: DoctorCommentRequest):
        return {
            "patient_id": patient_id,
            "study_id": payload.study_id,
            "comment": payload.comment,
            "recommendation": payload.recommendation,
            "saved": True,
        }
