import { Check, X, Edit2 } from "lucide-react";
import { TopBar } from "../../../components/ui/ClinicPrimitives";
import { N } from "../../../shared/tokens";

type PermState = "full" | "partial" | "none";
function PermCell({ state }: { state: PermState }) {
  if (state === "full")
    return (
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center mx-auto"
        style={{ background: N.successSoft }}
      >
        <Check size={13} style={{ color: "#276749" }} />
      </div>
    );
  if (state === "partial")
    return (
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center mx-auto"
        style={{ background: N.warnSoft }}
      >
        <span className="text-xs font-bold" style={{ color: "#744210" }}>
          ~
        </span>
      </div>
    );
  return (
    <div
      className="w-6 h-6 rounded-lg flex items-center justify-center mx-auto"
      style={{ background: "#FEE2E2" }}
    >
      <X size={13} style={{ color: "#C53030" }} />
    </div>
  );
}

export function AdminPermissoes() {
  const modules = [
    {
      name: "Agenda / Recepção",
      admin: "full" as PermState,
      reception: "full" as PermState,
      vet: "partial" as PermState,
    },
    {
      name: "Check-in",
      admin: "full" as PermState,
      reception: "full" as PermState,
      vet: "none" as PermState,
    },
    {
      name: "Tutores e Pets",
      admin: "full" as PermState,
      reception: "full" as PermState,
      vet: "partial" as PermState,
    },
    {
      name: "Prontuário clínico",
      admin: "full" as PermState,
      reception: "none" as PermState,
      vet: "full" as PermState,
    },
    {
      name: "Prescrições",
      admin: "full" as PermState,
      reception: "none" as PermState,
      vet: "full" as PermState,
    },
    {
      name: "Histórico clínico",
      admin: "full" as PermState,
      reception: "none" as PermState,
      vet: "full" as PermState,
    },
    {
      name: "Funcionários",
      admin: "full" as PermState,
      reception: "none" as PermState,
      vet: "none" as PermState,
    },
    {
      name: "Permissões",
      admin: "full" as PermState,
      reception: "none" as PermState,
      vet: "none" as PermState,
    },
    {
      name: "Relatórios",
      admin: "full" as PermState,
      reception: "partial" as PermState,
      vet: "none" as PermState,
    },
    {
      name: "Configurações",
      admin: "full" as PermState,
      reception: "none" as PermState,
      vet: "none" as PermState,
    },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar title="Controle de Permissões" subtitle="Definir acesso por perfil de usuário" />
      <div className="flex gap-5 px-7 py-5 flex-1 overflow-hidden">
        {/* Matrix */}
        <div
          className="flex-1 bg-white rounded-2xl border overflow-hidden"
          style={{ borderColor: N.border }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: N.border, background: N.canvas }}>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide"
                  style={{ color: N.textSec, width: "45%" }}
                >
                  Módulo
                </th>
                {[
                  { label: "Administrador", color: "#2D3A8C", bg: N.adminAccent },
                  { label: "Recepção", color: N.navy, bg: N.mintSoft },
                  { label: "Veterinário", color: "#276749", bg: N.successSoft },
                ].map(({ label, color, bg }) => (
                  <th key={label} className="px-6 py-4 text-center">
                    <span
                      className="inline-block px-3 py-1 rounded-lg text-xs font-semibold"
                      style={{ background: bg, color }}
                    >
                      {label}
                    </span>
                  </th>
                ))}
                <th
                  className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-center"
                  style={{ color: N.textSec }}
                >
                  Editar
                </th>
              </tr>
            </thead>
            <tbody>
              {modules.map((m, i) => (
                <tr
                  key={i}
                  className="border-b transition-colors hover:bg-[#F7FAFC]"
                  style={{ borderColor: N.border }}
                >
                  <td className="px-6 py-3.5 font-medium text-sm" style={{ color: N.textMain }}>
                    {m.name}
                  </td>
                  <td className="px-6 py-3.5">
                    <PermCell state={m.admin} />
                  </td>
                  <td className="px-6 py-3.5">
                    <PermCell state={m.reception} />
                  </td>
                  <td className="px-6 py-3.5">
                    <PermCell state={m.vet} />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <button
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      style={{ color: N.textSec }}
                    >
                      <Edit2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend / info */}
        <div className="w-64 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <h4 className="font-semibold text-sm mb-4" style={{ color: N.textMain }}>
              Legenda
            </h4>
            <div className="space-y-3">
              {[
                { state: "full" as PermState, label: "Acesso completo" },
                { state: "partial" as PermState, label: "Acesso parcial / leitura" },
                { state: "none" as PermState, label: "Sem acesso" },
              ].map(({ state, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-6 shrink-0">
                    <PermCell state={state} />
                  </div>
                  <span className="text-xs" style={{ color: N.textMain }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border p-5 flex-1" style={{ borderColor: N.border }}>
            <h4 className="font-semibold text-sm mb-3" style={{ color: N.textMain }}>
              Notas
            </h4>
            <p className="text-xs leading-relaxed" style={{ color: N.textSec }}>
              O Administrador tem acesso irrestrito a todos os módulos. Edições de permissão entram
              em vigor no próximo login do usuário afetado.
            </p>
            <button
              className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: N.navy }}
            >
              Salvar permissões
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Admin / Relatórios ───────────────────────────────────────────────
