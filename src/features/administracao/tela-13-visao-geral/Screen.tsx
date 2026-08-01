import { Users, RotateCcw, AlertCircle, ArrowRight, Stethoscope, Star } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TopBar, KpiCard } from "../../../components/ui/ClinicPrimitives";
import { N } from "../../../shared/tokens";
import type { Screen } from "../../../shared/types";

const chartData = [
  { day: "Seg", consultas: 18, retornos: 5 },
  { day: "Ter", consultas: 22, retornos: 8 },
  { day: "Qua", consultas: 15, retornos: 4 },
  { day: "Qui", consultas: 24, retornos: 10 },
  { day: "Sex", consultas: 20, retornos: 7 },
  { day: "Sáb", consultas: 12, retornos: 3 },
];

export function AdminVisao({ onNav }: { onNav: (s: Screen) => void }) {
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

        {/* Performance strip */}
        <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
          <h3 className="font-semibold text-sm mb-4" style={{ color: N.textMain }}>
            Desempenho por veterinário
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
      </div>
    </div>
  );
}

// ─── Screen: Admin / Funcionários ─────────────────────────────────────────────
