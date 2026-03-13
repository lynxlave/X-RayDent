from backend.shared.app.fixtures import CLINICS, DOCTORS, USERS


class AdminRepository:
    def get_clinic(self):
        return {"clinic": CLINICS[0], "admin": USERS[2]}

    def list_doctors(self):
        return DOCTORS

    def update_access(self, doctor_id: str, can_review: bool):
        doctor = next(profile for profile in DOCTORS if profile.id == doctor_id)
        doctor.can_review = can_review
        return doctor
