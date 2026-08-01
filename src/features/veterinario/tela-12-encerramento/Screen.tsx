import { useState } from "react";
import { Check, Send } from "lucide-react";
import { TopBar } from "../../../components/ui/ClinicPrimitives";
import { N } from "../../../shared/tokens";
import type { Screen } from "../../../shared/types";

export function VetEncerramento({ onNav }: { onNav: (s: Screen) => void }) {
  const [requestReturn, setRequestReturn] = useState(true);
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
              onClick={() => onNav("v-fila")}
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
    </div>
  );
}

// ─── Screen: Admin / Visão Geral ──────────────────────────────────────────────
