# Balu — sistema desktop da clínica

Protótipo web da clínica Balu para os perfis de recepção, veterinário e administração.

## Executar

Requisitos: Node.js 22 e npm.

```bash
npm ci
npm run dev
```

## Verificações

```bash
npm run format:check
npm run lint
npm test
npm run build
git diff --check
```

## Instruções para IAs

- Codex deve ler integralmente [`AGENTS.md`](./AGENTS.md).
- Gemini e Antigravity devem ler [`GEMINI.md`](./GEMINI.md), que carrega `AGENTS.md`.
- Antes de qualquer tarefa, a IA deve consultar a wiki `g9.wiki`.
- Se `../g9.wiki` não existir, a IA deve pedir ao usuário o caminho e interromper o trabalho.
- A IA não pode inventar requisito, tela, rota ou comportamento.

## Estrutura

Cada tela fica em uma pasta numerada:

```text
src/features/<area>/tela-<numero>-<nome>/Screen.tsx
```

As pastas seguem a numeração interna de 01 a 17. As URLs não usam números: elas são funcionais e hierárquicas, como `/recepcao/agenda`, `/veterinario/consulta` e `/administracao/relatorios`.

O mapa completo está em [`AGENTS.md`](./AGENTS.md).

## Testes

Todos os testes ficam em `src/test/`:

- `app/`: rotas e fluxos;
- `components/`: componentes compartilhados;
- `features/`: regras isoladas;
- `setup.ts`: configuração global.

Funcionalidades e correções devem começar por um teste de regressão. O CI executa formatação, lint, testes e build.

## Git

Crie uma branch antes de começar, salvo autorização explícita para trabalhar na `main`.

```text
tipo/descricao-responsavel
refactor/correcoes-leoncio
```

Use Conventional Commits: `feat`, `fix`, `refactor`, `test`, `docs` e `chore`. Não faça commit, push ou deploy sem autorização.

## Vercel

A aplicação usa a integração Git da Vercel. A `main` é a branch de produção e outras branches podem gerar previews. O fallback definido em `vercel.json` permite abrir diretamente qualquer rota funcional.
