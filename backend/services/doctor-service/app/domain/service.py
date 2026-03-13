from app.repositories.memory import DoctorRepository
from app.schemas.doctor import DoctorCommentRequest, DoctorCreatePatientRequest, DoctorFeedbackRequest, DoctorStudyEventRequest


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
        return self.repository.add_comment(patient_id, payload)

    def record_study_event(self, patient_id: str, payload: DoctorStudyEventRequest):
        return self.repository.record_study_event(patient_id, payload)

    def add_feedback(self, patient_id: str, payload: DoctorFeedbackRequest):
        return self.repository.add_feedback(patient_id, payload)

    def cleanup_legacy_fixture_patients(self):
        self.repository.cleanup_legacy_fixture_patients()
