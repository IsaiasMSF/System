import "./global.css";
import { useState } from "react";

import Inicio from "./telas/Inicio";
import OrdensDeServico from "./telas/OrdensDeServico";
import Clientes from "./telas/Clientes";
import Veiculos from "./telas/Veiculos";

// Tipagem das telas disponíveis no app
type TelaAtiva =
  | "inicio"
  | "ordensdeservico"
  | "clientes"
  | "veiculos";

export default function App() {
  const [tela, setTela] = useState<TelaAtiva>("inicio");

  // Função para navegar entre as telas
  const navegar = (pagina: TelaAtiva) => {
    setTela(pagina);
  };

  if (tela === "inicio") {
    return <Inicio navegar={navegar} />;
  }

  if (tela === "ordensdeservico") {
    return <OrdensDeServico navegar={navegar} />;
  }

  if (tela === "clientes") {
    return <Clientes navegar={navegar} />;
  }

  if (tela === "veiculos") {
    return <Veiculos navegar={navegar} />;
  }

  return <Inicio navegar={navegar} />;
}