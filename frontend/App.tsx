import "./global.css";
import { useState } from "react";
import { StatusBar, View, Text, TouchableOpacity } from "react-native";

import Clientes from "./telas/Clientes";
import OrdensDeServico from "./telas/OrdensDeServico";
import Veiculos from "./telas/Veiculos";
import Orcamentos from "./telas/Orcamentos";
import Animada from "./telas/Animada";

export default function App() {
  const [telaAtual, setTelaAtual] = useState("animada");

  const navegar = (pagina: string) => {
    setTelaAtual(pagina);
  };

  return (
    <View className="flex-1 w-full min-h-screen bg-[#0D0F12]">
      <StatusBar barStyle="light-content" backgroundColor="#0D0F12" />

      {/* Roteamento das Telas */}
      {telaAtual === "animada" && <Animada navegar={navegar} />}
      {telaAtual === "clientes" && <Clientes voltar={() => navegar("animada")} />}
      {telaAtual === "ordensdeservico" && <OrdensDeServico voltar={() => navegar("animada")} />}
      {telaAtual === "veiculos" && <Veiculos voltar={() => navegar("animada")} />}
      {telaAtual === "orcamentos" && <Orcamentos voltar={() => navegar("animada")} />}

      {/* Fallback para telas em desenvolvimento */}
      {telaAtual !== "animada" &&
        telaAtual !== "clientes" &&
        telaAtual !== "ordensdeservico" &&
        telaAtual !== "veiculos" &&
        telaAtual !== "orcamentos" && (
          <View className="flex-1 w-full bg-[#0D0F12] p-6 justify-center items-center">
            <Text className="text-[#F05A28] text-xl font-bold mb-2 uppercase">
              {telaAtual}
            </Text>
            <Text className="text-[#8A8F99] text-center mb-6">
              Esta funcionalidade está em desenvolvimento.
            </Text>
            <TouchableOpacity
              onPress={() => navegar("animada")}
              className="bg-[#15181E] px-6 py-3 rounded-xl border border-[#F05A28]"
            >
              <Text className="text-white font-bold">Voltar ao Início</Text>
            </TouchableOpacity>
          </View>
        )}
    </View>
  );
}