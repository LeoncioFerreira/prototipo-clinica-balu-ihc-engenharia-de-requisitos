import { describe, expect, test } from "vitest";
import { getVaccineReminderDates } from "../../../features/veterinario/tela-18-cadastro-vacina/reminders";

describe("alertas da próxima dose", () => {
  test("agenda sete dias antes e na data", () => {
    expect(getVaccineReminderDates("2026-09-20", "2026-09-01")).toEqual([
      "2026-09-13",
      "2026-09-20",
    ]);
  });

  test("não agenda alerta retroativo", () => {
    expect(getVaccineReminderDates("2026-09-05", "2026-09-01")).toEqual(["2026-09-05"]);
  });
});
