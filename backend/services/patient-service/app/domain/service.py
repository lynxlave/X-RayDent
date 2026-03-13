from backend.shared.app.models import Feedback, Role, Study
from backend.shared.app.utils import generate_id

from app.repositories.memory import PatientRepository
from app.schemas.patient import FeedbackRequest, StudyCreateRequest


class PatientService:
    def __init__(self, repository: PatientRepository | None = None) -> None:
        self.repository = repository or PatientRepository()

    def get_me(self):
        return self.repository.get_me()

    def list_studies(self):
        return self.repository.list_studies()

    def list_complaints(self):
        return self.repository.list_complaints()

    def create_study(self, payload: StudyCreateRequest) -> Study:
        study = Study(
            id=generate_id("study"),
            patient_id=payload.patient_id,
            created_by_role=Role.PATIENT,
            created_by_id=payload.created_by_id,
            complaint_codes=payload.complaint_codes,
        )
        return self.repository.add_study(study)

    def sign_consent(self, patient_id: str, agreed: bool):
        return self.repository.sign_consent(patient_id, agreed)

    def add_feedback(self, payload: FeedbackRequest) -> Feedback:
        feedback = Feedback(
            id=generate_id("feedback"),
            study_id=payload.study_id,
            rating=payload.rating,
            comment=payload.comment,
        )
        return self.repository.add_feedback(feedback)
