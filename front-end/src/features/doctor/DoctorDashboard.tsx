import { useEffect, useState } from "react";
import { InfoCard } from "../../components/InfoCard";
import { doctorApi } from "../../lib/api";

type PatientCard = {
  patient: { id: string };
  studies: Array<{ id: string; status: string }>;
  reports: Array<{ id: string; summary: string }>;
};

export function DoctorDashboard() {
  const [patients, setPatients] = useState<Array<{ id: string }>>([]);
  const [selectedPatient, setSelectedPatient] = useState("patient-1");
  const [patientCard, setPatientCard] = useState<PatientCard | null>(null);
  const [comment, setComment] = useState("Наблюдать динамику");

  useEffect(() => {
    doctorApi.getPatients().then(setPatients);
    doctorApi.getPatientCard(selectedPatient).then(setPatientCard);
  }, [selectedPatient]);

  async function saveComment() {
    if (!patientCard?.studies[0]) {
      return;
    }
    await doctorApi.addComment(selectedPatient, patientCard.studies[0].id, comment);
  }

  return (
    <div className="grid">
      <section className="card hero">
        <span className="badge">Врач</span>
        <h1>Кабинет врача</h1>
        <p className="muted">Список пациентов, карточка пациента, заключения, комментарии и диагностический маршрут.</p>
      </section>
      <div className="grid columns-2">
        <InfoCard title="Список пациентов">
          <select className="select" value={selectedPatient} onChange={(event) => setSelectedPatient(event.target.value)}>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.id}
              </option>
            ))}
          </select>
        </InfoCard>
        <InfoCard title="Комментарий врача" subtitle="Сохранение заключения и рекомендации">
          <textarea className="textarea" rows={4} value={comment} onChange={(event) => setComment(event.target.value)} />
          <button className="button" onClick={saveComment}>
            Сохранить комментарий
          </button>
        </InfoCard>
      </div>
      <InfoCard title="Карточка пациента">
        {patientCard ? (
          <div className="grid columns-2">
            <div>
              <h4>Снимки</h4>
              <ul className="list">
                {patientCard.studies.map((study) => (
                  <li key={study.id}>
                    {study.id} <span className={`badge ${study.status === "rejected" ? "warning" : ""}`}>{study.status}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Заключения</h4>
              <ul className="list">
                {patientCard.reports.map((report) => (
                  <li key={report.id}>{report.summary}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="muted">Загрузка...</p>
        )}
      </InfoCard>
    </div>
  );
}
