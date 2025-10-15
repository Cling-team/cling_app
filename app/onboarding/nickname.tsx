import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Nickname() {
  const [name, setName] = useState('');
  const next = () => router.push('/onboarding/location' as any);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>닉네임</Text>
      <TextInput
        style={styles.input}
        placeholder="닉네임을 입력하세요."
        value={name}
        onChangeText={setName}
      />

      <View style={styles.footer}>
        <Text style={styles.progress}>1/4</Text>
        <Pressable style={styles.nextBtn} onPress={next}>
          <Text style={styles.nextText}>다음</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 80 },
  label: { fontSize: 14, color: '#687076', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  footer: { position: 'absolute', left: 24, right: 24, bottom: 48 },
  progress: { textAlign: 'right', color: '#9BA1A6', marginBottom: 12 },
  nextBtn: { backgroundColor: '#11181C', paddingVertical: 14, borderRadius: 10 },
  nextText: { color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 16 },
});
