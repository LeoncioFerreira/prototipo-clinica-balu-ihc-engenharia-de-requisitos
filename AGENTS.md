# Instruções obrigatórias do projeto Balu Clínica

Leia este arquivo integralmente antes de analisar, planejar, responder tecnicamente ou modificar o projeto.

## 1. Wiki obrigatória

Antes de qualquer outra ação:

1. Procure a wiki na pasta irmã `../g9.wiki`, resolvendo o caminho a partir da raiz deste repositório.
2. Se ela não existir nesse local, pergunte ao usuário qual é o caminho da pasta `g9.wiki`.
3. Não analise requisitos, não proponha solução e não altere arquivos até conseguir acessar a wiki.
4. Leia primeiro `home.md`.
5. Depois consulte somente os documentos relacionados à tarefa, principalmente `USs.md`, `RN.md`, `Requisitos-Não-Funcionais.md`, casos de uso, fluxos, matrizes de rastreabilidade e `Protótipos-de-Alta-Fidelidade.md`.

A wiki define requisitos e regras de negócio. O Figma define a referência visual indicada pelo usuário. O código define somente o que já está implementado. Se essas fontes divergirem, informe o conflito e peça orientação; nunca invente uma conciliação.

## 2. Escopo

- Faça somente o que o usuário solicitou e o que os requisitos sustentam.
- Não invente telas, rotas, textos, campos, integrações, dados ou comportamentos.
- Não crie as seis telas mencionadas na contagem da wiki que ainda não existem no código sem requisito explícito.
- Não altere telas fora do escopo para padronizar.
- Preserve mudanças preexistentes de outras pessoas.
- Não faça commit, push, merge, deploy ou alteração na wiki sem autorização explícita.

## 3. Tecnologias e comandos

O projeto é o protótipo web desktop da clínica Balu.

- React 18 e TypeScript;
- Vite e Tailwind CSS;
- Lucide React;
- Recharts;
- Vitest, Testing Library e jsdom;
- ESLint e Prettier.

```bash
npm ci
npm run dev
npm run format:check
npm run lint
npm test
npm run build
```

## 4. Organização

```text
src/
├── app/
│   ├── App.tsx
│   └── routes.ts
├── components/
│   ├── figma/
│   └── ui/
├── features/
│   ├── acesso/
│   ├── recepcao/
│   ├── veterinario/
│   └── administracao/
├── shared/
│   ├── tokens.ts
│   └── types.ts
├── styles/
└── test/
    ├── setup.ts
    └── app/
```

Cada tela deve permanecer em `src/features/<área>/tela-<número>-<nome>/Screen.tsx`. O número identifica a tela na organização interna; a URL pública usa somente nomes funcionais. Não coloque números de tela nas URLs.

Componentes usados por várias telas ficam em `src/components/ui/`. Tipos e tokens globais ficam em `src/shared/`. `App.tsx` deve apenas coordenar autenticação, navegação e renderização das telas.

## 5. Telas e rotas implementadas

|  Nº | Área          | Pasta                   | Rota funcional                 | Responsabilidade                                             |
| --: | ------------- | ----------------------- | ------------------------------ | ------------------------------------------------------------ |
|  01 | Acesso        | `tela-01-login`         | `/login`                       | Entrada nos perfis de recepção, veterinário e administração. |
|  02 | Recepção      | `tela-02-agenda`        | `/recepcao/agenda`             | Agenda diária e seleção de atendimento.                      |
|  03 | Recepção      | `tela-03-check-in`      | `/recepcao/check-in`           | Confirmação de chegada e check-in do pet.                    |
|  04 | Recepção      | `tela-04-tutores`       | `/recepcao/tutores`            | Busca e consulta de tutores.                                 |
|  05 | Recepção      | `tela-05-vincular-pet`  | `/recepcao/vincular-pet`       | Solicitação de vínculo entre tutor, pet e clínica.           |
|  06 | Recepção      | `tela-06-encaminhar`    | `/recepcao/encaminhar`         | Encaminhamento do atendimento ao veterinário.                |
|  07 | Recepção      | `tela-07-retornos`      | `/recepcao/retornos`           | Controle de retornos da clínica.                             |
|  08 | Veterinário   | `tela-08-fila`          | `/veterinario/fila`            | Fila de pets aguardando atendimento.                         |
|  09 | Veterinário   | `tela-09-consulta`      | `/veterinario/consulta`        | Registro da consulta e avaliação clínica.                    |
|  10 | Veterinário   | `tela-10-prescricao`    | `/veterinario/prescricoes`     | Prescrição de medicamentos e orientações.                    |
|  11 | Veterinário   | `tela-11-historico`     | `/veterinario/historico`       | Histórico clínico do pet.                                    |
|  12 | Veterinário   | `tela-12-encerramento`  | `/veterinario/encerramento`    | Encerramento e resumo da consulta.                           |
|  13 | Administração | `tela-13-visao-geral`   | `/administracao/visao-geral`   | Indicadores gerais e visão operacional.                      |
|  14 | Administração | `tela-14-funcionarios`  | `/administracao/funcionarios`  | Cadastro e gestão de funcionários.                           |
|  15 | Administração | `tela-15-permissoes`    | `/administracao/permissoes`    | Matriz de permissões por perfil.                             |
|  16 | Administração | `tela-16-relatorios`    | `/administracao/relatorios`    | Métricas, gráficos e relatórios.                             |
|  17 | Administração | `tela-17-configuracoes` | `/administracao/configuracoes` | Dados da clínica, mensagens e integrações.                   |

Ao criar ou alterar uma rota autorizada, atualize `src/app/routes.ts`, os testes, o fallback da Vercel e esta tabela.

## 6. Navegação

- Use exclusivamente as rotas funcionais declaradas em `src/app/routes.ts`.
- Não volte a usar códigos como `r-agenda` na URL; esses códigos são identificadores internos.
- Preserve a área do usuário: `/recepcao/*`, `/veterinario/*` e `/administracao/*`.
- Toda rota profunda precisa abrir diretamente após atualizar o navegador.
- Não presuma uma rota: confira o mapa e o callback real.

## 7. Erros

O padrão da equipe possui dois tipos de feedback:

- toast para erro breve e recuperável, como validação de formulário;
- modal para ação bloqueada que exige reconhecimento ou decisão.

Use o componente global de erro quando ele estiver presente no projeto. Não use `alert()`, `confirm()`, emoji ou componentes paralelos. Se uma tarefa exigir erro antes da adoção do componente global, confirme com o usuário a implementação compartilhada em vez de criar uma solução isolada.

## 8. Testes

Todos os testes ficam em `src/test/`; nunca coloque `*.test.*` ao lado do código de produção.

- `src/test/app/`: rotas, renderização e fluxos;
- `src/test/components/`: componentes compartilhados;
- `src/test/features/`: regras isoladas;
- `src/test/setup.ts`: configuração global.

Para funcionalidade ou correção, escreva primeiro um teste que falhe pela razão esperada. Teste comportamento observável com consultas acessíveis da Testing Library. Não remova nem enfraqueça testes para aprovar o CI.

## 9. Processo obrigatório

1. Leia a wiki.
2. Inspecione o código e o estado do Git.
3. Confirme o requisito e limite o escopo.
4. Escreva e execute o teste de regressão.
5. Faça a menor implementação necessária.
6. Rode o teste focal.
7. Antes de concluir, execute:

```bash
npm run format:check
npm run lint
npm test
npm run build
git diff --check
```

Não declare conclusão se algum comando falhar.

## 10. Git

Por padrão, crie uma branch antes de editar, no formato `tipo/descricao-responsavel`, por exemplo `refactor/correcoes-leoncio`. Trabalhe diretamente na `main` somente com autorização explícita.

Use Conventional Commits em português:

```text
feat: adiciona funcionalidade
fix: corrige comportamento
refactor: organiza telas da clínica
test: cobre rotas funcionais
docs: adiciona instruções da equipe
chore: configura ci e vercel
```

Inclua apenas arquivos da tarefa e nunca publique segredos, `.env`, `.vercel/`, prompts internos ou documentação de planejamento.
