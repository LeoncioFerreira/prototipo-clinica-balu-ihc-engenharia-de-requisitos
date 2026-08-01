import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { Badge, TopBar } from "../../../components/ui/ClinicPrimitives";
import { N } from "../../../shared/tokens";

export function ReceptionVincular() {
  const [selectedPet, setSelectedPet] = useState<number | null>(0);
  const pets = [
    { name: "Thor", info: "Cão · Golden · 4 anos · Macho", linked: true },
    { name: "Mia", info: "Gato · Persa · 2 anos · Fêmea", linked: false },
  ];
  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar
        title="Vincular Pet à Clínica"
        subtitle="Associar tutor, pet e clínica para o atendimento"
      />
      <div className="px-7 py-4">
        <div
          className="flex items-center gap-4 p-4 bg-white rounded-2xl border"
          style={{ borderColor: N.border }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
            style={{ background: N.adminAccent, color: "#2B4C8C" }}
          >
            C
          </div>
          <div>
            <div className="font-bold text-sm" style={{ color: N.textMain }}>
              Carlos Lima
            </div>
            <div className="text-xs" style={{ color: N.textSec }}>
              CPF: 123.456.789-00 · (11) 99874-2211
            </div>
          </div>
          <Badge label="Tutor selecionado" color="green" />
        </div>
      </div>
      <div className="flex gap-5 px-7 pb-6 flex-1">
        {/* Pets existentes */}
        <div className="w-80 flex flex-col gap-3">
          <h3 className="font-semibold text-sm" style={{ color: N.textMain }}>
            Pets deste tutor
          </h3>
          {pets.map((p, i) => (
            <div
              key={i}
              onClick={() => setSelectedPet(i)}
              className="bg-white rounded-2xl border p-5 cursor-pointer transition-all"
              style={{
                borderColor: selectedPet === i ? N.navy : N.border,
                boxShadow: selectedPet === i ? `0 0 0 2px ${N.navy}22` : "none",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg"
                  style={{ background: N.mintSoft, color: N.navy }}
                >
                  {p.name[0]}
                </div>
                <div>
                  <div className="font-bold" style={{ color: N.textMain }}>
                    {p.name}
                  </div>
                  <div className="text-xs" style={{ color: N.textSec }}>
                    {p.info}
                  </div>
                </div>
              </div>
              {selectedPet === i && (
                <button
                  className="w-full py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: N.navy }}
                >
                  <Check size={14} className="inline mr-1" />
                  Vincular este pet
                </button>
              )}
            </div>
          ))}
        </div>

        {/* New pet form */}
        <div className="flex-1 bg-white rounded-2xl border p-6" style={{ borderColor: N.border }}>
          <h3 className="font-semibold text-sm mb-5" style={{ color: N.textMain }}>
            Cadastrar e vincular novo pet
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Nome do pet", placeholder: "Ex: Thor" },
              { label: "Espécie", placeholder: "Cão, Gato, Coelho..." },
              { label: "Raça", placeholder: "Ex: Golden Retriever" },
              { label: "Idade", placeholder: "Ex: 4 anos" },
            ].map(({ label, placeholder }) => (
              <div key={label}>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: N.textMain }}>
                  {label}
                </label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                  placeholder={placeholder}
                  style={{
                    borderColor: N.border,
                    color: N.textMain,
                    fontFamily: "inherit",
                    background: N.canvas,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold mb-2" style={{ color: N.textMain }}>
              Sexo
            </label>
            <div className="flex gap-3">
              {["Macho", "Fêmea"].map((s) => (
                <button
                  key={s}
                  className="px-5 py-2 rounded-xl border text-sm font-medium"
                  style={{ borderColor: N.navy, color: N.navy, background: N.mintSoft }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: N.textMain }}>
              Alertas ou observações iniciais
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
              rows={3}
              placeholder="Alergias, condições especiais, histórico relevante..."
              style={{
                borderColor: N.border,
                color: N.textMain,
                fontFamily: "inherit",
                background: N.canvas,
              }}
            />
          </div>
          <div className="flex gap-3 mt-5">
            <button
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: N.navy }}
            >
              <Plus size={14} className="inline mr-1.5" />
              Cadastrar e vincular
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Encaminhar ───────────────────────────────────────────────────────
