from fastapi import FastAPI

from backend.shared.app.settings import CommonSettings
from app.api.routes import router
from app.repositories.db import Database

settings = CommonSettings(service_name="auth-service")
app = FastAPI(title="Auth Service", version="0.1.0", debug=settings.app_debug)
app.include_router(router)
database = Database(settings)


@app.on_event("startup")
def startup() -> None:
    database.create_schema()
    database.seed_defaults()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": settings.service_name}
