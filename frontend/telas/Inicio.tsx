import { View, Text, Pressable, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

type TelaAtiva =
  | "inicio"
  | "ordensdeservico"
  | "clientes"
  | "veiculos";

type Props = {
  navegar: (pagina: TelaAtiva) => void;
};

export default function Inicio({ navegar }: Props) {
  const botoes = [
    {
      titulo: "Clientes",
      descricao: "Gerenciar clientes",
      icone: "♙",
      pagina: "clientes" as TelaAtiva,
    },
    {
      titulo: "Veículos",
      descricao: "Gerenciar veículos",
      icone: "🚘",
      pagina: "veiculos" as TelaAtiva,
    },
    {
      titulo: "Ordens de Serviço",
      descricao: "Acompanhar serviços",
      icone: "🔧",
      pagina: "ordensdeservico" as TelaAtiva,
    },
    {
      titulo: "Orçamentos",
      descricao: "Consultar orçamentos",
      icone: "▤",
      pagina: "ordensdeservico" as TelaAtiva,
    },
  ];

  const ordens = [
    {
      numero: "#000128",
      cliente: "João Silva",
      veiculo: "VW Gol • ABC-1234",
      status: "EM ANDAMENTO",
      cor: "#D97732",
      data: "13/10/2026",
    },
    {
      numero: "#000127",
      cliente: "Maria Oliveira",
      veiculo: "Chevrolet Onix • XYZ-5678",
      status: "FINALIZADA",
      cor: "#27845B",
      data: "12/10/2026",
    },
    {
      numero: "#000126",
      cliente: "Carlos Rodrigues",
      veiculo: "Ford Ranger • QRS-9012",
      status: "ABERTA",
      cor: "#3978BD",
      data: "11/10/2026",
    },
  ];

  return (
    <View className="flex-1 bg-[#090B0D]">
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 35 }}
      >
        {/* Cabeçalho */}
        <View className="px-5 pt-5 pb-5 border-b border-[#292D32]">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-14 h-14 rounded-full border-2 border-[#D97732] items-center justify-center">
                <Text className="text-2xl font-extrabold text-[#D97732]">
                  MW
                </Text>
              </View>

              <View className="ml-3">
                <Text className="text-2xl font-extrabold text-[#D97732]">
                  MW
                </Text>
                <Text className="text-xs font-bold tracking-[3px] text-white">
                  MECÂNICA
                </Text>
              </View>
            </View>

            <View className="w-11 h-11 rounded-full bg-[#191C20] border border-[#34383D] items-center justify-center">
              <Text className="text-xl text-[#D97732]">⚙</Text>
            </View>
          </View>
        </View>

        {/* Boas-vindas */}
        <View className="px-5 mt-7 mb-6">
          <Text className="text-xs font-bold tracking-[3px] text-[#D97732]">
            PAINEL PRINCIPAL
          </Text>

          <Text className="text-3xl font-extrabold text-white mt-2">
            Olá, André!
          </Text>

          <Text className="text-sm text-gray-400 mt-2">
            Bem-vindo ao sistema da MW Mecânica.
          </Text>
        </View>

        {/* Atalhos */}
        <View className="px-5">
          <Text className="text-lg font-bold text-white mb-4">
            Acesso rápido
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {botoes.map((botao) => (
              <Pressable
                key={botao.titulo}
                onPress={() => navegar(botao.pagina)}
                className="w-[48%] min-h-[145px] mb-4 rounded-2xl bg-[#15181B] border border-[#303438] p-4 justify-between active:bg-[#25201C]"
              >
                <View className="w-12 h-12 rounded-xl bg-[#352419] items-center justify-center">
                  <Text className="text-2xl text-[#D97732]">
                    {botao.icone}
                  </Text>
                </View>

                <View className="mt-4">
                  <Text className="text-base font-bold text-white">
                    {botao.titulo}
                  </Text>

                  <Text className="text-xs text-gray-400 mt-1">
                    {botao.descricao}
                  </Text>
                </View>

                <View className="absolute right-4 top-4">
                  <Text className="text-xl text-[#D97732]">›</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Ordens de Serviço */}
        <View className="px-5 mt-5">
          <View className="flex-row items-center justify-between mb-5">
            <View className="flex-row items-center flex-1">
              <View className="w-1 h-8 rounded-full bg-[#D97732] mr-3" />

              <View>
                <Text className="text-xl font-bold text-white">
                  Ordens de Serviço
                </Text>

                <Text className="text-xs text-gray-400 mt-1">
                  Acompanhe os últimos serviços
                </Text>
              </View>
            </View>

            <Pressable
              onPress={() => navegar("ordensdeservico")}
              className="py-2 pl-2"
            >
              <Text className="text-sm font-bold text-[#D97732]">
                Ver todas ›
              </Text>
            </Pressable>
          </View>

          {ordens.map((ordem) => (
            <Pressable
              key={ordem.numero}
              onPress={() => navegar("ordensdeservico")}
              className="bg-[#15181B] border border-[#303438] rounded-2xl p-4 mb-3"
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-extrabold text-white">
                  OS {ordem.numero}
                </Text>

                <View
                  style={{ backgroundColor: ordem.cor + "26" }}
                  className="rounded-full px-2 py-1"
                >
                  <Text
                    style={{ color: ordem.cor }}
                    className="text-[10px] font-extrabold"
                  >
                    {ordem.status}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center mt-4">
                <View className="w-11 h-11 rounded-xl bg-[#29221D] items-center justify-center">
                  <Text className="text-xl">🔧</Text>
                </View>

                <View className="flex-1 ml-3">
                  <Text className="text-sm font-bold text-white">
                    {ordem.cliente}
                  </Text>

                  <Text className="text-xs text-gray-400 mt-1">
                    {ordem.veiculo}
                  </Text>

                  <Text className="text-xs text-gray-500 mt-1">
                    {ordem.data}
                  </Text>
                </View>

                <Text className="text-2xl text-[#D97732]">›</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Rodapé */}
        <View className="items-center mt-5 px-5">
          <View className="w-full h-px bg-[#292D32] mb-5" />

          <Text className="text-xs font-bold tracking-[2px] text-[#D97732]">
            MW MECÂNICA
          </Text>

          <Text className="text-xs text-gray-500 mt-2">
            Gestão automotiva simplificada
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}