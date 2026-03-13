import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctorApi } from "../../lib/api";
import { useSessionStore } from "../../lib/store";
import type { DoctorSpecialty } from "../../lib/types";
import { loadDoctorPatients, saveDoctorPatients, type DoctorPatientRecord } from "./patientRegistry";

const specialtyLabels: Record<DoctorSpecialty, string> = {
  "stomatolog-terapevt": "стоматолог-терапевт",
  "stomatolog-ortoped": "стоматолог-ортопед",
  "stomatolog-hirurg": "стоматолог-хирург",
  "stomatolog-ortodont": "стоматолог-ортодонт",
  "chelyustno-litsevoy-hirurg": "челюстно-лицевой хирург",
};

function formatBirthDate(value: string) {
  if (!value) {
    return "Дата рождения не указана";
  }
  return new Date(value).toLocaleDateString("ru-RU");
}

function formatPatientPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  const normalized = digits.startsWith("7") ? digits.slice(1) : digits.startsWith("8") ? digits.slice(1) : digits;
  const limited = normalized.slice(0, 10);

  let result = "+7";
  if (limited.length > 0) {
    result += ` (${limited.slice(0, 3)}`;
  }
  if (limited.length >= 4) {
    result += `) ${limited.slice(3, 6)}`;
  }
  if (limited.length >= 7) {
    result += `-${limited.slice(6, 8)}`;
  }
  if (limited.length >= 9) {
    result += `-${limited.slice(8, 10)}`;
  }
  return result;
}

export function DoctorDashboard() {
  const navigate = useNavigate();
  const session = useSessionStore((state) => state.session);
  const [patients, setPatients] = useState<DoctorPatientRecord[]>([]);
  const [search, setSearch] = useState("");
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);
  const [newPatientLastName, setNewPatientLastName] = useState("");
  const [newPatientFirstName, setNewPatientFirstName] = useState("");
  const [newPatientMiddleName, setNewPatientMiddleName] = useState("");
  const [newPatientBirthDate, setNewPatientBirthDate] = useState("");
  const [newPatientPhone, setNewPatientPhone] = useState("+7");
  const [newPatientError, setNewPatientError] = useState("");
  const [isCreatingPatient, setIsCreatingPatient] = useState(false);

  const doctorBadge = `Врач-${session?.specialty ? specialtyLabels[session.specialty] : "специалист"}`;
  const doctorTitle = session?.full_name || "Кабинет врача";

  useEffect(() => {
    const storedPatients = loadDoctorPatients();
    doctorApi.getPatients().then((items) => {
      const mappedPatients = items.map((patient) => ({
        id: patient.id,
        fullName: patient.full_name,
        birthDate: patient.birth_date,
        phone: patient.phone,
        status:
          patient.status === "completed"
            ? "Готово"
            : patient.status === "processing"
              ? "В обработке"
              : patient.status === "rejected"
                ? "Снимок отклонен"
                : "Активен",
        studyFileName: null,
        comments:
          patient.id === "patient-1"
            ? ["Контрольный осмотр через 6 месяцев."]
            : patient.id === "patient-2"
              ? ["Нужно дождаться завершения анализа снимка."]
              : patient.id === "patient-3"
                ? ["Рекомендована повторная загрузка снимка лучшего качества."]
                : patient.id === "patient-4"
                  ? ["Динамика стабильная, жалоб на текущий момент нет."]
                  : [],
      }));
      const mergedPatients = [
        ...storedPatients,
        ...mappedPatients.filter((patient) => !storedPatients.some((stored) => stored.id === patient.id)),
      ];
      setPatients(mergedPatients);
      saveDoctorPatients(mergedPatients);
    });
  }, []);

  const filteredPatients = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) {
      return patients;
    }
    return patients.filter((patient) => patient.fullName.toLowerCase().includes(normalizedSearch));
  }, [patients, search]);

  function openNewPatientModal() {
    setNewPatientLastName("");
    setNewPatientFirstName("");
    setNewPatientMiddleName("");
    setNewPatientBirthDate("");
    setNewPatientPhone("+7");
    setNewPatientError("");
    setIsNewPatientOpen(true);
  }

  async function startNewPatientFlow(event: FormEvent) {
    event.preventDefault();
    if (!newPatientLastName.trim()) {
      setNewPatientError("Введите фамилию пациента.");
      return;
    }
    if (!newPatientFirstName.trim()) {
      setNewPatientError("Введите имя пациента.");
      return;
    }
    if (!newPatientBirthDate) {
      setNewPatientError("Укажите дату рождения пациента.");
      return;
    }
    if (newPatientPhone.replace(/\D/g, "").length < 11) {
      setNewPatientError("Введите номер телефона пациента.");
      return;
    }

    const fullName = [newPatientLastName.trim(), newPatientFirstName.trim(), newPatientMiddleName.trim()].filter(Boolean).join(" ");

    setIsCreatingPatient(true);
    setNewPatientError("");

    try {
      const createdPatient = await doctorApi.createPatient({
        full_name: fullName,
        birth_date: newPatientBirthDate,
        phone: newPatientPhone,
      });

      const nextPatient: DoctorPatientRecord = {
        id: createdPatient.id,
        fullName: createdPatient.full_name,
        birthDate: createdPatient.birth_date,
        phone: createdPatient.phone,
        status:
          createdPatient.status === "completed"
            ? "Готово"
            : createdPatient.status === "processing"
              ? "В обработке"
              : createdPatient.status === "rejected"
                ? "Снимок отклонен"
                : "Активен",
        studyFileName: null,
        comments: [],
      };

      const nextPatients = [nextPatient, ...patients];
      setPatients(nextPatients);
      saveDoctorPatients(nextPatients);
      setIsNewPatientOpen(false);
      navigate(`/doctor/intake/${createdPatient.id}`);
    } catch (caughtError) {
      setNewPatientError(caughtError instanceof Error ? caughtError.message : "Не удалось сохранить пациента.");
    } finally {
      setIsCreatingPatient(false);
    }
  }

  return (
    <div className="grid">
      <section className="card hero">
        <span className="badge">{doctorBadge}</span>
        <h1>{doctorTitle}</h1>
      </section>

      <section className="card patient-list-card">
        <div className="section-header">
          <div className="section-heading">
            <h3>Список пациентов</h3>
            <p className="muted">Поиск по ФИО</p>
          </div>
          <button type="button" className="button" onClick={openNewPatientModal}>
            Новый пациент
          </button>
        </div>

        <input className="input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Поиск по ФИО" />

        <div className="stack-list">
          {filteredPatients.length ? (
            filteredPatients.map((patient) => (
              <article key={patient.id} className="stack-list-item">
                <div className="stack-list-main">
                  <strong>{patient.fullName}</strong>
                  <span className="muted">{formatBirthDate(patient.birthDate)}</span>
                </div>
                <div className="patient-comment">
                  <span className="muted patient-comment-label">Последний комментарий</span>
                  <span>{patient.comments?.length ? patient.comments[patient.comments.length - 1] : "Комментариев пока нет"}</span>
                </div>
                <div className="patient-actions">
                  <button
                    type="button"
                    className="button secondary patient-action-button"
                    onClick={() => navigate(`/doctor/patients/${patient.id}`)}
                  >
                    История
                  </button>
                  <button
                    type="button"
                    className="button patient-action-button"
                    onClick={() => navigate(`/doctor/intake/${patient.id}`)}
                  >
                    Загрузить снимок
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="muted">Пациенты не найдены.</p>
          )}
        </div>
      </section>

      {isNewPatientOpen ? (
        <div className="modal-backdrop" onClick={() => setIsNewPatientOpen(false)}>
          <section className="settings-modal" onClick={(event) => event.stopPropagation()}>
            <div className="settings-header">
              <h2>Новый пациент</h2>
              <button type="button" className="icon-button" aria-label="Закрыть" onClick={() => setIsNewPatientOpen(false)}>
                <span className="modal-close" aria-hidden="true">
                  ×
                </span>
              </button>
            </div>

            <form className="form" onSubmit={startNewPatientFlow}>
              <label className="field-group">
                <span className="field-label">Фамилия *</span>
                <input
                  className="input"
                  value={newPatientLastName}
                  onChange={(event) => {
                    setNewPatientLastName(event.target.value);
                    setNewPatientError("");
                  }}
                  placeholder="Введите фамилию"
                />
              </label>
              <label className="field-group">
                <span className="field-label">Имя *</span>
                <input
                  className="input"
                  value={newPatientFirstName}
                  onChange={(event) => {
                    setNewPatientFirstName(event.target.value);
                    setNewPatientError("");
                  }}
                  placeholder="Введите имя"
                />
              </label>
              <label className="field-group">
                <span className="field-label">Отчество</span>
                <input
                  className="input"
                  value={newPatientMiddleName}
                  onChange={(event) => {
                    setNewPatientMiddleName(event.target.value);
                    setNewPatientError("");
                  }}
                  placeholder="Введите отчество при наличии"
                />
              </label>
              <label className="field-group">
                <span className="field-label">Дата рождения *</span>
                <input
                  className="input"
                  type="date"
                  value={newPatientBirthDate}
                  onChange={(event) => {
                    setNewPatientBirthDate(event.target.value);
                    setNewPatientError("");
                  }}
                />
              </label>
              <label className="field-group">
                <span className="field-label">Номер телефона *</span>
                <input
                  className="input"
                  value={newPatientPhone}
                  onChange={(event) => {
                    setNewPatientPhone(formatPatientPhone(event.target.value));
                    setNewPatientError("");
                  }}
                  placeholder="+7 (___) ___-__-__"
                />
              </label>
              <p className="muted form-hint">Поля, отмеченные *, обязательны. Отчество заполняется при наличии.</p>
              <button type="submit" className="button" disabled={isCreatingPatient}>
                {isCreatingPatient ? "Сохраняем..." : "Продолжить"}
              </button>
              {newPatientError ? <div className="form-error">{newPatientError}</div> : null}
            </form>
          </section>
        </div>
      ) : null}
    </div>
  );
}
