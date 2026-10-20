import "./global.css";
import { useState } from "react";
import { SafeAreaView, StatusBar, View, Text, TouchableOpacity } from "react-native";

import Inicio from "./telas/Inicio";
import Clientes from "./telas/Clientes";
import OrdensDeServico from "./telas/OrdensDeServico";
import Veiculos from "./telas/Veiculos";
import Orcamentos from "./telas/Orcamentos";

export default function App() {
  const [telaAtual, setTelaAtual] = useState("inicio");

  const navegar = (pagina: string) => {
    setTelaAtual(pagina);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D0F12" }}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0F12" />

      {/* Roteamento das Telas */}
      {telaAtual === "inicio" && <Inicio navegar={navegar} />}
      {telaAtual === "clientes" && <Clientes voltar={() => navegar("inicio")} />}
      {telaAtual === "ordensdeservico" && <OrdensDeServico voltar={() => navegar("inicio")} />}
      {telaAtual === "veiculos" && <Veiculos voltar={() => navegar("inicio")} />}
      {telaAtual === "orcamentos" && <Orcamentos voltar={() => navegar("inicio")} />}

      {/* Fallback para telas em desenvolvimento */}
      {telaAtual !== "inicio" &&
        telaAtual !== "clientes" &&
        telaAtual !== "ordensdeservico" &&
        telaAtual !== "veiculos" &&
        telaAtual !== "orcamentos" && (
          <View style={{ flex: 1, backgroundColor: "#0D0F12", padding: 24, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "#F05A28", fontSize: 20, fontWeight: "bold", marginBottom: 8, textTransform: "uppercase" }}>
              {telaAtual}
            </Text>
            <Text style={{ color: "#8A8F99", textAlign: "center", marginBottom: 24 }}>
              Esta funcionalidade está em desenvolvimento.
            </Text>
            <TouchableOpacity
              onPress={() => navegar("inicio")}
              style={{ backgroundColor: "#15181E", paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: "#F05A28" }}
            >
              <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>Voltar ao Início</Text>
            </TouchableOpacity>
          </View>
        )}
    </SafeAreaView>
  );
}