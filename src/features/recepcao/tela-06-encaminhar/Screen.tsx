import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Badge, TopBar } from "../../../components/ui/ClinicPrimitives";
import { N } from "../../../shared/tokens";
import type { Screen } from "../../../shared/types";

export function ReceptionEncaminhar({ onNav }: { onNav: (s: Screen) => void }) {
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
