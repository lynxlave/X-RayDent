import { Link } from "react-router-dom";

const roles = [
  { key: "patient", image: "/images/patient_icon.png", title: "РЇ РїР°С†РёРµРЅС‚" },
  { key: "doctor", image: "/images/dentist_icon.png", title: "РЇ РІСЂР°С‡" },
  { key: "clinic", image: "/images/clinic_icon.png", title: "РЇ РєР»РёРЅРёРєР°" },
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
  const landingUrl = getLandingUrl();

  return (
    <div className="landing-login-page">
      <section className="landing-preview" aria-label="X-RayDent landing">
        <iframe
          title="X-RayDent landing"
          src={landingUrl}
          className="landing-preview-frame"
        />
      </section>

      <section id="system-login" className="selector-layout">
        <div className="selector-hero">
          <span className="badge">X-Р Р°Р№Р”РµРЅС‚</span>
          <h1>Р’С…РѕРґ РІ СЃРёСЃС‚РµРјСѓ</h1>
          <p className="selector-description">
            Р’С‹Р±РµСЂРёС‚Рµ СЂРѕР»СЊ, С‡С‚РѕР±С‹ РїРµСЂРµР№С‚Рё Рє РЅСѓР¶РЅРѕРјСѓ СЃС†РµРЅР°СЂРёСЋ РІС…РѕРґР°.
          </p>
        </div>
        <section className="role-grid" aria-label="Р’С‹Р±РѕСЂ СЂРѕР»Рё">
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
