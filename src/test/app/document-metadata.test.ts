import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

describe("identidade do documento da clínica", () => {
  const projectRoot = resolve(import.meta.dirname, "../../..");
  const html = readFileSync(resolve(projectRoot, "index.html"), "utf8");

  test("usa o idioma e o título do Balu Clínica", () => {
    expect(html).toContain('<html lang="pt-BR">');
    expect(html).toContain("<title>Balu-clinica</title>");
  });

  test("usa o avatar do Balu como favicon", () => {
    const faviconPath = "/assets/figma/chat/balu-avatar.png";

    expect(html).toContain(`<link rel="icon" type="image/png" href="${faviconPath}" />`);
    expect(() => readFileSync(resolve(projectRoot, `public${faviconPath}`))).not.toThrow();
  });

  test("não mantém a descrição genérica do template", () => {
    expect(html).not.toContain("Streamline project management");
  });
});
