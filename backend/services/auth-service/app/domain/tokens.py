from __future__ import annotations

import base64
import hashlib
import hmac
import json
from datetime import datetime, timedelta, timezone
from typing import Any

from backend.shared.app.settings import CommonSettings


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


def _b64url_encode(value: bytes) -> str:
    return base64.urlsafe_b64encode(value).rstrip(b"=").decode("ascii")


def _b64url_decode(value: str) -> bytes:
    padding = "=" * (-len(value) % 4)
    return base64.urlsafe_b64decode(f"{value}{padding}".encode("ascii"))


class JwtManager:
    def __init__(self, settings: CommonSettings | None = None) -> None:
        self.settings = settings or CommonSettings(service_name="auth-service")
        self.secret = self.settings.jwt_secret.encode("utf-8")

    def encode(self, payload: dict[str, Any]) -> str:
        header = {"alg": "HS256", "typ": "JWT"}
        header_part = _b64url_encode(json.dumps(header, separators=(",", ":")).encode("utf-8"))
        payload_part = _b64url_encode(json.dumps(payload, separators=(",", ":")).encode("utf-8"))
        signature = hmac.new(self.secret, f"{header_part}.{payload_part}".encode("ascii"), hashlib.sha256).digest()
        return f"{header_part}.{payload_part}.{_b64url_encode(signature)}"

    def decode(self, token: str) -> dict[str, Any]:
        try:
            header_part, payload_part, signature_part = token.split(".")
        except ValueError as exc:
            raise ValueError("Invalid token structure") from exc

        expected_signature = hmac.new(
            self.secret,
            f"{header_part}.{payload_part}".encode("ascii"),
            hashlib.sha256,
        ).digest()
        if not hmac.compare_digest(_b64url_encode(expected_signature), signature_part):
            raise ValueError("Invalid token signature")

        payload = json.loads(_b64url_decode(payload_part))
        exp = payload.get("exp")
        if exp is None or utcnow().timestamp() > float(exp):
            raise ValueError("Token expired")
        return payload

    def create_access_token(self, subject: str, role: str) -> tuple[str, datetime]:
        expires_at = utcnow() + timedelta(minutes=self.settings.access_token_ttl_minutes)
        token = self.encode({"sub": subject, "role": role, "type": "access", "exp": expires_at.timestamp()})
        return token, expires_at

    def create_refresh_token(self, subject: str, token_id: str) -> tuple[str, datetime]:
        expires_at = utcnow() + timedelta(days=self.settings.refresh_token_ttl_days)
        token = self.encode({"sub": subject, "jti": token_id, "type": "refresh", "exp": expires_at.timestamp()})
        return token, expires_at
