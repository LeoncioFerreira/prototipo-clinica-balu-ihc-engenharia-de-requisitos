import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "../../app/App";

test("renderiza a entrada da clínica", () => {
  window.history.replaceState({}, "", "/login");
  render(<App />);

  expect(screen.getByRole("heading", { name: /bem-vindo de volta/i })).toBeInTheDocument();
  expect(screen.getByText("Recepção")).toBeInTheDocument();
  expect(screen.getByText("Veterinário")).toBeInTheDocument();
  expect(screen.getByText("Administrador")).toBeInTheDocument();
});

test("abre uma tela diretamente pela rota funcional", () => {
  window.history.replaceState({}, "", "/recepcao/agenda");
  render(<App />);

  expect(screen.getByRole("heading", { name: /agenda/i })).toBeInTheDocument();
  expect(window.location.pathname).toBe("/recepcao/agenda");
});
