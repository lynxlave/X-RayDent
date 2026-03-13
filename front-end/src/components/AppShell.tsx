import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { authApi } from "../lib/api";
import { useSessionStore } from "../lib/store";

const THEME_KEY = "xraydent.theme";

const faqItems = [
  {
    question: "Как загрузить снимок?",
    answer: "Откройте нужный кабинет, выберите пациента или создайте новый кейс и загрузите файл снимка в соответствующем блоке.",
  },
  {
    question: "Как получить заключение?",
    answer: "После обработки снимка заключение появится в карточке исследования и будет доступно для просмотра или выгрузки.",
  },
  {
    question: "Что делать, если снимок отклонен?",
    answer: "Система покажет статус низкого качества. В этом случае загрузите повторный снимок с более высоким качеством.",
  },
];

const cannedReplies = [
  "Спасибо, сообщение получено. Сейчас это работает как шаблонный чат, позже подключим его к админской панели.",
  "Передали запрос в очередь поддержки. Пока используйте этот чат как временный канал связи.",
  "Приняли сообщение. Можно дополнительно описать проблему или указать пациента, если это важно.",
];

type ThemeMode = "light" | "dark";
type ChatMessage = {
  id: string;
  author: "user" | "bot";
  text: string;
};

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="toolbar-icon" fill="none" aria-hidden="true">
      <path d="M12 8.25A3.75 3.75 0 1 0 12 15.75A3.75 3.75 0 1 0 12 8.25Z" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M19.04 12.87C19.09 12.58 19.12 12.29 19.12 12C19.12 11.71 19.09 11.42 19.04 11.13L21 9.6L19.14 6.38L16.79 7.23C16.34 6.89 15.85 6.61 15.32 6.42L14.96 4H11.24L10.88 6.42C10.35 6.61 9.86 6.89 9.41 7.23L7.06 6.38L5.2 9.6L7.16 11.13C7.11 11.42 7.08 11.71 7.08 12C7.08 12.29 7.11 12.58 7.16 12.87L5.2 14.4L7.06 17.62L9.41 16.77C9.86 17.11 10.35 17.39 10.88 17.58L11.24 20H14.96L15.32 17.58C15.85 17.39 16.34 17.11 16.79 16.77L19.14 17.62L21 14.4L19.04 12.87Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="toolbar-icon" fill="none" aria-hidden="true">
      <path
        d="M6 18.25L3.75 20V6.75C3.75 5.92 4.42 5.25 5.25 5.25H18.75C19.58 5.25 20.25 5.92 20.25 6.75V15.25C20.25 16.08 19.58 16.75 18.75 16.75H7.25L6 18.25Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8 10H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 13H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function AppShell() {
  const session = useSessionStore((state) => state.session);
  const setSession = useSessionStore((state) => state.setSession);
  const clearSession = useSessionStore((state) => state.clearSession);
  const location = useLocation();
  const showHeader = Boolean(session) && !location.pathname.startsWith("/login");
  const sessionUpgradeStarted = useRef(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatDraft, setChatDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      author: "bot",
      text: "Здравствуйте. Это временный чат поддержки. Напишите сообщение, и я отвечу шаблонно.",
    },
  ]);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") {
      return "light";
    }
    const savedTheme = window.localStorage.getItem(THEME_KEY);
    return savedTheme === "dark" ? "dark" : "light";
  });
  const [telemedMessage, setTelemedMessage] = useState("");
  const [telemedSuccess, setTelemedSuccess] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme]);

  useEffect(() => {
    setIsSettingsOpen(false);
    setIsChatOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!session || !session.refresh_token) {
      sessionUpgradeStarted.current = false;
      return;
    }
    if (session.full_name && (session.role !== "doctor" || session.specialty)) {
      sessionUpgradeStarted.current = false;
      return;
    }
    if (sessionUpgradeStarted.current) {
      return;
    }
    sessionUpgradeStarted.current = true;
    authApi
      .refresh(session.refresh_token)
      .then((nextSession) => {
        setSession(nextSession);
      })
      .catch(() => {
        sessionUpgradeStarted.current = false;
      });
  }, [session, setSession]);

  function requestTelemedConsultation() {
    if (!telemedMessage.trim()) {
      setTelemedSuccess("Опишите запрос для консультации.");
      return;
    }
    setTelemedSuccess("Запрос на телемедицинскую консультацию отправлен.");
    setTelemedMessage("");
  }

  function sendChatMessage(event: FormEvent) {
    event.preventDefault();
    const text = chatDraft.trim();
    if (!text) {
      return;
    }
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      author: "user",
      text,
    };
    setMessages((current) => [...current, userMessage]);
    setChatDraft("");

    const reply = cannedReplies[(messages.length - 1) % cannedReplies.length];
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `bot-${Date.now()}`,
          author: "bot",
          text: reply,
        },
      ]);
    }, 450);
  }

  return (
    <div className="shell">
      {showHeader ? (
        <header className="topbar">
          <Link className="brand" to="/">
            X-РайДент
          </Link>
          <div className="topbar-actions">
            <button type="button" className="icon-button" aria-label="Настройки" onClick={() => setIsSettingsOpen(true)}>
              <SettingsIcon />
            </button>
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

      {showHeader ? (
        <>
          <button
            type="button"
            className="chat-fab"
            aria-label="Открыть чат"
            onClick={() => setIsChatOpen((current) => !current)}
          >
            <ChatIcon />
          </button>
          {isChatOpen ? (
            <section className="chat-widget">
              <div className="chat-header">
                <div>
                  <strong>Чат поддержки</strong>
                  <p className="muted">Шаблонные ответы до подключения админ-панели</p>
                </div>
                <button type="button" className="icon-button chat-close" aria-label="Закрыть чат" onClick={() => setIsChatOpen(false)}>
                  <span className="modal-close" aria-hidden="true">
                    ×
                  </span>
                </button>
              </div>
              <div className="chat-messages">
                {messages.map((message) => (
                  <div key={message.id} className={`chat-message ${message.author === "user" ? "user" : "bot"}`}>
                    {message.text}
                  </div>
                ))}
              </div>
              <form className="chat-form" onSubmit={sendChatMessage}>
                <textarea
                  className="textarea chat-input"
                  rows={3}
                  placeholder="Напишите сообщение"
                  value={chatDraft}
                  onChange={(event) => setChatDraft(event.target.value)}
                />
                <button type="submit" className="button">
                  Отправить
                </button>
              </form>
            </section>
          ) : null}
        </>
      ) : null}

      {isSettingsOpen ? (
        <div className="modal-backdrop" onClick={() => setIsSettingsOpen(false)}>
          <section className="settings-modal" onClick={(event) => event.stopPropagation()}>
            <div className="settings-header">
              <h2>Настройки</h2>
              <button type="button" className="icon-button" aria-label="Закрыть" onClick={() => setIsSettingsOpen(false)}>
                <span className="modal-close" aria-hidden="true">
                  ×
                </span>
              </button>
            </div>

            <div className="settings-block">
              <h3>Цвет темы</h3>
              <div className="theme-toggle">
                <button type="button" className={`theme-option ${theme === "light" ? "active" : ""}`} onClick={() => setTheme("light")}>
                  Светлая
                </button>
                <button type="button" className={`theme-option ${theme === "dark" ? "active" : ""}`} onClick={() => setTheme("dark")}>
                  Темная
                </button>
              </div>
            </div>

            <div className="settings-block">
              <h3>FAQ</h3>
              <div className="faq-list">
                {faqItems.map((item) => (
                  <details key={item.question} className="faq-item">
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="settings-block">
              <h3>Техническая поддержка</h3>
              <p className="muted">Почта: support@x-raydent.ru</p>
              <p className="muted">Телефон: +7 (800) 555-35-35</p>
            </div>

            <div className="settings-block">
              <h3>Телемедицинская консультация</h3>
              <p className="muted">Можно отправить запрос эксперту для дополнительной консультации.</p>
              <textarea
                className="textarea"
                rows={4}
                placeholder="Опишите ваш запрос"
                value={telemedMessage}
                onChange={(event) => {
                  setTelemedMessage(event.target.value);
                  setTelemedSuccess("");
                }}
              />
              <button type="button" className="button" onClick={requestTelemedConsultation}>
                Запросить консультацию
              </button>
              {telemedSuccess ? <div className="form-success">{telemedSuccess}</div> : null}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
