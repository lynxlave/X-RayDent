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
            "email": "test@example.com",
        },
    )
    assert created_patient.status_code == 200
    assert created_patient.json()["full_name"] == "Тестов Тест Тестович"
    assert created_patient.json()["birth_date"] == "1992-08-14"
    assert created_patient.json()["phone"] == "+79995554433"
    assert created_patient.json()["email"] == "test@example.com"

    refreshed_patients = client.get("/doctors/patients")
    assert any(patient["id"] == created_patient.json()["id"] for patient in refreshed_patients.json())

    card = client.get("/doctors/patients/patient-1")
    assert card.status_code == 200
    assert "studies" in card.json()
    assert "comments" in card.json()

    comment = client.post(
        "/doctors/patients/patient-1/comments",
        json={
            "study_id": "study-1",
            "author_name": "Иван Врач",
            "comment": "Нужен контроль",
            "recommendation": "Повторить снимок через 3 месяца",
        },
    )
    assert comment.status_code == 200
    assert comment.json()["saved"] is True
    assert comment.json()["author_name"] == "Иван Врач"

    updated_card = client.get("/doctors/patients/patient-1")
    assert updated_card.status_code == 200
    assert updated_card.json()["comments"][0]["author_name"] == "Иван Врач"

    upload_event = client.post(
        f"/doctors/patients/{created_patient.json()['id']}/study-events",
        json={
            "file_name": "patient_scan.png",
            "event": "uploaded",
        },
    )
    assert upload_event.status_code == 200
    assert upload_event.json()["file_name"] == "patient_scan.png"
    assert upload_event.json()["uploaded_at"] is not None

    processed_event = client.post(
        f"/doctors/patients/{created_patient.json()['id']}/study-events",
        json={
            "file_name": "patient_scan.png",
            "event": "processed",
        },
    )
    assert processed_event.status_code == 200
    assert processed_event.json()["processed_at"] is not None

    created_patient_card = client.get(f"/doctors/patients/{created_patient.json()['id']}")
    assert created_patient_card.status_code == 200
    assert created_patient_card.json()["patient"]["study_uploaded_at"] is not None
    assert created_patient_card.json()["patient"]["study_processed_at"] is not None
    assert created_patient_card.json()["studies"][0]["file_name"] == "patient_scan.png"

    second_upload = client.post(
        f"/doctors/patients/{created_patient.json()['id']}/study-events",
        json={
            "file_name": "patient_scan_v2.png",
            "event": "uploaded",
        },
    )
    assert second_upload.status_code == 200

    second_processed = client.post(
        f"/doctors/patients/{created_patient.json()['id']}/study-events",
        json={
            "file_name": "patient_scan_v2.png",
            "event": "processed",
        },
    )
    assert second_processed.status_code == 200

    history_card = client.get(f"/doctors/patients/{created_patient.json()['id']}")
    assert history_card.status_code == 200
    assert len(history_card.json()["studies"]) == 2
    assert history_card.json()["studies"][0]["file_name"] == "patient_scan_v2.png"

    feedback = client.post(
        f"/doctors/patients/{created_patient.json()['id']}/feedback",
        json={
            "message": "Нужна обратная связь по скорости обработки.",
        },
    )
    assert feedback.status_code == 200
    assert feedback.json()["saved"] is True
