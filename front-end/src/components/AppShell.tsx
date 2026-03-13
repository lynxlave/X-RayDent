import { Link, Outlet } from "react-router-dom";
import { useSessionStore } from "../lib/store";

export function AppShell() {
  const session = useSessionStore((state) => state.session);
  const clearSession = useSessionStore((state) => state.clearSession);

  return (
    <div className="shell">
      <header className="topbar">
        <Link className="brand" to="/app">
          X-RayDent
        </Link>
        <div>
          <Link to="/support">Поддержка</Link>
          {session ? (
            <button className="button secondary" style={{ marginLeft: 12 }} onClick={clearSession}>
              Выйти
            </button>
          ) : null}
        </div>
      </header>
      <main className="layout">
        <Outlet />
      </main>
    </div>
  );
}
