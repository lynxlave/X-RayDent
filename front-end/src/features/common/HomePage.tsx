import { Link, useLocation } from "react-router-dom";

const roles = [
  { key: "patient", image: "/images/patient_icon.png", title: "Я пациент" },
  { key: "doctor", image: "/images/dentist_icon.png", title: "Я врач" },
  { key: "clinic", image: "/images/clinic_icon.png", title: "Я клиника" },
] as const;

function getLandingUrl() {
  const { protocol, hostname } = window.location;
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";

  if (isLocalhost) {
    return `${protocol}//${hostname}:4174`;
  }

  return `${protocol}//${hostname.replace(/^app\./, "")}`;
}

export function HomePage() {
  const location = useLocation();
  const landingUrl = getLandingUrl();
  const showLoginOnly = location.hash === "#system-login";

  return (
    <div className="landing-login-page">
      {!showLoginOnly ? (
        <section className="landing-preview" aria-label="X-RayDent landing">
          <iframe
            title="X-RayDent landing"
            src={landingUrl}
            className="landing-preview-frame"
          />
        </section>
      ) : null}

      <section id="system-login" className="selector-layout">
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
    </div>
  );
}
