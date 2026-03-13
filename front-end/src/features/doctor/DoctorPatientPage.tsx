import { FormEvent, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSessionStore } from "../../lib/store";
import { loadDoctorPatients, updateDoctorPatient } from "./patientRegistry";

function formatBirthDate(value: string) {
  if (!value) {
    return "Дата рождения не указана";
  }
  return new Date(value).toLocaleDateString("ru-RU");
}

export function DoctorPatientPage() {
  const navigate = useNavigate();
  const session = useSessionStore((state) => state.session);
  const { patientId } = useParams();
  const [commentDraft, setCommentDraft] = useState("");
  const [commentSaved, setCommentSaved] = useState("");
  const patient = loadDoctorPatients().find((item) => item.id === patientId);

  if (session?.role !== "doctor") {
    return <Navigate to="/" replace />;
  }

  if (!patient) {
    return (
      <div className="grid">
        <section className="card hero">
          <span className="badge">Пациент</span>
          <h1>Пациент не найден</h1>
        </section>
        <button type="button" className="button secondary" onClick={() => navigate("/")}>
          Назад к списку
        </button>
      </div>
    );
  }

  function saveComment(event: FormEvent) {
    event.preventDefault();
    const text = commentDraft.trim();
    if (!text) {
      return;
    }
    updateDoctorPatient(patient.id, (current) => ({
      ...current,
      comments: [...(current.comments ?? []), text],
    }));
    setCommentDraft("");
    setCommentSaved("Комментарий сохранен.");
  }

  const nextPatient = loadDoctorPatients().find((item) => item.id === patientId) ?? patient;

  return (
    <div className="grid">
      <section className="card hero">
        <span className="badge">Пациент</span>
        <h1>{nextPatient.fullName}</h1>
      </section>

      <section className="card">
        <div className="grid">
          <div>
            <strong>Дата рождения</strong>
            <p className="muted">{formatBirthDate(nextPatient.birthDate)}</p>
          </div>
          <div>
            <strong>Телефон</strong>
            <p className="muted">{nextPatient.phone}</p>
          </div>
          <div>
            <strong>Статус</strong>
            <p className="muted">{nextPatient.status}</p>
          </div>
          <div>
            <strong>Ортопантомограмма</strong>
            <p className="muted">{nextPatient.studyFileName || "Файл не загружен"}</p>
          </div>
        </div>
      </section>

      <section className="card">
        <h3>Комментарии врача</h3>
        <form className="form" onSubmit={saveComment}>
          <textarea
            className="textarea"
            rows={4}
            value={commentDraft}
            onChange={(event) => {
              setCommentDraft(event.target.value);
              setCommentSaved("");
            }}
            placeholder="Оставьте комментарий по пациенту"
          />
          <button type="submit" className="button">
            Сохранить комментарий
          </button>
          {commentSaved ? <div className="form-success">{commentSaved}</div> : null}
        </form>

        <div className="comment-list">
          {(nextPatient.comments ?? []).length ? (
            [...(nextPatient.comments ?? [])].reverse().map((comment, index) => (
              <article key={`${index}-${comment}`} className="comment-item">
                {comment}
              </article>
            ))
          ) : (
            <p className="muted">Комментариев пока нет.</p>
          )}
        </div>
      </section>

      <button type="button" className="button secondary" onClick={() => navigate("/")}>
        Назад к списку
      </button>
    </div>
  );
}
