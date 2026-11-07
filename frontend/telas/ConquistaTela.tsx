import { useRef, useState } from 'react'
import { Animated, Button, StyleSheet, Text, View } from 'react-native'

const META = 5

export default function ConquistaTela() {
  const escala = useRef(new Animated.Value(1)).current
  const [pontos, setPontos] = useState(0)
  const conquistou = pontos >= META

  function animar(destino: number, duracao: number) {
    return Animated.timing(escala, {
      toValue: destino, duration: duracao, useNativeDriver: true,
    })
  }

  function pontuar() {
    setPontos(total => total + 1)
    escala.setValue(1)
    Animated.sequence([animar(1.3, 140), animar(1, 220)]).start()
  }

  function reiniciar() {
    setPontos(0)
    escala.setValue(1)
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>🏆 Conquista da sexta</Text>
      <View style={styles.stage}>
        <Animated.Text style={[styles.emoji, { transform: [{ scale: escala }] }]}>
          {conquistou ? '🏆' : '⭐'}
        </Animated.Text>
        <Text style={styles.text}>{pontos} {pontos === 1 ? 'ponto' : 'pontos'}</Text>
      </View>
      <Text style={styles.text} accessibilityLiveRegion="polite">
        {conquistou ? 'Conquista desbloqueada!' : `Faltam ${META - pontos} para a meta.`}
      </Text>
      <Button title="Ganhar ponto" onPress={pontuar} />
      <Button title="Reiniciar" onPress={reiniciar} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 24,
    backgroundColor: '#F8FAFC',
  },
  title: { fontSize: 26, fontWeight: '700', color: '#92400E' },
  text: { fontSize: 17, color: '#1E293B' },
  stage: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#FEF3C7',
  },
  emoji: { fontSize: 44 },
})