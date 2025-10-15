import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ProfileStep() {
  const [gender, setGender] = useState<'남자' | '여자' | null>(null);
  const [birth] = useState('2000-06-22'); // placeholder

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>프로필 정보</Text>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Pressable style={[styles.tab, gender === '남자' && styles.tabActive]} onPress={() => setGender('남자')}>
          <Text style={[styles.tabText, gender === '남자' && styles.tabTextActive]}>남자</Text>
        </Pressable>
        <Pressable style={[styles.tab, gender === '여자' && styles.tabActive]} onPress={() => setGender('여자')}>
          <Text style={[styles.tabText, gender === '여자' && styles.tabTextActive]}>여자</Text>
        </Pressable>
      </View>

      <Text style={styles.birth}>{birth}</Text>
      <Text style={styles.caption}>선택 시 향상된 체크포인트가 보일 수 있어요!</Text>

      <View style={styles.footer}>
        <Text style={styles.progress}>3/4</Text>
  <Pressable style={[styles.nextBtn, { opacity: gender ? 1 : 0.5 }]} disabled={!gender} onPress={() => router.push('/onboarding/bike' as any)}>
          <Text style={styles.nextText}>다음</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60 },
  sectionTitle: { fontSize: 14, color: '#687076', marginBottom: 12 },
  tab: { flex: 1, backgroundColor: '#F3F3F3', paddingVertical: 12, borderRadius: 10 },
  tabActive: { backgroundColor: '#11181C' },
  tabText: { textAlign: 'center', fontWeight: '600', color: '#11181C' },
  tabTextActive: { color: 'white' },
  birth: { marginTop: 20, fontSize: 18, fontWeight: '700', color: '#687076' },
  caption: { color: '#9BA1A6', marginTop: 8 },
  footer: { position: 'absolute', left: 24, right: 24, bottom: 48 },
  progress: { textAlign: 'right', color: '#9BA1A6', marginBottom: 12 },
  nextBtn: { backgroundColor: '#11181C', paddingVertical: 14, borderRadius: 10 },
  nextText: { color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 16 },
});
