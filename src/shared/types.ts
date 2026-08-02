export type Role = "reception" | "vet" | "admin";

export type Screen =
  | "login"
  | "r-agenda"
  | "r-checkin"
  | "r-tutores"
  | "r-vincular"
  | "r-encaminhar"
  | "r-retornos"
  | "v-fila"
  | "v-consulta"
  | "v-prescricao"
  | "v-historico"
  | "v-encerramento"
  | "v-vacina"
  | "a-visao"
  | "a-funcionarios"
  | "a-permissoes"
  | "a-relatorios"
  | "a-config";

export type VaccineScreenOrigin = "v-consulta" | "v-historico";
