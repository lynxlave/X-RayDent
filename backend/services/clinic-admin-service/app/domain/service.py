from app.repositories.memory import AdminRepository


class ClinicAdminService:
    def __init__(self, repository: AdminRepository | None = None) -> None:
        self.repository = repository or AdminRepository()

    def get_clinic(self):
        return self.repository.get_clinic()

    def list_doctors(self):
        return self.repository.list_doctors()

    def update_access(self, doctor_id: str, can_review: bool):
        return self.repository.update_access(doctor_id, can_review)
