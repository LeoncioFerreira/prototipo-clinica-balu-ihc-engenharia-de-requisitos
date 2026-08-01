import { useState } from "react";
import { AlertCircle, Check, X, Phone } from "lucide-react";
import { Badge, TopBar } from "../../../components/ui/ClinicPrimitives";
import { N } from "../../../shared/tokens";
import type { Screen } from "../../../shared/types";

export function ReceptionCheckin({ onNav }: { onNav: (s: Screen) => void }) {
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
