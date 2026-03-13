from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_admin_access_management() -> None:
    clinic = client.get("/admin/clinic")
    assert clinic.status_code == 200
    assert clinic.json()["clinic"]["id"] == "clinic-1"

    doctors = client.get("/admin/doctors")
    assert doctors.status_code == 200
    assert doctors.json()[0]["id"] == "doctor-1"

    updated = client.post("/admin/doctors/doctor-1/access", json={"can_review": False})
    assert updated.status_code == 200
    assert updated.json()["can_review"] is False
