import { useState } from "react";
import { CheckSquare, BarChart2, ArrowRight, Stethoscope, Info, PawPrint } from "lucide-react";
import { BaluBear } from "../../../components/ui/ClinicPrimitives";
import { N } from "../../../shared/tokens";
import type { Role } from "../../../shared/types";

export function LoginScreen({ onLogin }: { onLogin: (role: Role) => void }) {
  const [loading, setLoading] = useState<Role | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const simulate = (role: Role) => {
    setLoading(role);
    setTimeout(() => {
      setLoading(null);
      onLogin(role);
    }, 800);
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* ── Left panel ── */}
      <div
        className="hidden lg:flex flex-col w-[52%] relative overflow-hidden"
        style={{ background: N.navy }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large mint circle top-right */}
          <div
            className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full"
            style={{ background: `radial-gradient(circle, ${N.mint}18 0%, transparent 70%)` }}
          />
          {/* Small mint circle bottom-left */}
          <div
            className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full"
            style={{ background: `radial-gradient(circle, ${N.mint}10 0%, transparent 70%)` }}
          />
          {/* Subtle dot grid */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill={N.mint} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        {/* Top logo bar */}
        <div className="relative z-10 px-12 pt-10 flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(178,245,234,0.15)" }}
          >
            <PawPrint size={16} style={{ color: N.mint }} />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Balu</span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ background: "rgba(178,245,234,0.15)", color: N.mint }}
          >
            Clínica
          </span>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-12 text-center">
          {/* Bear mascot — large and centered */}
          <div className="mb-8 relative">
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-20 scale-110"
              style={{ background: N.mint }}
            />
            <div
              className="relative w-48 h-48 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(178,245,234,0.08)",
                border: `1px solid rgba(178,245,234,0.15)`,
              }}
            >
              <BaluBear size={130} />
            </div>
          </div>

          {/* Brand name */}
          <div className="mb-2">
            <span
              className="text-white font-extrabold tracking-tight"
              style={{ fontSize: 52, lineHeight: 1 }}
            >
              Balu
            </span>
          </div>

          {/* Slogan */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-px w-8" style={{ background: N.mint, opacity: 0.4 }} />
            <span
              className="text-xs font-bold tracking-[0.25em] uppercase"
              style={{ color: N.mint }}
            >
              Cuidado que Aquece
            </span>
            <div className="h-px w-8" style={{ background: N.mint, opacity: 0.4 }} />
          </div>

          <p
            className="text-base leading-relaxed max-w-xs"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Plataforma integrada para recepção, veterinários e gestão clínica.
          </p>
        </div>

        {/* Feature list */}
        <div className="relative z-10 px-12 pb-12 flex flex-col gap-3">
          {[
            { icon: CheckSquare, text: "Agenda e check-in em tempo real" },
            { icon: Stethoscope, text: "Prontuário e prescrição digital" },
            { icon: BarChart2, text: "Relatórios e gestão por perfil" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(178,245,234,0.12)" }}
              >
                <Icon size={14} style={{ color: N.mint }} />
              </div>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex items-center justify-center p-8" style={{ background: N.canvas }}>
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex flex-col items-center mb-10">
            <BaluBear size={64} />
            <div className="text-2xl font-extrabold mt-2" style={{ color: N.navy }}>
              Balu
            </div>
            <div className="text-xs tracking-widest uppercase mt-0.5" style={{ color: N.mint }}>
              Clínica
            </div>
          </div>

          {/* Card */}
          <div
            className="bg-white rounded-3xl p-8 border"
            style={{ borderColor: N.border, boxShadow: "0 4px 32px rgba(0,32,69,0.08)" }}
          >
            <div className="mb-7">
              <h2
                className="text-2xl font-extrabold leading-tight mb-1.5"
                style={{ color: N.textMain }}
              >
                Bem-vindo de volta
              </h2>
              <p className="text-sm" style={{ color: N.textSec }}>
                Entre com suas credenciais para acessar o sistema.
              </p>
            </div>

            {/* Fields */}
            <div className="space-y-4 mb-5">
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: N.textMain }}>
                  E-mail ou usuário
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                  style={{
                    borderColor: N.border,
                    color: N.textMain,
                    background: N.canvas,
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = N.navy;
                    e.target.style.boxShadow = `0 0 0 3px ${N.mint}55`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = N.border;
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold" style={{ color: N.textMain }}>
                    Senha
                  </label>
                  <button className="text-xs font-semibold" style={{ color: N.navy }}>
                    Esqueci minha senha
                  </button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                  style={{
                    borderColor: N.border,
                    color: N.textMain,
                    background: N.canvas,
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = N.navy;
                    e.target.style.boxShadow = `0 0 0 3px ${N.mint}55`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = N.border;
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Info */}
            <div
              className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl mb-6"
              style={{ background: N.mintSoft, border: `1px solid ${N.mint}66` }}
            >
              <Info size={13} className="shrink-0 mt-0.5" style={{ color: "#2C7A7B" }} />
              <p className="text-xs leading-relaxed" style={{ color: "#2C7A7B" }}>
                Após o login, o sistema redireciona automaticamente para o seu perfil de acesso.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px" style={{ background: N.border }} />
              <span
                className="text-[11px] font-bold uppercase tracking-widest"
                style={{ color: N.textSec }}
              >
                Acessar como
              </span>
              <div className="flex-1 h-px" style={{ background: N.border }} />
            </div>

            {/* Role buttons */}
            <div className="space-y-2.5">
              {[
                {
                  role: "reception" as Role,
                  label: "Recepção",
                  sub: "Agenda, check-in e tutores",
                  icon: CheckSquare,
                },
                {
                  role: "vet" as Role,
                  label: "Veterinário",
                  sub: "Consultas e prontuários",
                  icon: Stethoscope,
                },
                {
                  role: "admin" as Role,
                  label: "Administrador",
                  sub: "Gestão, equipe e relatórios",
                  icon: BarChart2,
                },
              ].map(({ role, label, sub, icon: Icon }) => {
                const isLoading = loading === role;
                return (
                  <button
                    key={role}
                    onClick={() => simulate(role)}
                    disabled={loading !== null}
                    className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl border-2 text-left transition-all hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                      borderColor: isLoading ? N.navy : N.border,
                      background: isLoading ? N.navy : "white",
                      opacity: loading !== null && !isLoading ? 0.5 : 1,
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all"
                      style={{ background: isLoading ? "rgba(178,245,234,0.2)" : N.mintSoft }}
                    >
                      {isLoading ? (
                        <div
                          className="w-4 h-4 border-2 rounded-full animate-spin"
                          style={{ borderColor: `${N.mint}44`, borderTopColor: N.mint }}
                        />
                      ) : (
                        <Icon size={16} style={{ color: N.navy }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div
                        className="font-bold text-sm leading-tight transition-colors"
                        style={{ color: isLoading ? "white" : N.textMain }}
                      >
                        {label}
                      </div>
                      <div
                        className="text-xs mt-0.5 transition-colors"
                        style={{ color: isLoading ? "rgba(255,255,255,0.6)" : N.textSec }}
                      >
                        {sub}
                      </div>
                    </div>
                    <ArrowRight size={15} style={{ color: isLoading ? N.mint : N.textSec }} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Search Input ─────────────────────────────────────────────────────────────
