FROM python:3.11-slim

WORKDIR /workspace/backend/services/auth-service

COPY backend /workspace/backend

RUN pip install --no-cache-dir fastapi uvicorn[standard] pydantic pydantic-settings httpx

ENV PYTHONPATH=/workspace

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
