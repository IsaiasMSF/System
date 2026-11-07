import { useRef, useState } from 'react'
import { Animated, Button, StyleSheet, Text, View } from 'react-native'

export default function ConquistaTela() {
  const escala = useRef(new Animated.Value(1)).current
  const [pontos, setPontos] = useState(0)
  
  // Estado para controlar o multiplicador de cliques (Upgrade da Loja)
  const [multiplicador, setMultiplicador] = useState(1)

  // Custo do upgrade
  const CUSTO_DOUBLE_CLICK = 100
  const jaComprouTurbo = multiplicador > 1

  // Estados dos veículos ajustados dinamicamente com base nos pontos atuais
  const atingiuGold = pontos > 30
  const atingiuFerrari = pontos >= 30
  const quaseNaFerrari = pontos === 29
  const atingiuGol = pontos >= 10

  // Ícone, mensagem e Tema de Cores Dinâmico de acordo com o veículo atual
  let emoji = '🚗'
  let mensagem = ''
  let tema = 'padrao'

  if (atingiuGold) {
    emoji = '🏆🏎️'
    mensagem = 'Lendário! Você atingiu a Frota Dourada Suprema!'
    tema = 'gold'
  } else if (quaseNaFerrari) {
    emoji = '🏎️💨'
    mensagem = 'Prepara o pé! Você está chegando muito perto da Ferrari, falta só 1 km!'
    tema = 'quaseFerrari'
  } else if (atingiuFerrari) {
    emoji = '🏎️'
    mensagem = 'Incrível! Ferrari desbloqueada na pista!'
    tema = 'ferrari'
  } else if (atingiuGol) {
    emoji = '🚙'
    mensagem = 'Mandou bem! O próximo veículo é muito top, segura a ansiedade para a Ferrari!'
    tema = 'gol'
  } else {
    mensagem = `Faltam ${10 - pontos} km para desbloquear o clássico VW Gol.`
    tema = 'padrao'
  }

  function animar(destino: number, duracao: number) {
    return Animated.timing(escala, {
      toValue: destino,
      duration: duracao,
      useNativeDriver: true,
    })
  }

  function pontuar() {
    const proximosPontos = pontos + multiplicador
    setPontos(proximosPontos)
    escala.setValue(1)
    
    // Pulso mais intenso nas metas importantes (10, 29 e 30)
    const pulsoDestino = (proximosPontos === 10 || proximosPontos === 29 || proximosPontos === 30) ? 1.5 : 1.3
    
    Animated.sequence([
      animar(pulsoDestino, 130), 
      animar(1, 200)
    ]).start()
  }

  // Função da Loja: Compra o Upgrade de 2x km por clique
  function comprarTurbo() {
    if (pontos >= CUSTO_DOUBLE_CLICK && !jaComprouTurbo) {
      setPontos(total => total - CUSTO_DOUBLE_CLICK)
      setMultiplicador(2)
    }
  }

  function reiniciar() {
    setPontos(0)
    setMultiplicador(1)
    escala.setValue(1)
  }

  // Estilos dinâmicos baseados no tema ativo
  const estilosAtuais = {
    screen: tema === 'gold' ? styles.screenGold : tema === 'ferrari' ? styles.screenFerrari : tema === 'quaseFerrari' ? styles.screenQuaseFerrari : tema === 'gol' ? styles.screenGol : styles.screenPadrao,
    stage: tema === 'gold' ? styles.stageGold : tema === 'ferrari' ? styles.stageFerrari : tema === 'quaseFerrari' ? styles.stageQuaseFerrari : tema === 'gol' ? styles.stageGol : styles.stagePadrao,
    title: tema === 'ferrari' || tema === 'quaseFerrari' ? styles.titleFerrari : tema === 'gold' ? styles.titleGold : styles.titlePadrao,
    textPoints: tema === 'ferrari' || tema === 'quaseFerrari' ? styles.textPointsFerrari : tema === 'gold' ? styles.textPointsGold : styles.textPointsPadrao,
    text: tema === 'gold' || tema === 'ferrari' || tema === 'quaseFerrari' ? styles.textLight : styles.textDark,
  }

  return (
    <View style={[styles.screenBase, estilosAtuais.screen]}>
      <Text style={[styles.titleBase, estilosAtuais.title]}>🏁 Garagem Turbo Clicker</Text>
      
      <View style={[styles.stageBase, estilosAtuais.stage]}>
        <Animated.Text style={[styles.emoji, { transform: [{ scale: escala }] }]}>
          {emoji}
        </Animated.Text>
        <Text style={[styles.textPointsBase, estilosAtuais.textPoints]}>
          {pontos} {pontos === 1 ? 'quilômetro' : 'quilômetros'}
        </Text>
        {jaComprouTurbo && (
          <Text style={styles.badgeTurbo}>⚡ Turbo 2x Ativo</Text>
        )}
      </View>

      <Text style={[styles.textBase, estilosAtuais.text]} accessibilityLiveRegion="polite">
        {mensagem}
      </Text>

      <View style={styles.buttonContainer}>
        <Button 
          title={`Acelerar (+${multiplicador} km)`} 
          onPress={pontuar} 
          color={tema === 'ferrari' || tema === 'quaseFerrari' ? '#DC2626' : tema === 'gold' ? '#CA8A04' : '#0284C7'} 
        />

        {/* Seção da Loja */}
        <View style={styles.lojaContainer}>
          <Text style={[styles.lojaTitle, estilosAtuais.text]}>🛒 Loja de Upgrades</Text>
          <Button 
            title={
              jaComprouTurbo 
                ? 'Motor Biturbo (Já Adquirido)' 
                : `Comprar Motor Biturbo (2x cliques) - 100 km`
            } 
            onPress={comprarTurbo} 
            disabled={pontos < CUSTO_DOUBLE_CLICK || jaComprouTurbo}
            color="#9333EA"
          />
        </View>

        <Button title="Resetar Garagem" onPress={reiniciar} color="#64748B" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screenBase: {
    flex: 1,
    justify: 'center',
    gap: 16,
    paddingHorizontal: 24,
  },
  screenPadrao: { backgroundColor: '#F8FAFC' },
  screenGol: { backgroundColor: '#F0FDF4' },     
  screenQuaseFerrari: { backgroundColor: '#FFFBEB' }, 
  screenFerrari: { backgroundColor: '#FEF2F2' },  
  screenGold: { backgroundColor: '#18181B' },     

  titleBase: { fontSize: 26, fontWeight: '700', textAlign: 'center' },
  titlePadrao: { color: '#0F172A' },
  titleGol: { color: '#166534' },
  titleFerrari: { color: '#991B1B' },
  titleGold: { color: '#FACC15' },

  textBase: { fontSize: 17, textAlign: 'center', fontWeight: '500', minHeight: 50 },
  textDark: { color: '#334155' },
  textLight: { color: '#FDE047' },

  stageBase: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
  },
  stagePadrao: { backgroundColor: '#E0F2FE', borderColor: '#BAE6FD' },
  stageGol: { backgroundColor: '#DCFCE7', borderColor: '#BBF7D0' },
  stageQuaseFerrari: { backgroundColor: '#FEF3C7', borderColor: '#FDE047' }, 
  stageFerrari: { backgroundColor: '#FEE2E2', borderColor: '#FECACA' },
  stageGold: { backgroundColor: '#27272A', borderColor: '#EAB308' },

  emoji: { fontSize: 52 },

  textPointsBase: { fontSize: 20, fontWeight: '700', marginTop: 12 },
  textPointsPadrao: { color: '#0369A1' },
  textPointsGol: { color: '#15803D' },
  textPointsFerrari: { color: '#B91C1C' },
  textPointsGold: { color: '#FDE047' },

  badgeTurbo: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9333EA',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },

  buttonContainer: {
    gap: 10,
    marginTop: 10,
  },
  lojaContainer: {
    marginTop: 6,
    gap: 4,
  },
  lojaTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
  },
})