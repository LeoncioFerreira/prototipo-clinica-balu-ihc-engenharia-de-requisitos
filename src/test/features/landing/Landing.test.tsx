import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Landing } from "../../../features/landing/Landing";

test("renderiza os 3 blocos de texto ZigZag atualizados na visão Clínica", () => {
  render(<Landing defaultView="clinica" />);

  // Bloco 1 (Agenda)
  expect(screen.getByRole("heading", { name: "Fim dos buracos na agenda." })).toBeInTheDocument();
  expect(
    screen.getByText(
      /Lembretes automáticos enviados direto para o celular do tutor reduzem drasticamente as faltas/i
    )
  ).toBeInTheDocument();

  // Bloco 2 (Dashboard / Retenção)
  expect(screen.getByRole("heading", { name: "Um cliente lembrado é um cliente que volta." })).toBeInTheDocument();
  expect(
    screen.getByText(
      /O Balu avisa o tutor automaticamente quando uma vacina está vencendo ou um reforço precisa ser dado/i
    )
  ).toBeInTheDocument();

  // Bloco 3 (Prontuário / Produtividade)
  expect(screen.getByRole("heading", { name: "Produtividade que vira lucro." })).toBeInTheDocument();
  expect(
    screen.getByText(
      /Um prontuário eletrônico rápido e sem burocracia significa menos tempo digitando e mais tempo atendendo/i
    )
  ).toBeInTheDocument();
});
