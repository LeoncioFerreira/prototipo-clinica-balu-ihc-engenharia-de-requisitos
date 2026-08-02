import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { VetCadastroVacina } from "../../../features/veterinario/tela-18-cadastro-vacina/Screen";

test("coleta somente os dados mínimos e explica sua finalidade", () => {
  render(<VetCadastroVacina onCancel={vi.fn()} onSaved={vi.fn()} today="2026-09-01" />);

  expect(screen.getByDisplayValue("Thor")).toBeDisabled();
  expect(screen.getByLabelText(/vacina/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/data da aplicação/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/data da próxima dose/i)).toBeInTheDocument();
  expect(screen.queryByLabelText(/lote/i)).not.toBeInTheDocument();
  expect(
    screen.getByText(/não substitui carteira, comprovante ou registro oficial/i),
  ).toBeVisible();
});

test("valida campos obrigatórios e a ordem das datas", () => {
  render(<VetCadastroVacina onCancel={vi.fn()} onSaved={vi.fn()} today="2026-09-01" />);
  fireEvent.click(screen.getByRole("button", { name: /salvar e programar alertas/i }));
  expect(screen.getAllByRole("alert")).toHaveLength(3);

  fireEvent.change(screen.getByLabelText(/vacina/i), { target: { value: "V10" } });
  fireEvent.change(screen.getByLabelText(/data da aplicação/i), {
    target: { value: "2026-09-20" },
  });
  fireEvent.change(screen.getByLabelText(/data da próxima dose/i), {
    target: { value: "2026-09-20" },
  });
  fireEvent.click(screen.getByRole("button", { name: /salvar e programar alertas/i }));
  expect(screen.getByText(/deve ser posterior à data da aplicação/i)).toBeVisible();
});

test("resume as datas e conclui um cadastro válido", () => {
  const onSaved = vi.fn();
  render(<VetCadastroVacina onCancel={vi.fn()} onSaved={onSaved} today="2026-09-01" />);
  fireEvent.change(screen.getByLabelText(/vacina/i), { target: { value: "V10" } });
  fireEvent.change(screen.getByLabelText(/data da aplicação/i), {
    target: { value: "2026-08-20" },
  });
  fireEvent.change(screen.getByLabelText(/data da próxima dose/i), {
    target: { value: "2026-09-20" },
  });
  expect(screen.getByText(/13\/09\/2026 e 20\/09\/2026/)).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: /salvar e programar alertas/i }));
  expect(onSaved).toHaveBeenCalledOnce();
});
