from backend.shared.app.fixtures import ANALYSIS_RESULTS, DOCTORS, PATIENTS, REPORTS, STUDIES, USERS


class DoctorRepository:
    def get_me(self):
        return {"user": USERS[1], "profile": DOCTORS[0]}

    def list_patients(self):
        return PATIENTS

    def get_patient_card(self, patient_id: str):
        patient = next(profile for profile in PATIENTS if profile.id == patient_id)
        studies = [study for study in STUDIES if study.patient_id == patient_id]
        study_ids = {study.id for study in studies}
        return {
            "patient": patient,
            "studies": studies,
            "reports": [report for report in REPORTS if report.study_id in study_ids],
            "results": [result for result in ANALYSIS_RESULTS if result.study_id in study_ids],
        }
