import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";
import { useSessionStore } from "../lib/store";

describe("App routing", () => {
  it("renders login page when session is missing", () => {
    useSessionStore.setState({ session: null });
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Я пациент")).toBeInTheDocument();
  });

  it("renders role selector on /login", () => {
    useSessionStore.setState({ session: null });
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Я пациент")).toBeInTheDocument();
    expect(screen.getByText("Я врач")).toBeInTheDocument();
    expect(screen.getByText("Я клиника")).toBeInTheDocument();
  });

  it("renders auth form on /login/patient", () => {
    useSessionStore.setState({ session: null });
    render(
      <MemoryRouter initialEntries={["/login/patient"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Вход для пациента")).toBeInTheDocument();
  });

  it("renders patient dashboard for patient role", () => {
    useSessionStore.setState({
      session: {
        access_token: "token",
        refresh_token: "refresh-token",
        token_type: "bearer",
        role: "patient",
        user_id: "patient-user-1",
      },
    });
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Личный кабинет пациента")).toBeInTheDocument();
  });
});
