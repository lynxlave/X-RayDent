import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authApi } from "../../lib/api";
import type { DoctorSpecialty } from "../../lib/types";
import { useSessionStore } from "../../lib/store";

function formatPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, "");
  const normalized = digits.startsWith("7") ? digits.slice(1) : digits.startsWith("8") ? digits.slice(1) : digits;
  const limited = normalized.slice(0, 10);

  let result = "+7";
  if (limited.length > 0) {
    result += ` (${limited.slice(0, 3)}`;
  }
  if (limited.length >= 4) {
    result += `) ${limited.slice(3, 6)}`;
  }
  if (limited.length >= 7) {
    result += `-${limited.slice(6, 8)}`;
  }
  if (limited.length >= 9) {
    result += `-${limited.slice(8, 10)}`;
  }
  return result;
}

function normalizePhoneForApi(value: string): string {
  const digits = value.replace(/\D/g, "");
  const normalized = digits.startsWith("7") ? digits : `7${digits.startsWith("8") ? digits.slice(1) : digits}`;
  return `+${normalized.slice(0, 11)}`;
}

export function AuthPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [phone, setPhone] = useState("+7");
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [error, setError] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [fullName, setFullName] = useState("");
  const [specialty, setSpecialty] = useState<DoctorSpecialty>("stomatolog-terapevt");
  const [registerPhone, setRegisterPhone] = useState("+7");
  const [repeatPassword, setRepeatPassword] = useState("");
  const setSession = useSessionStore((state) => state.setSession);
  const navigate = useNavigate();
  const { role } = useParams();

  const normalizedRole = useMemo(() => {
    if (role === "patient" || role === "doctor" || role === "clinic") {
      return role;
    }
    return "patient";
  }, [role]);

  const isPatient = normalizedRole === "patient";
  const isDoctor = normalizedRole === "doctor";
  const title = isPatient ? "Вход для пациента" : normalizedRole === "doctor" ? "Вход для врача" : "Вход для клиники";
  const roleImage = isPatient
    ? "/images/patient_icon.png"
    : normalizedRole === "doctor"
      ? "/images/dentist_icon.png"
      : "/images/clinic_icon.png";

  useEffect(() => {
    const active = document.activeElement;
    if (active instanceof HTMLElement) {
      active.blur();
    }
    formRef.current?.scrollIntoView({ block: "center" });
    setPhone("+7");
    setCode("");
    setUsername("");
    setPassword("");
    setRepeatPassword("");
    setRegisterPhone("+7");
    setShowPassword(false);
    setShowRepeatPassword(false);
    setAuthMode("login");
    setError("");
  }, [normalizedRole]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      if (isPatient) {
        const normalizedPhone = normalizePhoneForApi(phone);
        await authApi.requestPatientCode(normalizedPhone);
        const session = await authApi.verifyPatient(normalizedPhone, code);
        setSession(session);
      } else if (isDoctor && authMode === "register") {
        if (!fullName.trim()) {
          throw new Error("Введите ФИО.");
        }
        if (normalizePhoneForApi(registerPhone).length < 12) {
          throw new Error("Введите номер телефона.");
        }
        if (!username.trim()) {
          throw new Error("Введите логин.");
        }
        if (password.length < 8) {
          throw new Error("Пароль должен содержать минимум 8 символов.");
        }
        if (password !== repeatPassword) {
          throw new Error("Пароли не совпадают.");
        }
        const session = await authApi.registerDoctor({
          full_name: fullName.trim(),
          specialty,
          phone: normalizePhoneForApi(registerPhone),
          username: username.trim(),
          password,
        });
        setSession(session);
      } else {
        if (password.length < 8) {
          throw new Error("Пароль должен содержать минимум 8 символов.");
        }
        const session = await authApi.loginStaff(username, password);
        setSession(session);
      }
      navigate("/app");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Неверные учетные данные или backend недоступен.");
    }
  }

  return (
    <div className="auth-layout">
      <section className="auth-card">
        <img className="auth-role-image" src={roleImage} alt="" aria-hidden="true" />
        <h1>{title}</h1>
        {isDoctor ? (
          <div className="auth-switch" role="tablist" aria-label="Режим авторизации врача">
            <button
              type="button"
              className={`auth-switch-button ${authMode === "login" ? "active" : ""}`}
              onClick={() => {
                setAuthMode("login");
                setError("");
              }}
            >
              Вход
            </button>
            <button
              type="button"
              className={`auth-switch-button ${authMode === "register" ? "active" : ""}`}
              onClick={() => {
                setAuthMode("register");
                setError("");
              }}
            >
              Регистрация
            </button>
          </div>
        ) : null}
        <form className="form" onSubmit={onSubmit} ref={formRef}>
          {isPatient ? (
            <>
              <input
                className="input"
                value={phone}
                onChange={(event) => setPhone(formatPhoneInput(event.target.value))}
                placeholder="Номер телефона"
                autoComplete="off"
                spellCheck={false}
              />
              <input
                className="input"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Код из SMS"
                autoComplete="off"
                spellCheck={false}
              />
            </>
          ) : (
            <>
              {isDoctor && authMode === "register" ? (
                <>
                  <input
                    className="input"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="ФИО"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <select
                    className="select"
                    value={specialty}
                    onChange={(event) => setSpecialty(event.target.value as DoctorSpecialty)}
                  >
                    <option value="stomatolog-terapevt">Стоматолог-терапевт</option>
                    <option value="stomatolog-ortoped">Стоматолог-ортопед</option>
                    <option value="stomatolog-hirurg">Стоматолог-хирург</option>
                    <option value="stomatolog-ortodont">Стоматолог-ортодонт</option>
                    <option value="chelyustno-litsevoy-hirurg">Челюстно-лицевой хирург</option>
                  </select>
                  <input
                    className="input"
                    value={registerPhone}
                    onChange={(event) => setRegisterPhone(formatPhoneInput(event.target.value))}
                    placeholder="Номер телефона"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </>
              ) : null}
              <input
                className="input"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Логин"
                autoComplete="off"
                spellCheck={false}
              />
              <label className="password-field">
                <input
                  className="input password-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Пароль"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" className="password-eye" fill="none" aria-hidden="true">
                      <path
                        d="M3 3L21 21"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10.58 10.58C10.21 10.95 10 11.46 10 12C10 13.1 10.9 14 12 14C12.54 14 13.05 13.79 13.42 13.42"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.88 5.09C10.56 4.86 11.27 4.75 12 4.75C16.39 4.75 20 8.55 21 12C20.61 13.34 19.82 14.61 18.73 15.62"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.12 18.91C13.44 19.14 12.73 19.25 12 19.25C7.61 19.25 4 15.45 3 12C3.39 10.66 4.18 9.39 5.27 8.38"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="password-eye" fill="none" aria-hidden="true">
                      <path
                        d="M2.75 12C3.92 8.43 7.58 4.75 12 4.75C16.42 4.75 20.08 8.43 21.25 12C20.08 15.57 16.42 19.25 12 19.25C7.58 19.25 3.92 15.57 2.75 12Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  )}
                </button>
              </label>
              {isDoctor && authMode === "register" ? (
                <label className="password-field">
                  <input
                    className="input password-input"
                    type={showRepeatPassword ? "text" : "password"}
                    value={repeatPassword}
                    onChange={(event) => setRepeatPassword(event.target.value)}
                    placeholder="Повторите пароль"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowRepeatPassword((current) => !current)}
                    aria-label={showRepeatPassword ? "Скрыть пароль" : "Показать пароль"}
                  >
                    {showRepeatPassword ? (
                      <svg viewBox="0 0 24 24" className="password-eye" fill="none" aria-hidden="true">
                        <path d="M3 3L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path
                          d="M10.58 10.58C10.21 10.95 10 11.46 10 12C10 13.1 10.9 14 12 14C12.54 14 13.05 13.79 13.42 13.42"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.88 5.09C10.56 4.86 11.27 4.75 12 4.75C16.39 4.75 20 8.55 21 12C20.61 13.34 19.82 14.61 18.73 15.62"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.12 18.91C13.44 19.14 12.73 19.25 12 19.25C7.61 19.25 4 15.45 3 12C3.39 10.66 4.18 9.39 5.27 8.38"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="password-eye" fill="none" aria-hidden="true">
                        <path
                          d="M2.75 12C3.92 8.43 7.58 4.75 12 4.75C16.42 4.75 20.08 8.43 21.25 12C20.08 15.57 16.42 19.25 12 19.25C7.58 19.25 3.92 15.57 2.75 12Z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                    )}
                  </button>
                </label>
              ) : null}
            </>
          )}
          <button className="button" type="submit">
            {isDoctor && authMode === "register" ? "Зарегистрироваться" : "Войти"}
          </button>
          {error ? <div className="form-error">{error}</div> : null}
        </form>
        <Link className="ghost-link" to="/">
          Назад
        </Link>
      </section>
    </div>
  );
}
