from backend.shared.app.fixtures import REPORTS


class ReportRepository:
    def get_by_study(self, study_id: str):
        return next((report for report in REPORTS if report.study_id == study_id), None)

    def save(self, report):
        existing = self.get_by_study(report.study_id)
        if existing:
            REPORTS.remove(existing)
        REPORTS.append(report)
        return report
