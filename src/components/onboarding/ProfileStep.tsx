import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { textStyles } from '../../constants/Fonts';
import StepProgress from '../StepProgress';

type Gender = '남자' | '여자';

type Props = {
  initialGender: Gender | null;
  initialBirth: string;
  onSubmit: (value: { gender: Gender; birth: string }) => void;
  progress: { current: number; total: number };
};

export default function ProfileStep({ initialGender, initialBirth, onSubmit, progress }: Props) {
  const [gender, setGender] = useState<Gender | null>(initialGender);
  const [birth] = useState(initialBirth);

  useEffect(() => {
    setGender(initialGender);
  }, [initialGender]);

  const disabled = !gender;

  const handleNext = () => {
    if (gender) {
      onSubmit({ gender, birth });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[textStyles.small, { color: '#687076', marginBottom: 12 }]}>프로필 정보</Text>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Pressable style={[styles.tab, gender === '남자' && styles.tabActive]} onPress={() => setGender('남자')}>
          <Text style={[textStyles.button, { textAlign: 'center', color: gender === '남자' ? 'white' : '#11181C' }]}>남자</Text>
        </Pressable>
        <Pressable style={[styles.tab, gender === '여자' && styles.tabActive]} onPress={() => setGender('여자')}>
          <Text style={[textStyles.button, { textAlign: 'center', color: gender === '여자' ? 'white' : '#11181C' }]}>여자</Text>
        </Pressable>
      </View>

      <Text style={[textStyles.h3, { marginTop: 20, color: '#687076' }]}>{birth}</Text>
      <Text style={[textStyles.caption, { color: '#9BA1A6', marginTop: 8 }]}>선택 시 향상된 체크포인트가 보일 수 있어요!</Text>

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
  tab: { flex: 1, backgroundColor: '#F3F3F3', paddingVertical: 12, borderRadius: 10 },
  tabActive: { backgroundColor: '#11181C' },
  footer: { position: 'absolute', left: 24, right: 24, bottom: 48 },
  nextBtn: { backgroundColor: '#11181C', paddingVertical: 14, borderRadius: 10 },
});
