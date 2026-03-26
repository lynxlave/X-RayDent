import { Link } from "react-router-dom";

const roles = [
  { key: "patient", image: "/images/patient_icon.png", title: "Я пациент" },
  { key: "doctor", image: "/images/dentist_icon.png", title: "Я врач" },
  { key: "clinic", image: "/images/clinic_icon.png", title: "Я клиника" },
] as const;

export function HomePage() {
  return (
    <section className="selector-layout">
      <div className="selector-hero">
        <span className="badge">Х-РайДент</span>
        <h1>Вход в систему</h1>
        <p className="selector-description">
          Выберите роль, чтобы перейти к нужному сценарию входа.
        </p>
      </div>
      <section className="role-grid" aria-label="Выбор роли">
        {roles.map((role) => (
          <Link key={role.key} to={`/login/${role.key}`} className="role-tile">
            <img className="role-image" src={role.image} alt={`${role.title} icon`} />
            <div className="role-label">{role.title}</div>
          </Link>
        ))}
      </section>
    </section>
  );
}
