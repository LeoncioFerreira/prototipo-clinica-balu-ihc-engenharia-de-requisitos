import { format, isBefore, parseISO, subDays } from "date-fns";

export function getVaccineReminderDates(
  nextDose: string,
  today = format(new Date(), "yyyy-MM-dd"),
) {
  const earlyDate = subDays(parseISO(nextDose), 7);

  return isBefore(earlyDate, parseISO(today))
    ? [nextDose]
    : [format(earlyDate, "yyyy-MM-dd"), nextDose];
}
