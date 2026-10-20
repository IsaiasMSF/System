import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

type Props = {
  voltar: () => void;
};

export default function OrdensDeServico({ voltar }: Props) {
  const [filtroAba, setFiltroAba] = useState<
    "Todas" | "Abertas" | "Em andamento" | "Finalizadas"
  >("Todas");
  const [busca, setBusca] = useState("");

  // Dados fiéis ao protótipo da tela de Ordens de Serviço
  const listaOS = [
    {
      id: "#000128",
      status: "EM ANDAMENTO",
      statusColor: "#C85A17", // Laranja
      cliente: "João Silva",
      veiculo: "Volkswagen Gol - ABC-1234",
      dataHora: "18/06/2024  09:30",
    },
    {
      id: "#000127",
      status: "FINALIZADA",
      statusColor: "#1E5631", // Verde
      cliente: "Maria Oliveira",
      veiculo: "Chevrolet Onix - XYZ-5678",
      dataHora: "17/06/2024  14:20",
    },
    {
      id: "#000126",
      status: "ABERTA",
      statusColor: "#1A5276", // Azul
      cliente: "Carlos Rodrigues",
      veiculo: "Ford Ranger - QRS-9012",
      dataHora: "16/06/2024  10:15",
    },
    {
      id: "#000125",
      status: "EM ANDAMENTO",
      statusColor: "#C85A17",
      cliente: "Fernanda Souza",
      veiculo: "Fiat Strada - GHI-7890",
      dataHora: "15/06/2024  08:45",
    },
    {
      id: "#000124",
      status: "FINALIZADA",
      statusColor: "#1E5631",
      cliente: "Rafael Lima",
      veiculo: "Renault Kwid - JKL-2345",
      dataHora: "14/06/2024  16:30",
    },
  ];

  // Contagem dinâmica para as abas
  const countAbertas = listaOS.filter((os) => os.status === "ABERTA").length;
  const countEmAndamento = listaOS.filter(
    (os) => os.status === "EM ANDAMENTO"
  ).length;
  const countFinalizadas = listaOS.filter(
    (os) => os.status === "FINALIZADA"
  ).length;

  // Lógica de filtragem por status e busca
  const osFiltradas = listaOS.filter((os) => {
    const atendeFiltroStatus =
      filtroAba === "Todas"
        ? true
        : filtroAba === "Abertas"
        ? os.status === "ABERTA"
        : filtroAba === "Em andamento"
        ? os.status === "EM ANDAMENTO"
        : os.status === "FINALIZADA";

    const atendeBusca =
      os.id.toLowerCase().includes(busca.toLowerCase()) ||
      os.cliente.toLowerCase().includes(busca.toLowerCase()) ||
      os.veiculo.toLowerCase().includes(busca.toLowerCase());

    return atendeFiltroStatus && atendeBusca;
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Header (Voltar, Logo e Perfil) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={voltar} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={26} color="#F05A28" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <FontAwesome5 name="wrench" size={16} color="#F05A28" />
          </View>
          <View>
            <Text style={styles.logoTitle}>MW</Text>
            <Text style={styles.logoSubtitle}>MECÂNICA</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="person-outline" size={22} color="#F05A28" />
        </TouchableOpacity>
      </View>

      {/* Linha Divisória */}
      <View style={styles.dividerBase}>
        <View style={styles.dividerActive} />
      </View>

      {/* 2. Título da Página */}
      <View style={styles.pageTitleSection}>
        <MaterialCommunityIcons
          name="clipboard-text-outline"
          size={32}
          color="#F05A28"
        />
        <View>
          <Text style={styles.pageTitle}>Ordens de Serviço</Text>
          <Text style={styles.pageSubtitle}>
            Gerencie todas as ordens de serviço do sistema
          </Text>
        </View>
      </View>

      {/* 3. Grid de Ações Rápidas (3x2) */}
      <View style={styles.actionsGrid}>
        {/* Criar */}
        <TouchableOpacity style={styles.gridActionCard} activeOpacity={0.8}>
          <Ionicons name="add-circle-outline" size={22} color="#F05A28" />
          <View>
            <Text style={styles.gridActionTitle}>Criar</Text>
            <Text style={styles.gridActionSub}>Nova OS</Text>
          </View>
        </TouchableOpacity>

        {/* Listar */}
        <TouchableOpacity style={styles.gridActionCard} activeOpacity={0.8}>
          <Ionicons name="list-outline" size={22} color="#F05A28" />
          <View>
            <Text style={styles.gridActionTitle}>Listar</Text>
            <Text style={styles.gridActionSub}>Todas as OS</Text>
          </View>
        </TouchableOpacity>

        {/* Consultar */}
        <TouchableOpacity style={styles.gridActionCard} activeOpacity={0.8}>
          <Ionicons name="search-outline" size={22} color="#F05A28" />
          <View>
            <Text style={styles.gridActionTitle}>Consultar</Text>
            <Text style={styles.gridActionSub}>Buscar OS</Text>
          </View>
        </TouchableOpacity>

        {/* Abrir */}
        <TouchableOpacity style={styles.gridActionCard} activeOpacity={0.8}>
          <Ionicons name="folder-open-outline" size={22} color="#F05A28" />
          <View>
            <Text style={styles.gridActionTitle}>Abrir</Text>
            <Text style={styles.gridActionSub}>Detalhes da OS</Text>
          </View>
        </TouchableOpacity>

        {/* Atualizar */}
        <TouchableOpacity style={styles.gridActionCard} activeOpacity={0.8}>
          <Feather name="edit" size={20} color="#F05A28" />
          <View>
            <Text style={styles.gridActionTitle}>Atualizar</Text>
            <Text style={styles.gridActionSub}>Editar OS</Text>
          </View>
        </TouchableOpacity>

        {/* Excluir */}
        <TouchableOpacity style={styles.gridActionCard} activeOpacity={0.8}>
          <Ionicons name="trash-outline" size={22} color="#F05A28" />
          <View>
            <Text style={styles.gridActionTitle}>Excluir</Text>
            <Text style={styles.gridActionSub}>Remover OS</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 4. Barra de Pesquisa e Filtros */}
      <View style={styles.searchRow}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={18}
            color="#8A8F99"
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nº da OS, cliente, veículo..."
            placeholderTextColor="#8A8F99"
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
          <Ionicons name="options-outline" size={18} color="#F05A28" />
          <Text style={styles.filterButtonText}>Filtros</Text>
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>1</Text>
          </View>
          <Ionicons name="chevron-down" size={14} color="#8A8F99" />
        </TouchableOpacity>
      </View>

      {/* 5. Pills de Navegação por Status */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsContainer}
      >
        {/* Todas */}
        <TouchableOpacity
          style={[styles.pill, filtroAba === "Todas" && styles.pillActive]}
          onPress={() => setFiltroAba("Todas")}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.pillText,
              filtroAba === "Todas" && styles.pillTextActive,
            ]}
          >
            Todas
          </Text>
          <View
            style={[
              styles.pillCountBadge,
              filtroAba === "Todas" && styles.pillCountBadgeActive,
            ]}
          >
            <Text
              style={[
                styles.pillCountText,
                filtroAba === "Todas" && styles.pillCountTextActive,
              ]}
            >
              {listaOS.length}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Abertas */}
        <TouchableOpacity
          style={[styles.pill, filtroAba === "Abertas" && styles.pillActive]}
          onPress={() => setFiltroAba("Abertas")}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.pillText,
              filtroAba === "Abertas" && styles.pillTextActive,
            ]}
          >
            Abertas
          </Text>
          <View
            style={[
              styles.pillCountBadge,
              filtroAba === "Abertas" && styles.pillCountBadgeActive,
            ]}
          >
            <Text
              style={[
                styles.pillCountText,
                filtroAba === "Abertas" && styles.pillCountTextActive,
              ]}
            >
              {countAbertas}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Em andamento */}
        <TouchableOpacity
          style={[
            styles.pill,
            filtroAba === "Em andamento" && styles.pillActive,
          ]}
          onPress={() => setFiltroAba("Em andamento")}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.pillText,
              filtroAba === "Em andamento" && styles.pillTextActive,
            ]}
          >
            Em andamento
          </Text>
          <View
            style={[
              styles.pillCountBadge,
              filtroAba === "Em andamento" && styles.pillCountBadgeActive,
            ]}
          >
            <Text
              style={[
                styles.pillCountText,
                filtroAba === "Em andamento" && styles.pillCountTextActive,
              ]}
            >
              {countEmAndamento}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Finalizadas */}
        <TouchableOpacity
          style={[
            styles.pill,
            filtroAba === "Finalizadas" && styles.pillActive,
          ]}
          onPress={() => setFiltroAba("Finalizadas")}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.pillText,
              filtroAba === "Finalizadas" && styles.pillTextActive,
            ]}
          >
            Finalizadas
          </Text>
          <View
            style={[
              styles.pillCountBadge,
              filtroAba === "Finalizadas" && styles.pillCountBadgeActive,
            ]}
          >
            <Text
              style={[
                styles.pillCountText,
                filtroAba === "Finalizadas" && styles.pillCountTextActive,
              ]}
            >
              {countFinalizadas}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* 6. Lista de Cards de Ordens de Serviço */}
      <View style={styles.osList}>
        {osFiltradas.map((os) => (
          <TouchableOpacity
            key={os.id}
            style={styles.osCard}
            activeOpacity={0.8}
          >
            {/* Ícone Lateral Circular */}
            <View style={styles.osIconContainer}>
              <FontAwesome5 name="wrench" size={16} color="#F05A28" />
            </View>

            {/* Conteúdo Central da OS */}
            <View style={styles.osCardContent}>
              <View style={styles.osHeaderRow}>
                <Text style={styles.osId}>{os.id}</Text>

                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: os.statusColor },
                  ]}
                >
                  <Text style={styles.statusBadgeText}>{os.status}</Text>
                </View>
              </View>

              {/* Informações do Cliente, Veículo e Data */}
              <View style={styles.infoRow}>
                <Ionicons name="person-outline" size={13} color="#8A8F99" />
                <Text style={styles.infoText}>{os.cliente}</Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="car-outline" size={13} color="#8A8F99" />
                <Text style={styles.infoText}>{os.veiculo}</Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons
                  name="document-text-outline"
                  size={13}
                  color="#8A8F99"
                />
                <Text style={styles.infoText}>{os.dataHora}</Text>
              </View>
            </View>

            {/* Seta Direita */}
            <View style={styles.osCardRight}>
              <Ionicons name="chevron-forward" size={18} color="#F05A28" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* 7. Contagem no Rodapé */}
      <View style={styles.footerCountContainer}>
        <View style={styles.footerLine} />
        <Text style={styles.footerCountText}>
          {osFiltradas.length} ordens de serviço encontradas
        </Text>
        <View style={styles.footerLine} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0F12",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  iconButton: {
    padding: 4,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: "#F05A28",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#181B20",
  },
  logoTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
  },
  logoSubtitle: {
    color: "#F05A28",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
  },
  dividerBase: {
    height: 1,
    backgroundColor: "#2A2E35",
    width: "100%",
    marginBottom: 20,
    position: "relative",
  },
  dividerActive: {
    height: 2,
    backgroundColor: "#F05A28",
    width: "65%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  pageTitleSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  pageTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  pageSubtitle: {
    color: "#8A8F99",
    fontSize: 13,
    marginTop: 2,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  gridActionCard: {
    width: "31%",
    backgroundColor: "#15181E",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F05A28",
    padding: 10,
    height: 68,
    justifyContent: "space-between",
  },
  gridActionTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  gridActionSub: {
    color: "#8A8F99",
    fontSize: 9,
    marginTop: 1,
  },
  searchRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#15181E",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#232730",
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 12,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#15181E",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F05A28",
    paddingHorizontal: 10,
    height: 44,
    gap: 5,
  },
  filterButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  filterBadge: {
    backgroundColor: "#F05A28",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  filterBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  pillsContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#15181E",
    borderWidth: 1,
    borderColor: "#232730",
    gap: 6,
  },
  pillActive: {
    borderColor: "#F05A28",
    borderWidth: 1.5,
  },
  pillText: {
    color: "#8A8F99",
    fontSize: 12,
    fontWeight: "600",
  },
  pillTextActive: {
    color: "#F05A28",
    fontWeight: "bold",
  },
  pillCountBadge: {
    backgroundColor: "#232730",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  pillCountBadgeActive: {
    backgroundColor: "#F05A28",
  },
  pillCountText: {
    color: "#8A8F99",
    fontSize: 10,
    fontWeight: "bold",
  },
  pillCountTextActive: {
    color: "#FFFFFF",
  },
  osList: {
    gap: 12,
    marginBottom: 24,
  },
  osCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#15181E",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#232730",
    gap: 12,
  },
  osIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: "#F05A28",
    backgroundColor: "#181B20",
    justifyContent: "center",
    alignItems: "center",
  },
  osCardContent: {
    flex: 1,
  },
  osHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  osId: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  infoText: {
    color: "#8A8F99",
    fontSize: 12,
  },
  osCardRight: {
    justifyContent: "center",
    alignItems: "center",
  },
  footerCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    gap: 10,
  },
  footerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#2A2E35",
  },
  footerCountText: {
    color: "#8A8F99",
    fontSize: 12,
  },
});