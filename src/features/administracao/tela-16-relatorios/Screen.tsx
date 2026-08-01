import {
  Users,
  RotateCcw,
  AlertCircle,
  TrendingUp,
  Download,
  Stethoscope,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TopBar, KpiCard } from "../../../components/ui/ClinicPrimitives";
import { N } from "../../../shared/tokens";

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

export function AdminRelatorios() {
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
