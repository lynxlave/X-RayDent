import { useEffect, useState } from "react";
import { InfoCard } from "../../components/InfoCard";
import { adminApi } from "../../lib/api";

type DoctorAccess = { id: string; can_review: boolean };

export function AdminDashboard() {
  const [doctors, setDoctors] = useState<DoctorAccess[]>([]);

  useEffect(() => {
    adminApi.getDoctors().then(setDoctors);
  }, []);

  async function toggleAccess(doctor: DoctorAccess) {
    const updated = await adminApi.updateAccess(doctor.id, !doctor.can_review);
    setDoctors((current) => current.map((item) => (item.id === doctor.id ? updated : item)));
  }

  return (
    <div className="grid">
      <section className="card hero">
        <span className="badge">Администратор</span>
        <h1>Управление клиникой</h1>
        <p className="muted">Включение и отключение доступа врачам, дальнейшие ЭЦП/МИС интеграции оставлены как extension points.</p>
      </section>
      <InfoCard title="Доступы врачей">
        <ul className="list">
          {doctors.map((doctor) => (
            <li key={doctor.id} className="card">
              <strong>{doctor.id}</strong>
              <p className="muted">Доступ к заключениям: {doctor.can_review ? "включен" : "отключен"}</p>
              <button className="button" onClick={() => toggleAccess(doctor)}>
                Переключить доступ
              </button>
            </li>
          ))}
        </ul>
      </InfoCard>
    </div>
  );
}
