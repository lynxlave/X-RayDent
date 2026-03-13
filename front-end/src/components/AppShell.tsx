import { Link, Outlet, useLocation } from "react-router-dom";
import { useSessionStore } from "../lib/store";

export function AppShell() {
  const session = useSessionStore((state) => state.session);
  const clearSession = useSessionStore((state) => state.clearSession);
  const location = useLocation();
  const showHeader = location.pathname.startsWith("/app");

  return (
    <div className="shell">
      {showHeader ? (
        <header className="topbar">
        <Link className="brand" to="/">
          X-РайДент
        </Link>
          <div>
            {session ? (
              <button className="button secondary" style={{ marginLeft: 12 }} onClick={clearSession}>
                Выйти
              </button>
            ) : null}
          </div>
        </header>
      ) : null}
      <main className="layout">
        <Outlet />
      </main>
    </div>
  );
}
