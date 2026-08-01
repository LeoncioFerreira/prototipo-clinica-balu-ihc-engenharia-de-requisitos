import { describe, expect, test } from "vitest";
import { pathForScreen, roleForScreen, screenForPath } from "../../app/routes";

describe("rotas funcionais da clínica", () => {
  test.each([
    ["r-agenda", "/recepcao/agenda", "reception"],
    ["r-checkin", "/recepcao/check-in", "reception"],
    ["v-fila", "/veterinario/fila", "vet"],
    ["v-prescricao", "/veterinario/prescricoes", "vet"],
    ["a-visao", "/administracao/visao-geral", "admin"],
    ["a-config", "/administracao/configuracoes", "admin"],
  ] as const)("mapeia %s para %s", (screen, path, role) => {
    expect(pathForScreen(screen)).toBe(path);
    expect(screenForPath(path)).toBe(screen);
    expect(roleForScreen(screen)).toBe(role);
  });

  test("usa login para caminhos desconhecidos", () => {
    expect(screenForPath("/tela=13")).toBe("login");
  });
});
