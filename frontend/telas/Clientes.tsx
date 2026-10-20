import { View, Text, TouchableOpacity } from "react-native";

type Props = {
  voltar: () => void;
};

export default function Clientes({ voltar }: Props) {
  return (
    <View className="flex-1 bg-[#121212] p-6 pt-12">
      {/* Botão de Voltar */}
      <TouchableOpacity
        onPress={voltar}
        className="mb-6 bg-[#222222] p-3 rounded-xl self-start border-l-4 border-[#F05A28]"
      >
        <Text className="text-white font-bold text-sm">← Voltar ao Início</Text>
      </TouchableOpacity>

      {/* Cabeçalho da Tela */}
      <Text className="text-[#F05A28] text-sm font-bold mb-1">
        MW MECÂNICA
      </Text>
      
      <Text className="text-3xl font-bold text-white mb-6">
        Clientes
      </Text>

      {/* Card de Conteúdo */}
      <View className="bg-[#222222] p-6 rounded-2xl border border-[#333333] shadow-lg">
        <Text className="text-white text-lg font-bold mb-2">
          Lista de Clientes
        </Text>
        <Text className="text-[#AAAAAA] text-base leading-relaxed">
          Aqui serão exibidos os clientes cadastrados na oficina. Em breve você poderá adicionar e gerenciar novos contatos.
        </Text>
      </View>
    </View>
  );
}