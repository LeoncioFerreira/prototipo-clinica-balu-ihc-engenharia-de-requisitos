import { Check } from "lucide-react";
import { TopBar } from "../../../components/ui/ClinicPrimitives";
import { N } from "../../../shared/tokens";

export function ReceptionRetornos() {
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
