from fastapi import FastAPI

from backend.shared.app.settings import CommonSettings
from app.api.routes import router, service
from app.repositories.db import Database

settings = CommonSettings(service_name="doctor-service")
app = FastAPI(title="Doctor Service", version="0.1.0", debug=settings.app_debug)
app.include_router(router)


@app.on_event("startup")
def startup() -> None:
    Database(settings).create_schema()
    service.cleanup_legacy_fixture_patients()


@app.get("/health")
def health():
    return {"status": "ok", "service": settings.service_name}
