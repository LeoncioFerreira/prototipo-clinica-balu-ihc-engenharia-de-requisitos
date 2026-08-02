import { fireEvent, render, screen } from "@testing-library/react";
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

test("abre o cadastro de vacina pela rota funcional", () => {
  window.history.replaceState({}, "", "/veterinario/vacinas/nova");
  render(<App />);

  expect(screen.getByRole("heading", { name: /cadastro de vacina/i })).toBeInTheDocument();
});

test("abre o cadastro pela consulta e retorna ao cancelar", () => {
  window.history.replaceState({}, "", "/veterinario/consulta");
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Conduta" }));
  fireEvent.click(screen.getByRole("button", { name: /cadastrar vacina/i }));
  expect(window.location.pathname).toBe("/veterinario/vacinas/nova");
  fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));
  expect(window.location.pathname).toBe("/veterinario/consulta");
});

test("abre o cadastro pelo histórico e retorna ao cancelar", () => {
  window.history.replaceState({}, "", "/veterinario/historico");
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: /cadastrar vacina/i }));
  expect(window.location.pathname).toBe("/veterinario/vacinas/nova");
  fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));
  expect(window.location.pathname).toBe("/veterinario/historico");
});
