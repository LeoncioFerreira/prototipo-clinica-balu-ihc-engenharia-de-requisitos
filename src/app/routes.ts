import type { Role, Screen } from "../shared/types";

const routes: Record<Screen, string> = {
  login: "/login",
  "r-agenda": "/recepcao/agenda",
  "r-checkin": "/recepcao/check-in",
  "r-tutores": "/recepcao/tutores",
  "r-vincular": "/recepcao/vincular-pet",
  "r-encaminhar": "/recepcao/encaminhar",
  "r-retornos": "/recepcao/retornos",
  "v-fila": "/veterinario/fila",
  "v-consulta": "/veterinario/consulta",
  "v-prescricao": "/veterinario/prescricoes",
  "v-historico": "/veterinario/historico",
  "v-encerramento": "/veterinario/encerramento",
  "v-vacina": "/veterinario/vacinas/nova",
  "a-visao": "/administracao/visao-geral",
  "a-funcionarios": "/administracao/funcionarios",
  "a-permissoes": "/administracao/permissoes",
  "a-relatorios": "/administracao/relatorios",
  "a-config": "/administracao/configuracoes",
};

const screensByPath = Object.fromEntries(
  Object.entries(routes).map(([screen, path]) => [path, screen]),
) as Record<string, Screen>;

function normalizePath(path: string) {
  const pathname = path.split(/[?#]/, 1)[0] || "/";
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function pathForScreen(screen: Screen) {
  return routes[screen];
}

export function screenForPath(path: string): Screen {
  const normalized = normalizePath(path);
  return screensByPath[normalized] ?? "login";
}

export function roleForScreen(screen: Screen): Role | null {
  if (screen.startsWith("r-")) return "reception";
  if (screen.startsWith("v-")) return "vet";
  if (screen.startsWith("a-")) return "admin";
  return null;
}
