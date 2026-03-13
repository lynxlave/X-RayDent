from backend.shared.app.fixtures import ANALYSIS_RESULTS


class AnalysisRepository:
    def get_result(self, study_id: str):
        return next((result for result in ANALYSIS_RESULTS if result.study_id == study_id), None)

    def save_result(self, result):
        existing = self.get_result(result.study_id)
        if existing:
            ANALYSIS_RESULTS.remove(existing)
        ANALYSIS_RESULTS.append(result)
        return result
