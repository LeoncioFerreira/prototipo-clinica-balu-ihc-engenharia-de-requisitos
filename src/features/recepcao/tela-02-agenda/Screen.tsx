import { useState } from "react";
import { Calendar, Clock, Plus, AlertCircle, Filter, Stethoscope, PawPrint } from "lucide-react";
import { Badge, TopBar, KpiCard, SearchInput } from "../../../components/ui/ClinicPrimitives";
import { N } from "../../../shared/tokens";
import type { Screen } from "../../../shared/types";

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

export function ReceptionAgenda({ onNav }: { onNav: (s: Screen) => void }) {
  const [selected, setSelected] = useState(0);
  const sel = agendaData[selected];

  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar
        title="Agenda do Dia"
        subtitle="Segunda-feira, 21 de julho de 2026"
        actions={
          <>
            <SearchInput placeholder="Buscar agendamento..." />
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
            <h3 className="font-semibold text-sm" style={{ color: N.textMain }}>
              Consultas do dia
            </h3>
            <div className="flex gap-2">
              <button
                className="text-xs px-3 py-1.5 rounded-lg border font-medium"
                style={{ borderColor: N.border, color: N.textSec }}
              >
                <Filter size={12} className="inline mr-1" />
                Filtrar
              </button>
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
                {agendaData.map((row, i) => (
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
