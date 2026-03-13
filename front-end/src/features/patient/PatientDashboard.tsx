import { useEffect, useState } from "react";
import { InfoCard } from "../../components/InfoCard";
import { patientApi, studiesApi } from "../../lib/api";
import type { Complaint, Study } from "../../lib/types";

export function PatientDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaints, setSelectedComplaints] = useState<string[]>(["pain"]);
  const [studies, setStudies] = useState<Study[]>([]);
  const [uploadName, setUploadName] = useState("patient-panorama.png");
  const [resultStatus, setResultStatus] = useState("pending");

  useEffect(() => {
    patientApi.getComplaints().then(setComplaints);
    patientApi.getStudies().then(setStudies);
  }, []);

  async function processStudy() {
    const response = await studiesApi.process(uploadName, selectedComplaints);
    setStudies((current) => [response.study, ...current]);
    setResultStatus(response.analysis.result.status);
  }

  return (
    <div className="grid">
      <section className="card hero">
        <span className="badge">Пациент</span>
        <h1>Личный кабинет пациента</h1>
        <p className="muted">Настройки, история снимков, новый кейс, обратная связь и дополнительные сервисы.</p>
      </section>
      <div className="grid columns-2">
        <InfoCard title="Новый снимок" subtitle="Жалобы, согласие, загрузка и получение заключения">
          <div className="form">
            <select
              className="select"
              value={selectedComplaints[0] ?? ""}
              onChange={(event) => setSelectedComplaints([event.target.value])}
            >
              {complaints.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>
            <input className="input" value={uploadName} onChange={(event) => setUploadName(event.target.value)} />
            <button className="button" onClick={processStudy}>
              Обработать снимок
            </button>
            <span className={`badge ${resultStatus === "rejected" ? "warning" : ""}`}>Статус: {resultStatus}</span>
          </div>
        </InfoCard>
        <InfoCard title="Сервисные разделы" subtitle="Части схемы, которые остаются в MVP как skeleton">
          <ul className="list">
            <li>FAQ и бот ответов на частые вопросы</li>
            <li>Техподдержка по почте и телефону</li>
            <li className="promo">Телемедицина с экспертом: точка расширения, без оплаты в MVP</li>
          </ul>
        </InfoCard>
      </div>
      <InfoCard title="История снимков" subtitle="Последние кейсы и статусы анализа">
        <ul className="list">
          {studies.map((study) => (
            <li key={study.id} className="card">
              <strong>{study.id}</strong>
              <div className="muted">Жалобы: {study.complaint_codes.join(", ") || "не указаны"}</div>
              <span className={`badge ${study.status === "rejected" ? "warning" : ""}`}>{study.status}</span>
            </li>
          ))}
        </ul>
      </InfoCard>
    </div>
  );
}
