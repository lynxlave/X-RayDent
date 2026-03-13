import { FormEvent, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { doctorApi, studiesApi } from "../../lib/api";
import { useSessionStore } from "../../lib/store";
import type { Report } from "../../lib/types";

type IntakeLocationState = {
  fullName?: string;
  phone?: string;
};

const complaintOptions = [
  "на верхней челюсти справа",
  "на верхней челюсти слева",
  "на нижней челюсти справа",
  "на нижней челюсти слева",
  "нет жалоб",
  "просто диагностика",
];

function formatPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, "");
  const normalized = digits.startsWith("7") ? digits.slice(1) : digits.startsWith("8") ? digits.slice(1) : digits;
  const limited = normalized.slice(0, 10);

  let result = "+7";
  if (limited.length > 0) result += ` (${limited.slice(0, 3)}`;
  if (limited.length >= 4) result += `) ${limited.slice(3, 6)}`;
  if (limited.length >= 7) result += `-${limited.slice(6, 8)}`;
  if (limited.length >= 9) result += `-${limited.slice(8, 10)}`;
  return result;
}

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const normalized = digits.startsWith("7") ? digits : `7${digits.startsWith("8") ? digits.slice(1) : digits}`;
  return `+${normalized.slice(0, 11)}`;
}

function createPdfUrl(report: Report) {
  const content = `%PDF-1.1
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << >> >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT /F1 18 Tf 72 760 Td (${report.summary}) Tj ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000062 00000 n 
0000000119 00000 n 
0000000222 00000 n 
trailer << /Root 1 0 R /Size 5 >>
startxref
316
%%EOF`;
  return URL.createObjectURL(new Blob([content], { type: "application/pdf" }));
}

export function DoctorStudyFlowPage() {
  const location = useLocation();
  const session = useSessionStore((state) => state.session);
  const { patientId } = useParams();
  const intakeState = (location.state as IntakeLocationState | null) ?? null;
  const [patientName, setPatientName] = useState(intakeState?.fullName || "");
  const [phone, setPhone] = useState(intakeState?.phone ?? "+7");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);
  const [complaints, setComplaints] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [resultStatus, setResultStatus] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    if (!patientId) return;
    doctorApi
      .getPatientCard(patientId)
      .then((card) => {
        setPatientName(card.patient.full_name);
        setPhone(card.patient.phone || intakeState?.phone || "+7");
      })
      .catch(() => {
        setPatientName(intakeState?.fullName || "");
      });
  }, [intakeState?.fullName, intakeState?.phone, patientId]);

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  if (session?.role !== "doctor" || !patientId) {
    return <Navigate to="/" replace />;
  }

  function toggleComplaint(value: string) {
    setComplaints((current) => {
      if (value === "нет жалоб" || value === "просто диагностика") {
        return current.includes(value) ? [] : [value];
      }
      const next = current.filter((item) => item !== "нет жалоб" && item !== "просто диагностика");
      return next.includes(value) ? next.filter((item) => item !== value) : [...next, value];
    });
    setError("");
  }

  async function sendCode() {
    setError("");
    if (normalizePhone(phone).length < 12) {
      setError("Введите корректный номер телефона.");
      return;
    }
    await new Promise((resolve) => window.setTimeout(resolve, 300));
    setCodeSent(true);
  }

  function verifyCode(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (code !== "0000") {
      setError("Неверный код. Используйте заглушку 0000.");
      return;
    }
    setCodeVerified(true);
  }

  async function processStudy(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!complaints.length) {
      setError("Выберите жалобы пациента или вариант диагностики.");
      return;
    }
    if (!file) {
      setError("Загрузите файл ОПТГ.");
      return;
    }

    setIsProcessing(true);
    setResultStatus("");
    setReport(null);

    try {
      await doctorApi.recordStudyEvent(patientId, {
        file_name: file.name,
        event: "uploaded",
      });

      await new Promise((resolve) => window.setTimeout(resolve, 1500));

      const result = await studiesApi.process(file.name, complaints);

      await doctorApi.recordStudyEvent(patientId, {
        file_name: file.name,
        event: "processed",
      });

      setResultStatus(result.analysis.result.status === "rejected" ? "Снимок отклонен" : "Снимок обработан");
      setReport(result.report.report);
      setPdfUrl(createPdfUrl(result.report.report));
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Не удалось обработать снимок.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="grid">
      <section className="card hero">
        <span className="badge">Загрузка снимка</span>
        <h1>{patientName || "Карточка пациента"}</h1>
      </section>

      <section className="card flow-card">
        <div className="flow-step">
          <h3>1. Номер телефона</h3>
          <div className="flow-row">
            <input
              className="input"
              value={phone}
              onChange={(event) => setPhone(formatPhoneInput(event.target.value))}
              placeholder="Номер телефона"
            />
            <button type="button" className="button" onClick={sendCode}>
              Отправить код
            </button>
          </div>
        </div>

        {codeSent ? (
          <form className="flow-step" onSubmit={verifyCode}>
            <h3>2. Подтверждение кода</h3>
            <div className="flow-row">
              <input
                className="input"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Введите код 0000"
              />
              <button type="submit" className="button">
                Подтвердить код
              </button>
            </div>
          </form>
        ) : null}

        {codeVerified ? (
          <form className="flow-step" onSubmit={processStudy}>
            <div className="flow-step">
              <h3>3. Жалобы</h3>
              <div className="complaints-block">
                <p className="muted">Напишите, пожалуйста, жалобы:</p>
                <div className="complaints-grid">
                  {complaintOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`complaint-option ${complaints.includes(option) ? "active" : ""}`}
                      onClick={() => toggleComplaint(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flow-step upload-step">
              <h3>4. ОПТГ</h3>
              <label className="upload-panel">
                <input
                  className="upload-input-hidden"
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp,.pdf"
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                />
                <span className="upload-panel-icon" aria-hidden="true">
                  +
                </span>
                <span className="upload-panel-title">{file ? "Файл выбран" : "Загрузите файл ОПТГ"}</span>
                <span className="upload-panel-subtitle">
                  {file ? file.name : "Поддерживаются PNG, JPG, WEBP и PDF"}
                </span>
              </label>
            </div>

            <button type="submit" className="button" disabled={isProcessing}>
              {isProcessing ? "Обработка..." : "Обработать и получить заключение"}
            </button>
          </form>
        ) : null}

        {error ? <div className="form-error">{error}</div> : null}

        {isProcessing ? (
          <section className="flow-step">
            <h3>Обработка</h3>
            <p className="muted">Симуляция обработки снимка...</p>
            <div className="progress-bar">
              <span className="progress-bar-fill" />
            </div>
          </section>
        ) : null}

        {report ? (
          <section className="flow-step">
            <h3>Результат</h3>
            <p>
              <strong>Статус:</strong> {resultStatus}
            </p>
            <p>
              <strong>Заключение:</strong> {report.summary}
            </p>
            <p>
              <strong>Рекомендации:</strong> {report.recommendations.join(", ")}
            </p>
            {pdfUrl ? (
              <a className="button flow-pdf-button" href={pdfUrl} download="report.pdf">
                Скачать PDF
              </a>
            ) : null}
          </section>
        ) : null}
      </section>

      <div className="flow-footer">
        <Link className="button secondary" to="/">
          Назад к списку
        </Link>
      </div>
    </div>
  );
}
