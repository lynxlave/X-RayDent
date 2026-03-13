# Архитектура X-РайДент

## Backend services

- `api-gateway`: единая точка входа для фронтенда и orchestration happy-path сценариев.
- `auth-service`: вход пациента по телефону и коду, вход врача и администратора по логину и паролю.
- `patient-service`: профиль, жалобы, кейсы, согласия, история исследований, обратная связь.
- `doctor-service`: список пациентов, карточка пациента, комментарии и просмотр заключений.
- `clinic-admin-service`: управление доступом врачей и данными клиники.
- `imaging-service`: инициализация загрузки и формирование `study.uploaded`.
- `analysis-service`: mock-анализ и маршрутизация статусов `completed/rejected`.
- `report-service`: генерация заключений, PDF-ссылок и `report.ready`.
- `notification-service`: mock SMS/email с журналом сообщений.

## Event flow

1. Пациент или врач создает кейс.
2. `imaging-service` выдает presigned URL и публикует `study.uploaded`.
3. `analysis-service` формирует mock-результат и публикует `analysis.completed` или `analysis.rejected`.
4. `report-service` создает заключение, PDF-ссылку и публикует `report.ready`.
5. `notification-service` является точкой расширения для SMS/email.

## Front-end

Один SPA на React + Vite содержит role-based разделы для пациента, врача и администратора. UI отражает основную схему: вход, работа со снимками, история, сервисные разделы и управление доступами.

## Landing

`landing/` поднимается отдельно от прикладного SPA и содержит промо-сайт, перенесенный из `G:\X-РайДент`. Он запускается как самостоятельный Vite-сервис в Compose на `http://localhost:4174`.
