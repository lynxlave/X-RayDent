from backend.shared.app.fixtures import USERS
from backend.shared.app.models import Role, User


class AuthRepository:
    def find_patient_by_phone(self, phone: str) -> User | None:
        return next((user for user in USERS if user.role is Role.PATIENT and user.phone == phone), None)

    def find_staff(self, username: str) -> User | None:
        lookup = {"doctor": "doctor-user-1", "admin": "admin-user-1"}
        user_id = lookup.get(username)
        return next((user for user in USERS if user.id == user_id), None)
