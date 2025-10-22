import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { textStyles } from '../../constants/Fonts';
import StepProgress from '../StepProgress';

type Props = {
  initialValue: string;
  onSubmit: (value: string) => void;
  progress: { current: number; total: number };
};

export default function NicknameStep({ initialValue, onSubmit, progress }: Props) {
  const [name, setName] = useState(initialValue);

  useEffect(() => {
    setName(initialValue);
  }, [initialValue]);

  const trimmed = name.trim();
  const disabled = trimmed.length === 0;

  const handleNext = () => {
    if (!disabled) {
      onSubmit(trimmed);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[textStyles.bodySemibold, { color: '#687076', marginBottom: 8 }]}>닉네임</Text>
      <TextInput
        style={styles.input}
        placeholder="닉네임을 입력하세요."
        value={name}
        onChangeText={setName}
      />

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
  container: { flex: 1, padding: 24, paddingTop: 80 },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  footer: { position: 'absolute', left: 24, right: 24, bottom: 48 },
  nextBtn: { backgroundColor: '#11181C', paddingVertical: 14, borderRadius: 10 },
});
