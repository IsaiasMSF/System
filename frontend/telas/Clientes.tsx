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

export default function Clientes({ voltar }: Props) {
  const [filtroAba, setFiltroAba] = useState<"Todos" | "Ativos" | "Inativos">(
    "Todos"
  );
  const [busca, setBusca] = useState("");

  // Dados fiéis à imagem do protótipo
  const listaClientes = [
    {
      id: "1",
      iniciais: "JS",
      nome: "João Silva",
      telefone: "(55) 9 9987-6543",
      cpf: "CPF: 123.456.789-00",
      status: "Ativo",
    },
    {
      id: "2",
      iniciais: "MA",
      nome: "Maria Oliveira",
      telefone: "(55) 9 8876-5432",
      cpf: "CPF: 987.654.321-00",
      status: "Ativo",
    },
    {
      id: "3",
      iniciais: "CR",
      nome: "Carlos Rodrigues",
      telefone: "(55) 9 7765-4321",
      cpf: "CPF: 456.789.123-00",
      status: "Ativo",
    },
    {
      id: "4",
      iniciais: "FS",
      nome: "Fernanda Souza",
      telefone: "(55) 9 6654-3210",
      cpf: "CPF: 321.654.987-00",
      status: "Inativo",
    },
    {
      id: "5",
      iniciais: "RL",
      nome: "Rafael Lima",
      telefone: "(55) 9 5543-2109",
      cpf: "CPF: 654.987.321-00",
      status: "Ativo",
    },
    {
      id: "6",
      iniciais: "AC",
      nome: "Ana Costa",
      telefone: "(55) 9 4432-1098",
      cpf: "CPF: 789.123.654-00",
      status: "Ativo",
    },
  ];

  // Lógica simples de filtragem para dinamizar a lista
  const clientesFiltrados = listaClientes.filter((cliente) => {
    const atendeFiltroStatus =
      filtroAba === "Todos"
        ? true
        : filtroAba === "Ativos"
        ? cliente.status === "Ativo"
        : cliente.status === "Inativo";

    const atendeBusca =
      cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.cpf.includes(busca) ||
      cliente.telefone.includes(busca);

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
        <FontAwesome5 name="users" size={28} color="#F05A28" />
        <View>
          <Text style={styles.pageTitle}>Clientes</Text>
          <Text style={styles.pageSubtitle}>
            Gerencie todos os clientes do sistema
          </Text>
        </View>
      </View>

      {/* 3. Barra de Pesquisa e Botão de Filtros */}
      <View style={styles.searchRow}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={18} color="#8A8F99" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome, CPF ou telefone..."
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

      {/* 4. Pills de Filtro de Status */}
      <View style={styles.pillsContainer}>
        {(["Todos", "Ativos", "Inativos"] as const).map((aba) => {
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
        })}
      </View>

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

      {/* 6. Lista de Clientes */}
      <View style={styles.clientList}>
        {clientesFiltrados.map((cliente) => {
          const isAtivo = cliente.status === "Ativo";
          return (
            <TouchableOpacity
              key={cliente.id}
              style={styles.clientCard}
              activeOpacity={0.8}
            >
              <View style={styles.clientCardLeft}>
                {/* Avatar com Iniciais */}
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{cliente.iniciais}</Text>
                </View>

                {/* Informações do Cliente */}
                <View style={styles.clientInfo}>
                  <Text style={styles.clientName}>{cliente.nome}</Text>
                  
                  <View style={styles.detailRow}>
                    <Ionicons name="call-outline" size={12} color="#8A8F99" />
                    <Text style={styles.detailText}>{cliente.telefone}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Ionicons name="document-text-outline" size={12} color="#8A8F99" />
                    <Text style={styles.detailText}>{cliente.cpf}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.clientCardRight}>
                {/* Badge Status */}
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: isAtivo ? "#1E5631" : "#3A4750" },
                  ]}
                >
                  <Text style={styles.statusBadgeText}>{cliente.status}</Text>
                </View>

                <Ionicons name="chevron-forward" size={18} color="#F05A28" />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 7. Contagem no Rodapé */}
      <View style={styles.footerCountContainer}>
        <View style={styles.footerLine} />
        <Text style={styles.footerCountText}>
          {clientesFiltrados.length} clientes encontrados
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
    fontSize: 13,
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
    fontSize: 13,
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
    fontSize: 11,
    fontWeight: "bold",
  },
  pillsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  pill: {
    paddingHorizontal: 16,
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
  clientList: {
    gap: 12,
    marginBottom: 24,
  },
  clientCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#15181E",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#232730",
  },
  clientCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "#F05A28",
    backgroundColor: "#181B20",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#F05A28",
    fontWeight: "bold",
    fontSize: 15,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  detailText: {
    color: "#8A8F99",
    fontSize: 12,
  },
  clientCardRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 44,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
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