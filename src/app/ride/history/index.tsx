import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { textStyles } from '../../../constants/Fonts';
import { mockRideHistory } from '../../../constants/mockRideHistory';
import { rideHistoryListStyles } from './historyStyles';

function formatDistance(value: number) {
  return `${value.toFixed(1)} km`;
}

function formatSpeed(value: number) {
  return `${value.toFixed(1)} km/h`;
}

export default function RideHistoryListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[rideHistoryListStyles.screen, { paddingTop: Math.max(insets.top, 16) }]}
    >
      <ScrollView
        contentContainerStyle={rideHistoryListStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={rideHistoryListStyles.headerRow}>
          <Pressable
            style={rideHistoryListStyles.backButton}
            accessibilityRole="button"
            accessibilityLabel="이전 화면으로"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={20} color="#0B1F44" />
          </Pressable>
          <View>
            <Text style={[textStyles.h3, { color: '#0B1F44' }]}>최근 주행 기록</Text>
            <Text style={[textStyles.caption, { color: '#4B5C7A', marginTop: 4 }]}>
              지난 라이딩들을 한눈에 모아봤어요
            </Text>
          </View>
        </View>

        <View style={rideHistoryListStyles.rideList}>
          {mockRideHistory.map((ride) => (
            <Pressable
              key={ride.id}
              style={({ pressed }) => [rideHistoryListStyles.listCard, pressed && { opacity: 0.92 }]}
              accessibilityRole="button"
              accessibilityLabel={`${ride.routeName} 상세 보기`}
              onPress={() => router.push({ pathname: '/ride/history/[id]', params: { id: ride.id } })}
            >
              <View style={rideHistoryListStyles.listMeta}>
                <Text style={[textStyles.bodySemibold, { color: '#0B1F44' }]}>{ride.routeName}</Text>
                <Text style={[textStyles.caption, { color: '#4B5C7A' }]}>{ride.dateLabel}</Text>
              </View>
              <View style={rideHistoryListStyles.listMetrics}>
                <MetricPill label="거리" value={formatDistance(ride.distance)} />
                <MetricPill label="평균속도" value={formatSpeed(ride.averageSpeed)} />
                <MetricPill label="시간" value={ride.duration} />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type MetricPillProps = {
  label: string;
  value: string;
};

function MetricPill({ label, value }: MetricPillProps) {
  return (
    <View style={rideHistoryListStyles.metricPill}>
      <Text style={[textStyles.caption, { color: '#4B5C7A' }]}>{label}</Text>
      <Text style={[textStyles.bodySemibold, { color: '#0B1F44', marginTop: 4 }]}>{value}</Text>
    </View>
  );
}
