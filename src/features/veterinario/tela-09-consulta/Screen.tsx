import { useState } from "react";
import { Pill, AlertCircle } from "lucide-react";
import { TopBar } from "../../../components/ui/ClinicPrimitives";
import { N } from "../../../shared/tokens";
import type { Screen } from "../../../shared/types";

export function VetConsulta({
  onNav,
  onOpenVaccine,
}: {
  onNav: (s: Screen) => void;
  onOpenVaccine: () => void;
}) {
  const [tab, setTab] = useState<"sintomas" | "diagnostico" | "conduta">("sintomas");
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
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold"
                      style={{ background: N.adminAccent, color: "#2B4C8C" }}
                    >
                      Solicitar exame
                    </button>
                    <button
                      onClick={onOpenVaccine}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                      style={{ background: N.navy }}
                    >
                      Cadastrar vacina
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
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
