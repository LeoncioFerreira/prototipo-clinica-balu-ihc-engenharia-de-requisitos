# Clinic Copy Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the Landing page copy for the Clinic view to focus on financial metrics and productivity.

**Architecture:** Modify the texts in the `Landing.tsx` component.

**Tech Stack:** React, Tailwind CSS

## Global Constraints

- No structural changes to the UI layout.

---

### Task 1: Update Clinic ZigZag Copy

**Files:**
- Modify: `src/features/landing/Landing.tsx`

**Interfaces:**
- Consumes: `Landing.tsx` existing layout structure.
- Produces: Updated copy for the 3 ZigZag blocks.

- [ ] **Step 1: Replace text in the first ZigZag block (Agenda)**

```tsx
// Find the block with "Agilidade no Atendimento" and replace with:
<h2 className="text-4xl font-black" style={{ color: N.navy }}>Fim dos buracos na agenda.</h2>
<p className="text-lg leading-relaxed" style={{ color: N.textSec }}>
  Lembretes automáticos enviados direto para o celular do tutor reduzem drasticamente as faltas (no-shows). Sua equipe para de perder tempo cobrando clientes no WhatsApp, e a clínica não perde o faturamento de consultas esquecidas.
</p>
```

- [ ] **Step 2: Replace text in the second ZigZag block (Dashboard)**

```tsx
// Find the block with "Retenção de Clientes" and replace with:
<h2 className="text-4xl font-black" style={{ color: N.navy }}>Um cliente lembrado é um cliente que volta.</h2>
<p className="text-lg leading-relaxed" style={{ color: N.textSec }}>
  O Balu avisa o tutor automaticamente quando uma vacina está vencendo ou um reforço precisa ser dado. Você aumenta a recorrência da sua base atual sem gastar um centavo em marketing para atrair clientes novos.
</p>
```

- [ ] **Step 3: Replace text in the third ZigZag block (Prontuário)**

```tsx
// Find the block with "Status de Inovação para sua Clínica" and replace with:
<h2 className="text-4xl font-black" style={{ color: N.navy }}>Produtividade que vira lucro.</h2>
<p className="text-lg leading-relaxed" style={{ color: N.textSec }}>
  Um prontuário eletrônico rápido e sem burocracia significa menos tempo digitando e mais tempo atendendo. Aumente o volume de consultas diárias da sua equipe sem precisar contratar mais profissionais ou pagar horas extras.
</p>
```

- [ ] **Step 4: Run dev build to check syntax**

Run: `npm run build`
Expected: Passes without errors.

- [ ] **Step 5: Commit**

```bash
git add src/features/landing/Landing.tsx
git commit -m "feat: update clinic zigzag copy to focus on financial benefits"
```

---

### Task 2: Update Atores do Sistema Copy

**Files:**
- Modify: `src/features/landing/Landing.tsx`

**Interfaces:**
- Consumes: `Landing.tsx` existing "Atores" grid.
- Produces: Updated copy for the "Equipe" section.

- [ ] **Step 1: Replace text in the Atores section**

```tsx
// Find "Feito para todos os atores da sua clínica" and the 3 columns and replace with:
<h2 className="text-3xl font-black mb-10" style={{ color: N.navy }}>A ferramenta perfeita para cada profissional da sua clínica</h2>

// Column 1 (Recepção)
<h3 className="font-bold text-xl mb-2" style={{ color: N.textMain }}>Recepção Ágil</h3>
<p className="text-sm" style={{ color: N.textSec }}>Fim das filas e das confusões no balcão. Agendamentos rápidos, check-in em um clique e controle total da sala de espera.</p>

// Column 2 (Veterinário)
<h3 className="font-bold text-xl mb-2" style={{ color: N.textMain }}>Foco no Paciente</h3>
<p className="text-sm" style={{ color: N.textSec }}>Prontuário focado e limpo. Menos cliques preenchendo formulários e mais tempo olhando no olho do tutor.</p>

// Column 3 (Administrador)
<h3 className="font-bold text-xl mb-2" style={{ color: N.textMain }}>Controle Total</h3>
<p className="text-sm" style={{ color: N.textSec }}>Visão em tempo real do faturamento e produtividade. Tome decisões baseadas em dados seguros, de qualquer lugar.</p>
```

- [ ] **Step 2: Run dev build to check syntax**

Run: `npm run build`
Expected: Passes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/features/landing/Landing.tsx
git commit -m "feat: update team copy in clinic view"
```
