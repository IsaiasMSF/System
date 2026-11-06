import { useRef, useState } from 'react'
import { Animated, Button, StyleSheet, Text, View } from 'react-native'

export default function SapoTela() {
  const altura = useRef(new Animated.Value(0)).current
  const [saltando, setSaltando] = useState(false)
  const [saltos, setSaltos] = useState(0)

  function saltar(distancia: number, subida: number, descida: number) {
    setSaltando(true)
    Animated.sequence([
      Animated.timing(altura, { toValue: -distancia, duration: subida, useNativeDriver: true }),
      Animated.timing(altura, { toValue: 0, duration: descida, useNativeDriver: true }),
    ]).start(({ finished }) => {
      setSaltando(false)
      if (finished) setSaltos(total => total + 1)
    })
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>🐸 Arena do sapo</Text>
      <Text style={styles.text}>Saltos completos: {saltos}</Text>
      <View style={styles.stage}>
        <Animated.Text style={[styles.emoji, { transform: [{ translateY: altura }] }]}>
          🐸
        </Animated.Text>
      </View>
      <Button title="Salto curto" disabled={saltando} onPress={() => saltar(32, 150, 190)} />
      <Button title="Salto alto" disabled={saltando} onPress={() => saltar(80, 260, 220)} />
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
  title: { fontSize: 26, fontWeight: '700', color: '#166534' },
  text: { fontSize: 17, color: '#1E293B' },
  stage: {
    height: 160,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#DCFCE7',
  },
  emoji: { fontSize: 44 },
})