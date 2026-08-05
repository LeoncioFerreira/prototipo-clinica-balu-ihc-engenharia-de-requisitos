# Clinic Competitor Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a section with 3 side-by-side cards comparing Balu's advantages against generic competitor disadvantages, right below the hero section in the Clinic view.

**Architecture:** Add a new flex/grid container with 3 cards in `src/features/landing/Landing.tsx` after the Hero section and before the ZigZag section.

**Tech Stack:** React, Tailwind CSS

## Global Constraints

- Do not use competitor names. Use generic terms like "Sistemas Antigos", "Concorrentes", etc.

---

### Task 1: Add Competitor Comparison Cards

**Files:**
- Modify: `src/features/landing/Landing.tsx`

**Interfaces:**
- Consumes: `Landing.tsx` existing layout structure.
- Produces: A new `<div className="container mx-auto px-6 max-w-6xl -mt-12 mb-24 relative z-10">` containing the 3 cards.

- [ ] **Step 1: Add the cards section below the Hero section**

```tsx
// Find the end of the Hero Section in view === "clinica":
//             {/* Hero Section */}
//             <div className="container mx-auto px-6 pt-12 pb-24 max-w-6xl flex flex-col lg:flex-row-reverse items-center gap-16">
//               ...
//             </div>
//
// IMMEDIATELY AFTER the Hero div (before the ZigZag <div className="w-full py-24" style={{ backgroundColor: N.white }}>), insert:

            {/* Competitor Cards */}
            <div className="container mx-auto px-6 max-w-6xl -mt-8 mb-24 relative z-10">
              <h2 className="text-3xl font-black text-center mb-10" style={{ color: N.navy }}>Por que as clínicas estão trocando de sistema?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Card 1 */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: N.mintSoft, color: N.mintMedium }}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: N.navy }}>Curva de Aprendizado</h3>
                  <div className="mb-4">
                    <span className="text-sm font-bold text-red-500 uppercase tracking-wider">Outros Sistemas</span>
                    <p className="text-sm text-gray-500 mt-1">Interface sobrecarregada, cadastro complexo e treinamentos longos para a equipe.</p>
                  </div>
                  <div className="mt-auto">
                    <span className="text-sm font-bold uppercase tracking-wider" style={{ color: N.mintMedium }}>No Balu</span>
                    <p className="text-sm mt-1 font-medium" style={{ color: N.textMain }}>Limpo, intuitivo e com foco na agilidade. A equipe aprende no primeiro dia.</p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: N.successSoft, color: N.success }}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: N.navy }}>Comunicação Segura</h3>
                  <div className="mb-4">
                    <span className="text-sm font-bold text-red-500 uppercase tracking-wider">Outros Sistemas</span>
                    <p className="text-sm text-gray-500 mt-1">Lembretes pelo WhatsApp correm risco de bloqueio por spam e não engajam.</p>
                  </div>
                  <div className="mt-auto">
                    <span className="text-sm font-bold uppercase tracking-wider" style={{ color: N.success }}>No Balu</span>
                    <p className="text-sm mt-1 font-medium" style={{ color: N.textMain }}>O tutor tem um app próprio. Lembretes via push garantem retornos sem bloqueios.</p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: N.adminAccent, color: N.navyLight }}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: N.navy }}>Foco na Saúde</h3>
                  <div className="mb-4">
                    <span className="text-sm font-bold text-red-500 uppercase tracking-wider">Outros Sistemas</span>
                    <p className="text-sm text-gray-500 mt-1">Excesso de funções que ninguém usa (como blogs e marketplaces inúteis).</p>
                  </div>
                  <div className="mt-auto">
                    <span className="text-sm font-bold uppercase tracking-wider" style={{ color: N.navyLight }}>No Balu</span>
                    <p className="text-sm mt-1 font-medium" style={{ color: N.textMain }}>Integração clínica-tutor 100% focada na saúde e rotina do pet.</p>
                  </div>
                </div>

              </div>
            </div>
```

- [ ] **Step 2: Run dev build to check syntax**

Run: `npm run build`
Expected: Passes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/features/landing/Landing.tsx
git commit -m "feat: add competitor comparison cards to clinic view"
```
