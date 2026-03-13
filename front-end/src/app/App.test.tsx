import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";
import { useSessionStore } from "../lib/store";

describe("App routing", () => {
  it("renders login page when session is missing", () => {
    useSessionStore.setState({ session: null });
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Вход")).toBeInTheDocument();
  });

  it("renders patient dashboard for patient role", () => {
    useSessionStore.setState({
      session: { access_token: "token", role: "patient", user_id: "patient-user-1" },
    });
    render(
      <MemoryRouter initialEntries={["/app"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Личный кабинет пациента")).toBeInTheDocument();
  });
});
