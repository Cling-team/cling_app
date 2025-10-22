import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { textStyles } from '../../constants/Fonts';
import StepProgress from '../StepProgress';

type Props = {
  initialValue: string | null;
  onSubmit: (value: string) => void;
  progress: { current: number; total: number };
};

const bikeTypes = ['로드', '산악(MTB)', '픽시', '하이브리드'];

export default function BikeStep({ initialValue, onSubmit, progress }: Props) {
  const [selected, setSelected] = useState<string | null>(initialValue);

  useEffect(() => {
    setSelected(initialValue);
  }, [initialValue]);

  const disabled = !selected;

  const handleNext = () => {
    if (selected) {
      onSubmit(selected);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[textStyles.caption, { color: '#687076' }]}>자전거 정보</Text>
      <Text style={[textStyles.h3, { color: '#9BA1A6', marginTop: 6 }]}>자전거 종류 선택</Text>

      <View style={{ marginTop: 16, gap: 10 }}>
        {bikeTypes.map((type) => (
          <Pressable
            key={type}
            style={[styles.choice, selected === type && styles.choiceActive]}
            onPress={() => setSelected(type)}
          >
            <Text style={[textStyles.button, { textAlign: 'center', color: selected === type ? 'white' : '#11181C' }]}>{type}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.footer}>
        <StepProgress current={progress.current} total={progress.total} />
        <Pressable
          style={[styles.nextBtn, { opacity: disabled ? 0.5 : 1 }]}
          disabled={disabled}
          onPress={handleNext}
        >
          <Text style={[textStyles.button, { color: 'white', textAlign: 'center' }]}>다음</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60 },
  choice: { backgroundColor: '#F3F3F3', paddingVertical: 12, borderRadius: 10 },
  choiceActive: { backgroundColor: '#11181C' },
  footer: { position: 'absolute', left: 24, right: 24, bottom: 48 },
  nextBtn: { backgroundColor: '#11181C', paddingVertical: 14, borderRadius: 10 },
});
