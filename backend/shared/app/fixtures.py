from __future__ import annotations

from backend.shared.app.models import (
    AnalysisResult,
    AnalysisStatus,
    Clinic,
    Complaint,
    DoctorProfile,
    Feedback,
    PatientProfile,
    QualityAssessment,
    Report,
    Role,
    Study,
    User,
)


CLINICS = [
    Clinic(id="clinic-1", name="X-РайДент Central"),
]

USERS = [
    User(id="patient-user-1", role=Role.PATIENT, full_name="Анна Пациент", phone="+79990000001"),
    User(
        id="doctor-user-1",
        role=Role.DOCTOR,
        full_name="Иван Врач",
        email="doctor@xraydent.local",
        clinic_id="clinic-1",
    ),
    User(
        id="admin-user-1",
        role=Role.CLINIC_ADMIN,
        full_name="Мария Админ",
        email="admin@xraydent.local",
        clinic_id="clinic-1",
    ),
]

PATIENTS = [
    PatientProfile(id="patient-1", user_id="patient-user-1", phone="+79990000001"),
]

DOCTORS = [
    DoctorProfile(id="doctor-1", user_id="doctor-user-1", clinic_id="clinic-1"),
]

COMPLAINTS = [
    Complaint(code="pain", label="Боль"),
    Complaint(code="swelling", label="Отек"),
    Complaint(code="checkup", label="Плановый осмотр"),
]

STUDIES = [
    Study(
        id="study-1",
        patient_id="patient-1",
        created_by_role=Role.PATIENT,
        created_by_id="patient-user-1",
        complaint_codes=["pain"],
        upload_name="study-1-panorama.png",
        status=AnalysisStatus.COMPLETED,
    ),
]

ANALYSIS_RESULTS = [
    AnalysisResult(
        study_id="study-1",
        status=AnalysisStatus.COMPLETED,
        quality_assessment=QualityAssessment.ACCEPTABLE,
        findings=["Видимых радикулярных кист не обнаружено"],
        recommendations=["Рекомендован плановый осмотр через 6 месяцев"],
    ),
]

REPORTS = [
    Report(
        id="report-1",
        study_id="study-1",
        summary="Патологические изменения не выявлены.",
        recommendations=["Продолжить наблюдение у лечащего врача"],
        pdf_url="http://localhost:9000/reports/report-1.pdf",
        email_sent=True,
    ),
]

FEEDBACKS = [
    Feedback(id="feedback-1", study_id="study-1", rating=5, comment="Удобный сервис"),
]
