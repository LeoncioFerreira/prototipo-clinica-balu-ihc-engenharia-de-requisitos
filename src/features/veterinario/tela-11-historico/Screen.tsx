import { useState } from "react";
import { Badge, TopBar } from "../../../components/ui/ClinicPrimitives";
import { N } from "../../../shared/tokens";

export function VetHistorico({ onOpenVaccine }: { onOpenVaccine: () => void }) {
  const [filter, setFilter] = useState("Todos");
  const entries = [
    {
      date: "21/07/2026",
      type: "Consulta",
      desc: "Gastroenterite aguda. Metronidazol prescrito.",
      vet: "Dr. Lucas",
      tag: "Consulta",
    },
    {
      date: "14/04/2026",
      type: "Vacinação",
      desc: "V10 aplicada. Próxima em abril/2027.",
      vet: "Dra. Carla",
      tag: "Vacina",
    },
    {
      date: "02/02/2026",
      type: "Consulta",
      desc: "Check-up geral. Animal saudável.",
      vet: "Dr. Lucas",
      tag: "Consulta",
    },
    {
      date: "18/12/2025",
      type: "Retorno",
      desc: "Pós-cirurgia. Evolução satisfatória.",
      vet: "Dr. Lucas",
      tag: "Retorno",
    },
    {
      date: "05/11/2025",
      type: "Exame",
      desc: "Hemograma completo e bioquímico sérico.",
      vet: "Dra. Carla",
      tag: "Exame",
    },
  ];
  const tagColor: Record<string, "blue" | "green" | "yellow" | "gray"> = {
    Consulta: "blue",
    Vacina: "green",
    Retorno: "yellow",
    Exame: "gray",
  };
  const filtered = filter === "Todos" ? entries : entries.filter((e) => e.tag === filter);

  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar
        title="Histórico e Evolução"
        subtitle="Thor · Carlos Lima"
        actions={
          <button
            onClick={onOpenVaccine}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: N.navy }}
          >
            Cadastrar vacina
          </button>
        }
      />
      <div className="flex gap-5 px-7 py-5 flex-1 overflow-hidden">
        {/* Timeline */}
        <div className="flex-1 flex flex-col">
          <div className="flex gap-2 mb-4">
            {["Todos", "Consulta", "Vacina", "Exame", "Retorno"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all"
                style={{
                  background: filter === f ? N.navy : "white",
                  color: filter === f ? "white" : N.textSec,
                  borderColor: filter === f ? N.navy : N.border,
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {filtered.map((e, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border p-5 flex gap-4"
                style={{ borderColor: N.border }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full mt-1" style={{ background: N.mint }} />
                  {i < filtered.length - 1 && (
                    <div className="w-0.5 flex-1 mt-1" style={{ background: N.border }} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs font-semibold" style={{ color: N.navy }}>
                      {e.date}
                    </span>
                    <Badge label={e.tag} color={tagColor[e.tag] ?? "gray"} />
                    <span className="text-xs" style={{ color: N.textSec }}>
                      {e.vet}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: N.textMain }}>
                    {e.type}
                  </h4>
                  <p className="text-xs" style={{ color: N.textSec }}>
                    {e.desc}
                  </p>
                  <button className="mt-2 text-xs font-medium" style={{ color: N.navy }}>
                    Ver detalhes →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary panel */}
        <div className="w-64 flex flex-col gap-3">
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl mb-3"
              style={{ background: N.mintSoft, color: N.navy }}
            >
              T
            </div>
            <div className="font-bold" style={{ color: N.textMain }}>
              Thor
            </div>
            <div className="text-xs mb-3" style={{ color: N.textSec }}>
              Cão · Golden Retriever · 4 anos · Macho
            </div>
            <div className="text-xs mb-1" style={{ color: N.textSec }}>
              Tutor: Carlos Lima
            </div>
            <div className="text-xs" style={{ color: N.textSec }}>
              Vinculado desde: Jan/2024
            </div>
          </div>
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <h4
              className="font-semibold text-xs mb-3 uppercase tracking-wide"
              style={{ color: N.textSec }}
            >
              Resumo clínico
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span style={{ color: N.textSec }}>Alergias</span>
                <span className="font-semibold" style={{ color: "#C53030" }}>
                  Dipirona
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: N.textSec }}>Vacinas</span>
                <span className="font-semibold" style={{ color: "#276749" }}>
                  V10 em dia
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: N.textSec }}>Consultas</span>
                <span className="font-semibold" style={{ color: N.textMain }}>
                  8 registros
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: N.textSec }}>Prescrições</span>
                <span className="font-semibold" style={{ color: N.textMain }}>
                  5 ativas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Vet / Encerramento ───────────────────────────────────────────────
