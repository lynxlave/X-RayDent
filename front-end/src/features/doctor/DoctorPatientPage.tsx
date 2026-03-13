import { FormEvent, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { doctorApi } from "../../lib/api";
import { useSessionStore } from "../../lib/store";

type PatientStudy = {
  id: string;
  file_name: string;
  uploaded_at: string;
  processed_at?: string | null;
};

type PatientCard = {
  patient: {
    id: string;
    full_name: string;
    birth_date: string;
    phone: string;
    email?: string | null;
  };
  studies: PatientStudy[];
  reports: Array<{ id: string; summary: string }>;
  comments: Array<{ id: string; author_name: string; comment: string; created_at: string; recommendation?: string | null }>;
};

function formatBirthDate(value: string) {
  if (!value) return "Дата рождения не указана";
  return new Date(value).toLocaleDateString("ru-RU");
}

function formatStudyDate(value?: string | null) {
  if (!value) return "Еще не зафиксировано";
  return new Date(value).toLocaleString("ru-RU");
}

function buildDownloadUrl(fileName: string) {
  const blob = new Blob([`Файл ОПТГ: ${fileName}`], { type: "text/plain;charset=utf-8" });
  return URL.createObjectURL(blob);
}

export function DoctorPatientPage() {
  const navigate = useNavigate();
  const session = useSessionStore((state) => state.session);
  const { patientId } = useParams();
  const [card, setCard] = useState<PatientCard | null>(null);
  const [commentDraft, setCommentDraft] = useState("");
  const [commentSaved, setCommentSaved] = useState("");
  const [commentError, setCommentError] = useState("");
  const [feedbackDraft, setFeedbackDraft] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  useEffect(() => {
    if (!patientId) return;
    doctorApi.getPatientCard(patientId).then(setCard).catch(() => setCard(null));
  }, [patientId]);

  useEffect(() => {
    return () => {
      document.querySelectorAll<HTMLAnchorElement>("[data-study-download]").forEach((link) => {
        if (link.href.startsWith("blob:")) {
          URL.revokeObjectURL(link.href);
        }
      });
    };
  }, []);

  const studiesWithDownloads = useMemo(
    () =>
      (card?.studies ?? []).map((study) => ({
        ...study,
        occurredAt: study.processed_at || study.uploaded_at,
        downloadUrl: buildDownloadUrl(study.file_name),
      })),
    [card?.studies],
  );

  if (session?.role !== "doctor") {
    return <Navigate to="/" replace />;
  }

  if (!card) {
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

  async function saveComment(event: FormEvent) {
    event.preventDefault();
    const text = commentDraft.trim();
    if (!text || !patientId) return;

    try {
      const latestStudyId = card.studies[0]?.id ?? null;
      const saved = await doctorApi.addComment(patientId, session.full_name || "Врач", text, latestStudyId);
      setCard((current) =>
        current
          ? {
              ...current,
              comments: [
                {
                  id: saved.id ?? `comment-${Date.now()}`,
                  author_name: saved.author_name,
                  comment: saved.comment,
                  created_at: saved.created_at,
                },
                ...current.comments,
              ],
            }
          : current,
      );
      setCommentDraft("");
      setCommentSaved("Комментарий сохранен.");
      setCommentError("");
    } catch (caughtError) {
      setCommentError(caughtError instanceof Error ? caughtError.message : "Не удалось сохранить комментарий.");
      setCommentSaved("");
    }
  }

  async function sendFeedback(event: FormEvent) {
    event.preventDefault();
    const text = feedbackDraft.trim();
    if (!text || !patientId) {
      return;
    }

    try {
      const result = await doctorApi.leaveFeedback(patientId, text);
      setFeedbackDraft("");
      setFeedbackSuccess(result.message);
      setFeedbackError("");
    } catch (caughtError) {
      setFeedbackError(caughtError instanceof Error ? caughtError.message : "Не удалось отправить обратную связь.");
      setFeedbackSuccess("");
    }
  }

  return (
    <div className="grid">
      <section className="card hero">
        <span className="badge">Пациент</span>
        <h1>{card.patient.full_name}</h1>
      </section>

      <section className="card">
        <div className="grid columns-2">
          <div>
            <strong>Дата рождения</strong>
            <p className="muted">{formatBirthDate(card.patient.birth_date)}</p>
          </div>
          <div>
            <strong>Телефон</strong>
            <p className="muted">{card.patient.phone}</p>
          </div>
          <div>
            <strong>Почта</strong>
            <p className="muted">{card.patient.email || "Не указана"}</p>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="section-header">
          <div className="section-heading">
            <h3>История ОПТГ</h3>
            <p className="muted">Последний файл слева, остальные доступны в горизонтальной ленте.</p>
          </div>
        </div>

        {studiesWithDownloads.length ? (
          <div className="study-history-row">
            {studiesWithDownloads.map((study) => (
              <article key={study.id} className="study-history-card">
                <a
                  className="study-download-link"
                  href={study.downloadUrl}
                  download={study.file_name}
                  data-study-download="true"
                >
                  Скачать
                </a>
                <strong className="study-history-title">{study.file_name}</strong>
                <p className="muted study-history-date">{formatStudyDate(study.occurredAt)}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="muted">Файлы ОПТГ пока не загружены.</p>
        )}
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
              setCommentError("");
            }}
            placeholder="Оставьте комментарий по пациенту"
          />
          <button type="submit" className="button">
            Сохранить комментарий
          </button>
          {commentSaved ? <div className="form-success">{commentSaved}</div> : null}
          {commentError ? <div className="form-error">{commentError}</div> : null}
        </form>

        <div className="comment-list">
          {card.comments.length ? (
            card.comments.map((comment) => (
              <article key={comment.id} className="comment-item">
                <strong>{comment.author_name}</strong>
                <p className="muted">{new Date(comment.created_at).toLocaleString("ru-RU")}</p>
                <p className="muted">{comment.comment}</p>
              </article>
            ))
          ) : (
            <p className="muted">Комментариев пока нет.</p>
          )}
        </div>
      </section>

      <section className="card">
        <h3>Обратная связь</h3>
        <form className="form" onSubmit={sendFeedback}>
          <textarea
            className="textarea"
            rows={4}
            value={feedbackDraft}
            onChange={(event) => {
              setFeedbackDraft(event.target.value);
              setFeedbackSuccess("");
              setFeedbackError("");
            }}
            placeholder="Оставьте обратную связь"
          />
          <button type="submit" className="button">
            Отправить обратную связь
          </button>
          {feedbackSuccess ? <div className="form-success">{feedbackSuccess}</div> : null}
          {feedbackError ? <div className="form-error">{feedbackError}</div> : null}
        </form>
      </section>

      <button type="button" className="button secondary" onClick={() => navigate("/")}>
        Назад к списку
      </button>
    </div>
  );
}
