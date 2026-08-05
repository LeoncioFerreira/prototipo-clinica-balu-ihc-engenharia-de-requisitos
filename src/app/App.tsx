import { useState } from "react";
import { Landing } from "../features/landing/Landing";
import { VetCadastroVacina } from "../features/veterinario/tela-18-cadastro-vacina/Screen";
import { pathForScreen, roleForScreen, screenForPath } from "./routes";
import {
  Calendar,
  CheckSquare,
  Users,
  RotateCcw,
  FileText,
  Pill,
  Clock,
  BarChart2,
  Settings,
  Shield,
  ChevronRight,
  Search,
  Bell,
  LogOut,
  Plus,
  AlertCircle,
  Check,
  X,
  ArrowRight,
  Eye,
  Edit2,
  Activity,
  TrendingUp,
  Download,
  Stethoscope,
  Send,
  Star,
  Info,
  PawPrint,
  Phone,
  Mail,
  CreditCard,
  MapPin,
  Zap,
  UserCheck,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = "reception" | "vet" | "admin";
type Screen =
  | "landing"
  | "login"
  | "r-agenda"
  | "r-checkin"
  | "r-tutores"
  | "r-vincular"
  | "r-encaminhar"
  | "r-retornos"
  | "v-fila"
  | "v-consulta"
  | "v-prescricao"
  | "v-historico"
  | "v-encerramento"
  | "v-vacina"
  | "a-visao"
  | "a-funcionarios"
  | "a-permissoes"
  | "a-relatorios"
  | "a-config";

// ─── Balu Brand Colors ─────────────────────────────────────────────────────────
const N = {
  navy: "#002045",
  mint: "#B2F5EA",
  mintSoft: "#E6FFFA",
  mintMedium: "#81E6D9",
  white: "#FFFFFF",
  canvas: "#F7FAFC",
  slateGray: "#4A5568",
  textMain: "#17324D",
  textSec: "#6B8297",
  border: "#DCE6EF",
  alertSoft: "#FFE4DC",
  warnSoft: "#FFF0C8",
  successSoft: "#DDF5EA",
  adminAccent: "#E5EAFF",
  navyLight: "#1A3A6B",
};

// ─── Balu Mascot SVG ──────────────────────────────────────────────────────────
function BaluBear({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <ellipse cx="60" cy="85" rx="36" ry="32" fill="white" stroke={N.navy} strokeWidth="2.5" />
      {/* Head */}
      <circle cx="60" cy="52" r="30" fill="white" stroke={N.navy} strokeWidth="2.5" />
      {/* Ears */}
      <circle cx="33" cy="28" r="11" fill="white" stroke={N.navy} strokeWidth="2.5" />
      <circle cx="33" cy="28" r="6" fill={N.mint} />
      <circle cx="87" cy="28" r="11" fill="white" stroke={N.navy} strokeWidth="2.5" />
      <circle cx="87" cy="28" r="6" fill={N.mint} />
      {/* Eyes */}
      <circle cx="50" cy="50" r="4" fill={N.navy} />
      <circle cx="70" cy="50" r="4" fill={N.navy} />
      <circle cx="51.5" cy="48.5" r="1.5" fill="white" />
      <circle cx="71.5" cy="48.5" r="1.5" fill="white" />
      {/* Nose */}
      <ellipse cx="60" cy="59" rx="5" ry="3.5" fill={N.navy} />
      {/* Mouth */}
      <path
        d="M55 63 Q60 68 65 63"
        stroke={N.navy}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bandana */}
      <path
        d="M38 82 Q60 72 82 82 L78 95 Q60 88 42 95 Z"
        fill={N.mint}
        stroke={N.navy}
        strokeWidth="1.5"
      />
    </svg>
  );
}

// ─── Mini Bear for sidebar ─────────────────────────────────────────────────────
function BaluLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <BaluBear size={36} />
      <div>
        <div className="text-white font-bold text-lg leading-none tracking-tight">Balu</div>
        <div
          className="text-[10px] tracking-widest uppercase"
          style={{ color: N.mint, opacity: 0.85 }}
        >
          Clínica
        </div>
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function Badge({
  label,
  color,
}: {
  label: string;
  color: "green" | "yellow" | "red" | "blue" | "gray";
}) {
  const map = {
    green: { bg: N.successSoft, text: "#276749" },
    yellow: { bg: N.warnSoft, text: "#744210" },
    red: { bg: N.alertSoft, text: "#9B2C2C" },
    blue: { bg: N.adminAccent, text: "#2B4C8C" },
    gray: { bg: "#EDF2F7", text: N.textSec },
  };
  const { bg, text } = map[color];
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: bg, color: text }}
    >
      {label}
    </span>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
interface SidebarItem {
  icon: React.ElementType;
  label: string;
  screen: Screen;
}

function Sidebar({
  role,
  current,
  onNav,
  onLogout,
}: {
  role: Role;
  current: Screen;
  onNav: (s: Screen) => void;
  onLogout: () => void;
}) {
  const receptionItems: SidebarItem[] = [
    { icon: Calendar, label: "Agenda", screen: "r-agenda" },
    { icon: UserCheck, label: "Check-in", screen: "r-checkin" },
    { icon: Users, label: "Tutores", screen: "r-tutores" },
    { icon: RotateCcw, label: "Retornos", screen: "r-retornos" },
  ];
  const vetItems: SidebarItem[] = [
    { icon: Clock, label: "Fila", screen: "v-fila" },
    { icon: Stethoscope, label: "Consulta", screen: "v-consulta" },
    { icon: Pill, label: "Prescrições", screen: "v-prescricao" },
    { icon: FileText, label: "Histórico", screen: "v-historico" },
  ];
  const adminItems: SidebarItem[] = [
    { icon: Activity, label: "Visão Geral", screen: "a-visao" },
    { icon: Calendar, label: "Recepção", screen: "r-agenda" },
    { icon: Stethoscope, label: "Atendimento", screen: "v-fila" },
    { icon: Users, label: "Funcionários", screen: "a-funcionarios" },
    { icon: Shield, label: "Permissões", screen: "a-permissoes" },
    { icon: BarChart2, label: "Relatórios", screen: "a-relatorios" },
    { icon: Settings, label: "Configurações", screen: "a-config" },
  ];

  const items = role === "reception" ? receptionItems : role === "vet" ? vetItems : adminItems;
  const user =
    role === "reception"
      ? { name: "Ana Costa", title: "Recepção" }
      : role === "vet"
        ? { name: "Dr. Lucas Melo", title: "Veterinário" }
        : { name: "Maria Souza", title: "Administradora" };

  const firstActiveIndex = items.findIndex((i) => i.screen === current);

  return (
    <aside className="flex flex-col h-full w-60 shrink-0" style={{ background: N.navy }}>
      {/* Logo */}
      <div className="px-5 py-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <BaluLogo />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
        {items.map((item, idx) => {
          const active = idx === firstActiveIndex;
          return (
            <button
              key={item.label}
              onClick={() => onNav(item.screen)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background: active ? "rgba(178,245,234,0.15)" : "transparent",
                color: active ? N.mint : "rgba(255,255,255,0.6)",
                borderLeft: active ? `3px solid ${N.mint}` : "3px solid transparent",
              }}
            >
              <item.icon size={17} />
              {item.label}
              {active && <ChevronRight size={14} className="ml-auto" style={{ color: N.mint }} />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ background: N.mint, color: N.navy }}
          >
            {user.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-semibold truncate">{user.name}</div>
            <div className="text-[10px] truncate" style={{ color: "rgba(255,255,255,0.45)" }}>
              {user.title}
            </div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all hover:bg-white/10"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <LogOut size={14} />
          Sair
        </button>
      </div>
    </aside>
  );
}

// ─── Top Header ───────────────────────────────────────────────────────────────
function TopBar({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const isReceptionHelp = ["Agenda", "Tutor", "Check-in", "Retorno"].some((term) =>
    title.includes(term),
  );
  const isCareHelp = ["Consulta", "Fila", "Prescri", "Histórico", "Vacina"].some((term) =>
    title.includes(term),
  );
  const helpArea = isReceptionHelp ? "Recepção" : isCareHelp ? "Atendimento" : "Administração";
  const helpText = isCareHelp
    ? "Confira o paciente antes de abrir o prontuário, registre a conduta e salve as alterações antes de encerrar."
    : isReceptionHelp
      ? "Use a busca para buscar tutor, pet ou atendimento. Os filtros e contadores ajudam a confirmar o resultado antes de continuar."
      : "Use os indicadores para acompanhar a clínica e abra métricas adicionais quando precisar de mais detalhes.";

  return (
    <div
      className="flex items-center justify-between px-7 py-4 bg-white border-b relative"
      style={{ borderColor: N.border }}
    >
      <div>
        <h1 className="font-bold text-lg leading-tight" style={{ color: N.textMain }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs mt-0.5" style={{ color: N.textSec }}>
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {actions}
        <button
          onClick={() => setOpenHelp(true)}
          className="px-3 py-2 rounded-xl border text-xs font-semibold"
          style={{ borderColor: N.border, color: N.navy }}
        >
          Ajuda
        </button>
        <div className="relative">
          <button
            onClick={() => setOpenNotifications(!openNotifications)}
            className="relative p-2 rounded-xl hover:bg-gray-50 transition-colors"
            style={{ color: N.textSec }}
            title="Notificações da Clínica"
          >
            <Bell size={18} />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: "#E53E3E" }}
            />
          </button>
          {openNotifications && (
            <div
              className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border p-4 z-50"
              style={{ borderColor: N.border }}
            >
              <div
                className="flex items-center justify-between border-b pb-2 mb-3"
                style={{ borderColor: N.border }}
              >
                <span className="font-bold text-sm" style={{ color: N.textMain }}>
                  Notificações da Clínica
                </span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: N.mintSoft, color: "#065f46" }}
                >
                  3 Novas
                </span>
              </div>
              <div className="space-y-3">
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-xs font-semibold" style={{ color: N.textMain }}>
                    ⚠️ Retorno de vacina em atraso
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: N.textSec }}>
                    Pet Thor (Tutor: Carlos) precisa agendar reforço V10.
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-xs font-semibold" style={{ color: N.textMain }}>
                    ✓ Novo agendamento confirmado
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: N.textSec }}>
                    Consulta de rotina marcada para 15:30h (Dr. André).
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-xs font-semibold" style={{ color: N.textMain }}>
                    ℹ️ Lembrete de Estoque
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: N.textSec }}>
                    Estoque de Vermífugo abaixo do limite mínimo.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {openHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            role="dialog"
            aria-labelledby="context-help-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h2 id="context-help-title" className="font-bold" style={{ color: N.textMain }}>
              Ajuda {helpArea === "Atendimento" ? "do" : "da"} {helpArea}
            </h2>
            <p className="mt-3 text-sm" style={{ color: N.textSec }}>
              {helpText}
            </p>
            <button
              onClick={() => setOpenHelp(false)}
              className="mt-5 w-full rounded-xl py-2.5 text-sm font-bold text-white"
              style={{ background: N.navy }}
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({
  label,
  value,
  sub,
  color,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  icon: React.ElementType;
}) {
  return (
    <div
      className="bg-white rounded-2xl p-5 border flex items-start gap-4"
      style={{ borderColor: N.border }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: color + "22" }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <div className="text-2xl font-bold leading-tight" style={{ color: N.textMain }}>
          {value}
        </div>
        <div className="text-xs font-medium mt-0.5" style={{ color: N.textSec }}>
          {label}
        </div>
        {sub && (
          <div className="text-[11px] mt-1" style={{ color: N.textSec }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Screen: Login ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (role: Role) => void }) {
  const [loading, setLoading] = useState<Role | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotModal, setForgotModal] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const simulate = (role: Role) => {
    const nextErrors = {
      email: /\S+@\S+\.\S+/.test(email) ? undefined : "Informe um e-mail válido.",
      password: password.trim() ? undefined : "Informe sua senha.",
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;
    setLoading(role);
    setTimeout(() => {
      setLoading(null);
      onLogin(role);
    }, 800);
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {forgotModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border"
            style={{ borderColor: N.border }}
          >
            <h3 className="font-extrabold text-lg mb-2" style={{ color: N.textMain }}>
              Recuperação de Senha
            </h3>
            <p className="text-xs mb-4" style={{ color: N.textSec }}>
              Para redefinir sua senha de acesso ao sistema da clínica, entre em contato diretamente
              com o **Administrador da Clínica** ou com o suporte pelo e-mail:{" "}
              <b>suporte@baluclinica.com.br</b>.
            </p>
            <button
              onClick={() => setForgotModal(false)}
              className="w-full py-2.5 rounded-xl font-bold text-xs"
              style={{ background: N.navy, color: "white" }}
            >
              Entendido
            </button>
          </div>
        </div>
      )}

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
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "login-email-error" : undefined}
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
                {errors.email && (
                  <p id="login-email-error" className="mt-1 text-xs text-red-700">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold" style={{ color: N.textMain }}>
                    Senha
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotModal(true)}
                    className="text-xs font-semibold hover:underline"
                    style={{ color: N.navy }}
                  >
                    Esqueci minha senha
                  </button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "login-password-error" : undefined}
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
                {errors.password && (
                  <p id="login-password-error" className="mt-1 text-xs text-red-700">
                    {errors.password}
                  </p>
                )}
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
function SearchInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="relative">
      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2"
        style={{ color: N.textSec }}
      />
      <input
        className="pl-9 pr-4 py-2 rounded-xl border text-sm bg-white outline-none w-56"
        placeholder={placeholder ?? "Buscar..."}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        style={{ borderColor: N.border, color: N.textMain, fontFamily: "inherit" }}
      />
    </div>
  );
}

// ─── Screen: Recepção / Agenda ────────────────────────────────────────────────
const agendaData = [
  {
    time: "08:00",
    pet: "Thor",
    tutor: "Carlos Lima",
    species: "Cão · Golden",
    service: "Consulta Geral",
    status: "Confirmado",
    vet: "Dr. Lucas",
  },
  {
    time: "08:30",
    pet: "Luna",
    tutor: "Fernanda Reis",
    species: "Gato · Siamês",
    service: "Vacinação",
    status: "Aguardando",
    vet: "Dr. Lucas",
  },
  {
    time: "09:00",
    pet: "Max",
    tutor: "Bruno Alves",
    species: "Cão · Labrador",
    service: "Retorno",
    status: "Em atendimento",
    vet: "Dra. Carla",
  },
  {
    time: "09:30",
    pet: "Mel",
    tutor: "Patrícia Nunes",
    species: "Cão · Poodle",
    service: "Consulta Geral",
    status: "Atrasado",
    vet: "Dr. Lucas",
  },
  {
    time: "10:00",
    pet: "Nina",
    tutor: "Roberto Silva",
    species: "Gato · Maine Coon",
    service: "Exames",
    status: "Confirmado",
    vet: "Dra. Carla",
  },
  {
    time: "10:30",
    pet: "Bob",
    tutor: "Ana Santos",
    species: "Cão · Beagle",
    service: "Vacinação",
    status: "Aguardando",
    vet: "Dr. Lucas",
  },
  {
    time: "11:00",
    pet: "Kiki",
    tutor: "Paulo Mendes",
    species: "Coelho",
    service: "Consulta Geral",
    status: "Confirmado",
    vet: "Dra. Carla",
  },
];

function statusColor(s: string): "green" | "yellow" | "red" | "blue" | "gray" {
  if (s === "Confirmado") return "green";
  if (s === "Aguardando") return "yellow";
  if (s === "Em atendimento") return "blue";
  if (s === "Atrasado") return "red";
  return "gray";
}

function ReceptionAgenda({ onNav }: { onNav: (s: Screen) => void }) {
  const [selected, setSelected] = useState(0);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");

  const filtered = agendaData.filter((item) => {
    const matchesSearch =
      item.pet.toLowerCase().includes(search.toLowerCase()) ||
      item.tutor.toLowerCase().includes(search.toLowerCase()) ||
      item.service.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "Todos" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sel = filtered[selected] || agendaData[0];

  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar
        title="Agenda do Dia"
        subtitle="Segunda-feira, 21 de julho de 2026"
        actions={
          <>
            <div className="relative">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
                size={15}
                style={{ color: N.textSec }}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar pet, tutor ou serviço..."
                className="pl-9 pr-4 py-2 rounded-xl border text-xs outline-none w-64"
                style={{ borderColor: N.border, color: N.textMain, background: N.canvas }}
              />
            </div>
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: N.navy }}
            >
              <Plus size={15} /> Novo cadastro
            </button>
          </>
        }
      />

      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-4 px-7 py-5">
        {[
          { label: "Agendados hoje", value: "24", icon: Calendar, color: N.navy },
          { label: "Aguardando", value: "5", icon: Clock, color: "#D69E2E" },
          { label: "Em atendimento", value: "3", icon: Stethoscope, color: "#2B6CB0" },
          { label: "Atrasados", value: "2", icon: AlertCircle, color: "#C53030" },
        ].map((p) => (
          <KpiCard key={p.label} {...p} sub="" />
        ))}
      </div>

      {/* Main area */}
      <div className="flex gap-5 px-7 pb-6 flex-1 overflow-hidden">
        {/* Table */}
        <div
          className="flex-1 bg-white rounded-2xl border overflow-hidden flex flex-col"
          style={{ borderColor: N.border }}
        >
          <div
            className="px-5 py-3.5 border-b flex items-center justify-between"
            style={{ borderColor: N.border }}
          >
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm" style={{ color: N.textMain }}>
                Consultas do dia
              </h3>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-bold"
                style={{ background: N.mintSoft, color: "#065f46" }}
              >
                {filtered.length} exibidos
              </span>
            </div>
            <div className="flex gap-2">
              {["Todos", "Aguardando", "Em atendimento", "Confirmado", "Atrasado"].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className="text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all"
                  style={{
                    borderColor: filterStatus === st ? N.navy : N.border,
                    background: filterStatus === st ? N.navy : "white",
                    color: filterStatus === st ? "white" : N.textSec,
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left" style={{ borderColor: N.border }}>
                  {["Horário", "Pet", "Tutor", "Serviço", "Status", "Veterinário", "Ação"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-xs font-semibold uppercase tracking-wide"
                        style={{ color: N.textSec }}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelected(i)}
                    className="border-b cursor-pointer transition-colors hover:bg-[#F7FAFC]"
                    style={{
                      borderColor: N.border,
                      background: selected === i ? N.mintSoft : undefined,
                    }}
                  >
                    <td
                      className="px-5 py-3 font-mono text-xs font-semibold"
                      style={{ color: N.navy }}
                    >
                      {row.time}
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-semibold text-sm" style={{ color: N.textMain }}>
                        {row.pet}
                      </div>
                      <div className="text-xs" style={{ color: N.textSec }}>
                        {row.species}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm" style={{ color: N.textMain }}>
                      {row.tutor}
                    </td>
                    <td className="px-5 py-3 text-sm" style={{ color: N.textSec }}>
                      {row.service}
                    </td>
                    <td className="px-5 py-3">
                      <Badge label={row.status} color={statusColor(row.status)} />
                    </td>
                    <td className="px-5 py-3 text-xs" style={{ color: N.textSec }}>
                      {row.vet}
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => onNav("r-checkin")}
                        className="text-xs px-3 py-1.5 rounded-lg font-semibold text-white"
                        style={{ background: N.navy }}
                      >
                        Check-in
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side panel */}
        <div className="w-72 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <div className="flex items-center gap-2 mb-4">
              <PawPrint size={15} style={{ color: N.navy }} />
              <h4 className="font-semibold text-sm" style={{ color: N.textMain }}>
                Caso selecionado
              </h4>
            </div>
            <div
              className="flex items-center gap-3 mb-4 p-3 rounded-xl"
              style={{ background: N.mintSoft }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                style={{ background: N.mint, color: N.navy }}
              >
                {sel.pet[0]}
              </div>
              <div>
                <div className="font-bold" style={{ color: N.textMain }}>
                  {sel.pet}
                </div>
                <div className="text-xs" style={{ color: N.textSec }}>
                  {sel.species}
                </div>
              </div>
            </div>
            <div className="space-y-2 text-xs mb-4">
              <div className="flex justify-between">
                <span style={{ color: N.textSec }}>Tutor</span>
                <span className="font-medium" style={{ color: N.textMain }}>
                  {sel.tutor}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: N.textSec }}>Horário</span>
                <span className="font-medium" style={{ color: N.textMain }}>
                  {sel.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: N.textSec }}>Serviço</span>
                <span className="font-medium" style={{ color: N.textMain }}>
                  {sel.service}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: N.textSec }}>Vet.</span>
                <span className="font-medium" style={{ color: N.textMain }}>
                  {sel.vet}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => onNav("r-checkin")}
                className="w-full py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: N.navy }}
              >
                ✓ Confirmar chegada
              </button>
              <button
                onClick={() => onNav("r-tutores")}
                className="w-full py-2 rounded-xl text-sm font-medium border"
                style={{ borderColor: N.border, color: N.textMain }}
              >
                Buscar tutor
              </button>
              <button
                onClick={() => onNav("r-encaminhar")}
                className="w-full py-2 rounded-xl text-sm font-medium border"
                style={{ borderColor: N.border, color: N.textMain }}
              >
                Encaminhar ao vet.
              </button>
              <button
                onClick={() => onNav("r-retornos")}
                className="w-full py-2 rounded-xl text-sm font-medium border"
                style={{ borderColor: N.border, color: N.textMain }}
              >
                Marcar retorno
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <h4 className="font-semibold text-xs mb-3" style={{ color: N.textSec }}>
              NOTAS DA RECEPÇÃO
            </h4>
            <textarea
              className="w-full text-xs resize-none rounded-xl border p-3 outline-none"
              rows={4}
              placeholder="Observações para este caso..."
              style={{
                borderColor: N.border,
                color: N.textMain,
                fontFamily: "inherit",
                background: N.canvas,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Check-in ─────────────────────────────────────────────────────────
function ReceptionCheckin({ onNav }: { onNav: (s: Screen) => void }) {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar title="Check-in" subtitle="Confirmar chegada do tutor e pet" />
      <div className="flex gap-5 px-7 py-6 flex-1">
        {/* Main */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Appointment context */}
          <div className="bg-white rounded-2xl border p-6" style={{ borderColor: N.border }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-base" style={{ color: N.textMain }}>
                Agendamento
              </h3>
              <Badge label="Aguardando" color="yellow" />
            </div>
            <div className="grid grid-cols-3 gap-6">
              {/* Tutor */}
              <div>
                <div
                  className="text-xs font-semibold uppercase tracking-wide mb-2"
                  style={{ color: N.textSec }}
                >
                  Tutor
                </div>
                <div
                  className="flex items-center gap-3 p-4 rounded-xl"
                  style={{ background: N.canvas }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                    style={{ background: N.adminAccent, color: "#2B4C8C" }}
                  >
                    C
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: N.textMain }}>
                      Carlos Lima
                    </div>
                    <div className="text-xs flex items-center gap-1" style={{ color: N.textSec }}>
                      <Phone size={10} /> (11) 99874-2211
                    </div>
                  </div>
                </div>
              </div>
              {/* Pet */}
              <div>
                <div
                  className="text-xs font-semibold uppercase tracking-wide mb-2"
                  style={{ color: N.textSec }}
                >
                  Pet
                </div>
                <div
                  className="flex items-center gap-3 p-4 rounded-xl"
                  style={{ background: N.canvas }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg"
                    style={{ background: N.mintSoft, color: N.navy }}
                  >
                    T
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: N.textMain }}>
                      Thor
                    </div>
                    <div className="text-xs" style={{ color: N.textSec }}>
                      Cão · Golden · 4 anos · Macho
                    </div>
                  </div>
                </div>
              </div>
              {/* Service */}
              <div>
                <div
                  className="text-xs font-semibold uppercase tracking-wide mb-2"
                  style={{ color: N.textSec }}
                >
                  Serviço
                </div>
                <div className="p-4 rounded-xl" style={{ background: N.canvas }}>
                  <div className="font-semibold text-sm mb-1" style={{ color: N.textMain }}>
                    Consulta Geral
                  </div>
                  <div className="text-xs" style={{ color: N.textSec }}>
                    08:00 · Dr. Lucas Melo
                  </div>
                  <div className="text-xs mt-1" style={{ color: N.textSec }}>
                    Duração estimada: 30 min
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white rounded-2xl border p-6" style={{ borderColor: N.border }}>
            <h3 className="font-bold text-sm mb-4" style={{ color: N.textMain }}>
              Checklist de chegada
            </h3>
            <div className="space-y-3">
              {[
                { label: "Tutor identificado e confirmado", done: true },
                { label: "Pet identificado e presente", done: true },
                { label: "Horário verificado", done: true },
                { label: "Documentos em ordem", done: false },
                { label: "Pagamento pendência verificada", done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center border-2 shrink-0"
                    style={{
                      borderColor: item.done ? "#276749" : N.border,
                      background: item.done ? N.successSoft : "transparent",
                    }}
                  >
                    {item.done && <Check size={11} style={{ color: "#276749" }} />}
                  </div>
                  <span className="text-sm" style={{ color: item.done ? N.textMain : N.textSec }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => setConfirmed(true)}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all"
              style={{ background: confirmed ? "#276749" : N.navy }}
            >
              <Check size={16} /> {confirmed ? "Chegada Confirmada!" : "Confirmar Chegada"}
            </button>
            <button
              className="px-5 py-3 rounded-xl text-sm font-medium border"
              style={{ borderColor: N.border, color: N.textSec }}
            >
              Colocar em espera
            </button>
            <button
              onClick={() => onNav("r-encaminhar")}
              className="px-5 py-3 rounded-xl text-sm font-semibold"
              style={{ background: N.mintSoft, color: N.navy }}
            >
              Encaminhar ao vet. →
            </button>
            <button
              className="px-5 py-3 rounded-xl text-sm font-medium border"
              style={{ borderColor: "#FCA5A5", color: "#C53030" }}
            >
              <X size={15} className="inline mr-1" />
              Cancelar
            </button>
          </div>
        </div>

        {/* Notes panel */}
        <div className="w-72 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <h4 className="font-semibold text-sm mb-3" style={{ color: N.textMain }}>
              Notas rápidas
            </h4>
            <textarea
              className="w-full text-xs resize-none rounded-xl border p-3 outline-none"
              rows={5}
              placeholder="Observações para a recepção..."
              style={{
                borderColor: N.border,
                color: N.textMain,
                fontFamily: "inherit",
                background: N.canvas,
              }}
            />
            <div
              className="mt-3 p-3 rounded-xl text-xs"
              style={{ background: N.warnSoft, color: "#744210" }}
            >
              <AlertCircle size={11} className="inline mr-1" />
              Thor tem alergia a dipirona — informar ao veterinário.
            </div>
          </div>
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <h4
              className="font-semibold text-xs mb-3 uppercase tracking-wide"
              style={{ color: N.textSec }}
            >
              Histórico recente
            </h4>
            <div className="space-y-2">
              {[
                "Vacinação V10 — 14/04/26",
                "Consulta geral — 02/02/26",
                "Retorno pós-cirurgia — 18/12/25",
              ].map((h) => (
                <div
                  key={h}
                  className="flex items-center gap-2 text-xs"
                  style={{ color: N.textSec }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: N.mint }}
                  />
                  {h}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Tutores ──────────────────────────────────────────────────────────
function ReceptionTutores() {
  const [query, setQuery] = useState("Carlos");
  const [selected, setSelected] = useState(0);
  const results = [
    {
      name: "Carlos Lima",
      cpf: "123.456.789-00",
      phone: "(11) 99874-2211",
      email: "carlos@email.com",
      pets: 2,
      petNames: ["Thor", "Mia"],
    },
    {
      name: "Carla Mendes",
      cpf: "987.654.321-00",
      phone: "(11) 91234-5678",
      email: "carla@email.com",
      pets: 1,
      petNames: ["Luna"],
    },
  ];
  const normalizedQuery = query.toLocaleLowerCase("pt-BR").trim();
  const filteredResults = results
    .map((result, index) => ({ result, index }))
    .filter(({ result }) =>
      [result.name, result.cpf, result.phone, result.email, ...result.petNames].some((value) =>
        value.toLocaleLowerCase("pt-BR").includes(normalizedQuery),
      ),
    );
  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar
        title="Buscar ou Cadastrar Tutor"
        subtitle="Localizar tutor existente ou registrar novo"
      />
      <div className="flex gap-5 px-7 py-6 flex-1 overflow-hidden">
        {/* Left: search */}
        <div className="w-[42%] flex flex-col gap-4">
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <h3 className="font-semibold text-sm mb-3" style={{ color: N.textMain }}>
              Buscar tutor
            </h3>
            <div className="relative mb-4">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: N.textSec }}
              />
              <input
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nome, CPF, telefone ou e-mail..."
                style={{
                  borderColor: N.border,
                  color: N.textMain,
                  fontFamily: "inherit",
                  background: N.canvas,
                }}
              />
            </div>
            <p className="mb-3 text-xs" style={{ color: N.textSec }} aria-live="polite">
              {filteredResults.length}{" "}
              {filteredResults.length === 1 ? "tutor encontrado" : "tutores encontrados"}
            </p>
            <div className="space-y-2">
              {filteredResults.map(({ result: r, index: i }) => (
                <div
                  key={i}
                  onClick={() => setSelected(i)}
                  className="p-4 rounded-xl border cursor-pointer transition-all"
                  style={{
                    borderColor: selected === i ? N.navy : N.border,
                    background: selected === i ? N.mintSoft : N.canvas,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-bold"
                      style={{ background: N.adminAccent, color: "#2B4C8C" }}
                    >
                      {r.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm" style={{ color: N.textMain }}>
                        {r.name}
                      </div>
                      <div className="text-xs" style={{ color: N.textSec }}>
                        {r.cpf} · {r.phone}
                      </div>
                    </div>
                    <Badge label={`${r.pets} pet${r.pets > 1 ? "s" : ""}`} color="blue" />
                  </div>
                </div>
              ))}
            </div>
            {selected >= 0 && (
              <button
                className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: N.navy }}
              >
                <Check size={14} className="inline mr-1.5" />
                Selecionar este tutor
              </button>
            )}
          </div>

          {/* Pets do tutor */}
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <h4 className="font-semibold text-sm mb-3" style={{ color: N.textMain }}>
              Pets de {results[selected]?.name}
            </h4>
            {[
              { name: "Thor", info: "Cão · Golden · 4 anos" },
              { name: "Mia", info: "Gato · Persa · 2 anos" },
            ].map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 p-3 rounded-xl mb-2"
                style={{ background: N.canvas }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                  style={{ background: N.mintSoft, color: N.navy }}
                >
                  {p.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: N.textMain }}>
                    {p.name}
                  </div>
                  <div className="text-xs" style={{ color: N.textSec }}>
                    {p.info}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: registration form */}
        <div className="flex-1 bg-white rounded-2xl border p-6" style={{ borderColor: N.border }}>
          <h3 className="font-semibold text-sm mb-5" style={{ color: N.textMain }}>
            Cadastrar novo tutor
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Nome completo", placeholder: "Nome do tutor", icon: Users },
              { label: "Telefone", placeholder: "(00) 00000-0000", icon: Phone },
              { label: "E-mail", placeholder: "email@exemplo.com", icon: Mail },
              { label: "CPF", placeholder: "000.000.000-00", icon: CreditCard },
            ].map(({ label, placeholder, icon: Icon }) => (
              <div key={label}>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: N.textMain }}>
                  {label}
                </label>
                <div className="relative">
                  <Icon
                    size={13}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: N.textSec }}
                  />
                  <input
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm outline-none"
                    placeholder={placeholder}
                    style={{
                      borderColor: N.border,
                      color: N.textMain,
                      fontFamily: "inherit",
                      background: N.canvas,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: N.textMain }}>
              Endereço
            </label>
            <div className="relative">
              <MapPin
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: N.textSec }}
              />
              <input
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm outline-none"
                placeholder="Rua, número, bairro, cidade"
                style={{
                  borderColor: N.border,
                  color: N.textMain,
                  fontFamily: "inherit",
                  background: N.canvas,
                }}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: N.navy }}
            >
              Salvar novo tutor
            </button>
            <button
              className="px-5 py-3 rounded-xl text-sm border font-medium"
              style={{ borderColor: N.border, color: N.textSec }}
            >
              Limpar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Vincular Pet ─────────────────────────────────────────────────────
function ReceptionVincular() {
  const [selectedPet, setSelectedPet] = useState<number | null>(0);
  const pets = [
    { name: "Thor", info: "Cão · Golden · 4 anos · Macho", linked: true },
    { name: "Mia", info: "Gato · Persa · 2 anos · Fêmea", linked: false },
  ];
  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar
        title="Vincular Pet à Clínica"
        subtitle="Associar tutor, pet e clínica para o atendimento"
      />
      <div className="px-7 py-4">
        <div
          className="flex items-center gap-4 p-4 bg-white rounded-2xl border"
          style={{ borderColor: N.border }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
            style={{ background: N.adminAccent, color: "#2B4C8C" }}
          >
            C
          </div>
          <div>
            <div className="font-bold text-sm" style={{ color: N.textMain }}>
              Carlos Lima
            </div>
            <div className="text-xs" style={{ color: N.textSec }}>
              CPF: 123.456.789-00 · (11) 99874-2211
            </div>
          </div>
          <Badge label="Tutor selecionado" color="green" />
        </div>
      </div>
      <div className="flex gap-5 px-7 pb-6 flex-1">
        {/* Pets existentes */}
        <div className="w-80 flex flex-col gap-3">
          <h3 className="font-semibold text-sm" style={{ color: N.textMain }}>
            Pets deste tutor
          </h3>
          {pets.map((p, i) => (
            <div
              key={i}
              onClick={() => setSelectedPet(i)}
              className="bg-white rounded-2xl border p-5 cursor-pointer transition-all"
              style={{
                borderColor: selectedPet === i ? N.navy : N.border,
                boxShadow: selectedPet === i ? `0 0 0 2px ${N.navy}22` : "none",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg"
                  style={{ background: N.mintSoft, color: N.navy }}
                >
                  {p.name[0]}
                </div>
                <div>
                  <div className="font-bold" style={{ color: N.textMain }}>
                    {p.name}
                  </div>
                  <div className="text-xs" style={{ color: N.textSec }}>
                    {p.info}
                  </div>
                </div>
              </div>
              {selectedPet === i && (
                <button
                  className="w-full py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: N.navy }}
                >
                  <Check size={14} className="inline mr-1" />
                  Vincular este pet
                </button>
              )}
            </div>
          ))}
        </div>

        {/* New pet form */}
        <div className="flex-1 bg-white rounded-2xl border p-6" style={{ borderColor: N.border }}>
          <h3 className="font-semibold text-sm mb-5" style={{ color: N.textMain }}>
            Cadastrar e vincular novo pet
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Nome do pet", placeholder: "Ex: Thor" },
              { label: "Espécie", placeholder: "Cão, Gato, Coelho..." },
              { label: "Raça", placeholder: "Ex: Golden Retriever" },
              { label: "Idade", placeholder: "Ex: 4 anos" },
            ].map(({ label, placeholder }) => (
              <div key={label}>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: N.textMain }}>
                  {label}
                </label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                  placeholder={placeholder}
                  style={{
                    borderColor: N.border,
                    color: N.textMain,
                    fontFamily: "inherit",
                    background: N.canvas,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold mb-2" style={{ color: N.textMain }}>
              Sexo
            </label>
            <div className="flex gap-3">
              {["Macho", "Fêmea"].map((s) => (
                <button
                  key={s}
                  className="px-5 py-2 rounded-xl border text-sm font-medium"
                  style={{ borderColor: N.navy, color: N.navy, background: N.mintSoft }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: N.textMain }}>
              Alertas ou observações iniciais
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
              rows={3}
              placeholder="Alergias, condições especiais, histórico relevante..."
              style={{
                borderColor: N.border,
                color: N.textMain,
                fontFamily: "inherit",
                background: N.canvas,
              }}
            />
          </div>
          <div className="flex gap-3 mt-5">
            <button
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: N.navy }}
            >
              <Plus size={14} className="inline mr-1.5" />
              Cadastrar e vincular
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Encaminhar ───────────────────────────────────────────────────────
function ReceptionEncaminhar({ onNav }: { onNav: (s: Screen) => void }) {
  const [priority, setPriority] = useState("Normal");
  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar
        title="Encaminhar ao Veterinário"
        subtitle="Confirmar e enviar o caso para atendimento clínico"
      />
      <div className="flex gap-5 px-7 py-6 flex-1">
        <div className="flex-1 flex flex-col gap-4">
          {/* Summary */}
          <div className="bg-white rounded-2xl border p-6" style={{ borderColor: N.border }}>
            <h3 className="font-semibold text-sm mb-4" style={{ color: N.textMain }}>
              Resumo do caso
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Tutor", val: "Carlos Lima" },
                { label: "Pet", val: "Thor · Golden · 4a" },
                { label: "Serviço", val: "Consulta Geral" },
                { label: "Status", val: "Chegada confirmada" },
              ].map(({ label, val }) => (
                <div key={label} className="p-3 rounded-xl" style={{ background: N.canvas }}>
                  <div className="text-xs" style={{ color: N.textSec }}>
                    {label}
                  </div>
                  <div className="font-semibold text-sm mt-0.5" style={{ color: N.textMain }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div className="bg-white rounded-2xl border p-6" style={{ borderColor: N.border }}>
            <h3 className="font-semibold text-sm mb-4" style={{ color: N.textMain }}>
              Prioridade e observações
            </h3>
            <div className="flex gap-3 mb-4">
              {["Urgente", "Alta", "Normal", "Baixa"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold border transition-all"
                  style={{
                    borderColor: priority === p ? N.navy : N.border,
                    background: priority === p ? N.navy : "white",
                    color: priority === p ? "white" : N.textSec,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
            <textarea
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
              rows={3}
              placeholder="Observação para o veterinário (opcional)..."
              style={{
                borderColor: N.border,
                color: N.textMain,
                fontFamily: "inherit",
                background: N.canvas,
              }}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onNav("v-fila")}
              className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2"
              style={{ background: N.navy }}
            >
              <ArrowRight size={16} /> Encaminhar agora
            </button>
            <button
              onClick={() => onNav("r-agenda")}
              className="px-6 py-3.5 rounded-xl text-sm border font-medium"
              style={{ borderColor: N.border, color: N.textSec }}
            >
              Voltar para recepção
            </button>
          </div>
        </div>

        {/* Vet queue */}
        <div className="w-64 bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
          <h4 className="font-semibold text-sm mb-4" style={{ color: N.textMain }}>
            Fila atual
          </h4>
          <div className="space-y-3">
            {[
              { name: "Luna", vet: "Dr. Lucas", status: "Em espera" },
              { name: "Rex", vet: "Dra. Carla", status: "Em atendimento" },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-xl" style={{ background: N.canvas }}>
                <div className="font-semibold text-sm" style={{ color: N.textMain }}>
                  {item.name}
                </div>
                <div className="text-xs" style={{ color: N.textSec }}>
                  {item.vet}
                </div>
                <Badge
                  label={item.status}
                  color={item.status === "Em atendimento" ? "blue" : "yellow"}
                />
              </div>
            ))}
            <div
              className="p-3 rounded-xl border-2 border-dashed text-center"
              style={{ borderColor: N.mint }}
            >
              <div className="text-xs font-semibold" style={{ color: N.navy }}>
                → Thor será adicionado aqui
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Retornos ─────────────────────────────────────────────────────────
function ReceptionRetornos() {
  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar title="Marcar Retorno" subtitle="Agendar retorno pós-consulta do veterinário" />
      <div className="flex gap-5 px-7 py-6 flex-1">
        <div className="flex-1 flex flex-col gap-4">
          {/* Context */}
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <h3 className="font-semibold text-sm mb-3" style={{ color: N.textMain }}>
              Contexto anterior
            </h3>
            <div className="flex gap-4">
              <div className="flex-1 p-4 rounded-xl" style={{ background: N.mintSoft }}>
                <div className="text-xs font-semibold mb-1" style={{ color: N.textSec }}>
                  Pet
                </div>
                <div className="font-bold" style={{ color: N.textMain }}>
                  Thor
                </div>
                <div className="text-xs" style={{ color: N.textSec }}>
                  Carlos Lima · Consulta Geral
                </div>
              </div>
              <div className="flex-1 p-4 rounded-xl" style={{ background: N.canvas }}>
                <div className="text-xs font-semibold mb-1" style={{ color: N.textSec }}>
                  Consulta realizada
                </div>
                <div className="font-bold" style={{ color: N.textMain }}>
                  21/07/2026
                </div>
                <div className="text-xs" style={{ color: N.textSec }}>
                  Dr. Lucas Melo · 30 min
                </div>
              </div>
              <div className="flex-1 p-4 rounded-xl" style={{ background: N.canvas }}>
                <div className="text-xs font-semibold mb-1" style={{ color: N.textSec }}>
                  Orientação do vet.
                </div>
                <div className="font-bold text-sm" style={{ color: N.textMain }}>
                  Retorno em 15 dias
                </div>
                <div className="text-xs" style={{ color: N.textSec }}>
                  Verificar evolução pós-medicação
                </div>
              </div>
            </div>
          </div>

          {/* Date/time selection */}
          <div className="bg-white rounded-2xl border p-6" style={{ borderColor: N.border }}>
            <h3 className="font-semibold text-sm mb-4" style={{ color: N.textMain }}>
              Agendar retorno
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: N.textMain }}>
                  Data
                </label>
                <input
                  type="date"
                  defaultValue="2026-08-05"
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                  style={{
                    borderColor: N.border,
                    color: N.textMain,
                    fontFamily: "inherit",
                    background: N.canvas,
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: N.textMain }}>
                  Horário
                </label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                  style={{
                    borderColor: N.border,
                    color: N.textMain,
                    fontFamily: "inherit",
                    background: N.canvas,
                  }}
                >
                  {["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: N.textMain }}>
                  Veterinário
                </label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                  style={{
                    borderColor: N.border,
                    color: N.textMain,
                    fontFamily: "inherit",
                    background: N.canvas,
                  }}
                >
                  <option>Dr. Lucas Melo</option>
                  <option>Dra. Carla Ramos</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: N.textMain }}>
                  Motivo do retorno
                </label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                  defaultValue="Verificação pós-medicação"
                  style={{
                    borderColor: N.border,
                    color: N.textMain,
                    fontFamily: "inherit",
                    background: N.canvas,
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: N.textMain }}>
                  Tipo de serviço
                </label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                  style={{
                    borderColor: N.border,
                    color: N.textMain,
                    fontFamily: "inherit",
                    background: N.canvas,
                  }}
                >
                  <option>Retorno</option>
                  <option>Consulta Geral</option>
                  <option>Exames</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-semibold mb-1.5" style={{ color: N.textMain }}>
                Notas da recepção
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                rows={2}
                placeholder="Informações adicionais para este retorno..."
                style={{
                  borderColor: N.border,
                  color: N.textMain,
                  fontFamily: "inherit",
                  background: N.canvas,
                }}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              className="flex-1 py-3 rounded-xl text-sm font-bold text-white"
              style={{ background: N.navy }}
            >
              <Check size={14} className="inline mr-1.5" />
              Confirmar Retorno
            </button>
            <button
              className="px-5 py-3 rounded-xl text-sm font-medium border"
              style={{ borderColor: N.border, color: N.textSec }}
            >
              Sugerir horários
            </button>
            <button
              className="px-5 py-3 rounded-xl text-sm border"
              style={{ borderColor: "#FCA5A5", color: "#C53030" }}
            >
              Cancelar
            </button>
          </div>
        </div>

        {/* Upcoming returns */}
        <div className="w-64 bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
          <h4 className="font-semibold text-sm mb-4" style={{ color: N.textMain }}>
            Retornos agendados
          </h4>
          <div className="space-y-3">
            {[
              { pet: "Luna", date: "23/07", service: "Retorno vacinação" },
              { pet: "Max", date: "28/07", service: "Pós-cirurgia" },
              { pet: "Mel", date: "05/08", service: "Exames" },
            ].map((r) => (
              <div key={r.pet} className="p-3 rounded-xl" style={{ background: N.canvas }}>
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-sm" style={{ color: N.textMain }}>
                    {r.pet}
                  </div>
                  <div className="text-xs font-mono font-semibold" style={{ color: N.navy }}>
                    {r.date}
                  </div>
                </div>
                <div className="text-xs mt-0.5" style={{ color: N.textSec }}>
                  {r.service}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Vet / Fila ───────────────────────────────────────────────────────
function VetFila({ onNav }: { onNav: (s: Screen) => void }) {
  const [selected, setSelected] = useState(0);
  const queue = [
    {
      name: "Thor",
      species: "Cão · Golden",
      tutor: "Carlos Lima",
      time: "08:00",
      status: "Aguardando",
      age: "4a",
      alert: "Alergia dipirona",
    },
    {
      name: "Luna",
      species: "Gato · Siamês",
      tutor: "Fernanda Reis",
      time: "08:30",
      status: "Em espera",
      age: "2a",
      alert: null,
    },
    {
      name: "Max",
      species: "Cão · Labrador",
      tutor: "Bruno Alves",
      time: "09:00",
      status: "Aguardando",
      age: "6a",
      alert: null,
    },
  ];
  const cur = queue[selected];

  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar
        title="Fila e Paciente Atual"
        subtitle="Segunda-feira, 21 de julho · Dr. Lucas Melo"
        actions={<SearchInput placeholder="Buscar paciente..." />}
      />
      <div className="flex gap-5 px-7 py-5 flex-1 overflow-hidden">
        {/* Queue list */}
        <div className="w-72 flex flex-col gap-3">
          <h3
            className="font-semibold text-xs uppercase tracking-wide"
            style={{ color: N.textSec }}
          >
            Pacientes do dia
          </h3>
          {queue.map((p, i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              className="bg-white rounded-2xl border p-4 cursor-pointer transition-all"
              style={{
                borderColor: selected === i ? N.navy : N.border,
                background: selected === i ? N.mintSoft : "white",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                  style={{ background: N.mintSoft, color: N.navy }}
                >
                  {p.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm" style={{ color: N.textMain }}>
                    {p.name}
                  </div>
                  <div className="text-xs truncate" style={{ color: N.textSec }}>
                    {p.species}
                  </div>
                  <div className="text-xs" style={{ color: N.textSec }}>
                    {p.tutor}
                  </div>
                </div>
                <div className="text-xs font-mono font-semibold" style={{ color: N.navy }}>
                  {p.time}
                </div>
              </div>
              {p.alert && (
                <div
                  className="mt-2 flex items-center gap-1 text-xs px-2 py-1 rounded-lg"
                  style={{ background: N.alertSoft, color: "#C53030" }}
                >
                  <AlertCircle size={10} />
                  {p.alert}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Current patient */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border p-6" style={{ borderColor: N.border }}>
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
                  style={{ background: N.mintSoft, color: N.navy }}
                >
                  {cur.name[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: N.textMain }}>
                    {cur.name}
                  </h2>
                  <div className="text-sm" style={{ color: N.textSec }}>
                    {cur.species} · {cur.age} · Tutor: {cur.tutor}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge label="Consulta Geral" color="blue" />
                    <Badge label={cur.status} color="yellow" />
                  </div>
                </div>
              </div>
              <button
                onClick={() => onNav("v-consulta")}
                className="px-6 py-3 rounded-xl text-sm font-bold text-white flex items-center gap-2"
                style={{ background: N.navy }}
              >
                <Stethoscope size={16} /> Iniciar consulta
              </button>
            </div>

            {cur.alert && (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl mb-4 text-sm font-medium"
                style={{ background: N.alertSoft, color: "#C53030" }}
              >
                <AlertCircle size={15} />
                <strong>Alerta:</strong> {cur.alert}
              </div>
            )}
          </div>

          {/* Clinical summary */}
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                title: "Alergias",
                content: cur.alert ?? "Nenhuma registrada",
                color: cur.alert ? N.alertSoft : N.successSoft,
                textColor: cur.alert ? "#C53030" : "#276749",
              },
              {
                title: "Vacinação",
                content: "V10 em dia · Antirrábica vencida em 03/2027",
                color: N.successSoft,
                textColor: "#276749",
              },
              {
                title: "Última consulta",
                content: "02/02/2026 · Consulta geral · Dr. Lucas",
                color: N.canvas,
                textColor: N.textSec,
              },
            ].map(({ title, content, color, textColor }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border p-4"
                style={{ borderColor: N.border }}
              >
                <div className="text-xs font-semibold mb-2" style={{ color: N.textSec }}>
                  {title}
                </div>
                <div
                  className="px-3 py-2 rounded-xl text-xs"
                  style={{ background: color, color: textColor }}
                >
                  {content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Vet / Consulta ───────────────────────────────────────────────────
function VetConsulta({ onNav }: { onNav: (s: Screen) => void }) {
  const [tab, setTab] = useState<"sintomas" | "diagnostico" | "conduta">("sintomas");
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar
        title="Consulta em Andamento"
        subtitle="Thor · Carlos Lima · Consulta Geral · 08:00"
        actions={
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold"
            style={{ background: "#DDF5EA", color: "#276749" }}
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Em atendimento
          </div>
        }
      />
      <div
        role="status"
        aria-label="Dados de simulação"
        className="mx-7 mt-4 rounded-xl border px-4 py-2 text-xs"
        style={{ background: N.warnSoft, borderColor: "#F6C453", color: "#744210" }}
      >
        Protótipo funcional: os dados deste atendimento são demonstrativos e não representam um
        prontuário real.
      </div>
      <div className="flex gap-5 px-7 py-5 flex-1 overflow-hidden">
        {/* Mini queue */}
        <div className="w-52 flex flex-col gap-2">
          <div
            className="text-xs font-semibold uppercase tracking-wide mb-1"
            style={{ color: N.textSec }}
          >
            Fila
          </div>
          {["Luna · 08:30", "Max · 09:00"].map((p) => (
            <div
              key={p}
              className="bg-white rounded-xl border px-4 py-3 text-xs"
              style={{ borderColor: N.border, color: N.textSec }}
            >
              {p}
            </div>
          ))}
        </div>

        {/* Main consultation */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Patient bar */}
          <div
            className="bg-white rounded-2xl border px-5 py-4 flex items-center gap-4"
            style={{ borderColor: N.border }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg"
              style={{ background: N.mintSoft, color: N.navy }}
            >
              T
            </div>
            <div className="flex-1">
              <div className="font-bold" style={{ color: N.textMain }}>
                Thor
              </div>
              <div className="text-xs" style={{ color: N.textSec }}>
                Cão · Golden · 4 anos · Macho · Tutor: Carlos Lima
              </div>
            </div>
            <div
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs"
              style={{ background: N.alertSoft, color: "#C53030" }}
            >
              <AlertCircle size={11} /> Alergia dipirona
            </div>
          </div>

          {/* Tabs */}
          <div
            className="bg-white rounded-2xl border flex-1 flex flex-col overflow-hidden"
            style={{ borderColor: N.border }}
          >
            <div className="flex border-b" style={{ borderColor: N.border }}>
              {(["sintomas", "diagnostico", "conduta"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-6 py-3.5 text-sm font-semibold capitalize border-b-2 transition-all"
                  style={{
                    borderBottomColor: tab === t ? N.navy : "transparent",
                    color: tab === t ? N.navy : N.textSec,
                    background: tab === t ? N.mintSoft : "transparent",
                  }}
                >
                  {t === "sintomas" ? "Sintomas" : t === "diagnostico" ? "Diagnóstico" : "Conduta"}
                </button>
              ))}
            </div>
            <div className="p-6 flex-1">
              {tab === "sintomas" && (
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-xs font-semibold mb-2"
                      style={{ color: N.textMain }}
                    >
                      Queixa principal
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                      rows={3}
                      placeholder="Descreva os sintomas relatados pelo tutor..."
                      defaultValue="Tutor relata que o animal apresenta inapetência há 3 dias, com vômitos esporádicos e letargia."
                      style={{
                        borderColor: N.border,
                        color: N.textMain,
                        fontFamily: "inherit",
                        background: N.canvas,
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold mb-2"
                      style={{ color: N.textMain }}
                    >
                      Exame físico
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                      rows={3}
                      placeholder="Temperatura, FC, FR, mucosas, linfonodos..."
                      defaultValue="Temp: 38.9°C · FC: 92 bpm · FR: 22 mrm · Mucosas hipocoradas · Linfonodos s/a"
                      style={{
                        borderColor: N.border,
                        color: N.textMain,
                        fontFamily: "inherit",
                        background: N.canvas,
                      }}
                    />
                  </div>
                </div>
              )}
              {tab === "diagnostico" && (
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-xs font-semibold mb-2"
                      style={{ color: N.textMain }}
                    >
                      Hipótese diagnóstica
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                      rows={3}
                      placeholder="Hipóteses diagnósticas..."
                      defaultValue="Gastroenterite aguda. Investigar possível causa infecciosa ou alimentar."
                      style={{
                        borderColor: N.border,
                        color: N.textMain,
                        fontFamily: "inherit",
                        background: N.canvas,
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold mb-2"
                      style={{ color: N.textMain }}
                    >
                      Diagnóstico definitivo
                    </label>
                    <input
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                      placeholder="CID ou descrição..."
                      style={{
                        borderColor: N.border,
                        color: N.textMain,
                        fontFamily: "inherit",
                        background: N.canvas,
                      }}
                    />
                  </div>
                </div>
              )}
              {tab === "conduta" && (
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-xs font-semibold mb-2"
                      style={{ color: N.textMain }}
                    >
                      Conduta clínica
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                      rows={4}
                      placeholder="Descreva a conduta adotada..."
                      defaultValue="Dieta branda por 5 dias. Medicação antiemética e protetor gástrico. Hidratação oral reforçada. Retorno em 7 dias para reavaliação."
                      style={{
                        borderColor: N.border,
                        color: N.textMain,
                        fontFamily: "inherit",
                        background: N.canvas,
                      }}
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => onNav("v-prescricao")}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold"
                      style={{ background: N.mintSoft, color: N.navy }}
                    >
                      <Pill size={14} className="inline mr-1.5" />
                      Prescrever medicação
                    </button>
                    <button
                      onClick={() => onNav("v-vacina")}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold"
                      style={{ background: N.mintSoft, color: N.navy }}
                    >
                      Cadastrar vacina
                    </button>
                    <button
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold"
                      style={{ background: N.adminAccent, color: "#2B4C8C" }}
                    >
                      Solicitar exame
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setSaved(true)}
              className="flex-1 py-3 rounded-xl text-sm font-bold text-white"
              style={{ background: N.navy }}
            >
              Salvar consulta
            </button>
            <button
              onClick={() => onNav("v-encerramento")}
              className="px-6 py-3 rounded-xl text-sm font-bold"
              style={{ background: N.mint, color: N.navy }}
            >
              Encerrar atendimento →
            </button>
          </div>
          {saved && (
            <div
              role="status"
              aria-label="Consulta salva"
              className="rounded-xl px-4 py-2 text-xs font-semibold"
              style={{ background: N.successSoft, color: "#276749" }}
            >
              Alterações salvas com sucesso.
            </div>
          )}
        </div>

        {/* Context panel */}
        <div className="w-64 flex flex-col gap-3">
          <div className="bg-white rounded-2xl border p-4" style={{ borderColor: N.border }}>
            <h4
              className="text-xs font-semibold mb-3 uppercase tracking-wide"
              style={{ color: N.textSec }}
            >
              Contexto do pet
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { label: "Alergias", val: "Dipirona", color: N.alertSoft, textColor: "#C53030" },
                { label: "Vacinas", val: "V10 em dia", color: N.successSoft, textColor: "#276749" },
                {
                  label: "Último exam.",
                  val: "Hemograma — Jan/26",
                  color: N.canvas,
                  textColor: N.textSec,
                },
              ].map(({ label, val, color, textColor }) => (
                <div key={label}>
                  <div className="font-semibold mb-0.5" style={{ color: N.textSec }}>
                    {label}
                  </div>
                  <div
                    className="px-2.5 py-1.5 rounded-lg"
                    style={{ background: color, color: textColor }}
                  >
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border p-4" style={{ borderColor: N.border }}>
            <h4
              className="text-xs font-semibold mb-3 uppercase tracking-wide"
              style={{ color: N.textSec }}
            >
              Obs. tutor
            </h4>
            <p className="text-xs italic" style={{ color: N.textSec }}>
              "Thor está muito quieto e não quis comer desde ontem à noite."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Vet / Prescrição ─────────────────────────────────────────────────
function VetPrescricao({ onNav }: { onNav: (s: Screen) => void }) {
  const [meds, setMeds] = useState([
    {
      name: "Metronidazol 250mg",
      dose: "1 comprimido",
      freq: "12/12h",
      days: "5 dias",
      obs: "Junto com alimentação",
    },
    {
      name: "Ranitidina 75mg",
      dose: "½ comprimido",
      freq: "12/12h",
      days: "7 dias",
      obs: "Em jejum",
    },
  ]);
  const [removeIndex, setRemoveIndex] = useState<number | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const confirmRemove = () => {
    if (removeIndex !== null) {
      setMeds(meds.filter((_, j) => j !== removeIndex));
      setRemoveIndex(null);
      triggerToast("Medicamento removido da prescrição.");
    }
  };

  return (
    <div className="flex flex-col h-full relative" style={{ background: N.canvas }}>
      <TopBar title="Prescrição Médica" subtitle="Thor · Dr. Lucas Melo · 21/07/2026" />

      {toastMsg && (
        <div className="absolute top-16 right-8 bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg z-50">
          ✓ {toastMsg}
        </div>
      )}

      {removeIndex !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border"
            style={{ borderColor: N.border }}
          >
            <h3 className="font-extrabold text-base mb-1.5" style={{ color: N.textMain }}>
              Remover Medicamento
            </h3>
            <p className="text-xs mb-4" style={{ color: N.textSec }}>
              Tem certeza que deseja remover <b>{meds[removeIndex]?.name}</b> da receita? Essa ação
              pode ser refeita adicionando o item novamente.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setRemoveIndex(null)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold border"
                style={{ borderColor: N.border, color: N.textSec }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmRemove}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-white"
                style={{ background: "#C53030" }}
              >
                Confirmar Remoção
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-5 px-7 py-5 flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col gap-4">
          {/* Patient */}
          <div
            className="bg-white rounded-2xl border px-5 py-3.5 flex items-center gap-4"
            style={{ borderColor: N.border }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
              style={{ background: N.mintSoft, color: N.navy }}
            >
              T
            </div>
            <div>
              <div className="font-bold text-sm" style={{ color: N.textMain }}>
                Thor · Cão · Golden · 4 anos · 32kg
              </div>
              <div className="text-xs" style={{ color: N.textSec }}>
                Tutor: Carlos Lima · CRMV: 12345-SP · Dr. Lucas Melo
              </div>
            </div>
          </div>

          {/* New medication */}
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <h3 className="font-semibold text-sm mb-4" style={{ color: N.textMain }}>
              Adicionar medicamento
            </h3>
            <div className="grid grid-cols-5 gap-3 items-end">
              <div className="col-span-2">
                <label className="block text-xs font-semibold mb-1.5" style={{ color: N.textMain }}>
                  Medicamento
                </label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                  placeholder="Nome ou princípio ativo..."
                  style={{
                    borderColor: N.border,
                    color: N.textMain,
                    fontFamily: "inherit",
                    background: N.canvas,
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: N.textMain }}>
                  Dosagem
                </label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                  placeholder="Ex: 1 comp."
                  style={{
                    borderColor: N.border,
                    color: N.textMain,
                    fontFamily: "inherit",
                    background: N.canvas,
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: N.textMain }}>
                  Frequência
                </label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                  style={{
                    borderColor: N.border,
                    color: N.textMain,
                    fontFamily: "inherit",
                    background: N.canvas,
                  }}
                >
                  {["8/8h", "12/12h", "24/24h", "SOS"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => triggerToast("Medicamento adicionado à prescrição.")}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-1.5 justify-center"
                style={{ background: N.navy }}
              >
                <Plus size={14} />
                Adicionar
              </button>
            </div>
          </div>

          {/* Med list */}
          <div
            className="bg-white rounded-2xl border flex-1 overflow-hidden flex flex-col"
            style={{ borderColor: N.border }}
          >
            <div
              className="px-5 py-3.5 border-b flex justify-between items-center"
              style={{ borderColor: N.border }}
            >
              <h3 className="font-semibold text-sm" style={{ color: N.textMain }}>
                Medicamentos prescritos
              </h3>
              <Badge label={`${meds.length} itens`} color="blue" />
            </div>
            <div className="flex-1 overflow-y-auto">
              {meds.map((m, i) => (
                <div
                  key={i}
                  className="px-5 py-4 border-b flex items-center gap-4"
                  style={{ borderColor: N.border }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: N.mintSoft }}
                  >
                    <Pill size={16} style={{ color: N.navy }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm" style={{ color: N.textMain }}>
                      {m.name}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: N.textSec }}>
                      {m.dose} · {m.freq} · {m.days} · <em>{m.obs}</em>
                    </div>
                  </div>
                  <button
                    className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    style={{ color: N.textSec }}
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => setRemoveIndex(i)}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    style={{ color: "#C53030" }}
                    title="Remover medicamento"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => triggerToast("Prescrição salva com sucesso!")}
              className="flex-1 py-3 rounded-xl text-sm font-bold text-white"
              style={{ background: N.navy }}
            >
              Salvar prescrição
            </button>
            <button
              onClick={() => triggerToast("Receita enviada ao aplicativo do tutor!")}
              className="px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-1.5"
              style={{ background: N.mintSoft, color: N.navy }}
            >
              <Send size={14} />
              Enviar ao tutor
            </button>
            <button
              onClick={() => onNav("v-consulta")}
              className="px-5 py-3 rounded-xl text-sm border font-medium"
              style={{ borderColor: N.border, color: N.textSec }}
            >
              Voltar à consulta
            </button>
          </div>
        </div>

        {/* Tutor guidance */}
        <div className="w-72 flex flex-col gap-3">
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-sm" style={{ color: N.textMain }}>
                Orientações ao tutor
              </h4>
              <button
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg"
                style={{ background: N.mintSoft, color: N.navy }}
              >
                <Send size={11} />
                Enviar
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {[
                "Dieta branda por 5 dias (arroz e frango sem tempero)",
                "Hidratar bem o animal — água sempre disponível",
                "Não oferecer guloseimas ou ração seca enquanto houver vômitos",
                "Retornar se houver piora ou sangue nas fezes",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl"
                  style={{ background: N.canvas }}
                >
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: N.mint }}
                  >
                    <Check size={9} style={{ color: N.navy }} />
                  </div>
                  <span className="text-xs leading-relaxed" style={{ color: N.textMain }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: N.textSec }}>
                Nota adicional (opcional)
              </label>
              <textarea
                className="w-full text-xs resize-none rounded-xl border p-3 outline-none"
                rows={3}
                placeholder="Observação livre para o tutor..."
                style={{
                  borderColor: N.border,
                  color: N.textMain,
                  fontFamily: "inherit",
                  background: N.canvas,
                }}
              />
            </div>
          </div>

          <div
            className="flex items-start gap-2.5 px-4 py-3 rounded-2xl border"
            style={{ background: N.alertSoft, borderColor: "#FCA5A5" }}
          >
            <AlertCircle size={14} className="shrink-0 mt-0.5" style={{ color: "#C53030" }} />
            <div>
              <div className="text-xs font-bold mb-0.5" style={{ color: "#C53030" }}>
                Alerta de alergia
              </div>
              <div className="text-xs" style={{ color: "#9B2C2C" }}>
                Thor tem alergia confirmada a dipirona — não prescrever analgésicos com esse
                princípio ativo.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Vet / Histórico ──────────────────────────────────────────────────
function VetHistorico({ onNav }: { onNav: (s: Screen) => void }) {
  const [filter, setFilter] = useState("Todos");
  const entries = [
    {
      date: "21/07/2026",
      type: "Consulta",
      desc: "Gastroenterite aguda. Metronidazol prescrito.",
      vet: "Dr. Lucas",
      tag: "Consulta",
    },
    {
      date: "14/04/2026",
      type: "Vacinação",
      desc: "V10 aplicada. Próxima em abril/2027.",
      vet: "Dra. Carla",
      tag: "Vacina",
    },
    {
      date: "02/02/2026",
      type: "Consulta",
      desc: "Check-up geral. Animal saudável.",
      vet: "Dr. Lucas",
      tag: "Consulta",
    },
    {
      date: "18/12/2025",
      type: "Retorno",
      desc: "Pós-cirurgia. Evolução satisfatória.",
      vet: "Dr. Lucas",
      tag: "Retorno",
    },
    {
      date: "05/11/2025",
      type: "Exame",
      desc: "Hemograma completo e bioquímico sérico.",
      vet: "Dra. Carla",
      tag: "Exame",
    },
  ];
  const tagColor: Record<string, "blue" | "green" | "yellow" | "gray"> = {
    Consulta: "blue",
    Vacina: "green",
    Retorno: "yellow",
    Exame: "gray",
  };
  const filtered = filter === "Todos" ? entries : entries.filter((e) => e.tag === filter);

  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar title="Histórico e Evolução" subtitle="Thor · Carlos Lima" />
      <div className="flex gap-5 px-7 py-5 flex-1 overflow-hidden">
        {/* Timeline */}
        <div className="flex-1 flex flex-col">
          <div className="flex gap-2 mb-4">
            {["Todos", "Consulta", "Vacina", "Exame", "Retorno"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all"
                style={{
                  background: filter === f ? N.navy : "white",
                  color: filter === f ? "white" : N.textSec,
                  borderColor: filter === f ? N.navy : N.border,
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {filtered.map((e, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border p-5 flex gap-4"
                style={{ borderColor: N.border }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full mt-1" style={{ background: N.mint }} />
                  {i < filtered.length - 1 && (
                    <div className="w-0.5 flex-1 mt-1" style={{ background: N.border }} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs font-semibold" style={{ color: N.navy }}>
                      {e.date}
                    </span>
                    <Badge label={e.tag} color={tagColor[e.tag] ?? "gray"} />
                    <span className="text-xs" style={{ color: N.textSec }}>
                      {e.vet}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: N.textMain }}>
                    {e.type}
                  </h4>
                  <p className="text-xs" style={{ color: N.textSec }}>
                    {e.desc}
                  </p>
                  <button className="mt-2 text-xs font-medium" style={{ color: N.navy }}>
                    Ver detalhes →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary panel */}
        <div className="w-64 flex flex-col gap-3">
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl mb-3"
              style={{ background: N.mintSoft, color: N.navy }}
            >
              T
            </div>
            <div className="font-bold" style={{ color: N.textMain }}>
              Thor
            </div>
            <div className="text-xs mb-3" style={{ color: N.textSec }}>
              Cão · Golden Retriever · 4 anos · Macho
            </div>
            <div className="text-xs mb-1" style={{ color: N.textSec }}>
              Tutor: Carlos Lima
            </div>
            <div className="text-xs" style={{ color: N.textSec }}>
              Vinculado desde: Jan/2024
            </div>
          </div>
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <h4
              className="font-semibold text-xs mb-3 uppercase tracking-wide"
              style={{ color: N.textSec }}
            >
              Resumo clínico
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span style={{ color: N.textSec }}>Alergias</span>
                <span className="font-semibold" style={{ color: "#C53030" }}>
                  Dipirona
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: N.textSec }}>Vacinas</span>
                <span className="font-semibold" style={{ color: "#276749" }}>
                  V10 em dia
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: N.textSec }}>Consultas</span>
                <span className="font-semibold" style={{ color: N.textMain }}>
                  8 registros
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: N.textSec }}>Prescrições</span>
                <span className="font-semibold" style={{ color: N.textMain }}>
                  5 ativas
                </span>
              </div>
            </div>
            <button
              onClick={() => onNav("v-vacina")}
              className="mt-4 w-full py-2 rounded-xl text-xs font-bold"
              style={{ background: N.navy, color: "white" }}
            >
              Cadastrar vacina
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Vet / Encerramento ───────────────────────────────────────────────
function VetEncerramento({ onNav }: { onNav: (s: Screen) => void }) {
  const [requestReturn, setRequestReturn] = useState(true);
  const [showPendingDialog, setShowPendingDialog] = useState(false);
  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar title="Encerrar Consulta" subtitle="Thor · Carlos Lima · Consulta Geral" />
      <div className="flex gap-5 px-7 py-5 flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col gap-4">
          {/* Summary */}
          <div className="bg-white rounded-2xl border p-6" style={{ borderColor: N.border }}>
            <h3 className="font-semibold text-sm mb-4" style={{ color: N.textMain }}>
              Resumo da consulta
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-semibold mb-2" style={{ color: N.textSec }}>
                  Diagnóstico final
                </div>
                <div
                  className="px-4 py-3 rounded-xl text-sm"
                  style={{ background: N.canvas, color: N.textMain }}
                >
                  Gastroenterite aguda
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold mb-2" style={{ color: N.textSec }}>
                  Prescrição
                </div>
                <div
                  className="px-4 py-3 rounded-xl text-sm"
                  style={{ background: N.successSoft, color: "#276749" }}
                >
                  <Check size={13} className="inline mr-1" />2 medicamentos prescritos
                </div>
              </div>
              <div className="col-span-2">
                <div className="text-xs font-semibold mb-2" style={{ color: N.textSec }}>
                  Conduta registrada
                </div>
                <div
                  className="px-4 py-3 rounded-xl text-sm"
                  style={{ background: N.canvas, color: N.textMain }}
                >
                  Dieta branda por 5 dias. Hidratação reforçada. Medicação antiemética e protetor
                  gástrico.
                </div>
              </div>
            </div>
          </div>

          {/* Tutor guidance */}
          <div className="bg-white rounded-2xl border p-6" style={{ borderColor: N.border }}>
            <h3 className="font-semibold text-sm mb-3" style={{ color: N.textMain }}>
              Orientações pós-consulta para o tutor
            </h3>
            <textarea
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
              rows={4}
              defaultValue="Manter dieta branda por 5 dias. Hidratação oral frequente. Não oferecer alimentos gordurosos. Retornar em 7 dias ou em caso de piora dos sintomas. Evitar administração de qualquer analgésico sem prescrição veterinária (Thor é alérgico a dipirona)."
              style={{
                borderColor: N.border,
                color: N.textMain,
                fontFamily: "inherit",
                background: N.canvas,
              }}
            />
          </div>

          {/* Return */}
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm" style={{ color: N.textMain }}>
                Solicitar retorno
              </h3>
              <button
                onClick={() => setRequestReturn(!requestReturn)}
                className="w-10 h-6 rounded-full transition-colors flex items-center"
                style={{ background: requestReturn ? N.navy : N.border, padding: "2px" }}
              >
                <div
                  className="w-5 h-5 rounded-full bg-white transition-transform"
                  style={{ transform: requestReturn ? "translateX(16px)" : "translateX(0)" }}
                />
              </button>
            </div>
            {requestReturn && (
              <div className="flex gap-3">
                <input
                  className="flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none"
                  defaultValue="7 dias"
                  placeholder="Prazo..."
                  style={{
                    borderColor: N.border,
                    color: N.textMain,
                    fontFamily: "inherit",
                    background: N.canvas,
                  }}
                />
                <input
                  className="flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none"
                  defaultValue="Reavaliação pós-medicação"
                  style={{
                    borderColor: N.border,
                    color: N.textMain,
                    fontFamily: "inherit",
                    background: N.canvas,
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowPendingDialog(true)}
              className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2"
              style={{ background: N.navy }}
            >
              <Check size={16} />
              Encerrar consulta
            </button>
            <button
              className="px-6 py-3.5 rounded-xl text-sm font-bold flex items-center gap-1.5"
              style={{ background: N.mintSoft, color: N.navy }}
            >
              <Send size={14} />
              Enviar resumo ao tutor
            </button>
          </div>
        </div>

        {/* Checklist */}
        <div className="w-64 bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
          <h4 className="font-semibold text-sm mb-4" style={{ color: N.textMain }}>
            Checklist de encerramento
          </h4>
          <div className="space-y-3">
            {[
              { label: "Diagnóstico registrado", done: true },
              { label: "Prescrição emitida", done: true },
              { label: "Conduta documentada", done: true },
              { label: "Orientações redigidas", done: true },
              { label: "Retorno solicitado", done: requestReturn },
              { label: "Resumo enviado ao tutor", done: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center border-2 shrink-0"
                  style={{
                    borderColor: item.done ? "#276749" : N.border,
                    background: item.done ? N.successSoft : "transparent",
                  }}
                >
                  {item.done && <Check size={11} style={{ color: "#276749" }} />}
                </div>
                <span className="text-xs" style={{ color: item.done ? N.textMain : N.textSec }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showPendingDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            role="dialog"
            aria-labelledby="pending-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h2 id="pending-title" className="font-bold" style={{ color: N.textMain }}>
              Alterações pendentes
            </h2>
            <p className="mt-3 text-sm" style={{ color: N.textSec }}>
              As orientações ainda não foram salvas. Deseja encerrar mesmo assim?
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowPendingDialog(false)}
                className="flex-1 rounded-xl border py-2.5 text-sm font-bold"
                style={{ borderColor: N.border, color: N.navy }}
              >
                Continuar editando
              </button>
              <button
                onClick={() => onNav("v-fila")}
                className="flex-1 rounded-xl py-2.5 text-sm font-bold text-white"
                style={{ background: N.navy }}
              >
                Encerrar sem salvar
              </button>
              <button
                onClick={() => onNav("v-fila")}
                className="flex-1 rounded-xl py-2.5 text-sm font-bold"
                style={{ background: N.mint, color: N.navy }}
              >
                Salvar e encerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Screen: Admin / Visão Geral ──────────────────────────────────────────────
const chartData = [
  { day: "Seg", consultas: 18, retornos: 5 },
  { day: "Ter", consultas: 22, retornos: 8 },
  { day: "Qua", consultas: 15, retornos: 4 },
  { day: "Qui", consultas: 24, retornos: 10 },
  { day: "Sex", consultas: 20, retornos: 7 },
  { day: "Sáb", consultas: 12, retornos: 3 },
];

function AdminVisao({ onNav }: { onNav: (s: Screen) => void }) {
  const [showMoreMetrics, setShowMoreMetrics] = useState(false);
  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar
        title="Visão Geral"
        subtitle="Julho 2026"
        actions={
          <select
            className="px-4 py-2 rounded-xl border text-sm outline-none"
            style={{
              borderColor: N.border,
              color: N.textMain,
              fontFamily: "inherit",
              background: "white",
            }}
          >
            <option>Esta semana</option>
            <option>Este mês</option>
            <option>Trimestre</option>
          </select>
        }
      />
      <div className="flex-1 overflow-y-auto px-7 py-5 space-y-5">
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          <KpiCard
            label="Consultas hoje"
            value="24"
            icon={Stethoscope}
            color={N.navy}
            sub="+3 vs ontem"
          />
          <KpiCard
            label="Retornos agendados"
            value="11"
            icon={RotateCcw}
            color="#2B6CB0"
            sub="próx. 7 dias"
          />
          <KpiCard
            label="Funcionários ativos"
            value="8"
            icon={Users}
            color="#276749"
            sub="3 vets, 4 recep, 1 admin"
          />
          <KpiCard
            label="Alertas operacionais"
            value="2"
            icon={AlertCircle}
            color="#C53030"
            sub="requer atenção"
          />
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* Chart */}
          <div
            className="col-span-2 bg-white rounded-2xl border p-5"
            style={{ borderColor: N.border }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm" style={{ color: N.textMain }}>
                Consultas da semana
              </h3>
              <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-1.5 rounded"
                    style={{ background: N.navy, display: "inline-block" }}
                  />
                  Consultas
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-1.5 rounded"
                    style={{ background: N.mint, display: "inline-block" }}
                  />
                  Retornos
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke={N.border} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: N.textSec }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 11, fill: N.textSec }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: `1px solid ${N.border}`,
                    fontFamily: "inherit",
                    fontSize: 12,
                  }}
                />
                <Bar key="bar-consultas" dataKey="consultas" fill={N.navy} radius={[6, 6, 0, 0]} />
                <Bar key="bar-retornos" dataKey="retornos" fill={N.mint} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Shortcuts */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
              <h4 className="font-semibold text-sm mb-3" style={{ color: N.textMain }}>
                Atalhos operacionais
              </h4>
              <div className="space-y-2">
                {[
                  { label: "Ir para recepção", screen: "r-agenda" as Screen, color: N.navy },
                  { label: "Ver atendimentos", screen: "v-fila" as Screen, color: "#1A4D6B" },
                  {
                    label: "Gerenciar equipe",
                    screen: "a-funcionarios" as Screen,
                    color: "#2D3A8C",
                  },
                ].map(({ label, screen, color }) => (
                  <button
                    key={label}
                    onClick={() => onNav(screen)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-white"
                    style={{ background: color }}
                  >
                    {label}
                    <ArrowRight size={14} />
                  </button>
                ))}
              </div>
            </div>

            <div
              className="bg-white rounded-2xl border p-5 flex-1"
              style={{ borderColor: N.border }}
            >
              <h4 className="font-semibold text-sm mb-3" style={{ color: N.textMain }}>
                Alertas
              </h4>
              <div className="space-y-2">
                <div
                  className="p-3 rounded-xl flex gap-2 text-xs"
                  style={{ background: N.alertSoft, color: "#C53030" }}
                >
                  <AlertCircle size={13} className="shrink-0 mt-0.5" />2 agendamentos atrasados na
                  recepção
                </div>
                <div
                  className="p-3 rounded-xl flex gap-2 text-xs"
                  style={{ background: N.warnSoft, color: "#744210" }}
                >
                  <AlertCircle size={13} className="shrink-0 mt-0.5" />
                  Vacina antirrábica com estoque baixo
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowMoreMetrics((visible) => !visible)}
          className="w-full rounded-xl border py-2.5 text-sm font-bold"
          style={{ borderColor: N.border, color: N.navy }}
          aria-expanded={showMoreMetrics}
        >
          {showMoreMetrics ? "Ocultar métricas" : "Ver mais métricas"}
        </button>
        {/* Performance strip */}
        {showMoreMetrics && (
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <h3 className="font-semibold text-sm mb-4" style={{ color: N.textMain }}>
              Desempenho por profissional
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Dr. Lucas Melo", consultas: 12, retornos: 4, rating: 4.9 },
                { name: "Dra. Carla Ramos", consultas: 8, retornos: 3, rating: 4.8 },
                { name: "Dr. André Souza", consultas: 4, retornos: 4, rating: 4.7 },
              ].map((v) => (
                <div
                  key={v.name}
                  className="p-4 rounded-xl flex items-center gap-3"
                  style={{ background: N.canvas }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0"
                    style={{ background: N.adminAccent, color: "#2B4C8C" }}
                  >
                    {v.name.split(" ")[1][0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate" style={{ color: N.textMain }}>
                      {v.name}
                    </div>
                    <div className="text-xs" style={{ color: N.textSec }}>
                      {v.consultas} consultas · {v.retornos} retornos
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-0.5 text-xs font-bold"
                    style={{ color: "#D69E2E" }}
                  >
                    <Star size={12} fill="#D69E2E" />
                    {v.rating}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Screen: Admin / Funcionários ─────────────────────────────────────────────
function AdminFuncionarios() {
  const [selected, setSelected] = useState<number | null>(0);
  const [query, setQuery] = useState("");
  const staff = [
    {
      name: "Dr. Lucas Melo",
      role: "Veterinário",
      status: "Ativo",
      email: "lucas@balu.vet",
      shift: "08:00–17:00",
      since: "Jan/2024",
    },
    {
      name: "Dra. Carla Ramos",
      role: "Veterinária",
      status: "Ativo",
      email: "carla@balu.vet",
      shift: "09:00–18:00",
      since: "Mar/2024",
    },
    {
      name: "Ana Costa",
      role: "Recepcionista",
      status: "Ativo",
      email: "ana@balu.vet",
      shift: "07:30–16:30",
      since: "Jun/2023",
    },
    {
      name: "João Ferreira",
      role: "Recepcionista",
      status: "Férias",
      email: "joao@balu.vet",
      shift: "10:00–19:00",
      since: "Ago/2023",
    },
    {
      name: "Maria Souza",
      role: "Administradora",
      status: "Ativo",
      email: "maria@balu.vet",
      shift: "08:00–17:00",
      since: "Jan/2023",
    },
  ];
  const normalizedQuery = query.toLocaleLowerCase("pt-BR").trim();
  const filteredStaff = staff
    .map((person, index) => ({ person, index }))
    .filter(({ person }) =>
      [person.name, person.role, person.email].some((value) =>
        value.toLocaleLowerCase("pt-BR").includes(normalizedQuery),
      ),
    );
  const sel = selected !== null ? staff[selected] : null;

  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar
        title="Funcionários"
        subtitle="Gerenciar equipe da clínica"
        actions={
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: N.navy }}
          >
            <Plus size={14} />
            Adicionar funcionário
          </button>
        }
      />
      <div className="flex gap-5 px-7 py-5 flex-1 overflow-hidden">
        {/* List */}
        <div
          className="flex-1 bg-white rounded-2xl border overflow-hidden flex flex-col"
          style={{ borderColor: N.border }}
        >
          <div className="px-5 py-3.5 border-b flex gap-3" style={{ borderColor: N.border }}>
            <SearchInput
              placeholder="Buscar funcionário..."
              value={query}
              onChange={(value) => {
                setQuery(value);
                setSelected(null);
              }}
            />
            <select
              className="px-4 py-2 rounded-xl border text-sm outline-none"
              style={{
                borderColor: N.border,
                color: N.textMain,
                fontFamily: "inherit",
                background: N.canvas,
              }}
            >
              <option>Todos os perfis</option>
              <option>Veterinário</option>
              <option>Recepcionista</option>
              <option>Administrador</option>
            </select>
          </div>
          <p className="px-5 py-2 text-xs" style={{ color: N.textSec }} aria-live="polite">
            {filteredStaff.length}{" "}
            {filteredStaff.length === 1 ? "funcionário encontrado" : "funcionários encontrados"}
          </p>
          <table className="w-full text-sm flex-1">
            <thead>
              <tr className="border-b text-left" style={{ borderColor: N.border }}>
                {["Funcionário", "Perfil", "Status", "Turno", "E-mail", "Ações"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-xs font-semibold uppercase tracking-wide"
                    style={{ color: N.textSec }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map(({ person: s, index: i }) => (
                <tr
                  key={i}
                  onClick={() => setSelected(i)}
                  className="border-b cursor-pointer transition-colors hover:bg-[#F7FAFC]"
                  style={{
                    borderColor: N.border,
                    background: selected === i ? N.mintSoft : undefined,
                  }}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                        style={{ background: N.adminAccent, color: "#2B4C8C" }}
                      >
                        {s.name[0]}
                      </div>
                      <div className="font-semibold" style={{ color: N.textMain }}>
                        {s.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm" style={{ color: N.textSec }}>
                    {s.role}
                  </td>
                  <td className="px-5 py-3">
                    <Badge label={s.status} color={s.status === "Ativo" ? "green" : "yellow"} />
                  </td>
                  <td className="px-5 py-3 text-xs font-mono" style={{ color: N.textSec }}>
                    {s.shift}
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: N.textSec }}>
                    {s.email}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <button
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        style={{ color: N.textSec }}
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        style={{ color: N.textSec }}
                      >
                        <Eye size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit panel */}
        {sel && (
          <div
            className="w-72 bg-white rounded-2xl border p-5 flex flex-col gap-4"
            style={{ borderColor: N.border }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg"
                style={{ background: N.adminAccent, color: "#2B4C8C" }}
              >
                {sel.name[0]}
              </div>
              <div>
                <div className="font-bold" style={{ color: N.textMain }}>
                  {sel.name}
                </div>
                <div className="text-xs" style={{ color: N.textSec }}>
                  Na clínica desde {sel.since}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: "Perfil", val: sel.role },
                { label: "Status", val: sel.status },
                { label: "Turno", val: sel.shift },
                { label: "E-mail", val: sel.email },
              ].map(({ label, val }) => (
                <div key={label}>
                  <div className="text-xs font-semibold mb-1" style={{ color: N.textSec }}>
                    {label}
                  </div>
                  <input
                    className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                    defaultValue={val}
                    style={{
                      borderColor: N.border,
                      color: N.textMain,
                      fontFamily: "inherit",
                      background: N.canvas,
                    }}
                  />
                </div>
              ))}
            </div>
            <button
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white mt-auto"
              style={{ background: N.navy }}
            >
              Salvar alterações
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Screen: Admin / Permissões ───────────────────────────────────────────────
type PermState = "full" | "partial" | "none";
function PermCell({ state }: { state: PermState }) {
  if (state === "full")
    return (
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center mx-auto"
        style={{ background: N.successSoft }}
      >
        <Check size={13} style={{ color: "#276749" }} />
      </div>
    );
  if (state === "partial")
    return (
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center mx-auto"
        style={{ background: N.warnSoft }}
      >
        <span className="text-xs font-bold" style={{ color: "#744210" }}>
          ~
        </span>
      </div>
    );
  return (
    <div
      className="w-6 h-6 rounded-lg flex items-center justify-center mx-auto"
      style={{ background: "#FEE2E2" }}
    >
      <X size={13} style={{ color: "#C53030" }} />
    </div>
  );
}

function AdminPermissoes() {
  const modules = [
    {
      name: "Agenda / Recepção",
      admin: "full" as PermState,
      reception: "full" as PermState,
      vet: "partial" as PermState,
    },
    {
      name: "Check-in",
      admin: "full" as PermState,
      reception: "full" as PermState,
      vet: "none" as PermState,
    },
    {
      name: "Tutores e Pets",
      admin: "full" as PermState,
      reception: "full" as PermState,
      vet: "partial" as PermState,
    },
    {
      name: "Prontuário clínico",
      admin: "full" as PermState,
      reception: "none" as PermState,
      vet: "full" as PermState,
    },
    {
      name: "Prescrições",
      admin: "full" as PermState,
      reception: "none" as PermState,
      vet: "full" as PermState,
    },
    {
      name: "Histórico clínico",
      admin: "full" as PermState,
      reception: "none" as PermState,
      vet: "full" as PermState,
    },
    {
      name: "Funcionários",
      admin: "full" as PermState,
      reception: "none" as PermState,
      vet: "none" as PermState,
    },
    {
      name: "Permissões",
      admin: "full" as PermState,
      reception: "none" as PermState,
      vet: "none" as PermState,
    },
    {
      name: "Relatórios",
      admin: "full" as PermState,
      reception: "partial" as PermState,
      vet: "none" as PermState,
    },
    {
      name: "Configurações",
      admin: "full" as PermState,
      reception: "none" as PermState,
      vet: "none" as PermState,
    },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar title="Controle de Permissões" subtitle="Definir acesso por perfil de usuário" />
      <div className="flex gap-5 px-7 py-5 flex-1 overflow-hidden">
        {/* Matrix */}
        <div
          className="flex-1 bg-white rounded-2xl border overflow-hidden"
          style={{ borderColor: N.border }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: N.border, background: N.canvas }}>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide"
                  style={{ color: N.textSec, width: "45%" }}
                >
                  Módulo
                </th>
                {[
                  { label: "Administrador", color: "#2D3A8C", bg: N.adminAccent },
                  { label: "Recepção", color: N.navy, bg: N.mintSoft },
                  { label: "Veterinário", color: "#276749", bg: N.successSoft },
                ].map(({ label, color, bg }) => (
                  <th key={label} className="px-6 py-4 text-center">
                    <span
                      className="inline-block px-3 py-1 rounded-lg text-xs font-semibold"
                      style={{ background: bg, color }}
                    >
                      {label}
                    </span>
                  </th>
                ))}
                <th
                  className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-center"
                  style={{ color: N.textSec }}
                >
                  Editar
                </th>
              </tr>
            </thead>
            <tbody>
              {modules.map((m, i) => (
                <tr
                  key={i}
                  className="border-b transition-colors hover:bg-[#F7FAFC]"
                  style={{ borderColor: N.border }}
                >
                  <td className="px-6 py-3.5 font-medium text-sm" style={{ color: N.textMain }}>
                    {m.name}
                  </td>
                  <td className="px-6 py-3.5">
                    <PermCell state={m.admin} />
                  </td>
                  <td className="px-6 py-3.5">
                    <PermCell state={m.reception} />
                  </td>
                  <td className="px-6 py-3.5">
                    <PermCell state={m.vet} />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <button
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      style={{ color: N.textSec }}
                    >
                      <Edit2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend / info */}
        <div className="w-64 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <h4 className="font-semibold text-sm mb-4" style={{ color: N.textMain }}>
              Legenda
            </h4>
            <div className="space-y-3">
              {[
                { state: "full" as PermState, label: "Acesso completo" },
                { state: "partial" as PermState, label: "Acesso parcial / somente leitura" },
                { state: "none" as PermState, label: "Sem acesso" },
              ].map(({ state, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <PermCell state={state} />
                  <span className="text-xs" style={{ color: N.textMain }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border p-5 flex-1" style={{ borderColor: N.border }}>
            <h4 className="font-semibold text-sm mb-3" style={{ color: N.textMain }}>
              Notas
            </h4>
            <p className="text-xs leading-relaxed" style={{ color: N.textSec }}>
              O Administrador tem acesso irrestrito a todos os módulos. Edições de permissão entram
              em vigor no próximo login do usuário afetado.
            </p>
            <button
              className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: N.navy }}
            >
              Salvar permissões
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Admin / Relatórios ───────────────────────────────────────────────
const areaData = [
  { mes: "Fev", consultas: 120 },
  { mes: "Mar", consultas: 145 },
  { mes: "Abr", consultas: 130 },
  { mes: "Mai", consultas: 160 },
  { mes: "Jun", consultas: 175 },
  { mes: "Jul", consultas: 150 },
];
const pieData = [
  { name: "Consulta Geral", value: 55 },
  { name: "Vacinação", value: 20 },
  { name: "Retorno", value: 15 },
  { name: "Exames", value: 10 },
];
const PIE_COLORS = [N.navy, N.mint, N.mintMedium, "#4A9E8F"];

function AdminRelatorios() {
  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar
        title="Relatórios"
        subtitle="Análise operacional da clínica"
        actions={
          <>
            <select
              className="px-4 py-2 rounded-xl border text-sm outline-none"
              style={{
                borderColor: N.border,
                color: N.textMain,
                fontFamily: "inherit",
                background: "white",
              }}
            >
              <option>Julho 2026</option>
              <option>Junho 2026</option>
              <option>Maio 2026</option>
            </select>
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium"
              style={{ borderColor: N.border, color: N.textMain }}
            >
              <Download size={14} />
              Exportar
            </button>
          </>
        }
      />
      <div className="flex-1 overflow-y-auto px-7 py-5 space-y-5">
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          <KpiCard
            label="Total de consultas"
            value="150"
            icon={Stethoscope}
            color={N.navy}
            sub="+8.6% vs mês anterior"
          />
          <KpiCard
            label="Retornos realizados"
            value="38"
            icon={RotateCcw}
            color="#2B6CB0"
            sub="25% do total"
          />
          <KpiCard label="Novos tutores" value="22" icon={Users} color="#276749" />
          <KpiCard
            label="Tx. de retorno"
            value="73%"
            icon={TrendingUp}
            color="#D69E2E"
            sub="meta: 70%"
          />
        </div>

        <div className="grid grid-cols-5 gap-5">
          {/* Area chart */}
          <div
            className="col-span-3 bg-white rounded-2xl border p-5"
            style={{ borderColor: N.border }}
          >
            <h3 className="font-semibold text-sm mb-4" style={{ color: N.textMain }}>
              Consultas mensais (últimos 6 meses)
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={N.navy} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={N.navy} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={N.border} />
                <XAxis
                  dataKey="mes"
                  tick={{ fontSize: 11, fill: N.textSec }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 11, fill: N.textSec }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: `1px solid ${N.border}`,
                    fontFamily: "inherit",
                    fontSize: 12,
                  }}
                />
                <Area
                  key="area-consultas"
                  type="monotone"
                  dataKey="consultas"
                  stroke={N.navy}
                  fill="url(#grad)"
                  strokeWidth={2.5}
                  dot={{ fill: N.navy, r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie */}
          <div
            className="col-span-2 bg-white rounded-2xl border p-5"
            style={{ borderColor: N.border }}
          >
            <h3 className="font-semibold text-sm mb-4" style={{ color: N.textMain }}>
              Distribuição por serviço
            </h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  dataKey="value"
                >
                  {pieData.map((_, i) => (
                    <Cell key={`pie-cell-${i}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: `1px solid ${N.border}`,
                    fontFamily: "inherit",
                    fontSize: 11,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5">
              {pieData.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: PIE_COLORS[i] }}
                    />
                    <span style={{ color: N.textSec }}>{d.name}</span>
                  </div>
                  <span className="font-semibold" style={{ color: N.textMain }}>
                    {d.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
          <h3 className="font-semibold text-sm mb-4" style={{ color: N.textMain }}>
            Alertas e insights operacionais
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                icon: TrendingUp,
                text: "Consultas crescem 8.6% no mês — acima da meta.",
                color: N.successSoft,
                textColor: "#276749",
              },
              {
                icon: AlertCircle,
                text: "Taxa de cancelamento subiu para 12% — investigar causas.",
                color: N.warnSoft,
                textColor: "#744210",
              },
              {
                icon: Zap,
                text: "Dr. Lucas Melo tem maior volume e maior nota de satisfação.",
                color: N.adminAccent,
                textColor: "#2B4C8C",
              },
            ].map(({ icon: Icon, text, color, textColor }, i) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl" style={{ background: color }}>
                <Icon size={16} style={{ color: textColor, flexShrink: 0 }} />
                <p className="text-xs leading-relaxed" style={{ color: textColor }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Admin / Configurações ────────────────────────────────────────────
function AdminConfig() {
  const [tab, setTab] = useState<"clinica" | "mensagens" | "integracoes">("clinica");
  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar title="Configurações" subtitle="Preferências e dados da clínica" />
      <div className="flex gap-5 px-7 py-5 flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col gap-4">
          {/* Tabs */}
          <div className="flex gap-2">
            {(["clinica", "mensagens", "integracoes"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-5 py-2 rounded-xl text-sm font-semibold border transition-all"
                style={{
                  background: tab === t ? N.navy : "white",
                  color: tab === t ? "white" : N.textSec,
                  borderColor: tab === t ? N.navy : N.border,
                }}
              >
                {t === "clinica"
                  ? "Dados da clínica"
                  : t === "mensagens"
                    ? "Mensagens"
                    : "Integrações"}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border flex-1 p-6" style={{ borderColor: N.border }}>
            {tab === "clinica" && (
              <div className="space-y-5">
                <h3 className="font-bold text-sm" style={{ color: N.textMain }}>
                  Informações da clínica
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Nome da clínica", val: "Clínica Veterinária Balu" },
                    { label: "CNPJ", val: "12.345.678/0001-99" },
                    { label: "Telefone principal", val: "(11) 3456-7890" },
                    { label: "E-mail de contato", val: "contato@balu.vet" },
                    { label: "CRMV da clínica", val: "12345-SP" },
                    { label: "Horário de funcionamento", val: "07:30 – 19:00" },
                  ].map(({ label, val }) => (
                    <div key={label}>
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{ color: N.textMain }}
                      >
                        {label}
                      </label>
                      <input
                        className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                        defaultValue={val}
                        style={{
                          borderColor: N.border,
                          color: N.textMain,
                          fontFamily: "inherit",
                          background: N.canvas,
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: N.textMain }}
                  >
                    Endereço completo
                  </label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                    defaultValue="Rua das Palmeiras, 142 — Jardim América, São Paulo/SP — CEP 01234-000"
                    style={{
                      borderColor: N.border,
                      color: N.textMain,
                      fontFamily: "inherit",
                      background: N.canvas,
                    }}
                  />
                </div>
              </div>
            )}
            {tab === "mensagens" && (
              <div className="space-y-5">
                <h3 className="font-bold text-sm" style={{ color: N.textMain }}>
                  Templates de mensagens automáticas
                </h3>
                {[
                  {
                    label: "Confirmação de agendamento",
                    val: "Olá {tutor}! Seu agendamento para {pet} está confirmado para {data} às {hora}. Até breve! 🐾",
                  },
                  {
                    label: "Lembrete de consulta (24h antes)",
                    val: "Lembrete: {pet} tem consulta amanhã às {hora}. Clínica Veterinária Balu.",
                  },
                  {
                    label: "Pós-consulta (orientações)",
                    val: "Obrigado pela visita! As orientações do Dr. {vet} para {pet} estão disponíveis no app Balu.",
                  },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: N.textMain }}
                    >
                      {label}
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                      rows={2}
                      defaultValue={val}
                      style={{
                        borderColor: N.border,
                        color: N.textMain,
                        fontFamily: "inherit",
                        background: N.canvas,
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
            {tab === "integracoes" && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm" style={{ color: N.textMain }}>
                  Status das integrações
                </h3>
                {[
                  { name: "App Balu (tutores)", status: "Conectado", color: "green" as const },
                  { name: "WhatsApp Business", status: "Conectado", color: "green" as const },
                  { name: "Sistema de pagamentos", status: "Configurar", color: "yellow" as const },
                  { name: "Laboratório parceiro", status: "Desconectado", color: "red" as const },
                ].map(({ name, status, color }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between p-4 rounded-xl border"
                    style={{ borderColor: N.border }}
                  >
                    <div className="font-medium text-sm" style={{ color: N.textMain }}>
                      {name}
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge label={status} color={color} />
                      <button
                        className="text-xs px-3 py-1.5 rounded-lg border font-medium"
                        style={{ borderColor: N.border, color: N.textSec }}
                      >
                        {status === "Conectado" ? "Gerenciar" : "Conectar"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            className="py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: N.navy }}
          >
            Salvar configurações
          </button>
        </div>

        {/* Summary */}
        <div className="w-64 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <h4 className="font-semibold text-sm mb-3" style={{ color: N.textMain }}>
              Status do sistema
            </h4>
            <div className="space-y-2">
              {[
                { label: "Última atualização", val: "21/07/2026" },
                { label: "Versão", val: "v2.4.1" },
                { label: "Ambiente", val: "Produção" },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between text-xs">
                  <span style={{ color: N.textSec }}>{label}</span>
                  <span className="font-semibold" style={{ color: N.textMain }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="mt-4 p-2.5 rounded-xl text-xs"
              style={{ background: N.successSoft, color: "#276749" }}
            >
              <Check size={11} className="inline mr-1" />
              Sistema operando normalmente
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreenState] = useState<Screen>(() => screenForPath(window.location.pathname));
  const [role, setRole] = useState<Role | null>(
    () => roleForScreen(screenForPath(window.location.pathname)) ?? "vet",
  );
  const [previousScreen, setPreviousScreen] = useState<Screen>("v-consulta");

  const setScreen = (s: Screen) => {
    setPreviousScreen(screen);
    setScreenState(s);
    window.history.pushState({}, "", pathForScreen(s));
  };

  const handleLogin = (r: Role) => {
    setRole(r);
    setScreen(r === "reception" ? "r-agenda" : r === "vet" ? "v-fila" : "a-visao");
  };

  const handleLogout = () => {
    setRole(null);
    setScreen("login");
  };

  if (screen === "landing") return <Landing />;
  if (screen === "login") return <LoginScreen onLogin={handleLogin} />;

  const renderScreen = () => {
    switch (screen) {
      case "r-agenda":
        return <ReceptionAgenda onNav={setScreen} />;
      case "r-checkin":
        return <ReceptionCheckin onNav={setScreen} />;
      case "r-tutores":
        return <ReceptionTutores />;
      case "r-vincular":
        return <ReceptionVincular />;
      case "r-encaminhar":
        return <ReceptionEncaminhar onNav={setScreen} />;
      case "r-retornos":
        return <ReceptionRetornos />;
      case "v-fila":
        return <VetFila onNav={setScreen} />;
      case "v-consulta":
        return <VetConsulta onNav={setScreen} />;
      case "v-prescricao":
        return <VetPrescricao onNav={setScreen} />;
      case "v-historico":
        return <VetHistorico onNav={setScreen} />;
      case "v-encerramento":
        return <VetEncerramento onNav={setScreen} />;
      case "v-vacina":
        return (
          <VetCadastroVacina
            onCancel={() => setScreen(previousScreen)}
            onSaved={() => setScreen(previousScreen)}
          />
        );
      case "a-visao":
        return <AdminVisao onNav={setScreen} />;
      case "a-funcionarios":
        return <AdminFuncionarios />;
      case "a-permissoes":
        return <AdminPermissoes />;
      case "a-relatorios":
        return <AdminRelatorios />;
      case "a-config":
        return <AdminConfig />;
      default:
        return null;
    }
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: N.canvas }}
    >
      <Sidebar role={role || "vet"} current={screen} onNav={setScreen} onLogout={handleLogout} />
      <main className="flex-1 flex flex-col overflow-hidden">{renderScreen()}</main>
    </div>
  );
}
