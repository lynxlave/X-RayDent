FROM python:3.11-slim

RUN pip install --no-cache-dir fastapi uvicorn[standard] pydantic pydantic-settings httpx sqlalchemy "psycopg[binary]"

WORKDIR /workspace/backend/services/doctor-service

COPY . /workspace/backend

ENV PYTHONPATH=/workspace

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8003"]
