
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

type Props = {
  navegar: (pagina: string) => void;
};

export default function Inicio({ navegar }: Props) {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#121212" }}
      contentContainerStyle={{ padding: 24, paddingTop: 60 }}
    >
      <Text
        style={{
          color: "#F05A28",
          fontSize: 14,
          fontWeight: "bold",
          marginBottom: 12,
        }}
      >
        MW MECÂNICA
      </Text>

      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Olá, seja bem-vindo!
      </Text>

      <Text
        style={{
          color: "#AAAAAA",
          fontSize: 15,
          marginBottom: 30,
        }}
      >
        Gestão simples e moderna para sua oficina.
      </Text>

      {[
        { titulo: "Ordens de serviço", tela: "ordensdeservico" },
        { titulo: "Clientes", tela: "clientes" },
        { titulo: "Veículos", tela: "veiculos" },
      ].map((item) => (
        <TouchableOpacity
          key={item.tela}
          onPress={() => navegar(item.tela)}
          style={{
            backgroundColor: "#222222",
            padding: 22,
            borderRadius: 14,
            marginBottom: 14,
            borderLeftWidth: 4,
            borderLeftColor: "#F05A28",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 17, fontWeight: "bold" }}>
            {item.titulo}
          </Text>
          <Text style={{ color: "#AAAAAA", marginTop: 6 }}>
            Toque para acessar
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
