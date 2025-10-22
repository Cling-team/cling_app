import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { textStyles } from '../../../constants/Fonts';
import { mockRideHistory } from '../../../constants/mockRideHistory';
import { rideHistoryDetailStyles } from './historyStyles';

type RideDetailExtras = {
  calories: number;
  elevationGain: number;
  topSpeed: number;
  weather: string;
  startPoint: string;
  highlights: string[];
  segments: { name: string; distanceKm: number; avgSpeed: number }[];
};

type Params = {
  id?: string | string[];
};

const DEFAULT_DETAIL: RideDetailExtras = {
  calories: 580,
  elevationGain: 260,
  topSpeed: 36.2,
  weather: '맑음 · 16℃',
  startPoint: '서울시 성동구 응봉동',
  highlights: ['페달링 리듬이 안정적으로 유지되었어요.', '중반부 오르막에서 파워가 지난주 대비 8% 증가했어요.'],
  segments: [
    { name: '워밍업', distanceKm: 6.2, avgSpeed: 24.3 },
    { name: '중앙 하이라이트', distanceKm: 12.1, avgSpeed: 27.8 },
    { name: '쿨다운', distanceKm: 5.1, avgSpeed: 22.4 },
  ],
};

const RIDE_DETAIL_MAP: Record<string, RideDetailExtras> = {
  'ride-001': {
    calories: 740,
    elevationGain: 420,
    topSpeed: 42.6,
    weather: '맑음 · 18℃',
    startPoint: '뚝섬 한강공원 주차장',
    highlights: [
      '한강 자전거 도로에서 평균 속도가 25 km/h 이상을 유지했어요.',
      '성수대교를 건널 때 파워 존 3 유지로 체력 분배가 아주 좋았어요.',
      '마지막 3 km에서 케이던스를 올리며 깔끔하게 피니시했습니다.',
    ],
    segments: [
      { name: '뚝섬 → 잠실대교', distanceKm: 8.5, avgSpeed: 27.2 },
      { name: '잠실대교 → 반포대교', distanceKm: 12.3, avgSpeed: 24.8 },
      { name: '반포대교 → 뚝섬', distanceKm: 11.7, avgSpeed: 26.4 },
    ],
  },
  'ride-002': {
    calories: 520,
    elevationGain: 680,
    topSpeed: 38.4,
    weather: '흐림 · 13℃',
    startPoint: '북악팔각정 주차장',
    highlights: [
      '연속된 코너 구간에서 브레이킹 포인트가 안정적으로 유지됐어요.',
      '북악 정상 구간에서 최대 심박이 지난주보다 6bpm 낮았어요.',
      '다운힐 구간에서 상체 중심 잡기가 한층 자연스러웠어요.',
    ],
    segments: [
      { name: '초입 오르막', distanceKm: 3.2, avgSpeed: 16.4 },
      { name: '중간 스위치백', distanceKm: 4.1, avgSpeed: 18.1 },
      { name: '정상 구간', distanceKm: 2.7, avgSpeed: 20.5 },
    ],
  },
  'ride-003': {
    calories: 980,
    elevationGain: 560,
    topSpeed: 44.1,
    weather: '맑음 · 20℃',
    startPoint: '양수리 두물머리 주차장',
    highlights: [
      '라이딩 중 2회 이상의 스프린트 구간에서 파워 존 5를 성공적으로 유지했어요.',
      '양평 방향 맞바람 구간에서도 속도를 잘 방어했어요.',
      '휴식 지점에서 스트레칭을 꾸준히 해줘서 회복이 빨랐어요.',
    ],
    segments: [
      { name: '두물머리 → 양평역', distanceKm: 17.4, avgSpeed: 26.1 },
      { name: '양평역 → 팔당댐', distanceKm: 21.8, avgSpeed: 24.6 },
      { name: '팔당댐 → 두물머리', distanceKm: 9.1, avgSpeed: 23.2 },
    ],
  },
};

function formatDistance(distance: number) {
  return `${distance.toFixed(1)} km`;
}

function formatSpeed(speed: number) {
  return `${speed.toFixed(1)} km/h`;
}

export default function RideHistoryDetailScreen() {
  const { id } = useLocalSearchParams<Params>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const ride = useMemo(() => {
    if (!id) return undefined;
    const rideId = Array.isArray(id) ? id[0] : id;
    return mockRideHistory.find((entry) => entry.id === rideId);
  }, [id]);

  const rideId = useMemo(() => {
    if (!id) return undefined;
    return Array.isArray(id) ? id[0] : id;
  }, [id]);

  const extras = useMemo(() => {
    if (!rideId) return DEFAULT_DETAIL;
    return RIDE_DETAIL_MAP[rideId] ?? DEFAULT_DETAIL;
  }, [rideId]);

  if (!ride || !rideId) {
    return (
      <SafeAreaView
        style={[rideHistoryDetailStyles.screen, { paddingTop: Math.max(insets.top, 16) }]}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
          <Text style={[textStyles.bodySemibold, { color: 'white' }]}>주행 기록을 찾을 수 없어요.</Text>
          <Pressable
            style={[rideHistoryDetailStyles.detailPill, { backgroundColor: '#0E52FF' }]}
            accessibilityRole="button"
            onPress={() => router.back()}
          >
            <Text style={[textStyles.bodySemibold, { color: 'white' }]}>목록으로 돌아가기</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[rideHistoryDetailStyles.screen, { paddingTop: Math.max(insets.top, 16) }]}
    >
      <ScrollView
        contentContainerStyle={rideHistoryDetailStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={rideHistoryDetailStyles.headerRow}>
          <Pressable
            style={rideHistoryDetailStyles.backButton}
            accessibilityRole="button"
            accessibilityLabel="목록으로 돌아가기"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={20} color="white" />
          </Pressable>
          <View style={rideHistoryDetailStyles.titleBlock}>
            <Text style={[textStyles.h3, { color: 'white' }]}>{ride.routeName}</Text>
            <Text style={[textStyles.caption, { color: '#8FA0C1', marginTop: 4 }]}>
              {ride.dateLabel}
            </Text>
          </View>
          <View style={rideHistoryDetailStyles.detailPill}>
            <Text style={[textStyles.caption, { color: 'white' }]}>{extras.weather}</Text>
          </View>
        </View>

        <View style={rideHistoryDetailStyles.summaryCard}>
          <View style={rideHistoryDetailStyles.summaryMetrics}>
            <MetricBox label="주행 거리" value={formatDistance(ride.distance)} />
            <MetricBox label="평균 속도" value={formatSpeed(ride.averageSpeed)} />
            <MetricBox label="주행 시간" value={ride.duration} />
            <MetricBox label="칼로리" value={`${extras.calories} kcal`} />
            <MetricBox label="고도 상승" value={`${extras.elevationGain} m`} />
            <MetricBox label="최고 속도" value={formatSpeed(extras.topSpeed)} />
          </View>
        </View>

        <View style={rideHistoryDetailStyles.sectionCard}>
          <Text style={[textStyles.bodySemibold, { color: 'white' }]}>세부 구간 분석</Text>
          {extras.segments.map((segment) => (
            <View key={segment.name} style={rideHistoryDetailStyles.detailRow}>
              <View>
                <Text style={[textStyles.bodySemibold, { color: 'white' }]}>{segment.name}</Text>
                <Text style={[textStyles.caption, { color: '#8FA0C1', marginTop: 6 }]}>거리 {formatDistance(segment.distanceKm)}</Text>
              </View>
              <View style={rideHistoryDetailStyles.detailPill}>
                <Text style={[textStyles.caption, { color: 'white' }]}>평균 {formatSpeed(segment.avgSpeed)}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={rideHistoryDetailStyles.sectionCard}>
          <Text style={[textStyles.bodySemibold, { color: 'white' }]}>스타트 포인트 & 루트</Text>
          <View style={rideHistoryDetailStyles.detailRow}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <Ionicons name="navigate" size={18} color="#4DA6FF" />
              <Text style={[textStyles.body, { color: 'white' }]}>{extras.startPoint}</Text>
            </View>
            <View style={rideHistoryDetailStyles.detailPill}>
              <Text style={[textStyles.caption, { color: 'white' }]}>GPX 내보내기</Text>
            </View>
          </View>
        </View>

        <View style={rideHistoryDetailStyles.highlightSection}>
          <View style={rideHistoryDetailStyles.highlightCard}>
            <View style={rideHistoryDetailStyles.highlightRow}>
              <Ionicons name="sparkles" size={20} color="white" />
              <Text style={[textStyles.bodySemibold, { color: 'white' }]}>이번 라이딩 하이라이트</Text>
            </View>
            {extras.highlights.map((highlight) => (
              <View key={highlight} style={rideHistoryDetailStyles.highlightRow}>
                <View style={rideHistoryDetailStyles.bullet} />
                <Text style={[textStyles.body, { color: 'rgba(255,255,255,0.95)' }]}>{highlight}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type MetricBoxProps = {
  label: string;
  value: string;
};

function MetricBox({ label, value }: MetricBoxProps) {
  return (
    <View style={rideHistoryDetailStyles.metricBox}>
      <Text style={[textStyles.caption, rideHistoryDetailStyles.metricLabel]}>{label}</Text>
      <Text style={[textStyles.bodySemibold, rideHistoryDetailStyles.metricValue]}>{value}</Text>
    </View>
  );
}
