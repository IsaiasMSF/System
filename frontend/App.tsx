import "./global.css";
import { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Inicio from "./telas/Inicio";
import Clientes from "./telas/Clientes";

export default function App() {
  const [telaAtual, setTelaAtual] = useState("inicio");

  // Função centralizada para alternar entre as telas
  const navegar = (pagina: string) => {
    setTelaAtual(pagina);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* Renderização condicional das telas do aplicativo */}
      {telaAtual === "inicio" && <Inicio navegar={navegar} />}
      
      {telaAtual === "clientes" && <Clientes voltar={() => navegar("inicio")} />}

      {/* Futuramente você pode adicionar as outras telas aqui:
        {telaAtual === "ordensdeservico" && <OrdensDeServico voltar={() => navegar("inicio")} />}
        {telaAtual === "veiculos" && <Veiculos voltar={() => navegar("inicio")} />}
      */}
    </SafeAreaView>
  );
}