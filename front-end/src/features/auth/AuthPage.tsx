import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../lib/api";
import { useSessionStore } from "../../lib/store";

type LoginMode = "patient" | "doctor" | "clinic_admin";

export function AuthPage() {
  const [mode, setMode] = useState<LoginMode>("patient");
  const [phone, setPhone] = useState("+79990000001");
  const [code, setCode] = useState("0000");
  const [username, setUsername] = useState("doctor");
  const [password, setPassword] = useState("password");
  const [status, setStatus] = useState("");
  const setSession = useSessionStore((state) => state.setSession);
  const navigate = useNavigate();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (mode === "patient") {
      await authApi.requestPatientCode(phone);
      const session = await authApi.verifyPatient(phone, code);
      setSession(session);
    } else {
      const session = await authApi.loginStaff(mode === "doctor" ? "doctor" : "admin", password);
      setSession(session);
    }
    setStatus("Вход выполнен");
    navigate("/app");
  }

  return (
    <div className="grid columns-2">
      <section className="card hero">
        <span className="badge">MVP Skeleton</span>
        <h1>Единая платформа для пациента, врача и администратора клиники</h1>
        <p className="muted">
          Поддержаны ключевые сценарии со схемы: вход, история снимков, загрузка ортопантомограммы,
          mock-анализ, заключение, PDF, управление доступами и сервисные разделы.
        </p>
      </section>
      <section className="card">
        <h2>Вход</h2>
        <form className="form" onSubmit={onSubmit}>
          <select className="select" value={mode} onChange={(event) => setMode(event.target.value as LoginMode)}>
            <option value="patient">Пациент</option>
            <option value="doctor">Врач</option>
            <option value="clinic_admin">Администратор</option>
          </select>
          {mode === "patient" ? (
            <>
              <input className="input" value={phone} onChange={(event) => setPhone(event.target.value)} />
              <input className="input" value={code} onChange={(event) => setCode(event.target.value)} />
            </>
          ) : (
            <>
              <input className="input" value={username} onChange={(event) => setUsername(event.target.value)} />
              <input className="input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </>
          )}
          <button className="button" type="submit">
            Войти
          </button>
          {status ? <span className="muted">{status}</span> : null}
        </form>
      </section>
    </div>
  );
}
