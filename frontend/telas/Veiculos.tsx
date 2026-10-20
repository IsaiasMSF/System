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
} from "@expo/vector-icons";

type Props = {
  voltar: () => void;
};

export default function Veiculos({ voltar }: Props) {
  const [busca, setBusca] = useState("");

  const listaVeiculos = [
    {
      id: "1",
      modelo: "VW - Gol 1.0",
      ano: "2018",
      placa: "ABC-1234",
      proprietario: "João Silva",
      cor: "Prata",
    },
    {
      id: "2",
      modelo: "Chevrolet - Onix 1.0",
      ano: "2019",
      placa: "XYZ-5678",
      proprietario: "Maria Oliveira",
      cor: "Preto",
    },
    {
      id: "3",
      modelo: "Ford - Ranger 3.2",
      ano: "2021",
      placa: "QRS-9012",
      proprietario: "Carlos Rodrigues",
      cor: "Branco",
    },
    {
      id: "4",
      modelo: "Fiat - Strada 1.4",
      ano: "2020",
      placa: "GHI-7890",
      proprietario: "Fernanda Souza",
      cor: "Vermelho",
    },
    {
      id: "5",
      modelo: "Renault - Kwid 1.0",
      ano: "2022",
      placa: "JKL-2345",
      proprietario: "Rafael Lima",
      cor: "Cinza",
    },
  ];

  const veiculosFiltrados = listaVeiculos.filter(
    (v) =>
      v.modelo.toLowerCase().includes(busca.toLowerCase()) ||
      v.placa.toLowerCase().includes(busca.toLowerCase()) ||
      v.proprietario.toLowerCase().includes(busca.toLowerCase())
  );

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
        <FontAwesome5 name="car" size={28} color="#F05A28" />
        <View>
          <Text style={styles.pageTitle}>Veículos</Text>
          <Text style={styles.pageSubtitle}>
            Gerencie a frota e veículos cadastrados
          </Text>
        </View>
      </View>

      {/* 3. Barra de Pesquisa e Filtros */}
      <View style={styles.searchRow}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={18} color="#8A8F99" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por placa, modelo, cliente..."
            placeholderTextColor="#8A8F99"
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
          <Ionicons name="options-outline" size={18} color="#F05A28" />
          <Text style={styles.filterButtonText}>Filtros</Text>
        </TouchableOpacity>
      </View>

      {/* 4. Ações Rápidas (Cadastrar, Editar, Excluir) */}
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

      {/* 5. Lista de Veículos */}
      <View style={styles.carList}>
        {veiculosFiltrados.map((veiculo) => (
          <TouchableOpacity
            key={veiculo.id}
            style={styles.carCard}
            activeOpacity={0.8}
          >
            {/* Ícone Lateral Circular */}
            <View style={styles.carIconContainer}>
              <FontAwesome5 name="car" size={18} color="#F05A28" />
            </View>

            {/* Conteúdo Central */}
            <View style={styles.carCardContent}>
              <View style={styles.carHeaderRow}>
                <Text style={styles.carModelo}>{veiculo.modelo}</Text>
                <View style={styles.placaBadge}>
                  <Text style={styles.placaBadgeText}>{veiculo.placa}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="person-outline" size={13} color="#8A8F99" />
                <Text style={styles.infoText}>{veiculo.proprietario}</Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="calendar-outline" size={13} color="#8A8F99" />
                <Text style={styles.infoText}>Ano: {veiculo.ano} • Cor: {veiculo.cor}</Text>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={18} color="#F05A28" />
          </TouchableOpacity>
        ))}
      </View>

      {/* 6. Contagem no Rodapé */}
      <View style={styles.footerCountContainer}>
        <View style={styles.footerLine} />
        <Text style={styles.footerCountText}>
          {veiculosFiltrados.length} veículos encontrados
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
  carList: {
    gap: 12,
    marginBottom: 24,
  },
  carCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#15181E",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#232730",
    gap: 12,
  },
  carIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: "#F05A28",
    backgroundColor: "#181B20",
    justifyContent: "center",
    alignItems: "center",
  },
  carCardContent: {
    flex: 1,
  },
  carHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  carModelo: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  placaBadge: {
    backgroundColor: "#232730",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#3A4750",
  },
  placaBadgeText: {
    color: "#F05A28",
    fontSize: 11,
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