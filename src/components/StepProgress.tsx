import { StyleSheet, Text, View } from 'react-native';
import { textStyles } from '../constants/Fonts';

type Props = {
  current: number; // 1-based
  total: number;
};

export default function StepProgress({ current, total }: Props) {
  const safeCurrent = Math.max(0, Math.min(current, total));
  return (
    <View style={styles.wrapper}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {safeCurrent}/{total}
        </Text>
      </View>
      <View style={styles.container}>
        {Array.from({ length: total }).map((_, idx) => {
          const filled = idx < safeCurrent;
          return (
            <View key={idx} style={[styles.segment, filled ? styles.filled : styles.empty]} />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  labelRow: { flexDirection: 'row', justifyContent: 'flex-end' },
  label: { ...textStyles.caption, color: '#9BA1A6', marginBottom: 6 },
  container: { flexDirection: 'row', gap: 6 },
  segment: { flex: 1, height: 6, borderRadius: 3 },
  filled: { backgroundColor: '#11181C' },
  empty: { backgroundColor: '#E6E6E6' },
});
