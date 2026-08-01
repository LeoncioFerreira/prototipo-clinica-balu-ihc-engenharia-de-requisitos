import { useState } from "react";
import { Pill, Plus, AlertCircle, Check, X, Edit2, Send } from "lucide-react";
import { Badge, TopBar } from "../../../components/ui/ClinicPrimitives";
import { N } from "../../../shared/tokens";
import type { Screen } from "../../../shared/types";

export function VetPrescricao({ onNav }: { onNav: (s: Screen) => void }) {
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

  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar title="Prescrição Médica" subtitle="Thor · Dr. Lucas Melo · 21/07/2026" />
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
                    onClick={() => setMeds(meds.filter((_, j) => j !== i))}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    style={{ color: "#C53030" }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              className="flex-1 py-3 rounded-xl text-sm font-bold text-white"
              style={{ background: N.navy }}
            >
              Salvar prescrição
            </button>
            <button
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
