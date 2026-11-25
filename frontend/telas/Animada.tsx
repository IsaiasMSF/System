import { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";

type AnimadaProps = {
  navegar?: (pagina: string) => void;
};

export default function Animada({ navegar }: AnimadaProps) {
  const escala = useRef(new Animated.Value(1)).current;

  function animarBotao() {
    const useNative = Platform.OS !== "web";

    Animated.sequence([
      Animated.spring(escala, {
        toValue: 1.12,
        friction: 3,
        tension: 180,
        useNativeDriver: useNative,
      }),
      Animated.spring(escala, {
        toValue: 1,
        friction: 3,
        tension: 180,
        useNativeDriver: useNative,
      }),
    ]).start();
  }

  return (
    <View className="flex-1 w-full min-h-screen bg-[#0D0F12] justify-center items-center">
      <Animated.View
        style={{
          transform: [{ scale: escala }],
        }}
      >
        <TouchableOpacity
          onPress={animarBotao}
          activeOpacity={0.85}
          className="bg-[#F05A28] px-12 py-5 rounded-2xl"
        >
          <Text className="text-white text-lg font-bold">
            CLIQUE AQUI
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}