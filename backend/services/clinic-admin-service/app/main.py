from fastapi import FastAPI

from backend.shared.app.settings import CommonSettings
from app.api.routes import router

settings = CommonSettings(service_name="clinic-admin-service")
app = FastAPI(title="Clinic Admin Service", version="0.1.0", debug=settings.app_debug)
app.include_router(router)


@app.get("/health")
def health():
    return {"status": "ok", "service": settings.service_name}
