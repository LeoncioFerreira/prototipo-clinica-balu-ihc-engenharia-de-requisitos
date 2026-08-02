import { format, parseISO } from "date-fns";
import { CalendarClock, Info, Syringe } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { TopBar } from "../../../components/ui/ClinicPrimitives";
import { N } from "../../../shared/tokens";
import { getVaccineReminderDates } from "./reminders";

type Props = {
  onCancel: () => void;
  onSaved: () => void;
  today?: string;
};

function displayDate(value: string) {
  return format(parseISO(value), "dd/MM/yyyy");
}

export function VetCadastroVacina({ onCancel, onSaved, today }: Props) {
  const [vaccine, setVaccine] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [nextDose, setNextDose] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reminders = useMemo(
    () => (nextDose ? getVaccineReminderDates(nextDose, today) : []),
    [nextDose, today],
  );

  const submit = () => {
    const nextErrors: Record<string, string> = {};
    if (!vaccine.trim()) nextErrors.vaccine = "Informe a vacina.";
    if (!applicationDate) nextErrors.applicationDate = "Informe a data da aplicação.";
    if (!nextDose) nextErrors.nextDose = "Informe a data da próxima dose.";
    if (applicationDate && nextDose && nextDose <= applicationDate) {
      nextErrors.nextDose = "A próxima dose deve ser posterior à data da aplicação.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      toast.error("Revise os campos destacados.");
      return;
    }
    toast.success("Lembretes da próxima dose programados");
    onSaved();
  };

  const fieldClass = "w-full px-4 py-3 rounded-xl border text-sm outline-none";
  const fieldStyle = { borderColor: N.border, color: N.textMain, background: N.canvas };

  return (
    <div className="flex flex-col h-full" style={{ background: N.canvas }}>
      <TopBar title="Cadastro de vacina" subtitle="Thor · Tutor: Carlos Lima" />
      <div className="flex-1 overflow-auto px-7 py-6">
        <div className="max-w-3xl mx-auto space-y-5">
          <div
            className="bg-white rounded-2xl border p-5 flex items-center gap-4"
            style={{ borderColor: N.border }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: N.mintSoft, color: N.navy }}
            >
              <Syringe size={22} />
            </div>
            <div className="grid grid-cols-2 gap-4 flex-1">
              <label className="text-xs font-semibold" style={{ color: N.textSec }}>
                Pet
                <input
                  aria-label="Pet"
                  disabled
                  value="Thor"
                  className={`${fieldClass} mt-1`}
                  style={fieldStyle}
                />
              </label>
              <div className="text-sm pt-5" style={{ color: N.textSec }}>
                Cão · Golden · 4 anos · Tutor: Carlos Lima
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl border p-4 flex gap-3"
            style={{ background: N.adminAccent, borderColor: N.border, color: N.textMain }}
          >
            <Info size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm">
              Este cadastro serve somente para programar lembretes no Balu. Ele não substitui
              carteira, comprovante ou registro oficial de vacinação, que deve ser realizado fora da
              plataforma.
            </p>
          </div>

          <div
            className="bg-white rounded-2xl border p-6 space-y-5"
            style={{ borderColor: N.border }}
          >
            <label className="block text-xs font-semibold" style={{ color: N.textMain }}>
              Vacina
              <input
                aria-label="Vacina"
                value={vaccine}
                onChange={(e) => setVaccine(e.target.value)}
                className={`${fieldClass} mt-2`}
                placeholder="Ex.: V10"
                style={fieldStyle}
              />
              {errors.vaccine && (
                <span role="alert" className="block mt-1 text-xs text-red-600">
                  {errors.vaccine}
                </span>
              )}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="text-xs font-semibold" style={{ color: N.textMain }}>
                Data da aplicação
                <input
                  aria-label="Data da aplicação"
                  type="date"
                  value={applicationDate}
                  onChange={(e) => setApplicationDate(e.target.value)}
                  className={`${fieldClass} mt-2`}
                  style={fieldStyle}
                />
                {errors.applicationDate && (
                  <span role="alert" className="block mt-1 text-xs text-red-600">
                    {errors.applicationDate}
                  </span>
                )}
              </label>
              <label className="text-xs font-semibold" style={{ color: N.textMain }}>
                Data da próxima dose
                <input
                  aria-label="Data da próxima dose"
                  type="date"
                  value={nextDose}
                  onChange={(e) => setNextDose(e.target.value)}
                  className={`${fieldClass} mt-2`}
                  style={fieldStyle}
                />
                {errors.nextDose && (
                  <span role="alert" className="block mt-1 text-xs text-red-600">
                    {errors.nextDose}
                  </span>
                )}
              </label>
            </div>

            {reminders.length > 0 && (
              <div
                className="rounded-xl p-4 flex items-center gap-3"
                style={{ background: N.mintSoft, color: N.navy }}
              >
                <CalendarClock size={19} />
                <span className="text-sm font-semibold">
                  {reminders.length === 2
                    ? `O tutor será alertado em ${displayDate(reminders[0])} e ${displayDate(reminders[1])}.`
                    : `O tutor será alertado em ${displayDate(reminders[0])}.`}
                </span>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={onCancel}
                className="px-5 py-3 rounded-xl border text-sm font-semibold"
                style={{ borderColor: N.border, color: N.textSec }}
              >
                Cancelar
              </button>
              <button
                onClick={submit}
                className="px-5 py-3 rounded-xl text-sm font-bold text-white"
                style={{ background: N.navy }}
              >
                Salvar e programar alertas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
