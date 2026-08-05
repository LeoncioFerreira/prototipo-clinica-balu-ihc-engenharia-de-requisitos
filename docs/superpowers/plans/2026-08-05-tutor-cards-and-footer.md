# Tutor Cards and Footer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 3 advantage cards to the Tutor view and replace the simple footer with a comprehensive "Quem Somos" and "Fat Footer" section.

**Architecture:** Add new components/JSX structures directly in `src/features/landing/Landing.tsx`.

**Tech Stack:** React, Tailwind CSS

## Global Constraints

- Must match existing styling and token colors (`N.navy`, `N.mintSoft`, etc.).
- The new footer must replace the existing minimal footer at the very bottom of the file.

---

### Task 1: Add Tutor Advantage Cards

**Files:**
- Modify: `src/features/landing/Landing.tsx`

**Interfaces:**
- Consumes: `Landing.tsx` existing tutor view structure.
- Produces: A new 3-card grid below the Tutor Hero section.

- [ ] **Step 1: Insert Tutor Cards in Landing.tsx**

```tsx
// Find the end of the Hero Section in view === "tutor":
//             {/* Hero Section */}
//             <div className="container mx-auto px-6 pt-12 pb-24 max-w-6xl flex flex-col lg:flex-row items-center gap-16">
//               ...
//             </div>
//
// IMMEDIATELY AFTER the Hero div, insert:

            {/* Tutor Advantage Cards */}
            <div className="container mx-auto px-6 max-w-6xl -mt-8 mb-24 relative z-10">
              <h2 className="text-3xl font-black text-center mb-10" style={{ color: N.navy }}>Por que usar o Balu?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Card 1 */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full text-center items-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: N.successSoft, color: N.success }}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: N.navy }}>Carteira de Vacinação Digital</h3>
                  <p className="text-sm leading-relaxed" style={{ color: N.textSec }}>Nunca mais perca a carteirinha de papel. Todo o histórico de vacinas e vermífugos do seu pet seguro no seu celular, onde você estiver.</p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full text-center items-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: N.mintSoft, color: N.mintMedium }}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: N.navy }}>Lembretes Automáticos</h3>
                  <p className="text-sm leading-relaxed" style={{ color: N.textSec }}>A rotina é corrida, mas a saúde não pode esperar. O Balu te avisa sempre que estiver na hora da próxima dose ou do próximo banho.</p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full text-center items-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: N.adminAccent, color: N.navyLight }}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: N.navy }}>Cuidado Compartilhado</h3>
                  <p className="text-sm leading-relaxed" style={{ color: N.textSec }}>Você não cuida do pet sozinho? Adicione a família no aplicativo para que todos saibam o que já foi feito no dia.</p>
                </div>

              </div>
            </div>
```

- [ ] **Step 2: Check build**

Run: `npm run build`
Expected: Passes cleanly.

- [ ] **Step 3: Commit**

```bash
git add src/features/landing/Landing.tsx
git commit -m "feat: add tutor advantage cards"
```

---

### Task 2: Implement "Quem Somos" and Fat Footer

**Files:**
- Modify: `src/features/landing/Landing.tsx`

**Interfaces:**
- Consumes: `Landing.tsx`
- Produces: Replaces the existing `<footer ...>` at the bottom of the component with the new design.

- [ ] **Step 1: Replace the Footer in Landing.tsx**

```tsx
// Find the current footer at the very bottom of the component:
//       <footer className="py-8 text-center text-sm font-medium border-t border-gray-100 flex flex-col md:flex-row items-center justify-between px-6 lg:px-24" style={{ color: N.textSec }}>
//         ...
//       </footer>
//
// Replace it entirely with this new code:

      {/* Quem Somos & Fat Footer Section */}
      <footer className="w-full mt-24" style={{ backgroundColor: N.navy, color: N.white }}>
        
        {/* Quem Somos Block */}
        <div className="border-b border-white/10">
          <div className="container mx-auto px-6 max-w-6xl py-20 text-center">
            <h2 className="text-3xl lg:text-4xl font-black mb-6">Nascido do amor pelos animais. Desenvolvido para facilitar vidas.</h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed text-white/80">
              O Balu não é apenas um sistema, é um compromisso com o bem-estar animal. Nossa missão é conectar o cuidado em casa com a excelência clínica, garantindo que nenhum pet fique sem a atenção que merece por um simples esquecimento.
            </p>
          </div>
        </div>

        {/* Fat Footer Links & Actions */}
        <div className="container mx-auto px-6 max-w-6xl py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            
            {/* Col 1: Brand */}
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4 text-2xl font-black">
                <BaluBear className="w-8 h-8" color={N.white} />
                Balu
              </div>
              <p className="text-white/60 text-sm">Simplificando o cuidado animal com tecnologia e carinho.</p>
              <div className="pt-4 text-white/60 text-sm">
                contato@baluapp.com
              </div>
            </div>

            {/* Col 2: Links */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg mb-4">Acesso Rápido</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                <li><button onClick={() => window.location.href = 'https://balu-tutor.vercel.app/'} className="hover:text-white transition-colors">Sou Tutor (Baixar App)</button></li>
                <li><button onClick={() => setView('clinica')} className="hover:text-white transition-colors">Sou Clínica</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Suporte</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos e Privacidade</a></li>
              </ul>
            </div>

            {/* Col 3: Actions */}
            <div className="space-y-6">
              <h4 className="font-bold text-lg mb-2">Comece Agora</h4>
              <button onClick={() => window.location.href = 'https://balu-tutor.vercel.app/'} className="w-full px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105 flex items-center justify-center gap-2" style={{ backgroundColor: N.white, color: N.navy }}>
                Baixar App (Gratuito)
              </button>
              <button onClick={() => window.location.href = '/login'} className="w-full px-6 py-3 rounded-xl font-bold transition-colors border border-white/30 hover:bg-white/10 flex items-center justify-center gap-2 text-white">
                Cadastrar Clínica
              </button>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 text-center text-xs text-white/40 border-t border-white/10">
          Balu © {new Date().getFullYear()}. Todos os direitos reservados.
        </div>
      </footer>
```

- [ ] **Step 2: Check build**

Run: `npm run build`
Expected: Passes cleanly.

- [ ] **Step 3: Commit**

```bash
git add src/features/landing/Landing.tsx
git commit -m "feat: add quem somos and fat footer"
```
