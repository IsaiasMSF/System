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
} from "@expo/vector-icons";

type Props = {
  voltar: () => void;
};

export default function Orcamentos({ voltar }: Props) {
  const [filtroAba, setFiltroAba] = useState<
    "Todos" | "Aprovados" | "Em análise" | "Rejeitados"
  >("Todos");
  const [busca, setBusca] = useState("");

  // Dados exatamente fiéis ao mockup de Orçamentos
  const listaOrcamentos = [
    {
      id: "#000045",
      cliente: "João Silva",
      veiculo: "VW Gol • ABC-1234",
      dataHora: "14/10/2026 • 10:30",
      status: "APROVADO",
      statusColor: "#1E5631", // Verde
    },
    {
      id: "#000044",
      cliente: "Maria Oliveira",
      veiculo: "Chevrolet Onix • XYZ-5678",
      dataHora: "13/10/2026 • 15:20",
      status: "EM ANÁLISE",
      statusColor: "#1C3144", // Azul Escuro / Cinza
    },
    {
      id: "#000043",
      cliente: "Carlos Rodrigues",
      veiculo: "Ford Ranger • QRS-9012",
      dataHora: "12/10/2026 • 09:15",
      status: "REJEITADO",
      statusColor: "#8B3A0F", // Marrom / Laranja Escuro
    },
    {
      id: "#000042",
      cliente: "Fernanda Souza",
      veiculo: "Fiat Strada • GHI-7890",
      dataHora: "11/10/2026 • 14:40",
      status: "APROVADO",
      statusColor: "#1E5631",
    },
    {
      id: "#000041",
      cliente: "Rafael Lima",
      veiculo: "Renault Kwid • JKL-2345",
      dataHora: "10/10/2026 • 11:30",
      status: "EM ANÁLISE",
      statusColor: "#1C3144",
    },
    {
      id: "#000040",
      cliente: "Ana Costa",
      veiculo: "Honda Civic • MNO-5678",
      dataHora: "09/10/2026 • 16:05",
      status: "REJEITADO",
      statusColor: "#8B3A0F",
    },
  ];

  // Lógica de filtragem dinâmico
  const orcamentosFiltrados = listaOrcamentos.filter((orc) => {
    const atendeFiltroStatus =
      filtroAba === "Todos"
        ? true
        : filtroAba === "Aprovados"
        ? orc.status === "APROVADO"
        : filtroAba === "Em análise"
        ? orc.status === "EM ANÁLISE"
        : orc.status === "REJEITADO";

    const atendeBusca =
      orc.id.toLowerCase().includes(busca.toLowerCase()) ||
      orc.cliente.toLowerCase().includes(busca.toLowerCase()) ||
      orc.veiculo.toLowerCase().includes(busca.toLowerCase());

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
          name="file-document-outline"
          size={32}
          color="#F05A28"
        />
        <View>
          <Text style={styles.pageTitle}>Orçamentos</Text>
          <Text style={styles.pageSubtitle}>
            Gerencie todos os orçamentos do sistema
          </Text>
        </View>
      </View>

      {/* 3. Pesquisa e Filtros */}
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
            placeholder="Buscar por cliente, veículo, número..."
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
        </TouchableOpacity>
      </View>

      {/* 4. Aba de Status (Pills) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsContainer}
      >
        {(["Todos", "Aprovados", "Em análise", "Rejeitados"] as const).map(
          (aba) => {
            const ativo = filtroAba === aba;
            return (
              <TouchableOpacity
                key={aba}
                style={[styles.pill, ativo && styles.pillActive]}
                onPress={() => setFiltroAba(aba)}
                activeOpacity={0.8}
              >
                <Text style={[styles.pillText, ativo && styles.pillTextActive]}>
                  {aba}
                </Text>
              </TouchableOpacity>
            );
          }
        )}
      </ScrollView>

      {/* 5. Ações Rápidas (Cadastrar, Atualizar, Excluir) */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
          <Ionicons name="add-circle-outline" size={18} color="#F05A28" />
          <Text style={styles.actionButtonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
          <Ionicons name="create-outline" size={18} color="#F05A28" />
          <Text style={styles.actionButtonText}>Atualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
          <Ionicons name="trash-outline" size={18} color="#F05A28" />
          <Text style={styles.actionButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>

      {/* 6. Lista de Cards de Orçamentos */}
      <View style={styles.orcList}>
        {orcamentosFiltrados.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.orcCard}
            activeOpacity={0.8}
          >
            {/* Ícone Quadrado com Borda */}
            <View style={styles.orcIconContainer}>
              <MaterialCommunityIcons
                name="file-document-outline"
                size={22}
                color="#F05A28"
              />
            </View>

            {/* Dados do Orçamento */}
            <View style={styles.orcCardContent}>
              <View style={styles.orcHeaderRow}>
                <Text style={styles.orcId}>{item.id}</Text>

                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: item.statusColor },
                  ]}
                >
                  <Text style={styles.statusBadgeText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="person-outline" size={13} color="#8A8F99" />
                <Text style={styles.infoText}>{item.cliente}</Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="car-outline" size={13} color="#8A8F99" />
                <Text style={styles.infoText}>{item.veiculo}</Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="calendar-outline" size={13} color="#8A8F99" />
                <Text style={styles.infoText}>{item.dataHora}</Text>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={18} color="#F05A28" />
          </TouchableOpacity>
        ))}
      </View>

      {/* 7. Contagem no Rodapé */}
      <View style={styles.footerCountContainer}>
        <View style={styles.footerLine} />
        <Text style={styles.footerCountText}>
          {orcamentosFiltrados.length} orçamentos encontrados
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
    paddingHorizontal: 12,
    height: 44,
    gap: 6,
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
    gap: 10,
    marginBottom: 16,
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#15181E",
    borderWidth: 1,
    borderColor: "#232730",
  },
  pillActive: {
    borderColor: "#F05A28",
    borderWidth: 1.5,
  },
  pillText: {
    color: "#8A8F99",
    fontSize: 13,
    fontWeight: "600",
  },
  pillTextActive: {
    color: "#F05A28",
    fontWeight: "bold",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#15181E",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F05A28",
    paddingVertical: 10,
    gap: 6,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  orcList: {
    gap: 12,
    marginBottom: 24,
  },
  orcCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#15181E",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#232730",
    gap: 12,
  },
  orcIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#2A2E35",
    backgroundColor: "#181B20",
    justifyContent: "center",
    alignItems: "center",
  },
  orcCardContent: {
    flex: 1,
  },
  orcHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  orcId: {
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