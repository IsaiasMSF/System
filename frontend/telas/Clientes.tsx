import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";

type Props = {
  voltar: () => void;
};

type Cliente = {
  id: string;
  iniciais: string;
  nome: string;
  telefone: string;
  cpf: string;
  email: string;
  dataNascimento: string;
  status: "Ativo" | "Inativo";
};

type TipoOrdenacao = "A-Z" | "Z-A" | "Mais Velho" | "Mais Novo" | "Padrao";

export default function Clientes({ voltar }: Props) {
  // Lista inicial vazia
  const [listaClientes, setListaClientes] = useState<Cliente[]>([]);

  // Estados de Filtro, Busca e Ordenação
  const [filtroAba, setFiltroAba] = useState<"Todos" | "Ativos" | "Inativos">(
    "Todos"
  );
  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState<TipoOrdenacao>("Padrao");
  const [modalFiltrosVisivel, setModalFiltrosVisivel] = useState(false);

  // Estados do Modal de Cadastro/Edição
  const [modalVisivel, setModalVisivel] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(
    null
  );

  // Formulário do Modal
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [status, setStatus] = useState<"Ativo" | "Inativo">("Ativo");

  // ================= MÁSCARAS E MÉTODOS DE FORMATAÇÃO ================= //

  // Máscara para Telefone: (99) 99999-9999
  const formatarTelefone = (text: string) => {
    const apenasNumeros = text.replace(/\D/g, "");
    if (apenasNumeros.length <= 10) {
      return apenasNumeros
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      return apenasNumeros
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .substring(0, 15);
    }
  };

  // Máscara para CPF: 000.000.000-00
  const formatarCPF = (text: string) => {
    const apenasNumeros = text.replace(/\D/g, "");
    return apenasNumeros
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2")
      .substring(0, 14);
  };

  // Máscara para Data de Nascimento: 00/00/0000
  const formatarData = (text: string) => {
    const apenasNumeros = text.replace(/\D/g, "");
    return apenasNumeros
      .replace(/^(\d{2})(\d)/, "$1/$2")
      .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")
      .substring(0, 10);
  };

  // Converte "DD/MM/AAAA" para objeto Date para comparação
  const converterDataParaObjeto = (dataStr: string) => {
    if (!dataStr || dataStr.length < 10) return new Date(0);
    const [dia, mes, ano] = dataStr.split("/").map(Number);
    return new Date(ano, mes - 1, dia);
  };

  // Gerar Iniciais
  const gerarIniciais = (nomeCompleto: string) => {
    const partes = nomeCompleto.trim().split(" ");
    if (partes.length === 0 || !partes[0]) return "CL";
    if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  };

  // Abrir Modal para Novo Cadastro
  const abrirModalCadastro = () => {
    setClienteSelecionado(null);
    setNome("");
    setTelefone("");
    setCpf("");
    setEmail("");
    setDataNascimento("");
    setStatus("Ativo");
    setModalVisivel(true);
  };

  // Abrir Modal para Editar / Excluir
  const abrirModalEdicao = (cliente: Cliente) => {
    setClienteSelecionado(cliente);
    setNome(cliente.nome);
    setTelefone(cliente.telefone);
    setCpf(cliente.cpf);
    setEmail(cliente.email || "");
    setDataNascimento(cliente.dataNascimento || "");
    setStatus(cliente.status);
    setModalVisivel(true);
  };

  // Salvar (Cadastrar ou Atualizar) com Validações
  const salvarCliente = () => {
    if (!nome.trim()) {
      Alert.alert("Atenção", "Por favor, informe o nome do cliente.");
      return;
    }

    // Validação de E-mail
    if (email.trim() && !email.includes("@")) {
      Alert.alert("E-mail Inválido", "O e-mail digitado deve conter o caractere '@'.");
      return;
    }

    // Validação da Data de Nascimento
    if (dataNascimento.trim() && dataNascimento.length < 10) {
      Alert.alert("Data Inválida", "A data de nascimento deve estar no formato DD/MM/AAAA.");
      return;
    }

    if (clienteSelecionado) {
      // Atualizar
      setListaClientes((prev) =>
        prev.map((item) =>
          item.id === clienteSelecionado.id
            ? {
                ...item,
                nome,
                iniciais: gerarIniciais(nome),
                telefone,
                cpf,
                email,
                dataNascimento,
                status,
              }
            : item
        )
      );
    } else {
      // Cadastrar
      const novoCliente: Cliente = {
        id: Date.now().toString(),
        iniciais: gerarIniciais(nome),
        nome,
        telefone,
        cpf,
        email,
        dataNascimento,
        status,
      };
      setListaClientes((prev) => [novoCliente, ...prev]);
    }

    setModalVisivel(false);
  };

  // Excluir Cliente
  const excluirCliente = () => {
    if (!clienteSelecionado) return;

    Alert.alert(
      "Confirmar Exclusão",
      `Deseja realmente excluir o cliente "${clienteSelecionado.nome}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            setListaClientes((prev) =>
              prev.filter((item) => item.id !== clienteSelecionado.id)
            );
            setModalVisivel(false);
          },
        },
      ]
    );
  };

  // Lógica de Filtragem e Ordenação Completa
  const clientesProcessados = listaClientes
    .filter((cliente) => {
      const atendeFiltroStatus =
        filtroAba === "Todos"
          ? true
          : filtroAba === "Ativos"
          ? cliente.status === "Ativo"
          : cliente.status === "Inativo";

      const atendeBusca =
        cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
        cliente.cpf.includes(busca) ||
        cliente.telefone.includes(busca) ||
        cliente.email.toLowerCase().includes(busca.toLowerCase());

      return atendeFiltroStatus && atendeBusca;
    })
    .sort((a, b) => {
      if (ordenacao === "A-Z") {
        return a.nome.localeCompare(b.nome);
      }
      if (ordenacao === "Z-A") {
        return b.nome.localeCompare(a.nome);
      }
      if (ordenacao === "Mais Velho") {
        const dataA = converterDataParaObjeto(a.dataNascimento).getTime();
        const dataB = converterDataParaObjeto(b.dataNascimento).getTime();
        return dataA - dataB; // Menor timestamp = pessoa que nasceu antes (mais velha)
      }
      if (ordenacao === "Mais Novo") {
        const dataA = converterDataParaObjeto(a.dataNascimento).getTime();
        const dataB = converterDataParaObjeto(b.dataNascimento).getTime();
        return dataB - dataA; // Maior timestamp = pessoa que nasceu mais recentemente (mais nova)
      }
      return 0;
    });

  return (
    <View style={{ flex: 1, backgroundColor: "#0D0F12" }}>
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

        {/* 3. Barra de Pesquisa e Filtros */}
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
              placeholder="Buscar por nome, e-mail, CPF..."
              placeholderTextColor="#8A8F99"
              value={busca}
              onChangeText={setBusca}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.filterButton,
              ordenacao !== "Padrao" && styles.filterButtonActive,
            ]}
            activeOpacity={0.8}
            onPress={() => setModalFiltrosVisivel(true)}
          >
            <Ionicons
              name="options-outline"
              size={18}
              color={ordenacao !== "Padrao" ? "#FFFFFF" : "#F05A28"}
            />
            <Text
              style={[
                styles.filterButtonText,
                ordenacao !== "Padrao" && { color: "#FFFFFF" },
              ]}
            >
              Filtros
            </Text>
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

        {/* Indicador de Filtro de Ordenação Ativo */}
        {ordenacao !== "Padrao" && (
          <View style={styles.activeFilterTag}>
            <Text style={styles.activeFilterText}>
              Ordenação: <Text style={{ color: "#F05A28" }}>{ordenacao}</Text>
            </Text>
            <TouchableOpacity onPress={() => setOrdenacao("Padrao")}>
              <Ionicons name="close-circle" size={16} color="#F05A28" />
            </TouchableOpacity>
          </View>
        )}

        {/* 5. Ação Única de Cadastrar */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButtonFull}
            activeOpacity={0.8}
            onPress={abrirModalCadastro}
          >
            <Ionicons name="add-circle-outline" size={20} color="#F05A28" />
            <Text style={styles.actionButtonText}>Cadastrar Novo Cliente</Text>
          </TouchableOpacity>
        </View>

        {/* 6. Lista de Clientes */}
        <View style={styles.clientList}>
          {clientesProcessados.length === 0 ? (
            <View style={styles.emptyContainer}>
              <FontAwesome5 name="users-slash" size={36} color="#3A4750" />
              <Text style={styles.emptyText}>Nenhum cliente encontrado.</Text>
              <Text style={styles.emptySubtext}>
                Clique no botão acima para adicionar.
              </Text>
            </View>
          ) : (
            clientesProcessados.map((cliente) => {
              const isAtivo = cliente.status === "Ativo";
              return (
                <TouchableOpacity
                  key={cliente.id}
                  style={styles.clientCard}
                  activeOpacity={0.8}
                  onPress={() => abrirModalEdicao(cliente)}
                >
                  <View style={styles.clientCardLeft}>
                    {/* Avatar com Iniciais */}
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{cliente.iniciais}</Text>
                    </View>

                    {/* Informações do Cliente */}
                    <View style={styles.clientInfo}>
                      <Text style={styles.clientName}>{cliente.nome}</Text>

                      {cliente.email ? (
                        <View style={styles.detailRow}>
                          <Ionicons
                            name="mail-outline"
                            size={12}
                            color="#8A8F99"
                          />
                          <Text style={styles.detailText}>{cliente.email}</Text>
                        </View>
                      ) : null}

                      {cliente.telefone ? (
                        <View style={styles.detailRow}>
                          <Ionicons
                            name="call-outline"
                            size={12}
                            color="#8A8F99"
                          />
                          <Text style={styles.detailText}>
                            {cliente.telefone}
                          </Text>
                        </View>
                      ) : null}

                      {cliente.dataNascimento ? (
                        <View style={styles.detailRow}>
                          <Ionicons
                            name="calendar-outline"
                            size={12}
                            color="#8A8F99"
                          />
                          <Text style={styles.detailText}>
                            Nasc: {cliente.dataNascimento}
                          </Text>
                        </View>
                      ) : null}
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
                      <Text style={styles.statusBadgeText}>
                        {cliente.status}
                      </Text>
                    </View>

                    <Ionicons name="chevron-forward" size={18} color="#F05A28" />
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>

        {/* 7. Contagem no Rodapé */}
        <View style={styles.footerCountContainer}>
          <View style={styles.footerLine} />
          <Text style={styles.footerCountText}>
            {clientesProcessados.length} cliente(s) encontrado(s)
          </Text>
          <View style={styles.footerLine} />
        </View>
      </ScrollView>

      {/* ================= MODAL DE ORDENAÇÃO E FILTROS ================= */}
      <Modal
        visible={modalFiltrosVisivel}
        transparent
        animationType="slide"
        onRequestClose={() => setModalFiltrosVisivel(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalFiltrosVisivel(false)}
        >
          <View style={styles.modalFilterContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Opções de Ordenação</Text>
              <TouchableOpacity onPress={() => setModalFiltrosVisivel(false)}>
                <Ionicons name="close" size={24} color="#8A8F99" />
              </TouchableOpacity>
            </View>

            {/* Opções de Ordenação */}
            {(
              [
                { label: "Padrão (Ordem de cadastro)", valor: "Padrao" },
                { label: "Ordem Alfabética (A-Z)", valor: "A-Z" },
                { label: "Ordem Alfabética (Z-A)", valor: "Z-A" },
                { label: "Mais Velho (Data de Nascimento)", valor: "Mais Velho" },
                { label: "Mais Novo (Data de Nascimento)", valor: "Mais Novo" },
              ] as const
            ).map((item) => (
              <TouchableOpacity
                key={item.valor}
                style={[
                  styles.filterOptionItem,
                  ordenacao === item.valor && styles.filterOptionItemActive,
                ]}
                onPress={() => {
                  setOrdenacao(item.valor);
                  setModalFiltrosVisivel(false);
                }}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    ordenacao === item.valor && { color: "#F05A28", fontWeight: "bold" },
                  ]}
                >
                  {item.label}
                </Text>
                {ordenacao === item.valor && (
                  <Ionicons name="checkmark-circle" size={20} color="#F05A28" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ================= MODAL DE CADASTRO / EDIÇÃO ================= */}
      <Modal
        visible={modalVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisivel(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ width: "100%", alignItems: "center" }}
            >
              <View style={styles.modalContainer}>
                {/* Header Fixo do Modal */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {clienteSelecionado ? "Editar Cliente" : "Novo Cliente"}
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisivel(false)}>
                    <Ionicons name="close" size={24} color="#8A8F99" />
                  </TouchableOpacity>
                </View>

                {/* Campos Roláveis */}
                <ScrollView
                  style={{ maxHeight: 360 }}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  <Text style={styles.label}>Nome Completo *</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Ex: João Silva"
                    placeholderTextColor="#555"
                    value={nome}
                    onChangeText={setNome}
                    maxLength={50}
                  />

                  <Text style={styles.label}>E-mail *</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="exemplo@email.com"
                    placeholderTextColor="#555"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    maxLength={60}
                  />

                  <Text style={styles.label}>Telefone</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="(55) 99999-9999"
                    placeholderTextColor="#555"
                    keyboardType="phone-pad"
                    value={telefone}
                    onChangeText={(txt) => setTelefone(formatarTelefone(txt))}
                    maxLength={15}
                  />

                  <Text style={styles.label}>CPF</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="000.000.000-00"
                    placeholderTextColor="#555"
                    keyboardType="numeric"
                    value={cpf}
                    onChangeText={(txt) => setCpf(formatarCPF(txt))}
                    maxLength={14}
                  />

                  <Text style={styles.label}>Data de Nascimento (DD/MM/AAAA)</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="00/00/0000"
                    placeholderTextColor="#555"
                    keyboardType="numeric"
                    value={dataNascimento}
                    onChangeText={(txt) => setDataNascimento(formatarData(txt))}
                    maxLength={10}
                  />

                  <Text style={styles.label}>Status do Cadastro</Text>
                  <View style={styles.statusSelector}>
                    <TouchableOpacity
                      style={[
                        styles.statusOption,
                        status === "Ativo" && styles.statusOptionActive,
                      ]}
                      onPress={() => setStatus("Ativo")}
                    >
                      <Text
                        style={[
                          styles.statusOptionText,
                          status === "Ativo" && styles.statusOptionTextActive,
                        ]}
                      >
                        Ativo
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.statusOption,
                        status === "Inativo" && styles.statusOptionInactive,
                      ]}
                      onPress={() => setStatus("Inativo")}
                    >
                      <Text
                        style={[
                          styles.statusOptionText,
                          status === "Inativo" && styles.statusOptionTextActive,
                        ]}
                      >
                        Inativo
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>

                {/* Rodapé Fixo com Botões */}
                <View style={styles.modalFooterFixed}>
                  <TouchableOpacity
                    style={styles.btnSave}
                    activeOpacity={0.8}
                    onPress={salvarCliente}
                  >
                    <Text style={styles.btnSaveText}>
                      {clienteSelecionado ? "Atualizar Dados" : "Cadastrar Cliente"}
                    </Text>
                  </TouchableOpacity>

                  {clienteSelecionado && (
                    <TouchableOpacity
                      style={styles.btnDelete}
                      activeOpacity={0.8}
                      onPress={excluirCliente}
                    >
                      <Ionicons name="trash-outline" size={18} color="#FF4D4D" />
                      <Text style={styles.btnDeleteText}>Excluir Cliente</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
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
  filterButtonActive: {
    backgroundColor: "#F05A28",
  },
  filterButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
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
  activeFilterTag: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#181B20",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2A2E35",
    marginBottom: 16,
  },
  activeFilterText: {
    color: "#8A8F99",
    fontSize: 12,
    fontWeight: "bold",
  },
  actionsRow: {
    marginBottom: 20,
  },
  actionButtonFull: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#15181E",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#F05A28",
    paddingVertical: 12,
    gap: 8,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  clientList: {
    gap: 12,
    marginBottom: 24,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    gap: 8,
  },
  emptyText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  emptySubtext: {
    color: "#8A8F99",
    fontSize: 13,
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
  // Modais
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#15181E",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#232730",
    padding: 20,
  },
  modalFilterContainer: {
    width: "100%",
    backgroundColor: "#15181E",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#232730",
    padding: 20,
    marginTop: "auto",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  filterOptionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#232730",
  },
  filterOptionItemActive: {
    backgroundColor: "#181B20",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  filterOptionText: {
    color: "#8A8F99",
    fontSize: 14,
  },
  label: {
    color: "#8A8F99",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 10,
  },
  modalInput: {
    backgroundColor: "#0D0F12",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#232730",
    color: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  statusSelector: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },
  statusOption: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#0D0F12",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#232730",
  },
  statusOptionActive: {
    borderColor: "#1E5631",
    backgroundColor: "#1E5631",
  },
  statusOptionInactive: {
    borderColor: "#3A4750",
    backgroundColor: "#3A4750",
  },
  statusOptionText: {
    color: "#8A8F99",
    fontWeight: "bold",
    fontSize: 13,
  },
  statusOptionTextActive: {
    color: "#FFFFFF",
  },
  modalFooterFixed: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#232730",
    gap: 10,
  },
  btnSave: {
    backgroundColor: "#F05A28",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  btnSaveText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  btnDelete: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#221313",
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#5A1717",
  },
  btnDeleteText: {
    color: "#FF4D4D",
    fontWeight: "bold",
    fontSize: 14,
  },
});