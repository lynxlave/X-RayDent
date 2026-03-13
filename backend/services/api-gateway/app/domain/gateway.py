from __future__ import annotations

from typing import Any

import httpx

from backend.shared.app.settings import CommonSettings


class GatewayService:
    def __init__(self, settings: CommonSettings | None = None) -> None:
        self.settings = settings or CommonSettings(service_name="api-gateway")

    async def request(self, method: str, service_url: str, path: str, payload: dict[str, Any] | None = None):
        async with httpx.AsyncClient(timeout=self.settings.request_timeout_seconds) as client:
            response = await client.request(method, f"{service_url}{path}", json=payload)
            response.raise_for_status()
            return response.json()

    async def patient_case_flow(self, complaint_codes: list[str], filename: str):
        study = await self.request("POST", self.settings.patient_service_url, "/patients/studies", {"complaint_codes": complaint_codes})
        upload = await self.request(
            "POST",
            self.settings.imaging_service_url,
            "/studies/init-upload",
            {"study_id": study["id"], "filename": filename},
        )
        analysis = await self.request(
            "POST",
            self.settings.analysis_service_url,
            "/analysis/jobs",
            {"study_id": study["id"], "filename": filename},
        )
        report = await self.request(
            "POST",
            self.settings.report_service_url,
            "/reports/generate",
            {
                "study_id": study["id"],
                "findings": analysis["result"]["findings"],
                "recommendations": analysis["result"]["recommendations"],
            },
        )
        return {"study": study, "upload": upload, "analysis": analysis, "report": report}
