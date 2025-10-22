import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { rideResultStyles } from './rideResultStyles';

type RideResultParams = {
  distance?: string;
  averageSpeed?: string;
  duration?: string;
};

export default function RideResultScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<RideResultParams>();

  const distance = useMemo(() => params.distance ?? '0.0', [params.distance]);
  const averageSpeed = useMemo(() => params.averageSpeed ?? '0.0', [params.averageSpeed]);
  const duration = useMemo(() => params.duration ?? '00:00:00', [params.duration]);

  return (
    <SafeAreaView style={[rideResultStyles.screen, { paddingTop: Math.max(insets.top, 24) }] }>
      <ScrollView
        contentContainerStyle={[rideResultStyles.content, { paddingBottom: Math.max(insets.bottom + 120, 160) }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={rideResultStyles.header}>
          <Text style={rideResultStyles.title}>주행 완료!</Text>
          <Text style={rideResultStyles.subtitle}>오늘도 멋진 라이딩이었어요 🚴‍♀️</Text>
        </View>

        <View style={rideResultStyles.summaryCard}>
          <View style={rideResultStyles.summaryRow}>
            <ResultMetric icon="speedometer" label="평균 속도" value={`${averageSpeed} km/h`} />
            <ResultMetric icon="map" label="주행 거리" value={`${distance} km`} />
          </View>
          <View style={[rideResultStyles.summaryRow, { marginTop: 24 }]}>
            <ResultMetric icon="time" label="주행 시간" value={duration} />
            <ResultMetric icon="flame" label="칼로리" value={`${Math.round(Number(distance) * 23)} kcal`} />
          </View>
        </View>

        <View style={rideResultStyles.suggestionCard}>
          <Ionicons name="analytics" size={32} color="#0E52FF" />
          <View style={{ flex: 1 }}>
            <Text style={rideResultStyles.suggestionTitle}>라이딩 리포트가 준비됐어요</Text>
            <Text style={rideResultStyles.suggestionBody}>
              지난 주행들과 비교해서 어떤 변화가 있었는지 확인해보세요.
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            style={rideResultStyles.chevronButton}
            onPress={() => router.push('/Home')}
          >
            <Ionicons name="chevron-forward" size={22} color="white" />
          </Pressable>
        </View>
      </ScrollView>

      <View style={[rideResultStyles.footer, { paddingBottom: Math.max(insets.bottom, 24) }] }>
        <Pressable
          style={[rideResultStyles.primaryButton, { backgroundColor: '#0E52FF' }]}
          onPress={() => router.replace('/Home')}
        >
          <Text style={rideResultStyles.primaryLabel}>홈으로 돌아가기</Text>
        </Pressable>
        <Pressable
          style={[rideResultStyles.primaryButton, { backgroundColor: '#0B1F44' }]}
          onPress={() => router.replace('/ride')}
        >
          <Text style={rideResultStyles.primaryLabel}>다시 주행하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

type MetricProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

function ResultMetric({ icon, label, value }: MetricProps) {
  return (
    <View style={rideResultStyles.metricItem}>
      <View style={rideResultStyles.metricIconWrapper}>
        <Ionicons name={icon} size={22} color="#0E52FF" />
      </View>
      <Text style={rideResultStyles.metricLabel}>{label}</Text>
      <Text style={rideResultStyles.metricValue}>{value}</Text>
    </View>
  );
}
