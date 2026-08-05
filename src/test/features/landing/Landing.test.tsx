import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Landing } from "../../../features/landing/Landing";

test("renderiza os 3 blocos de texto ZigZag atualizados na visão Clínica", () => {
  render(<Landing defaultView="clinica" />);

  // Bloco 1 (Agenda)
  expect(screen.getByRole("heading", { name: "Fim dos buracos na agenda." })).toBeInTheDocument();
  expect(
    screen.getByText(
      /Lembretes automáticos enviados direto para o celular do tutor reduzem drasticamente as faltas/i,
    ),
  ).toBeInTheDocument();

  // Bloco 2 (Dashboard / Retenção)
  expect(
    screen.getByRole("heading", { name: "Um cliente lembrado é um cliente que volta." }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      /O Balu avisa o tutor automaticamente quando uma vacina está vencendo ou um reforço precisa ser dado/i,
    ),
  ).toBeInTheDocument();

  // Bloco 3 (Prontuário / Produtividade)
  expect(
    screen.getByRole("heading", { name: "Produtividade que vira lucro." }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      /Um prontuário eletrônico rápido e sem burocracia significa menos tempo digitando e mais tempo atendendo/i,
    ),
  ).toBeInTheDocument();
});

test("renderiza a seção de Atores do Sistema com copy atualizada na visão Clínica", () => {
  render(<Landing defaultView="clinica" />);

  // Título da seção
  expect(
    screen.getByRole("heading", {
      name: "A ferramenta perfeita para cada profissional da sua clínica",
    }),
  ).toBeInTheDocument();

  // Coluna 1 (Recepção Ágil)
  expect(screen.getByRole("heading", { name: "Recepção Ágil" })).toBeInTheDocument();
  expect(
    screen.getByText(
      /Fim das filas e das confusões no balcão. Agendamentos rápidos, check-in em um clique e controle total da sala de espera./i,
    ),
  ).toBeInTheDocument();

  // Coluna 2 (Foco no Paciente)
  expect(screen.getByRole("heading", { name: "Foco no Paciente" })).toBeInTheDocument();
  expect(
    screen.getByText(
      /Prontuário focado e limpo. Menos cliques preenchendo formulários e mais tempo olhando no olho do tutor./i,
    ),
  ).toBeInTheDocument();

  // Coluna 3 (Controle Total)
  expect(screen.getByRole("heading", { name: "Controle Total" })).toBeInTheDocument();
  expect(
    screen.getByText(
      /Visão em tempo real do faturamento e produtividade. Tome decisões baseadas em dados seguros, de qualquer lugar./i,
    ),
  ).toBeInTheDocument();
});
