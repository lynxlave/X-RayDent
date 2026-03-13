from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_doctor_flow() -> None:
    me = client.get("/doctors/me")
    assert me.status_code == 200
    assert me.json()["profile"]["clinic_id"] == "clinic-1"

    patients = client.get("/doctors/patients")
    assert patients.status_code == 200
    assert patients.json()[0]["id"] == "patient-1"

    created_patient = client.post(
        "/doctors/patients",
        json={
            "full_name": "Тестов Тест Тестович",
            "birth_date": "1992-08-14",
            "phone": "+79995554433",
        },
    )
    assert created_patient.status_code == 200
    assert created_patient.json()["full_name"] == "Тестов Тест Тестович"
    assert created_patient.json()["birth_date"] == "1992-08-14"
    assert created_patient.json()["phone"] == "+79995554433"

    refreshed_patients = client.get("/doctors/patients")
    assert any(patient["id"] == created_patient.json()["id"] for patient in refreshed_patients.json())

    card = client.get("/doctors/patients/patient-1")
    assert card.status_code == 200
    assert "studies" in card.json()

    comment = client.post(
        "/doctors/patients/patient-1/comments",
        json={"study_id": "study-1", "comment": "Нужен контроль", "recommendation": "Повторить снимок через 3 месяца"},
    )
    assert comment.status_code == 200
    assert comment.json()["saved"] is True
