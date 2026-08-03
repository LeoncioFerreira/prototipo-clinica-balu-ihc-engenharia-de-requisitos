import { fireEvent, render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "../../app/App";

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserverStub;

function renderRoute(path: string) {
  window.history.replaceState({}, "", path);
  return render(<App />);
}

test("impede o acesso simulado quando as credenciais estão vazias", () => {
  renderRoute("/login");

  fireEvent.click(screen.getByRole("button", { name: /Recepção/i }));

  expect(screen.getByText("Informe um e-mail válido.")).toBeInTheDocument();
  expect(screen.getByText("Informe sua senha.")).toBeInTheDocument();
  expect(window.location.pathname).toBe("/login");
});

test("identifica claramente os dados demonstrativos na consulta", () => {
  renderRoute("/veterinario/consulta");

  expect(screen.getByRole("status", { name: /dados de simulação/i })).toBeInTheDocument();
});

test("confirma alterações pendentes antes de encerrar a consulta", () => {
  renderRoute("/veterinario/encerramento");

  fireEvent.click(screen.getByRole("button", { name: /encerrar consulta/i }));

  const dialog = screen.getByRole("dialog", { name: /alterações pendentes/i });
  expect(within(dialog).getByText(/orientações ainda não foram salvas/i)).toBeInTheDocument();
  expect(within(dialog).getByRole("button", { name: /continuar editando/i })).toBeInTheDocument();
  expect(within(dialog).getByRole("button", { name: /salvar e encerrar/i })).toBeInTheDocument();
});

test("filtra tutores por nome ou CPF e informa a quantidade", () => {
  renderRoute("/recepcao/tutores");
  const search = screen.getByPlaceholderText(/Nome, CPF, telefone ou e-mail/i);

  fireEvent.change(search, { target: { value: "987.654" } });

  expect(screen.getByText("1 tutor encontrado")).toBeInTheDocument();
  expect(screen.getByText("Carla Mendes")).toBeInTheDocument();
  expect(screen.queryByText("Carlos Lima")).not.toBeInTheDocument();
});

test("encontra o tutor pelo nome do pet", () => {
  renderRoute("/recepcao/tutores");
  fireEvent.change(screen.getByPlaceholderText(/Nome, CPF, telefone ou e-mail/i), {
    target: { value: "Thor" },
  });

  expect(screen.getByText("Carlos Lima")).toBeInTheDocument();
  expect(screen.getByText("1 tutor encontrado")).toBeInTheDocument();
});

test("mantém as métricas secundárias recolhidas até o usuário pedir", () => {
  renderRoute("/administracao/visao-geral");

  expect(screen.queryByText(/desempenho por profissional/i)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /ver mais métricas/i }));
  expect(screen.getByText(/desempenho por profissional/i)).toBeInTheDocument();
});

test("oferece ajuda contextual na recepção", () => {
  renderRoute("/recepcao/agenda");

  fireEvent.click(screen.getByRole("button", { name: /ajuda/i }));

  const dialog = screen.getByRole("dialog", { name: /ajuda da recepção/i });
  expect(within(dialog).getByText(/buscar tutor/i)).toBeInTheDocument();
});

test("oferece orientação própria nas telas veterinárias", () => {
  renderRoute("/veterinario/fila");
  fireEvent.click(screen.getByRole("button", { name: /ajuda/i }));

  const dialog = screen.getByRole("dialog", { name: /ajuda do atendimento/i });
  expect(within(dialog).getByText(/prontuário/i)).toBeInTheDocument();
});

test("confirma quando a consulta é salva", () => {
  renderRoute("/veterinario/consulta");

  fireEvent.click(screen.getByRole("button", { name: /salvar consulta/i }));

  expect(screen.getByRole("status", { name: /consulta salva/i })).toHaveTextContent(
    /alterações salvas com sucesso/i,
  );
});

test("filtra funcionários por nome e informa a quantidade", () => {
  renderRoute("/administracao/funcionarios");
  const search = screen.getByPlaceholderText(/buscar funcionário/i);

  fireEvent.change(search, { target: { value: "Ana" } });

  expect(screen.getByText("1 funcionário encontrado")).toBeInTheDocument();
  expect(screen.getByText("Ana Costa")).toBeInTheDocument();
  expect(screen.queryByText("Dr. Lucas Melo")).not.toBeInTheDocument();
});
