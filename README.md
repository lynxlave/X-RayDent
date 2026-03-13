# X-РайДент Skeleton

MVP-каркас платформы для работы с ортопантомограммами. Репозиторий подготовлен для локальной разработки и запуска через Docker Compose и включает:

- `backend/` с набором FastAPI-микросервисов;
- `front-end/` с основным React + Vite SPA для пациента, врача и администратора;
- `landing/` с отдельным промо-сайтом, перенесенным из `G:\X-РайДент`;
- `infra/` с Docker Compose-инфраструктурой;
- `docs/` с кратким описанием архитектуры.

## Что реализовано

### Backend

Реализован backend-monorepo с отдельными сервисами:

- `api-gateway` - единая точка входа для фронтенда и orchestration happy-path сценариев;
- `auth-service` - вход пациента по телефону и коду, вход врача и администратора по логину и паролю;
- `patient-service` - профиль пациента, жалобы, согласия, история исследований, feedback;
- `doctor-service` - список пациентов, карточка пациента, комментарии врача;
- `clinic-admin-service` - управление доступом врачей клиники;
- `imaging-service` - инициализация загрузки снимка и mock presigned URL;
- `analysis-service` - mock-анализ снимка и классификация качества;
- `report-service` - формирование заключения, рекомендаций и PDF-ссылки;
- `notification-service` - mock SMS/email уведомления и журнал отправок.

Для сервисов создан единый шаблон:

- `app/main.py`
- `api/`
- `domain/`
- `schemas/`
- `repositories/`
- `tests/`
- `Dockerfile`
- `pyproject.toml`

Также добавлен общий пакет `backend/shared/`, где лежат:

- доменные модели;
- статусы и роли;
- event contracts;
- общие настройки;
- mock fixtures;
- вспомогательные утилиты.

### Front-end

В `front-end/` создан отдельный SPA на React + Vite.

Поддержаны маршруты:

- `/login`
- `/app`
- `/support`

Поддержаны role-based разделы:

- кабинет пациента;
- кабинет врача;
- кабинет администратора клиники.

Внутри SPA уже заложены:

- вход по ролям;
- patient flow с жалобами, запуском обработки снимка и историей исследований;
- doctor flow со списком пациентов и карточкой пациента;
- admin flow с управлением доступом врачей;
- API abstraction layer в `front-end/src/lib/api.ts`;
- клиентское состояние через `zustand`;
- unit/integration test skeleton для UI.

### Landing

В `landing/` вынесен отдельный Vite-проект, перенесенный из `G:\X-РайДент`.

Для него добавлено:

- отдельное место в репозитории;
- отдельный `Dockerfile`;
- отдельный сервис в Compose;
- отдельный порт запуска `4174`.

### Инфраструктура

В `infra/docker-compose.yml` настроен запуск:

- `landing`
- `frontend`
- `api-gateway`
- `auth-service`
- `patient-service`
- `doctor-service`
- `clinic-admin-service`
- `imaging-service`
- `analysis-service`
- `report-service`
- `notification-service`
- `postgres`
- `rabbitmq`
- `minio`

Добавлены:

- `.env`
- `env.example`
- `requirements.txt`
- `backend/run_service_tests.py`

## Архитектура

### Общая схема

Система разделена на несколько уровней:

1. `landing` - внешний маркетинговый сайт.
2. `front-end` - прикладной SPA-интерфейс.
3. `api-gateway` - единая HTTP-точка входа в backend.
4. Доменные микросервисы FastAPI.
5. Инфраструктурные контейнеры `Postgres`, `RabbitMQ`, `MinIO`.

### Сценарий обработки снимка

Базовый happy-path выглядит так:

1. Пациент или врач инициирует кейс.
2. `patient-service` создает исследование.
3. `imaging-service` инициализирует загрузку снимка.
4. `analysis-service` выполняет mock-анализ.
5. `report-service` формирует заключение и PDF-ссылку.
6. `notification-service` может отправить mock-уведомление.

### Event flow

В проекте заложены event contracts:

- `study.uploaded`
- `analysis.started`
- `analysis.completed`
- `analysis.rejected`
- `report.ready`
- `notification.requested`

Сейчас бизнес-пайплайн реализован как skeleton с in-memory состоянием и подготовленными точками расширения под реальный RabbitMQ pipeline.

## Структура проекта

```text
x-raydent-platform/
  backend/
    shared/
    services/
      api-gateway/
      auth-service/
      patient-service/
      doctor-service/
      clinic-admin-service/
      imaging-service/
      analysis-service/
      report-service/
      notification-service/
  front-end/
  landing/
  infra/
  docs/
  .env
  env.example
  requirements.txt
  README.md
```

## Переменные окружения

Основные переменные уже подготовлены в `.env`, а шаблон лежит в `env.example`.

Используются параметры для:

- портов сервисов;
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_DSN`;
- `RABBITMQ_URL`;
- `MINIO_ROOT_USER`, `MINIO_ROOT_PASSWORD`, `MINIO_ENDPOINT`;
- `JWT_SECRET`;
- `FRONTEND_URL`;
- `LANDING_URL`;
- `VITE_API_URL`.

## Как запускать проект

### Через Docker Compose

Из корня проекта:

```powershell
docker compose --env-file .env -f infra/docker-compose.yml up --build
```

`front-end` запускается в dev-режиме внутри Docker: исходники смонтированы в контейнер как bind mount, поэтому изменения в `front-end/src` подхватываются через Vite hot reload без рестарта контейнера.

После запуска доступны:

- landing: `http://localhost:4174`
- frontend app: `http://localhost:5173`
- api gateway: `http://localhost:8000`
- auth-service: `http://localhost:8001`
- patient-service: `http://localhost:8002`
- doctor-service: `http://localhost:8003`
- clinic-admin-service: `http://localhost:8004`
- imaging-service: `http://localhost:8005`
- analysis-service: `http://localhost:8006`
- report-service: `http://localhost:8007`
- notification-service: `http://localhost:8008`
- RabbitMQ UI: `http://localhost:15672`
- MinIO Console: `http://localhost:9001`
- Postgres: `localhost:5432`

### Локально без Docker

#### Backend

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Дальше сервисы можно поднимать по одному. Пример:

```powershell
$env:PYTHONPATH = (Get-Location).Path
cd backend\services\auth-service
uvicorn app.main:app --reload --port 8001
```

Аналогично поднимаются остальные сервисы, меняется только каталог и порт.

#### Front-end

```powershell
cd front-end
npm install
npm run dev
```

Если используется Docker Compose, локальный запуск `front-end` не нужен: dev-сервер уже работает внутри контейнера.

#### Landing

```powershell
cd landing
npm install
npm run dev
```

## Как запускать тесты

### Backend

Запуск всех сервисных тестов:

```powershell
python backend/run_service_tests.py
```

Пример запуска тестов одного сервиса:

```powershell
cd backend\services\auth-service
$env:PYTHONPATH = (Resolve-Path ..\..\..).Path
python -m pytest tests
```

### Front-end

```powershell
cd front-end
npm install
npm run test
```

### Front-end E2E

```powershell
cd front-end
npm run test:e2e
```

## Что покрыто тестами

### Backend

Заложены smoke/API tests для:

- входа пациента;
- входа врача;
- создания patient study;
- подписания consent;
- записи feedback;
- списка пациентов врача;
- карточки пациента;
- изменения доступа врача администратором;
- инициализации upload;
- completed/rejected анализа;
- генерации report;
- mock-уведомлений;
- healthcheck gateway.

### Front-end

Заложены:

- route/render test для role-based интерфейса;
- e2e smoke test на доступность login-экрана.

## Ограничения текущего skeleton

- Реальные БД-интеграции, миграции и persistence пока не реализованы.
- RabbitMQ и MinIO подняты как инфраструктура, но backend логика пока использует in-memory mock-реализации.
- Нет реального ML/AI-анализа снимков, только mock pipeline.
- Нет реальной SMS/email-интеграции, только stub-эндпоинты.
- Нет реальной оплаты, ЭЦП, МИС, 1С и телемедицины.
- Нет production-ready авторизации, refresh token flow, audit logging и полноценной RBAC-политики.

## Что можно развивать дальше

- перейти с in-memory состояния на Postgres + SQLAlchemy/Alembic;
- подключить реальный RabbitMQ consumer/publisher слой;
- вынести shared contracts в отдельный внутренний package;
- добавить nginx/reverse proxy;
- подключить object storage bucket initialization для MinIO;
- реализовать реальные file upload и PDF generation;
- расширить UI до полного сценария по схеме;
- добавить полноценные integration/e2e тесты для Docker stack.

## Дополнительные документы

- Архитектура: [docs/architecture.md](C:\Users\user\Desktop\x-raydent-platform\docs\architecture.md)
