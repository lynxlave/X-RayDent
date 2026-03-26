from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class CommonSettings(BaseSettings):
    service_name: str = "shared"
    app_env: str = "development"
    app_debug: bool = True
    jwt_secret: str = "xraydent-secret"
    postgres_dsn: str = "sqlite:///./xraydent.db"
    rabbitmq_url: str = "amqp://guest:guest@rabbitmq:5672/"
    minio_endpoint: str = "minio:9000"
    minio_access_key: str = "xraydent"
    minio_secret_key: str = "xraydent123"
    sms_sender_name: str = "XRayDent"
    smtp_host: str = "mailhog"
    smtp_port: int = 1025
    frontend_url: str = "http://localhost:5173"
    landing_url: str = "http://localhost:4174"
    auth_service_url: str = "http://auth-service:8001"
    patient_service_url: str = "http://patient-service:8002"
    doctor_service_url: str = "http://doctor-service:8003"
    clinic_admin_service_url: str = "http://clinic-admin-service:8004"
    imaging_service_url: str = "http://imaging-service:8005"
    analysis_service_url: str = "http://analysis-service:8006"
    report_service_url: str = "http://report-service:8007"
    notification_service_url: str = "http://notification-service:8008"
    api_gateway_url: str = "http://api-gateway:8000"
    request_timeout_seconds: float = Field(default=5.0, ge=0.1)
    access_token_ttl_minutes: int = 15
    refresh_token_ttl_days: int = 7

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
