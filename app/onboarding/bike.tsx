import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const bikeTypes = ['로드', '산악(MTB)', '픽시', '하이브리드'];

export default function BikeStep() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>자전거 정보</Text>
      <Text style={styles.subtitle}>자전거 종류 선택</Text>

      <View style={{ marginTop: 16, gap: 10 }}>
        {bikeTypes.map((t) => (
          <Pressable key={t} style={[styles.choice, selected === t && styles.choiceActive]} onPress={() => setSelected(t)}>
            <Text style={[styles.choiceText, selected === t && styles.choiceTextActive]}>{t}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.progress}>4/4</Text>
        <Pressable
          style={[styles.nextBtn, { opacity: selected ? 1 : 0.5 }]}
          disabled={!selected}
          onPress={() => router.replace('/Home' as any)}
        >
          <Text style={styles.nextText}>다음</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60 },
  title: { fontSize: 12, color: '#687076' },
  subtitle: { fontSize: 16, color: '#9BA1A6', marginTop: 6 },
  choice: { backgroundColor: '#F3F3F3', paddingVertical: 12, borderRadius: 10 },
  choiceActive: { backgroundColor: '#11181C' },
  choiceText: { textAlign: 'center', fontWeight: '600', color: '#11181C' },
  choiceTextActive: { color: 'white' },
  footer: { position: 'absolute', left: 24, right: 24, bottom: 48 },
  progress: { textAlign: 'right', color: '#9BA1A6', marginBottom: 12 },
  nextBtn: { backgroundColor: '#11181C', paddingVertical: 14, borderRadius: 10 },
  nextText: { color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 16 },
});
