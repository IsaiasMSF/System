import "./global.css";
import { useState } from "react";

import Inicio from "./telas/Inicio";
import OrdensDeServico from "./telas/OrdensDeServico";
import Clientes from "./telas/Clientes";
import Veiculos from "./telas/Veiculos";

// Tipagem das telas disponíveis no app
type TelaAtiva = "inicio" | "ordensdeservico";

export default function App() {
  const [tela, setTela] = useState<TelaAtiva>("inicio");

  if (tela === "inicio") {
    return <Inicio />;
  }

  if (tela === "ordensdeservico") {
    return <OrdensDeServico />;
  }

  if (tela === "clientes") {
    return <Clientes />;
  }

  if (tela === "veiculos") {
    return <Veiculos />;
  }

  return <Inicio />;
}