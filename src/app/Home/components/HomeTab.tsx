import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { textStyles } from '../../../constants/Fonts';
import type { RideHistoryEntry } from '../../../constants/mockRideHistory';
import { homeTabStyles } from './HomeTab.styles';

type MetricBlockProps = {
  label: string;
  value: string;
};

type HomeTabProps = {
  onStartRide: () => void;
  rideHistory: RideHistoryEntry[];
  onViewWeeklySummary: () => void;
  onViewFullHistory: () => void;
  onSelectRide: (rideId: string) => void;
};

export default function HomeTab({
  onStartRide,
  rideHistory,
  onViewWeeklySummary,
  onViewFullHistory,
  onSelectRide,
}: HomeTabProps) {
  return (
    <View style={homeTabStyles.container}>
      <View style={homeTabStyles.sectionHeader}>
        <Text style={[textStyles.h3, { color: '#11181C' }]}>주간 요약</Text>
        <Pressable accessibilityRole="button" onPress={onViewWeeklySummary}>
          <Text style={[textStyles.caption, { color: '#687076' }]}>자세히 보기</Text>
        </Pressable>
      </View>

      <View style={homeTabStyles.metricCard}>
        <View style={homeTabStyles.metricRow}>
          <MetricBlock label="거리" value="32.5km" />
          <MetricBlock label="시간" value="2:25h" />
          <MetricBlock label="평균속도" value="18.3km" />
        </View>
        <View style={homeTabStyles.graphPlaceholder}>
          <Text style={[textStyles.body, { color: '#9BA1A6' }]}>요일별 Bar Graph</Text>
        </View>
      </View>

      <Pressable
        style={homeTabStyles.mapCard}
        accessibilityRole="button"
        accessibilityLabel="주행 화면으로 이동"
        onPress={onStartRide}
      >
        <View>
          <Text style={[textStyles.caption, { color: '#9BA1A6' }]}>바로 출발</Text>
          <Text style={[textStyles.h3, { color: '#11181C', marginTop: 6 }]}>주행 시작하기</Text>
        </View>
        <View style={homeTabStyles.mapActionIcon}>
          <Ionicons name="arrow-forward" size={18} color="white" />
        </View>
      </Pressable>

      <View style={homeTabStyles.historySection}>
        <View style={homeTabStyles.sectionHeader}>
          <Text style={[textStyles.h3, { color: '#11181C' }]}>최근 주행</Text>
          <Pressable accessibilityRole="button" onPress={onViewFullHistory}>
            <Text style={[textStyles.caption, { color: '#687076' }]}>전체 보기</Text>
          </Pressable>
        </View>

        <View style={homeTabStyles.historyList}>
          {rideHistory.map((ride) => (
            <RideHistoryCard key={ride.id} ride={ride} onPress={() => onSelectRide(ride.id)} />
          ))}
        </View>
      </View>
    </View>
  );
}

function MetricBlock({ label, value }: MetricBlockProps) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={[textStyles.caption, { color: '#9BA1A6' }]}>{label}</Text>
      <Text style={[textStyles.bodySemibold, { color: '#11181C', marginTop: 6 }]}>{value}</Text>
    </View>
  );
}

type RideHistoryCardProps = {
  ride: RideHistoryEntry;
  onPress: () => void;
};

function RideHistoryCard({ ride, onPress }: RideHistoryCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [homeTabStyles.historyCard, pressed && { opacity: 0.92 }]}
      onPress={onPress}
    >
      <View style={homeTabStyles.historyMeta}>
        <Text style={[textStyles.bodySemibold, { color: '#11181C' }]}>{ride.routeName}</Text>
        <Text style={[textStyles.caption, { color: '#9BA1A6', marginTop: 6 }]}>{ride.dateLabel}</Text>
      </View>
      <View style={homeTabStyles.historyMetricsRow}>
        <HistoryMetric label="거리" value={`${ride.distance.toFixed(1)} km`} />
        <HistoryMetric label="평균속도" value={`${ride.averageSpeed.toFixed(1)} km/h`} />
        <HistoryMetric label="시간" value={ride.duration} />
      </View>
    </Pressable>
  );
}

type HistoryMetricProps = {
  label: string;
  value: string;
};

function HistoryMetric({ label, value }: HistoryMetricProps) {
  return (
    <View style={homeTabStyles.historyMetric}>
      <Text style={[textStyles.caption, { color: '#9BA1A6' }]}>{label}</Text>
      <Text style={[textStyles.bodySemibold, { color: '#11181C', marginTop: 4 }]}>{value}</Text>
    </View>
  );
}
