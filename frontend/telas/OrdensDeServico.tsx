import { View, Text } from "react-native";

export default function OrdensDeServico() {
  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-xl font-bold mb-2 text-gray-900">
        Ordens de Serviço
      </Text>
      <Text className="text-center text-lg text-gray-700">
        Serviços em andamento, recentes, concluídos.
      </Text>
    </View>
  );
}