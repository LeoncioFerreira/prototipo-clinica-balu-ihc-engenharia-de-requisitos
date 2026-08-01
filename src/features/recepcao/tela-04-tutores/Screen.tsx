import { useState } from "react";
import { Users, Search, Check, Phone, Mail, CreditCard, MapPin } from "lucide-react";
import { Badge, TopBar } from "../../../components/ui/ClinicPrimitives";
import { N } from "../../../shared/tokens";

export function ReceptionTutores() {
  const [query, setQuery] = useState("Carlos");
  const [selected, setSelected] = useState(0);
  const results = [
    {
      name: "Carlos Lima",
      cpf: "123.456.789-00",
      phone: "(11) 99874-2211",
      email: "carlos@email.com",
      pets: 2,
    },
    {
      name: "Carla Mendes",
      cpf: "987.654.321-00",
      phone: "(11) 91234-5678",
      email: "carla@email.com",
      pets: 1,
    },
  ];
  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar
        title="Buscar ou Cadastrar Tutor"
        subtitle="Localizar tutor existente ou registrar novo"
      />
      <div className="flex gap-5 px-7 py-6 flex-1 overflow-hidden">
        {/* Left: search */}
        <div className="w-[42%] flex flex-col gap-4">
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <h3 className="font-semibold text-sm mb-3" style={{ color: N.textMain }}>
              Buscar tutor
            </h3>
            <div className="relative mb-4">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: N.textSec }}
              />
              <input
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nome, CPF, telefone ou e-mail..."
                style={{
                  borderColor: N.border,
                  color: N.textMain,
                  fontFamily: "inherit",
                  background: N.canvas,
                }}
              />
            </div>
            <div className="space-y-2">
              {results.map((r, i) => (
                <div
                  key={i}
                  onClick={() => setSelected(i)}
                  className="p-4 rounded-xl border cursor-pointer transition-all"
                  style={{
                    borderColor: selected === i ? N.navy : N.border,
                    background: selected === i ? N.mintSoft : N.canvas,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-bold"
                      style={{ background: N.adminAccent, color: "#2B4C8C" }}
                    >
                      {r.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm" style={{ color: N.textMain }}>
                        {r.name}
                      </div>
                      <div className="text-xs" style={{ color: N.textSec }}>
                        {r.cpf} · {r.phone}
                      </div>
                    </div>
                    <Badge label={`${r.pets} pet${r.pets > 1 ? "s" : ""}`} color="blue" />
                  </div>
                </div>
              ))}
            </div>
            {selected >= 0 && (
              <button
                className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: N.navy }}
              >
                <Check size={14} className="inline mr-1.5" />
                Selecionar este tutor
              </button>
            )}
          </div>

          {/* Pets do tutor */}
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <h4 className="font-semibold text-sm mb-3" style={{ color: N.textMain }}>
              Pets de {results[selected]?.name}
            </h4>
            {[
              { name: "Thor", info: "Cão · Golden · 4 anos" },
              { name: "Mia", info: "Gato · Persa · 2 anos" },
            ].map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 p-3 rounded-xl mb-2"
                style={{ background: N.canvas }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                  style={{ background: N.mintSoft, color: N.navy }}
                >
                  {p.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: N.textMain }}>
                    {p.name}
                  </div>
                  <div className="text-xs" style={{ color: N.textSec }}>
                    {p.info}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: registration form */}
        <div className="flex-1 bg-white rounded-2xl border p-6" style={{ borderColor: N.border }}>
          <h3 className="font-semibold text-sm mb-5" style={{ color: N.textMain }}>
            Cadastrar novo tutor
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Nome completo", placeholder: "Nome do tutor", icon: Users },
              { label: "Telefone", placeholder: "(00) 00000-0000", icon: Phone },
              { label: "E-mail", placeholder: "email@exemplo.com", icon: Mail },
              { label: "CPF", placeholder: "000.000.000-00", icon: CreditCard },
            ].map(({ label, placeholder, icon: Icon }) => (
              <div key={label}>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: N.textMain }}>
                  {label}
                </label>
                <div className="relative">
                  <Icon
                    size={13}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: N.textSec }}
                  />
                  <input
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm outline-none"
                    placeholder={placeholder}
                    style={{
                      borderColor: N.border,
                      color: N.textMain,
                      fontFamily: "inherit",
                      background: N.canvas,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: N.textMain }}>
              Endereço
            </label>
            <div className="relative">
              <MapPin
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: N.textSec }}
              />
              <input
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm outline-none"
                placeholder="Rua, número, bairro, cidade"
                style={{
                  borderColor: N.border,
                  color: N.textMain,
                  fontFamily: "inherit",
                  background: N.canvas,
                }}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: N.navy }}
            >
              Salvar novo tutor
            </button>
            <button
              className="px-5 py-3 rounded-xl text-sm border font-medium"
              style={{ borderColor: N.border, color: N.textSec }}
            >
              Limpar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Vincular Pet ─────────────────────────────────────────────────────
