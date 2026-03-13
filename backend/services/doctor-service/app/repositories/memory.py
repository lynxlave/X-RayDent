from backend.shared.app.fixtures import ANALYSIS_RESULTS, DOCTORS, PATIENTS, REPORTS, STUDIES, USERS


class DoctorRepository:
    def get_me(self):
        return {"user": USERS[1], "profile": DOCTORS[0]}

    def list_patients(self):
        items = []
        for patient in PATIENTS:
            user = next(user for user in USERS if user.id == patient.user_id)
            studies = [study for study in STUDIES if study.patient_id == patient.id]
            latest_study = max(studies, key=lambda study: study.created_at) if studies else None
            items.append(
                {
                    "id": patient.id,
                    "user_id": patient.user_id,
                    "full_name": user.full_name,
                    "phone": patient.phone,
                    "birth_date": patient.birth_date,
                    "status": latest_study.status.value if latest_study else "active",
                }
            )
        return items

    def get_patient_card(self, patient_id: str):
        patient = next(profile for profile in PATIENTS if profile.id == patient_id)
        user = next(user for user in USERS if user.id == patient.user_id)
        studies = [study for study in STUDIES if study.patient_id == patient_id]
        study_ids = {study.id for study in studies}
        return {
            "patient": {
                "id": patient.id,
                "user_id": patient.user_id,
                "full_name": user.full_name,
                "phone": patient.phone,
                "birth_date": patient.birth_date,
            },
            "studies": studies,
            "reports": [report for report in REPORTS if report.study_id in study_ids],
            "results": [result for result in ANALYSIS_RESULTS if result.study_id in study_ids],
        }
