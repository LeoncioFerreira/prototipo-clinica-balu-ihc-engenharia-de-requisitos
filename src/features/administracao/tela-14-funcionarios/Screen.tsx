import { useState } from "react";
import { Plus, Eye, Edit2 } from "lucide-react";
import { Badge, TopBar, SearchInput } from "../../../components/ui/ClinicPrimitives";
import { N } from "../../../shared/tokens";

export function AdminFuncionarios() {
  const [selected, setSelected] = useState<number | null>(0);
  const staff = [
    {
      name: "Dr. Lucas Melo",
      role: "Veterinário",
      status: "Ativo",
      email: "lucas@balu.vet",
      shift: "08:00–17:00",
      since: "Jan/2024",
    },
    {
      name: "Dra. Carla Ramos",
      role: "Veterinária",
      status: "Ativo",
      email: "carla@balu.vet",
      shift: "09:00–18:00",
      since: "Mar/2024",
    },
    {
      name: "Ana Costa",
      role: "Recepcionista",
      status: "Ativo",
      email: "ana@balu.vet",
      shift: "07:30–16:30",
      since: "Jun/2023",
    },
    {
      name: "João Ferreira",
      role: "Recepcionista",
      status: "Férias",
      email: "joao@balu.vet",
      shift: "10:00–19:00",
      since: "Ago/2023",
    },
    {
      name: "Maria Souza",
      role: "Administradora",
      status: "Ativo",
      email: "maria@balu.vet",
      shift: "08:00–17:00",
      since: "Jan/2023",
    },
  ];
  const sel = selected !== null ? staff[selected] : null;

  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar
        title="Funcionários"
        subtitle="Gerenciar equipe da clínica"
        actions={
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: N.navy }}
          >
            <Plus size={14} />
            Adicionar funcionário
          </button>
        }
      />
      <div className="flex gap-5 px-7 py-5 flex-1 overflow-hidden">
        {/* List */}
        <div
          className="flex-1 bg-white rounded-2xl border overflow-hidden flex flex-col"
          style={{ borderColor: N.border }}
        >
          <div className="px-5 py-3.5 border-b flex gap-3" style={{ borderColor: N.border }}>
            <SearchInput placeholder="Buscar funcionário..." />
            <select
              className="px-4 py-2 rounded-xl border text-sm outline-none"
              style={{
                borderColor: N.border,
                color: N.textMain,
                fontFamily: "inherit",
                background: N.canvas,
              }}
            >
              <option>Todos os perfis</option>
              <option>Veterinário</option>
              <option>Recepcionista</option>
              <option>Administrador</option>
            </select>
          </div>
          <table className="w-full text-sm flex-1">
            <thead>
              <tr className="border-b text-left" style={{ borderColor: N.border }}>
                {["Funcionário", "Perfil", "Status", "Turno", "E-mail", "Ações"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-xs font-semibold uppercase tracking-wide"
                    style={{ color: N.textSec }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {staff.map((s, i) => (
                <tr
                  key={i}
                  onClick={() => setSelected(i)}
                  className="border-b cursor-pointer transition-colors hover:bg-[#F7FAFC]"
                  style={{
                    borderColor: N.border,
                    background: selected === i ? N.mintSoft : undefined,
                  }}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                        style={{ background: N.adminAccent, color: "#2B4C8C" }}
                      >
                        {s.name[0]}
                      </div>
                      <div className="font-semibold" style={{ color: N.textMain }}>
                        {s.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm" style={{ color: N.textSec }}>
                    {s.role}
                  </td>
                  <td className="px-5 py-3">
                    <Badge label={s.status} color={s.status === "Ativo" ? "green" : "yellow"} />
                  </td>
                  <td className="px-5 py-3 text-xs font-mono" style={{ color: N.textSec }}>
                    {s.shift}
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: N.textSec }}>
                    {s.email}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <button
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        style={{ color: N.textSec }}
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        style={{ color: N.textSec }}
                      >
                        <Eye size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit panel */}
        {sel && (
          <div
            className="w-72 bg-white rounded-2xl border p-5 flex flex-col gap-4"
            style={{ borderColor: N.border }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg"
                style={{ background: N.adminAccent, color: "#2B4C8C" }}
              >
                {sel.name[0]}
              </div>
              <div>
                <div className="font-bold" style={{ color: N.textMain }}>
                  {sel.name}
                </div>
                <div className="text-xs" style={{ color: N.textSec }}>
                  Na clínica desde {sel.since}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: "Perfil", val: sel.role },
                { label: "Status", val: sel.status },
                { label: "Turno", val: sel.shift },
                { label: "E-mail", val: sel.email },
              ].map(({ label, val }) => (
                <div key={label}>
                  <div className="text-xs font-semibold mb-1" style={{ color: N.textSec }}>
                    {label}
                  </div>
                  <input
                    className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                    defaultValue={val}
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
            <button
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white mt-auto"
              style={{ background: N.navy }}
            >
              Salvar alterações
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Screen: Admin / Permissões ───────────────────────────────────────────────
