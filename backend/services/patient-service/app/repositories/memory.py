from backend.shared.app.fixtures import COMPLAINTS, FEEDBACKS, PATIENTS, STUDIES, USERS
from backend.shared.app.models import Consent, Feedback, Study


class PatientRepository:
    def get_me(self):
        return {"user": USERS[0], "profile": PATIENTS[0]}

    def list_studies(self) -> list[Study]:
        return STUDIES

    def add_study(self, study: Study) -> Study:
        STUDIES.append(study)
        return study

    def list_complaints(self):
        return COMPLAINTS

    def sign_consent(self, patient_id: str, agreed: bool) -> Consent:
        PATIENTS[0].consent_signed = agreed
        return Consent(patient_id=patient_id, agreed=agreed)

    def add_feedback(self, feedback: Feedback) -> Feedback:
        FEEDBACKS.append(feedback)
        return feedback
