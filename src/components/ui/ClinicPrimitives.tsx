import type { ElementType, ReactNode } from "react";
import {
  Calendar,
  CheckSquare,
  Users,
  RotateCcw,
  List,
  FileText,
  Pill,
  BarChart2,
  Settings,
  Shield,
  ChevronRight,
  Search,
  Bell,
  LogOut,
  Activity,
  Stethoscope,
} from "lucide-react";
import { N } from "../../shared/tokens";
import type { Role, Screen } from "../../shared/types";

export function BaluBear({ size = 80 }: { size?: number }) {
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
export function BaluLogo() {
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
export function Badge({
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
  icon: ElementType;
  label: string;
  screen: Screen;
}

export function Sidebar({
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
    { icon: CheckSquare, label: "Check-in", screen: "r-checkin" },
    { icon: Users, label: "Tutores", screen: "r-tutores" },
    { icon: RotateCcw, label: "Retornos", screen: "r-retornos" },
  ];
  const vetItems: SidebarItem[] = [
    { icon: List, label: "Fila", screen: "v-fila" },
    { icon: Stethoscope, label: "Consulta", screen: "v-consulta" },
    { icon: Pill, label: "Prescrições", screen: "v-prescricao" },
    { icon: FileText, label: "Histórico", screen: "v-historico" },
  ];
  const adminItems: SidebarItem[] = [
    { icon: Activity, label: "Visão Geral", screen: "a-visao" },
    { icon: Calendar, label: "Recepção", screen: "r-agenda" },
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
export function TopBar({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div
      className="flex items-center justify-between px-7 py-4 bg-white border-b"
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
          className="relative p-2 rounded-xl hover:bg-gray-50 transition-colors"
          style={{ color: N.textSec }}
        >
          <Bell size={18} />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: "#E53E3E" }}
          />
        </button>
      </div>
    </div>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
export function KpiCard({
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
  icon: ElementType;
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

export function SearchInput({ placeholder }: { placeholder?: string }) {
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
        style={{ borderColor: N.border, color: N.textMain, fontFamily: "inherit" }}
      />
    </div>
  );
}

// ─── Screen: Recepção / Agenda ────────────────────────────────────────────────
