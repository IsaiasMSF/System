import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'; // Certifique-se de ter instalado

export default function Inicio() {
  // Cores base da imagem para o tema escuro
  const colors = {
    bg: "bg-[#121212]",        // Fundo quase preto
    card: "bg-[#1E1E1E]",      // Fundo dos cards
    primary: "text-[#F05A28]", // Laranja principal
    accent: "#F05A28",        // Laranja para ícones
    textHead: "text-white",    // Texto claro
    textSub: "text-gray-400",  // Texto secundário
    statusActive: "bg-[#F05A28]/20", // Laranja translúcido para 'Em Andamento'
  };

  // Mock de dados para a lista (apenas exemplo visual)
  const ordens = [
    { id: '#000128', veiculo: 'VW - Gol 1.0 2018', data: '18/06/2024', status: 'EM ANDAMENTO' },
    { id: '#000127', veiculo: 'Ford - Ka 1.5 2019', data: '17/06/2024', status: 'FINALIZADA', statusColor: 'bg-green-900/40 text-green-400' },
  ];

  return (
    <SafeAreaView className={`flex-1 ${colors.bg}`}>
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        
        {/* HEADER - LOGO E PERFIL */}
        <View className="flex-row justify-between items-center py-6 mt-2 border-b-2 border-[#F05A28] mb-8">
          <View className="flex-row items-center gap-2">
             {/* Simulação do logo MW MECÂNICA */}
             <MaterialCommunityIcons name="wrench-outline" size={32} color={colors.accent} />
             <View>
                <Text className={`${colors.textHead} text-2xl font-extrabold tracking-tighter`}>MW</Text>
                <Text className={`${colors.textHead} text-xs tracking-widest uppercase`}>Mecânica</Text>
             </View>
          </View>
          <TouchableOpacity className="p-2 rounded-full border border-gray-700">
            <Feather name="user" size={24} color={colors.accent} />
          </TouchableOpacity>
        </View>

        {/* SAUDAÇÃO */}
        <View className="mb-8">
          <Text className={`${colors.textHead} text-3xl font-bold`}>Olá, André</Text>
          <Text className={`${colors.textSub} text-base`}>Bem-vindo ao sistema da MW Mecânica</Text>
        </View>

        {/* BOTOES DE ATALHO (MENU) */}
        <View className="flex-row flex-wrap justify-between gap-4 mb-8">
          <MenuCard icon="users" label="Clientes" colors={colors} />
          <MenuCard icon="truck" label="Veículos" colors={colors} />
          <MenuCard icon="file-text" label="Ordens de Serviço" colors={colors} />
          <MenuCard icon="dollar-sign" label="Orçamentos" colors={colors} />
        </View>

        {/* SEÇÃO ORDENS DE SERVIÇO (LISTA) */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center gap-2">
                <View className="w-1.5 h-6 bg-[#F05A28] rounded" />
                <Text className={`${colors.textHead} text-xl font-semibold`}>Ordens de Serviço</Text>
            </View>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className={`${colors.primary} text-sm font-medium`}>Ver todas</Text>
              <Feather name="chevron-right" size={16} color={colors.accent} />
            </TouchableOpacity>
          </View>

          {/* ITENS DA LISTA */}
          {ordens.map((item, index) => (
            <TouchableOpacity key={index} className={`${colors.card} p-5 rounded-2xl mb-4 flex-row items-center justify-between`}>
              <View className="flex-1 pr-4">
                <View className="flex-row items-center justify-between mb-2">
                    <View className={`${item.statusColor || colors.statusActive} px-3 py-1 rounded-full`}>
                        <Text className={`text-xs font-bold ${item.statusColor ? '' : colors.primary}`}>{item.status}</Text>
                    </View>
                    <View className="flex-row items-center gap-1.5">
                        <Feather name="calendar" size={14} color={colors.accent} />
                        <Text className={`${colors.textSub} text-xs`}>{item.data}</Text>
                    </View>
                </View>
                <Text className={`${colors.textHead} text-lg font-bold`}>{item.id}</Text>
                <Text className={`${colors.textSub} text-sm`}>{item.veiculo}</Text>
              </View>
              <Feather name="chevron-right" size={20} color={colors.accent} />
            </TouchableOpacity>
          ))}
          
          {/* Adicionando um item extra "Aguardando Peças" como na imagem */}
          <TouchableOpacity className={`${colors.card} p-5 rounded-2xl mb-4 flex-row items-center justify-between`}>
              <View className="flex-1 pr-4">
                <View className="flex-row items-center justify-between mb-2">
                    <View className={`bg-gray-700/50 px-3 py-1 rounded-full`}>
                        <Text className={`text-xs font-bold text-gray-300`}>AGUARDANDO PEÇAS</Text>
                    </View>
                    <View className="flex-row items-center gap-1.5">
                        <Feather name="calendar" size={14} color={colors.accent} />
                        <Text className={`${colors.textSub} text-xs`}>12/06/2024</Text>
                    </View>
                </View>
                <Text className={`${colors.textHead} text-lg font-bold`}>#000125</Text>
                <Text className={`${colors.textSub} text-sm`}>Fiat - Argo 1.3 2021</Text>
              </View>
              <Feather name="chevron-right" size={20} color={colors.accent} />
            </TouchableOpacity>

        </View>

        {/* Mantendo o texto original no final, conforme sua tela original */}
        {/* <Text className="text-center text-lg text-gray-700 mt-4 mb-8">
            Bem-vindo ao nosso aplicativo!
        </Text> */}

      </ScrollView>
    </SafeAreaView>
  );
}

// Componente auxiliar para os cards de menu
interface MenuCardProps {
    icon: keyof typeof Feather.glyphMap;
    label: string;
    colors: any;
}

const MenuCard = ({ icon, label, colors }: MenuCardProps) => (
    <TouchableOpacity className={`${colors.card} w-[47%] p-6 rounded-2xl flex-col justify-between h-36`}>
        <Feather name={icon} size={32} color={colors.accent} />
        <View className="flex-row justify-between items-center mt-4">
            <Text className={`${colors.textHead} text-lg font-semibold flex-1 pr-2`} numberOfLines={2}>
                {label}
            </Text>
            <Feather name="chevron-right" size={18} color={colors.accent} />
        </View>
    </TouchableOpacity>
);