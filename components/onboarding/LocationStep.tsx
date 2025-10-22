import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { textStyles } from '../../constants/Fonts';
import BottomDrawer from '../BottomDrawer';
import StepProgress from '../StepProgress';

type Props = {
  initialValue: string | null;
  onSubmit: (value: string) => void;
  progress: { current: number; total: number };
};

const mock = ['인천 부평구 갈산동', '서울 강남구 역삼동', '부산 해운대구 좌동'];

export default function LocationStep({ initialValue, onSubmit, progress }: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(initialValue);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelected(initialValue);
  }, [initialValue]);

  const results = mock.filter((item) => item.includes(query));
  const disabled = !selected;

  const handleNext = () => {
    if (selected) {
      onSubmit(selected);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[textStyles.bodySemibold, { color: 'black' }]}>내 주변 동네</Text>
      <Text style={[textStyles.caption, { color: '#9BA1A6', marginTop: 4, marginBottom: 16 }]}>지역의 체크 포인트를 둘러보려면 동네 설정이 필요해요!</Text>

      <View style={{ position: 'relative' }}>
        <TextInput
          style={styles.input}
          placeholder="동네를 검색하여 선택하세요"
          value={selected ?? ''}
          editable={false}
        />
        <Pressable
          onPress={() => setOpen(true)}
          style={StyleSheet.absoluteFill}
          accessibilityRole="button"
          accessibilityLabel="동네 검색 열기"
        />
      </View>

      <BottomDrawer visible={open} onClose={() => setOpen(false)} height={480}>
        <TextInput
          style={styles.input}
          placeholder="검색"
          value={query}
          onChangeText={setQuery}
          autoFocus
        />

        <View style={styles.listBox}>
          <FlatList
            data={results}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                style={styles.item}
                onPress={() => {
                  setSelected(item);
                  setQuery('');
                  setOpen(false);
                }}
              >
                <Text style={[textStyles.body, { fontWeight: (selected === item ? '700' : '400') as any }]}>{item}</Text>
              </Pressable>
            )}
          />
        </View>
      </BottomDrawer>

      <View style={styles.footer}>
        <StepProgress current={progress.current} total={progress.total} />
        <Pressable style={[styles.nextBtn, { opacity: disabled ? 0.5 : 1 }]} disabled={disabled} onPress={handleNext}>
          <Text style={[textStyles.button, { color: 'white', textAlign: 'center' }]}>다음</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60 },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  listBox: { flex: 1, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, padding: 8, marginTop: 16 },
  item: { paddingVertical: 10, paddingHorizontal: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#eee' },
  footer: { position: 'absolute', left: 24, right: 24, bottom: 48 },
  nextBtn: { backgroundColor: '#11181C', paddingVertical: 14, borderRadius: 10 },
});
