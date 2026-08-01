import { useState } from "react";
import { AlertCircle, Stethoscope } from "lucide-react";
import { Badge, TopBar, SearchInput } from "../../../components/ui/ClinicPrimitives";
import { N } from "../../../shared/tokens";
import type { Screen } from "../../../shared/types";

export function VetFila({ onNav }: { onNav: (s: Screen) => void }) {
  const [selected, setSelected] = useState(0);
  const queue = [
    {
      name: "Thor",
      species: "Cão · Golden",
      tutor: "Carlos Lima",
      time: "08:00",
      status: "Aguardando",
      age: "4a",
      alert: "Alergia dipirona",
    },
    {
      name: "Luna",
      species: "Gato · Siamês",
      tutor: "Fernanda Reis",
      time: "08:30",
      status: "Em espera",
      age: "2a",
      alert: null,
    },
    {
      name: "Max",
      species: "Cão · Labrador",
      tutor: "Bruno Alves",
      time: "09:00",
      status: "Aguardando",
      age: "6a",
      alert: null,
    },
  ];
  const cur = queue[selected];

  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar
        title="Fila e Paciente Atual"
        subtitle="Segunda-feira, 21 de julho · Dr. Lucas Melo"
        actions={<SearchInput placeholder="Buscar paciente..." />}
      />
      <div className="flex gap-5 px-7 py-5 flex-1 overflow-hidden">
        {/* Queue list */}
        <div className="w-72 flex flex-col gap-3">
          <h3
            className="font-semibold text-xs uppercase tracking-wide"
            style={{ color: N.textSec }}
          >
            Pacientes do dia
          </h3>
          {queue.map((p, i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              className="bg-white rounded-2xl border p-4 cursor-pointer transition-all"
              style={{
                borderColor: selected === i ? N.navy : N.border,
                background: selected === i ? N.mintSoft : "white",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                  style={{ background: N.mintSoft, color: N.navy }}
                >
                  {p.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm" style={{ color: N.textMain }}>
                    {p.name}
                  </div>
                  <div className="text-xs truncate" style={{ color: N.textSec }}>
                    {p.species}
                  </div>
                  <div className="text-xs" style={{ color: N.textSec }}>
                    {p.tutor}
                  </div>
                </div>
                <div className="text-xs font-mono font-semibold" style={{ color: N.navy }}>
                  {p.time}
                </div>
              </div>
              {p.alert && (
                <div
                  className="mt-2 flex items-center gap-1 text-xs px-2 py-1 rounded-lg"
                  style={{ background: N.alertSoft, color: "#C53030" }}
                >
                  <AlertCircle size={10} />
                  {p.alert}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Current patient */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border p-6" style={{ borderColor: N.border }}>
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
                  style={{ background: N.mintSoft, color: N.navy }}
                >
                  {cur.name[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: N.textMain }}>
                    {cur.name}
                  </h2>
                  <div className="text-sm" style={{ color: N.textSec }}>
                    {cur.species} · {cur.age} · Tutor: {cur.tutor}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge label="Consulta Geral" color="blue" />
                    <Badge label={cur.status} color="yellow" />
                  </div>
                </div>
              </div>
              <button
                onClick={() => onNav("v-consulta")}
                className="px-6 py-3 rounded-xl text-sm font-bold text-white flex items-center gap-2"
                style={{ background: N.navy }}
              >
                <Stethoscope size={16} /> Iniciar consulta
              </button>
            </div>

            {cur.alert && (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl mb-4 text-sm font-medium"
                style={{ background: N.alertSoft, color: "#C53030" }}
              >
                <AlertCircle size={15} />
                <strong>Alerta:</strong> {cur.alert}
              </div>
            )}
          </div>

          {/* Clinical summary */}
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                title: "Alergias",
                content: cur.alert ?? "Nenhuma registrada",
                color: cur.alert ? N.alertSoft : N.successSoft,
                textColor: cur.alert ? "#C53030" : "#276749",
              },
              {
                title: "Vacinação",
                content: "V10 em dia · Antirrábica vencida em 03/2027",
                color: N.successSoft,
                textColor: "#276749",
              },
              {
                title: "Última consulta",
                content: "02/02/2026 · Consulta geral · Dr. Lucas",
                color: N.canvas,
                textColor: N.textSec,
              },
            ].map(({ title, content, color, textColor }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border p-4"
                style={{ borderColor: N.border }}
              >
                <div className="text-xs font-semibold mb-2" style={{ color: N.textSec }}>
                  {title}
                </div>
                <div
                  className="px-3 py-2 rounded-xl text-xs"
                  style={{ background: color, color: textColor }}
                >
                  {content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Vet / Consulta ───────────────────────────────────────────────────
