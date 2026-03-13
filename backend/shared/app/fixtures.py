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
    User(id="patient-user-1", role=Role.PATIENT, full_name="Анна Смирнова", phone="+79990000001"),
    User(id="patient-user-2", role=Role.PATIENT, full_name="Ольга Кузнецова", phone="+79990000011"),
    User(id="patient-user-3", role=Role.PATIENT, full_name="Ирина Васильева", phone="+79990000012"),
    User(id="patient-user-4", role=Role.PATIENT, full_name="Дмитрий Орлов", phone="+79990000013"),
    User(id="patient-user-5", role=Role.PATIENT, full_name="Екатерина Волкова", phone="+79990000014"),
    User(id="patient-user-6", role=Role.PATIENT, full_name="Марина Лебедева", phone="+79990000015"),
    User(id="patient-user-7", role=Role.PATIENT, full_name="Александр Романов", phone="+79990000016"),
    User(id="patient-user-8", role=Role.PATIENT, full_name="Наталья Соколова", phone="+79990000017"),
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
    PatientProfile(id="patient-1", user_id="patient-user-1", phone="+79990000001", birth_date="1990-04-18"),
    PatientProfile(id="patient-2", user_id="patient-user-2", phone="+79990000011", birth_date="1987-09-05"),
    PatientProfile(id="patient-3", user_id="patient-user-3", phone="+79990000012", birth_date="1994-12-21"),
    PatientProfile(id="patient-4", user_id="patient-user-4", phone="+79990000013", birth_date="1981-02-14"),
    PatientProfile(id="patient-5", user_id="patient-user-5", phone="+79990000014", birth_date="1998-07-30"),
    PatientProfile(id="patient-6", user_id="patient-user-6", phone="+79990000015", birth_date="1979-11-09"),
    PatientProfile(id="patient-7", user_id="patient-user-7", phone="+79990000016", birth_date="1989-06-01"),
    PatientProfile(id="patient-8", user_id="patient-user-8", phone="+79990000017", birth_date="1996-03-25"),
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
    Study(
        id="study-2",
        patient_id="patient-2",
        created_by_role=Role.DOCTOR,
        created_by_id="doctor-user-1",
        complaint_codes=["checkup"],
        upload_name="study-2-panorama.png",
        status=AnalysisStatus.PROCESSING,
    ),
    Study(
        id="study-3",
        patient_id="patient-3",
        created_by_role=Role.DOCTOR,
        created_by_id="doctor-user-1",
        complaint_codes=["swelling"],
        upload_name="study-3-panorama.png",
        status=AnalysisStatus.REJECTED,
    ),
    Study(
        id="study-4",
        patient_id="patient-4",
        created_by_role=Role.DOCTOR,
        created_by_id="doctor-user-1",
        complaint_codes=["pain"],
        upload_name="study-4-panorama.png",
        status=AnalysisStatus.COMPLETED,
    ),
    Study(
        id="study-5",
        patient_id="patient-5",
        created_by_role=Role.DOCTOR,
        created_by_id="doctor-user-1",
        complaint_codes=["checkup"],
        upload_name="study-5-panorama.png",
        status=AnalysisStatus.PROCESSING,
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
    AnalysisResult(
        study_id="study-3",
        status=AnalysisStatus.REJECTED,
        quality_assessment=QualityAssessment.LOW,
        findings=["Качество снимка недостаточное для анализа"],
        recommendations=["Рекомендуется повторная загрузка снимка"],
    ),
    AnalysisResult(
        study_id="study-4",
        status=AnalysisStatus.COMPLETED,
        quality_assessment=QualityAssessment.ACCEPTABLE,
        findings=["Признаки острого воспаления не визуализируются"],
        recommendations=["Наблюдение у лечащего врача"],
    ),
]

REPORTS = [
    Report(
        id="report-1",
        study_id="study-1",
        summary="Патологических изменений не выявлено.",
        recommendations=["Продолжить наблюдение у лечащего врача"],
        pdf_url="http://localhost:9000/reports/report-1.pdf",
        email_sent=True,
    ),
    Report(
        id="report-2",
        study_id="study-4",
        summary="Выраженных патологических изменений не обнаружено.",
        recommendations=["Контрольный осмотр через 6 месяцев"],
        pdf_url="http://localhost:9000/reports/report-2.pdf",
        email_sent=False,
    ),
]

FEEDBACKS = [
    Feedback(id="feedback-1", study_id="study-1", rating=5, comment="Удобный сервис"),
]
