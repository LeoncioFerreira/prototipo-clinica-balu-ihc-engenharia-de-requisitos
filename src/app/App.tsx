import { useState } from "react";
import { Sidebar } from "../components/ui/ClinicPrimitives";
import { LoginScreen } from "../features/acesso/tela-01-login/Screen";
import { AdminConfig } from "../features/administracao/tela-17-configuracoes/Screen";
import { AdminFuncionarios } from "../features/administracao/tela-14-funcionarios/Screen";
import { AdminPermissoes } from "../features/administracao/tela-15-permissoes/Screen";
import { AdminRelatorios } from "../features/administracao/tela-16-relatorios/Screen";
import { AdminVisao } from "../features/administracao/tela-13-visao-geral/Screen";
import { ReceptionAgenda } from "../features/recepcao/tela-02-agenda/Screen";
import { ReceptionCheckin } from "../features/recepcao/tela-03-check-in/Screen";
import { ReceptionEncaminhar } from "../features/recepcao/tela-06-encaminhar/Screen";
import { ReceptionRetornos } from "../features/recepcao/tela-07-retornos/Screen";
import { ReceptionTutores } from "../features/recepcao/tela-04-tutores/Screen";
import { ReceptionVincular } from "../features/recepcao/tela-05-vincular-pet/Screen";
import { VetConsulta } from "../features/veterinario/tela-09-consulta/Screen";
import { VetEncerramento } from "../features/veterinario/tela-12-encerramento/Screen";
import { VetFila } from "../features/veterinario/tela-08-fila/Screen";
import { VetHistorico } from "../features/veterinario/tela-11-historico/Screen";
import { VetPrescricao } from "../features/veterinario/tela-10-prescricao/Screen";
import { N } from "../shared/tokens";
import type { Role, Screen } from "../shared/types";
import { pathForScreen, roleForScreen, screenForPath } from "./routes";

export default function App() {
  const initialScreen = screenForPath(window.location.pathname);
  const [screen, setScreen] = useState<Screen>(initialScreen);
  const [role, setRole] = useState<Role | null>(() => roleForScreen(initialScreen));

  const navigate = (nextScreen: Screen) => {
    window.history.replaceState({}, "", pathForScreen(nextScreen));
    setScreen(nextScreen);
  };

  const handleLogin = (nextRole: Role) => {
    setRole(nextRole);
    navigate(nextRole === "reception" ? "r-agenda" : nextRole === "vet" ? "v-fila" : "a-visao");
  };

  const handleLogout = () => {
    setRole(null);
    navigate("login");
  };

  if (screen === "login") return <LoginScreen onLogin={handleLogin} />;

  const renderScreen = () => {
    switch (screen) {
      case "r-agenda":
        return <ReceptionAgenda onNav={navigate} />;
      case "r-checkin":
        return <ReceptionCheckin onNav={navigate} />;
      case "r-tutores":
        return <ReceptionTutores />;
      case "r-vincular":
        return <ReceptionVincular />;
      case "r-encaminhar":
        return <ReceptionEncaminhar onNav={navigate} />;
      case "r-retornos":
        return <ReceptionRetornos />;
      case "v-fila":
        return <VetFila onNav={navigate} />;
      case "v-consulta":
        return <VetConsulta onNav={navigate} />;
      case "v-prescricao":
        return <VetPrescricao onNav={navigate} />;
      case "v-historico":
        return <VetHistorico />;
      case "v-encerramento":
        return <VetEncerramento onNav={navigate} />;
      case "a-visao":
        return <AdminVisao onNav={navigate} />;
      case "a-funcionarios":
        return <AdminFuncionarios />;
      case "a-permissoes":
        return <AdminPermissoes />;
      case "a-relatorios":
        return <AdminRelatorios />;
      case "a-config":
        return <AdminConfig />;
      default:
        return null;
    }
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: N.canvas }}
    >
      <Sidebar role={role!} current={screen} onNav={navigate} onLogout={handleLogout} />
      <main className="flex flex-1 flex-col overflow-hidden">{renderScreen()}</main>
    </div>
  );
}
