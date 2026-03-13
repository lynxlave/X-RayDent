from uuid import uuid4

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_patient_auth_flow() -> None:
    request = client.post("/auth/patient/request-code", json={"phone": "+79990000001"})
    assert request.status_code == 200
    assert request.json()["status"] == "code_sent"

    verify = client.post("/auth/patient/verify", json={"phone": "+79990000001", "code": "0000"})
    assert verify.status_code == 200
    assert verify.json()["role"] == "patient"
    assert "refresh_token" in verify.json()


def test_staff_login() -> None:
    response = client.post("/auth/staff/login", json={"username": "doctor", "password": "password"})
    assert response.status_code == 200
    assert response.json()["role"] == "doctor"
    assert response.json()["full_name"]
    assert response.json()["specialty"] == "stomatolog-terapevt"


def test_doctor_registration_and_refresh() -> None:
    suffix = uuid4().hex[:6]
    registered = client.post(
        "/auth/doctor/register",
        json={
            "full_name": "Петр Новый",
            "specialty": "stomatolog-hirurg",
            "phone": f"+7999{suffix}",
            "username": f"doctor_{suffix}",
            "password": "password123",
        },
    )
    assert registered.status_code == 200
    assert registered.json()["role"] == "doctor"
    assert registered.json()["full_name"] == "РџРµС‚СЂ РќРѕРІС‹Р№"
    assert registered.json()["specialty"] == "stomatolog-hirurg"

    refreshed = client.post("/auth/refresh", json={"refresh_token": registered.json()["refresh_token"]})
    assert refreshed.status_code == 200
    assert refreshed.json()["role"] == "doctor"


def test_lockout_after_three_failed_attempts() -> None:
    username = f"doctor_lock_{uuid4().hex[:6]}"
    registered = client.post(
        "/auth/doctor/register",
        json={
            "full_name": "Тест Блокировка",
            "specialty": "stomatolog-terapevt",
            "phone": f"+7888{uuid4().hex[:7]}",
            "username": username,
            "password": "password123",
        },
    )
    assert registered.status_code == 200

    for expected_left in (2, 1):
        response = client.post("/auth/staff/login", json={"username": username, "password": "wrongpass"})
        assert response.status_code == 401
        assert f"РћСЃС‚Р°Р»РѕСЃСЊ РїРѕРїС‹С‚РѕРє РґРѕ Р±Р»РѕРєРёСЂРѕРІРєРё: {expected_left}" in response.json()["detail"]

    third = client.post("/auth/staff/login", json={"username": username, "password": "wrongpass"})
    assert third.status_code == 401
    assert "Р·Р°Р±Р»РѕРєРёСЂРѕРІР°РЅ РЅР° 1 РјРёРЅ" in third.json()["detail"]

    locked = client.post("/auth/staff/login", json={"username": username, "password": "password123"})
    assert locked.status_code == 401
    assert "РІСЂРµРјРµРЅРЅРѕ Р·Р°Р±Р»РѕРєРёСЂРѕРІР°РЅ" in locked.json()["detail"]
