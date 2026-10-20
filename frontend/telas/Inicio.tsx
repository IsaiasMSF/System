import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  navegar: (pagina: string) => void;
};

export default function Inicio({ navegar }: Props) {
  // Lista de Ordens de Serviço Recentes
  const ordensRecentes = [
    {
      id: "#000128",
      veiculo: "VW - Gol 1.0 2018",
      data: "18/06/2024",
      status: "EM ANDAMENTO",
      statusColor: "bg-[#C85A17]", // Laranja
    },
    {
      id: "#000127",
      veiculo: "Ford - Ka 1.5 2019",
      data: "17/06/2024",
      status: "FINALIZADA",
      statusColor: "bg-[#1E5631]", // Verde
    },
    {
      id: "#000126",
      veiculo: "Chevrolet - Onix 1.0 2020",
      data: "15/06/2024",
      status: "EM ANDAMENTO",
      statusColor: "bg-[#C85A17]",
    },
    {
      id: "#000125",
      veiculo: "Fiat - Argo 1.3 2021",
      data: "12/06/2024",
      status: "AGUARDANDO PEÇAS",
      statusColor: "bg-[#3A4750]", // Cinza escuro
    },
  ];

  return (
    <ScrollView
      className="flex-1 bg-[#0D0F12]"
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 50, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Header (Logo e Perfil) */}
      <View className="flex-row justify-between items-center mb-6">
        <View className="flex-row items-center gap-3">
          {/* Ícone / Logo Customizada */}
          <View className="w-12 h-12 rounded-full border-2 border-[#F05A28] justify-center items-center bg-[#181B20]">
            <FontAwesome5 name="wrench" size={20} color="#F05A28" />
          </View>
          <View>
            <Text className="text-white text-2xl font-black tracking-wider leading-6">
              MW
            </Text>
            <Text className="text-[#F05A28] text-xs font-bold tracking-widest uppercase">
              Mecânica
            </Text>
          </View>
        </View>

        {/* Ícone de Usuário */}
        <TouchableOpacity className="p-2">
          <Ionicons name="person-outline" size={26} color="#F05A28" />
        </TouchableOpacity>
      </View>

      {/* Linha Divisória Laranja */}
      <View className="h-[1px] bg-[#2A2E35] w-full mb-6 relative">
        <View className="h-[2px] bg-[#F05A28] w-2/3 absolute top-0 left-0" />
      </View>

      {/* 2. Boas-vindas */}
      <View className="mb-6">
        <Text className="text-white text-2xl font-bold">Olá, Isaías</Text>
        <Text className="text-gray-400 text-sm mt-1">
          Bem-vindo ao sistema da MW Mecânica
        </Text>
      </View>

      {/* 3. Grid de Atalhos 2x2 */}
      <View className="flex-row flex-wrap justify-between gap-y-4 mb-8">
        {/* Card Clientes */}
        <TouchableOpacity
          onPress={() => navegar("clientes")}
          activeOpacity={0.8}
          className="bg-[#15181E] w-[48%] p-4 rounded-2xl border border-[#232730] justify-between h-32"
        >
          <FontAwesome5 name="users" size={28} color="#F05A28" />
          <View className="flex-row justify-between items-center">
            <Text className="text-white font-bold text-base">Clientes</Text>
            <Ionicons name="chevron-forward" size={18} color="#F05A28" />
          </View>
        </TouchableOpacity>

        {/* Card Veículos */}
        <TouchableOpacity
          onPress={() => navegar("veiculos")}
          activeOpacity={0.8}
          className="bg-[#15181E] w-[48%] p-4 rounded-2xl border border-[#232730] justify-between h-32"
        >
          <FontAwesome5 name="car" size={28} color="#F05A28" />
          <View className="flex-row justify-between items-center">
            <Text className="text-white font-bold text-base">Veículos</Text>
            <Ionicons name="chevron-forward" size={18} color="#F05A28" />
          </View>
        </TouchableOpacity>

        {/* Card Ordens de Serviço */}
        <TouchableOpacity
          onPress={() => navegar("ordensdeservico")}
          activeOpacity={0.8}
          className="bg-[#15181E] w-[48%] p-4 rounded-2xl border border-[#232730] justify-between h-32"
        >
          <MaterialCommunityIcons name="clipboard-text-outline" size={30} color="#F05A28" />
          <View className="flex-row justify-between items-center">
            <Text className="text-white font-bold text-xs leading-4">
              Ordens de{"\n"}Serviço
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#F05A28" />
          </View>
        </TouchableOpacity>

        {/* Card Orçamentos */}
        <TouchableOpacity
          onPress={() => navegar("orcamentos")}
          activeOpacity={0.8}
          className="bg-[#15181E] w-[48%] p-4 rounded-2xl border border-[#232730] justify-between h-32"
        >
          <MaterialCommunityIcons name="file-document-outline" size={30} color="#F05A28" />
          <View className="flex-row justify-between items-center">
            <Text className="text-white font-bold text-base">Orçamentos</Text>
            <Ionicons name="chevron-forward" size={18} color="#F05A28" />
          </View>
        </TouchableOpacity>
      </View>

      {/* 4. Seção Ordens de Serviço Recentes */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center gap-2">
          <View className="w-1 h-5 bg-[#F05A28] rounded-full" />
          <Text className="text-white text-lg font-bold">
            Ordens de Serviço
          </Text>
        </View>

        <TouchableOpacity className="flex-row items-center">
          <Text className="text-[#F05A28] text-xs font-semibold mr-1">
            Ver todas
          </Text>
          <Ionicons name="chevron-forward" size={14} color="#F05A28" />
        </TouchableOpacity>
      </View>

      {/* Lista de Cards de OS */}
      <View className="gap-3">
        {ordensRecentes.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => navegar("ordensdeservico")}
            className="bg-[#15181E] p-4 rounded-2xl border border-[#232730]"
          >
            {/* Status e Data */}
            <View className="flex-row justify-between items-center mb-2">
              <View className={`${item.statusColor} px-2.5 py-1 rounded-md`}>
                <Text className="text-white text-[10px] font-bold tracking-wider">
                  {item.status}
                </Text>
              </View>

              <View className="flex-row items-center gap-1">
                <Ionicons name="calendar-outline" size={14} color="#8A8F99" />
                <Text className="text-[#8A8F99] text-xs">{item.data}</Text>
              </View>
            </View>

            {/* Código e Veículo */}
            <View className="flex-row justify-between items-end mt-1">
              <View>
                <Text className="text-white font-bold text-lg">{item.id}</Text>
                <Text className="text-[#8A8F99] text-xs mt-0.5">
                  {item.veiculo}
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#F05A28" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}