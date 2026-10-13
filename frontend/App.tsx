import { StatusBar } from 'expo-status-bar';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function App() {
  function mostrarMensagem() {
    alert('Parabéns! Sua primeira tela está funcionando.');
  }

  return (
    <SafeAreaView style={styles.pagina}>
      <View style={styles.cartao}>
        <Text style={styles.selo}>MEU PRIMEIRO APP</Text>

        <View style={styles.avatar}>
          <Text style={styles.emoji}>🚀</Text>
        </View>

        <Text style={styles.titulo}>Olá! Eu sou um app.</Text>

        <Text style={styles.descricao}>
          Esta tela foi criada com React Native, TypeScript e Expo.
        </Text>

        <View style={styles.informacoes}>
          <Text style={styles.rotulo}>Editor</Text>
          <Text style={styles.valor}>VS Code</Text>

          <Text style={styles.rotulo}>Visualização</Text>
          <Text style={styles.valor}>Expo Go</Text>
        </View>

        <Pressable style={styles.botao} onPress={mostrarMensagem}>
          <Text style={styles.textoBotao}>Testar meu app</Text>
        </Pressable>
      </View>

      <Text style={styles.rodape}>Feito por: escreva seu nome aqui</Text>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pagina: {
    flex: 1,
    backgroundColor: '#EAF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  cartao: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  selo: {
    color: '#2457C5',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#DCE8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    marginBottom: 18,
  },
  emoji: {
    fontSize: 46,
  },
  titulo: {
    color: '#17233D',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descricao: {
    color: '#526079',
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
    marginTop: 10,
  },
  informacoes: {
    width: '100%',
    backgroundColor: '#F6F8FC',
    borderRadius: 12,
    padding: 16,
    marginTop: 22,
  },
  rotulo: {
    color: '#7A8497',
    fontSize: 12,
    marginTop: 6,
  },
  valor: {
    color: '#17233D',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  botao: {
    width: '100%',
    backgroundColor: '#2457C5',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 22,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rodape: {
    color: '#526079',
    fontSize: 13,
    marginTop: 18,
  },
});