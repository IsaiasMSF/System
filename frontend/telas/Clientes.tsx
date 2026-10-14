import { View, Text } from "react-native";

export default function Clientes() {
  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-xl font-bold mb-2 text-gray-900">
        Clientes
      </Text>
      <Text className="text-center text-lg text-gray-700">
        Aqui serão exibidos os clientes
      </Text>
    </View>
  );
}