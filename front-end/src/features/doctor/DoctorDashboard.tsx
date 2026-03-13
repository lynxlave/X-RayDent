import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctorApi, studiesApi } from "../../lib/api";
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

function formatBirthDate(value: string) {
  if (!value) {
    return "Дата рождения не указана";
  }
  return new Date(value).toLocaleDateString("ru-RU");
}

export function DoctorDashboard() {
  const navigate = useNavigate();
  const session = useSessionStore((state) => state.session);
  const [patients, setPatients] = useState<DoctorPatientRecord[]>([]);
  const [search, setSearch] = useState("");
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<DoctorPatientRecord | null>(null);
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("+7");
  const [file, setFile] = useState<File | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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

  async function registerPatient(event: FormEvent) {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!fullName.trim()) {
      setFormError("Введите ФИО пациента.");
      return;
    }
    if (!birthDate) {
      setFormError("Укажите дату рождения пациента.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 11) {
      setFormError("Введите номер телефона пациента.");
      return;
    }
    if (!file) {
      setFormError("Загрузите ортопантомограмму.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await studiesApi.process(file.name, []);
      const nextPatient: DoctorPatientRecord = {
        id: `patient-${Date.now()}`,
        fullName: fullName.trim(),
        birthDate,
        phone,
        status: result.analysis.result.status === "rejected" ? "Снимок отклонен" : "Снимок загружен",
        studyFileName: file.name,
      };
      setPatients((current) => {
        const nextPatients = [nextPatient, ...current];
        saveDoctorPatients(nextPatients);
        return nextPatients;
      });
      setFullName("");
      setBirthDate("");
      setPhone("+7");
      setFile(null);
      setFormSuccess("Пациент зарегистрирован, ортопантомограмма загружена.");
      setIsNewPatientOpen(false);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Не удалось зарегистрировать пациента.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function uploadPatientStudy(event: FormEvent) {
    event.preventDefault();
    if (!selectedPatient) {
      return;
    }
    setUploadError("");
    setUploadSuccess("");

    if (!uploadFile) {
      setUploadError("Выберите снимок для загрузки.");
      return;
    }

    setIsUploading(true);
    try {
      const result = await studiesApi.process(uploadFile.name, []);
      setPatients((current) => {
        const nextPatients = current.map((patient) =>
          patient.id === selectedPatient.id
            ? {
                ...patient,
                studyFileName: uploadFile.name,
                status: result.analysis.result.status === "rejected" ? "Снимок отклонен" : "Снимок загружен",
              }
            : patient,
        );
        saveDoctorPatients(nextPatients);
        return nextPatients;
      });
      setUploadSuccess("Снимок загружен.");
      setUploadFile(null);
      setIsUploadOpen(false);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Не удалось загрузить снимок.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="grid">
      <section className="card hero">
        <span className="badge">{doctorBadge}</span>
        <h1>{doctorTitle}</h1>
      </section>

      <section className="card">
        <div className="section-header">
          <div className="section-heading">
            <h3>Список пациентов</h3>
            <p className="muted">Поиск по ФИО</p>
          </div>
          <button
            type="button"
            className="button"
            onClick={() => {
              setFormError("");
              setFormSuccess("");
              setIsNewPatientOpen(true);
            }}
          >
            Новый пациент
          </button>
        </div>

        <input
          className="input"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Поиск по ФИО"
        />

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
                    onClick={() => {
                      setSelectedPatient(patient);
                      setUploadFile(null);
                      setUploadError("");
                      setUploadSuccess("");
                      setIsUploadOpen(true);
                    }}
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
              <button
                type="button"
                className="icon-button"
                aria-label="Закрыть"
                onClick={() => setIsNewPatientOpen(false)}
              >
                <span className="modal-close" aria-hidden="true">
                  ×
                </span>
              </button>
            </div>

            <form className="form" onSubmit={registerPatient}>
              <input
                className="input"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="ФИО пациента"
              />
              <input className="input" type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} />
              <input
                className="input"
                value={phone}
                onChange={(event) => setPhone(formatPatientPhone(event.target.value))}
                placeholder="Номер телефона"
              />
              <label className="upload-field">
                <span className="upload-label">{file ? file.name : "Загрузить ортопантомограмму"}</span>
                <input
                  className="upload-input"
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp,.pdf"
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                />
              </label>
              <button className="button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Сохранение..." : "Зарегистрировать пациента"}
              </button>
              {formError ? <div className="form-error">{formError}</div> : null}
              {formSuccess ? <div className="form-success">{formSuccess}</div> : null}
            </form>
          </section>
        </div>
      ) : null}

      {isUploadOpen && selectedPatient ? (
        <div className="modal-backdrop" onClick={() => setIsUploadOpen(false)}>
          <section className="settings-modal" onClick={(event) => event.stopPropagation()}>
            <div className="settings-header">
              <h2>Загрузить снимок</h2>
              <button
                type="button"
                className="icon-button"
                aria-label="Закрыть"
                onClick={() => setIsUploadOpen(false)}
              >
                <span className="modal-close" aria-hidden="true">
                  ×
                </span>
              </button>
            </div>

            <p className="muted">{selectedPatient.fullName}</p>
            <form className="form" onSubmit={uploadPatientStudy}>
              <label className="upload-field">
                <span className="upload-label">{uploadFile ? uploadFile.name : "Выбрать снимок"}</span>
                <input
                  className="upload-input"
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp,.pdf"
                  onChange={(event) => setUploadFile(event.target.files?.[0] ?? null)}
                />
              </label>
              <button className="button" type="submit" disabled={isUploading}>
                {isUploading ? "Загрузка..." : "Загрузить снимок"}
              </button>
              {uploadError ? <div className="form-error">{uploadError}</div> : null}
              {uploadSuccess ? <div className="form-success">{uploadSuccess}</div> : null}
            </form>
          </section>
        </div>
      ) : null}
    </div>
  );
}
