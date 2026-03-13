from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.shared.app.settings import CommonSettings
from app.api.routes import router

settings = CommonSettings(service_name="api-gateway")
app = FastAPI(title="API Gateway", version="0.1.0", debug=settings.app_debug)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)


@app.get("/health")
def health():
    return {"status": "ok", "service": settings.service_name}
