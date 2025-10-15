import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import BottomDrawer from '../../components/BottomDrawer';

// Minimal mock for search results
const mock = ['인천 부평구 갈산동', '서울 강남구 역삼동', '부산 해운대구 좌동'];

export default function LocationStep() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(true);

  const results = mock.filter((m) => m.includes(query));

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
      <Text style={styles.title}>내 주변 동네</Text>
      <Text style={styles.caption}>지역의 체크 포인트를 둘러보려면 동네 설정이 필요해요!</Text>

      <Pressable style={styles.searchLaunch} onPress={() => setOpen(true)}>
        <Text style={{ color: '#687076' }}>검색창 열기</Text>
      </Pressable>

      <BottomDrawer visible={open} onClose={() => setOpen(false)} height={480}>
        <TextInput style={styles.input} placeholder="검색" value={query} onChangeText={setQuery} />

        <View style={styles.listBox}>
          <FlatList
            data={results}
            keyExtractor={(i) => i}
            renderItem={({ item }) => (
              <Pressable style={styles.item} onPress={() => setSelected(item)}>
                <Text style={{ fontWeight: selected === item ? '700' : '400' }}>{item}</Text>
              </Pressable>
            )}
          />
        </View>

        <Pressable style={[styles.nextBtn, { marginTop: 12, opacity: selected ? 1 : 0.5 }]} disabled={!selected} onPress={() => { setOpen(false); router.push('/onboarding/profile' as any); }}>
          <Text style={styles.nextText}>선택하고 계속</Text>
        </Pressable>
      </BottomDrawer>

      <View style={styles.footer}>
        <Text style={styles.progress}>2/4</Text>
        <Pressable style={[styles.nextBtn, { opacity: selected ? 1 : 0.5 }]} disabled={!selected} onPress={() => router.push('/onboarding/profile' as any)}>
          <Text style={styles.nextText}>다음</Text>
        </Pressable>
      </View>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60 },
  title: { fontSize: 14, color: '#687076' },
  caption: { fontSize: 12, color: '#9BA1A6', marginTop: 4, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  listBox: { flex: 1, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, padding: 8, marginTop: 16 },
  item: { paddingVertical: 10, paddingHorizontal: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#eee' },
  footer: { position: 'absolute', left: 24, right: 24, bottom: 48 },
  progress: { textAlign: 'right', color: '#9BA1A6', marginBottom: 12 },
  nextBtn: { backgroundColor: '#11181C', paddingVertical: 14, borderRadius: 10 },
  nextText: { color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 16 },
  searchLaunch: { marginTop: 16, paddingVertical: 12, paddingHorizontal: 12, borderRadius: 10, backgroundColor: '#F3F3F3', alignSelf: 'flex-start' },
});
