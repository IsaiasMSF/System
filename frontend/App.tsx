
import "./global.css";
import React, { useEffect, useRef } from "react";

import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Pressable,
  Alert,
  Linking,
  Animated,
  Easing,
} from "react-native";

// Insira os links oficiais de download
const LINK_ANDROID = "";
const LINK_IOS = "";

export default function App() {

  // ANIMAÇÃO DO BOTÃO PRINCIPAL
  const animacaoBotao = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animacao = Animated.loop(
      Animated.sequence([
        Animated.timing(animacaoBotao, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(animacaoBotao, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    );

    animacao.start();

    return () => animacao.stop();
  }, []);

  // Abre a loja correspondente ao celular
  const abrirDownload = async (plataforma: "android" | "ios") => {
    const link = plataforma === "android" ? LINK_ANDROID : LINK_IOS;

    if (!link) {
      Alert.alert(
        "Download",
        "O link oficial da loja ainda não foi configurado."
      );
      return;
    }

    try {
      await Linking.openURL(link);
    } catch {
      Alert.alert("Erro", "Não foi possível abrir o link.");
    }
  };

  // Permite escolher a loja
  const escolherDownload = () => {
    Alert.alert(
      "Baixe o aplicativo",
      "Escolha a loja do seu celular:",
      [
        {
          text: "Google Play",
          onPress: () => abrirDownload("android"),
        },
        {
          text: "App Store",
          onPress: () => abrirDownload("ios"),
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-[#080B1A]">

      <StatusBar
        barStyle="light-content"
        backgroundColor="#080B1A"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 35 }}
      >

        {/* CABEÇALHO */}

        <View className="px-6 pt-8 pb-6 flex-row items-center justify-between">

          <View>
            <Text className="text-white text-2xl font-black">
              🦅 ÁGUIA <Text className="text-red-500">SUL</Text>
            </Text>

            <Text className="text-gray-400 text-xs tracking-widest mt-1">
              MOBILIDADE URBANA
            </Text>
          </View>

          <Pressable className="border border-red-500 rounded-xl px-5 py-3">
            <Text className="text-red-500 font-bold text-base">
              MENU
            </Text>
          </Pressable>

        </View>

        {/* APRESENTAÇÃO PRINCIPAL */}

        <View className="px-6 pt-10 pb-10 items-center">

          <View className="bg-red-500/10 rounded-full px-4 py-2 mb-6">
            <Text className="text-red-400 text-xs font-bold">
              SUA MOBILIDADE, MAIS SIMPLES
            </Text>
          </View>

          <Text className="text-white text-4xl font-black text-center">
            Viajar ficou
          </Text>

          <Text className="text-red-500 text-4xl font-black text-center">
            mais fácil!
          </Text>

          <Text className="text-gray-300 text-base text-center leading-7 mt-5">
            Tenha a Águia Sul na palma da sua mão.
            Baixe nosso aplicativo e aproveite uma
            experiência de mobilidade mais prática,
            confortável e segura.
          </Text>

          {/* UX FIX 1: Botão principal em destaque na primeira
              área da tela para facilitar o acesso ao download. */}

          {/* BOTÃO ANIMADO */}

          <Animated.View
            style={{
              width: "100%",
              marginTop: 32,
              backgroundColor: animacaoBotao.interpolate({
                inputRange: [0, 1],
                outputRange: ["#DC2626", "#7F1D1D"],
              }),
              borderRadius: 16,
              transform: [
                {
                  scale: animacaoBotao.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.04],
                  }),
                },
              ],
            }}
          >
            <Pressable
              onPress={escolherDownload}
              className="w-full py-5 items-center justify-center"
            >
              <Text className="text-white text-xl font-black">
                ↓  BAIXAR APLICATIVO
              </Text>
            </Pressable>
          </Animated.View>

          <Text className="text-gray-400 text-xs mt-3">
            GRATUITO • DISPONÍVEL PARA CELULAR
          </Text>

          {/* UX FIX 2: As duas lojas aparecem logo abaixo do
              botão principal para facilitar a identificação. */}

          <View className="flex-row w-full mt-6">

            <Pressable
              onPress={() => abrirDownload("android")}
              className="flex-1 bg-[#171C2D] border border-gray-700 rounded-xl p-4 mr-2 items-center"
            >
              <Text className="text-white text-2xl">
                ▶
              </Text>

              <Text className="text-gray-400 text-xs mt-2">
                DISPONÍVEL NO
              </Text>

              <Text className="text-white font-bold">
                Google Play
              </Text>
            </Pressable>

            <Pressable
              onPress={() => abrirDownload("ios")}
              className="flex-1 bg-[#171C2D] border border-gray-700 rounded-xl p-4 ml-2 items-center"
            >
              <Text className="text-white text-2xl">
                
              </Text>

              <Text className="text-gray-400 text-xs mt-2">
                BAIXE NA
              </Text>

              <Text className="text-white font-bold">
                App Store
              </Text>
            </Pressable>

          </View>

        </View>

        {/* BENEFÍCIOS */}

        <View className="bg-[#11172B] px-6 py-10">

          <Text className="text-red-500 text-center font-bold text-sm tracking-widest">
            POR QUE BAIXAR?
          </Text>

          <Text className="text-white text-2xl font-bold text-center mt-3 mb-8">
            Tudo mais fácil com a Águia Sul
          </Text>

          <View className="bg-[#1A2239] rounded-2xl p-5 mb-4 flex-row items-center">

            <Text className="text-3xl">
              📱
            </Text>

            <View className="flex-1 ml-4">
              <Text className="text-white font-bold text-base">
                Praticidade
              </Text>

              <Text className="text-gray-400 text-sm mt-1">
                Tenha nossos serviços sempre disponíveis no seu celular.
              </Text>
            </View>

          </View>

          <View className="bg-[#1A2239] rounded-2xl p-5 mb-4 flex-row items-center">

            <Text className="text-3xl">
              🛡️
            </Text>

            <View className="flex-1 ml-4">
              <Text className="text-white font-bold text-base">
                Segurança
              </Text>

              <Text className="text-gray-400 text-sm mt-1">
                Mais tranquilidade e confiança durante suas viagens.
              </Text>
            </View>

          </View>

          <View className="bg-[#1A2239] rounded-2xl p-5 flex-row items-center">

            <Text className="text-3xl">
              ⏱️
            </Text>

            <View className="flex-1 ml-4">
              <Text className="text-white font-bold text-base">
                Agilidade
              </Text>

              <Text className="text-gray-400 text-sm mt-1">
                Uma experiência simples e rápida para sua mobilidade.
              </Text>
            </View>

          </View>

        </View>

        {/* SOBRE A EMPRESA */}

        <View className="px-6 py-10">

          <Text className="text-red-500 font-bold text-sm tracking-widest">
            CONHEÇA A ÁGUIA SUL
          </Text>

          <Text className="text-white text-3xl font-bold mt-3">
            Sobre Nós
          </Text>

          {/* UX FIX 3: Texto institucional posicionado depois
              da chamada principal de download. */}

          <Text className="text-gray-300 text-base leading-7 mt-5">
            O Águia Sul é um aplicativo gaúcho de mobilidade urbana,
            com atuação no interior do Rio Grande do Sul.
            Oferecemos serviços de transporte de alta qualidade
            nas cidades de Ijuí e região, priorizando o conforto,
            a segurança e a praticidade dos passageiros.
          </Text>

        </View>

        {/* CHAMADA FINAL */}

        <View className="mx-6 bg-red-600 rounded-3xl p-7 items-center">

          <Text className="text-white text-2xl font-black text-center">
            Ainda não tem o aplicativo?
          </Text>

          <Text className="text-red-100 text-center mt-3 leading-6">
            Comece agora! Baixe gratuitamente e tenha
            a Águia Sul sempre com você.
          </Text>

          {/* UX FIX 4: Chamada para download repetida no final
              para oferecer outra oportunidade de conversão. */}

          <Pressable
            onPress={escolherDownload}
            className="w-full bg-white rounded-xl py-5 mt-6 items-center"
          >
            <Text className="text-red-600 font-black text-lg">
              ↓  BAIXAR AGORA
            </Text>
          </Pressable>

        </View>

        {/* RODAPÉ */}

        <View className="items-center mt-9 px-6">

          <Text className="text-gray-500 text-xs">
            © Águia Sul - Mobilidade Urbana
          </Text>

          <Text className="text-gray-600 text-xs mt-2">
            Ijuí e região • Rio Grande do Sul
          </Text>

        </View>

      </ScrollView>

    </View>
  );
}
