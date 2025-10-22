import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { textStyles } from '../../constants/Fonts';
import { mockRideHistory } from '../../constants/mockRideHistory';
import { weeklySummaryStyles } from './weeklySummaryStyles';

type TrendItem = {
  day: string;
  distance: number;
  durationMinutes: number;
};

const WEEKLY_TRENDS: TrendItem[] = [
  { day: '월', distance: 12.4, durationMinutes: 48 },
  { day: '화', distance: 18.1, durationMinutes: 66 },
  { day: '수', distance: 9.3, durationMinutes: 34 },
  { day: '목', distance: 0, durationMinutes: 0 },
  { day: '금', distance: 15.9, durationMinutes: 58 },
  { day: '토', distance: 32.5, durationMinutes: 84 },
  { day: '일', distance: 0, durationMinutes: 0 },
];

const FOCUS_POINTS = [
  '주말 장거리 라이딩 비중이 증가하고 있어요. 토요일 오전 8시대를 계속 공략해볼까요?',
  '평일 저녁 회복주를 추가하면 평균 속도를 안정적으로 유지할 수 있어요.',
  '이번 주 칼로리 소비량이 지난주 대비 12% 상승했어요! 수분과 영양 섭취도 잊지 마세요.',
];

function durationToSeconds(duration: string) {
  const parts = duration.split(':').map((p) => Number.parseInt(p, 10) || 0);
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  }
  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  }
  return 0;
}

function formatDurationMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) {
    return `${minutes}분`;
  }
  return `${hours}시간 ${minutes}분`;
}

function formatSummaryDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}시간 ${minutes}분`;
}

export default function WeeklySummaryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const stats = useMemo(() => {
    const totalDistance = mockRideHistory.reduce((sum, ride) => sum + ride.distance, 0);
    const totalDurationSeconds = mockRideHistory.reduce(
      (sum, ride) => sum + durationToSeconds(ride.duration),
      0,
    );
    const averageSpeed =
      mockRideHistory.length > 0
        ? mockRideHistory.reduce((sum, ride) => sum + ride.averageSpeed, 0) /
          mockRideHistory.length
        : 0;
    const totalCalories = Math.round(totalDistance * 23);

    return {
      totalDistance,
      totalDurationSeconds,
      averageSpeed,
      totalCalories,
      rideCount: mockRideHistory.length,
    };
  }, []);

  return (
    <SafeAreaView
      style={[weeklySummaryStyles.screen, { paddingTop: Math.max(insets.top, 16) }]}
    >
      <ScrollView
        contentContainerStyle={weeklySummaryStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={weeklySummaryStyles.header}>
          <Pressable
            style={weeklySummaryStyles.backButton}
            accessibilityRole="button"
            accessibilityLabel="홈으로 돌아가기"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={20} color="#0B1F44" />
          </Pressable>
          <View style={weeklySummaryStyles.titleBlock}>
            <Text style={[textStyles.h3, { color: '#0B1F44' }]}>주간 요약</Text>
            <Text style={[textStyles.caption, { color: '#4B5C7A' }]}>이번 주 당신의 라이딩 기록이에요</Text>
          </View>
        </View>

        <View style={weeklySummaryStyles.summaryCard}>
          <Text style={[textStyles.bodySemibold, { color: '#4B5C7A' }]}>이번 주 주요 지표</Text>
          <View style={weeklySummaryStyles.summaryGrid}>
            <SummaryCell label="총 주행 거리" value={`${stats.totalDistance.toFixed(1)} km`} />
            <SummaryCell
              label="총 주행 시간"
              value={formatSummaryDuration(stats.totalDurationSeconds)}
            />
            <SummaryCell label="평균 속도" value={`${stats.averageSpeed.toFixed(1)} km/h`} />
            <SummaryCell label="라이딩 횟수" value={`${stats.rideCount} 회`} />
            <SummaryCell label="칼로리" value={`${stats.totalCalories} kcal`} />
          </View>
        </View>

        <View style={weeklySummaryStyles.trendSection}>
          <View style={weeklySummaryStyles.header}>
            <Ionicons name="trending-up" size={20} color="#0E52FF" />
            <Text style={[textStyles.bodySemibold, { color: '#0B1F44' }]}>
              요일별 트렌드
            </Text>
          </View>
          <View style={weeklySummaryStyles.trendList}>
            {WEEKLY_TRENDS.map((item) => (
              <View key={item.day} style={weeklySummaryStyles.trendRow}>
                <View style={weeklySummaryStyles.trendMeta}>
                  <Text style={[textStyles.bodySemibold, { color: '#0B1F44' }]}>{item.day}</Text>
                  <Text style={[textStyles.caption, { color: '#4B5C7A' }]}>주행 시간 {formatDurationMinutes(item.durationMinutes)}</Text>
                </View>
                <Text style={[textStyles.bodySemibold, { color: '#0B1F44' }]}>
                  {item.distance.toFixed(1)} km
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={weeklySummaryStyles.highlightCard}>
          <View style={weeklySummaryStyles.highlightRow}>
            <Ionicons name="bulb" size={22} color="white" />
            <Text style={[textStyles.h3, { color: 'white' }]}>이번 주 인사이트</Text>
          </View>
          {FOCUS_POINTS.map((point) => (
            <View key={point} style={weeklySummaryStyles.highlightRow}>
              <View style={weeklySummaryStyles.highlightBullet} />
              <Text style={[textStyles.body, { color: 'rgba(255,255,255,0.95)' }]}>{point}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type SummaryCellProps = {
  label: string;
  value: string;
};

function SummaryCell({ label, value }: SummaryCellProps) {
  return (
    <View style={weeklySummaryStyles.summaryCell}>
      <Text style={[textStyles.caption, weeklySummaryStyles.summaryLabel]}>{label}</Text>
      <Text style={[textStyles.bodySemibold, weeklySummaryStyles.summaryValue]}>{value}</Text>
    </View>
  );
}
