import { useState } from "react";
import { Check } from "lucide-react";
import { Badge, TopBar } from "../../../components/ui/ClinicPrimitives";
import { N } from "../../../shared/tokens";

export function AdminConfig() {
  const [tab, setTab] = useState<"clinica" | "mensagens" | "integracoes">("clinica");
  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar title="Configurações" subtitle="Preferências e dados da clínica" />
      <div className="flex gap-5 px-7 py-5 flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col gap-4">
          {/* Tabs */}
          <div className="flex gap-2">
            {(["clinica", "mensagens", "integracoes"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-5 py-2 rounded-xl text-sm font-semibold border transition-all"
                style={{
                  background: tab === t ? N.navy : "white",
                  color: tab === t ? "white" : N.textSec,
                  borderColor: tab === t ? N.navy : N.border,
                }}
              >
                {t === "clinica"
                  ? "Dados da clínica"
                  : t === "mensagens"
                    ? "Mensagens"
                    : "Integrações"}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border flex-1 p-6" style={{ borderColor: N.border }}>
            {tab === "clinica" && (
              <div className="space-y-5">
                <h3 className="font-bold text-sm" style={{ color: N.textMain }}>
                  Informações da clínica
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Nome da clínica", val: "Clínica Veterinária Balu" },
                    { label: "CNPJ", val: "12.345.678/0001-99" },
                    { label: "Telefone principal", val: "(11) 3456-7890" },
                    { label: "E-mail de contato", val: "contato@balu.vet" },
                    { label: "CRMV da clínica", val: "12345-SP" },
                    { label: "Horário de funcionamento", val: "07:30 – 19:00" },
                  ].map(({ label, val }) => (
                    <div key={label}>
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{ color: N.textMain }}
                      >
                        {label}
                      </label>
                      <input
                        className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
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
                <div>
                  <label
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: N.textMain }}
                  >
                    Endereço completo
                  </label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                    defaultValue="Rua das Palmeiras, 142 — Jardim América, São Paulo/SP — CEP 01234-000"
                    style={{
                      borderColor: N.border,
                      color: N.textMain,
                      fontFamily: "inherit",
                      background: N.canvas,
                    }}
                  />
                </div>
              </div>
            )}
            {tab === "mensagens" && (
              <div className="space-y-5">
                <h3 className="font-bold text-sm" style={{ color: N.textMain }}>
                  Templates de mensagens automáticas
                </h3>
                {[
                  {
                    label: "Confirmação de agendamento",
                    val: "Olá {tutor}! Seu agendamento para {pet} está confirmado para {data} às {hora}. Até breve! 🐾",
                  },
                  {
                    label: "Lembrete de consulta (24h antes)",
                    val: "Lembrete: {pet} tem consulta amanhã às {hora}. Clínica Veterinária Balu.",
                  },
                  {
                    label: "Pós-consulta (orientações)",
                    val: "Obrigado pela visita! As orientações do Dr. {vet} para {pet} estão disponíveis no app Balu.",
                  },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: N.textMain }}
                    >
                      {label}
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                      rows={2}
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
            )}
            {tab === "integracoes" && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm" style={{ color: N.textMain }}>
                  Status das integrações
                </h3>
                {[
                  {
                    name: "App Balu",
                    sub: "Integração automática com tutores",
                    status: "Automático",
                    color: "blue" as const,
                    manage: false,
                  },
                  {
                    name: "WhatsApp Business",
                    sub: "Notificações e mensagens ao tutor",
                    status: "Conectado",
                    color: "green" as const,
                    manage: true,
                  },
                ].map(({ name, sub, status, color, manage }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between p-4 rounded-xl border"
                    style={{ borderColor: N.border }}
                  >
                    <div>
                      <div className="font-medium text-sm" style={{ color: N.textMain }}>
                        {name}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: N.textSec }}>
                        {sub}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge label={status} color={color} />
                      {manage && (
                        <button
                          className="text-xs px-3 py-1.5 rounded-lg border font-medium"
                          style={{ borderColor: N.border, color: N.textSec }}
                        >
                          Gerenciar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            className="py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: N.navy }}
          >
            Salvar configurações
          </button>
        </div>

        {/* Summary */}
        <div className="w-64 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: N.border }}>
            <h4 className="font-semibold text-sm mb-3" style={{ color: N.textMain }}>
              Status do sistema
            </h4>
            <div className="space-y-2">
              {[
                { label: "Última atualização", val: "21/07/2026" },
                { label: "Versão", val: "v2.4.1" },
                { label: "Ambiente", val: "Produção" },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between text-xs">
                  <span style={{ color: N.textSec }}>{label}</span>
                  <span className="font-semibold" style={{ color: N.textMain }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="mt-4 p-2.5 rounded-xl text-xs"
              style={{ background: N.successSoft, color: "#276749" }}
            >
              <Check size={11} className="inline mr-1" />
              Sistema operando normalmente
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
