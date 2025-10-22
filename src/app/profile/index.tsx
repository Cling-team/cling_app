import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { textStyles } from '../../constants/Fonts';
import { profileStyles } from './styles';

const QUICK_ACTIONS = [
  { icon: 'bicycle', label: '장비 관리', description: '내 자전거, 컴포넌트 기록' },
  { icon: 'medal', label: '도전과제', description: '이번 달 챌린지 확인' },
  { icon: 'analytics', label: '퍼포먼스 리포트', description: '파워/심박 트렌드 보기' },
  { icon: 'settings', label: '환경 설정', description: '계정 · 앱 설정 변경' },
] as const;

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[profileStyles.screen, { paddingTop: Math.max(insets.top, 16) }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={profileStyles.content}
      >
        <View style={profileStyles.headerRow}>
          <Pressable
            style={profileStyles.backButton}
            accessibilityRole="button"
            accessibilityLabel="홈으로 돌아가기"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={20} color="#0B1F44" />
          </Pressable>
          <View>
            <Text style={[textStyles.h3, { color: '#0B1F44' }]}>마이페이지</Text>
            <Text style={[textStyles.caption, { color: '#4B5C7A', marginTop: 4 }]}>프로필과 라이딩 데이터를 관리해요</Text>
          </View>
        </View>

        <View>
          <View style={profileStyles.avatarWrapper}>
            <Ionicons name="person" size={38} color="#0B1F44" />
          </View>
          <Text
            style={{
              ...textStyles.h3,
              color: '#0B1F44',
              textAlign: 'center',
              marginTop: 16,
            }}
          >
            김라이더
          </Text>
          <View style={profileStyles.tagRow}>
            <View style={profileStyles.tagPill}>
              <Text style={[textStyles.caption, { color: '#0B1F44' }]}>클링 멤버십 · PRO</Text>
            </View>
            <View style={profileStyles.tagPill}>
              <Text style={[textStyles.caption, { color: '#0B1F44' }]}>FTP 235W</Text>
            </View>
          </View>
        </View>

        <View style={profileStyles.statsCard}>
          <Text style={[textStyles.bodySemibold, { color: '#4B5C7A' }]}>최근 30일</Text>
          <View style={profileStyles.statsRow}>
            <StatBlock label="거리" value="312 km" icon="map" />
            <StatBlock label="주행 시간" value="12시간 45분" icon="time" />
          </View>
          <View style={profileStyles.statsRow}>
            <StatBlock label="평균 속도" value="25.6 km/h" icon="speedometer" />
            <StatBlock label="획득 고도" value="2,480 m" icon="trending-up" />
          </View>
        </View>

        <View style={profileStyles.sectionCard}>
          <View style={profileStyles.listRow}>
            <Text style={[textStyles.bodySemibold, { color: '#0B1F44' }]}>나의 목표</Text>
            <View style={profileStyles.pill}>
              <Text style={[textStyles.caption, { color: '#0B1F44' }]}>11월 챌린지 진행도 62%</Text>
            </View>
          </View>
          <View style={{ gap: 12 }}>
            <GoalRow icon="flag" title="주 3회 라이딩" description="이번 주 2/3회 달성" />
            <GoalRow icon="barbell" title="FTP +10W" description="누적 진행도 46%" />
            <GoalRow icon="leaf" title="복습 스트레칭" description="이번 주 1/3회 진행" />
          </View>
        </View>

        <View style={profileStyles.sectionCard}>
          <Text style={[textStyles.bodySemibold, { color: '#0B1F44' }]}>빠른 작업</Text>
          <View style={profileStyles.actionGrid}>
            {QUICK_ACTIONS.map((action) => (
              <View
                key={action.label}
                style={[
                  profileStyles.actionButton,
                  action.icon === 'settings' ? profileStyles.actionSecondary : null,
                ]}
              >
                <Ionicons name={action.icon} size={20} color="white" />
                <Text style={[textStyles.bodySemibold, { color: 'white' }]}>{action.label}</Text>
                <Text style={[textStyles.caption, { color: 'rgba(255,255,255,0.75)' }]}>
                  {action.description}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type StatBlockProps = {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
};

function StatBlock({ label, value, icon }: StatBlockProps) {
  return (
    <View style={profileStyles.statBlock}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Ionicons name={icon} size={18} color="#0E52FF" />
        <Text style={[textStyles.caption, { color: '#4B5C7A' }]}>{label}</Text>
      </View>
      <Text style={[textStyles.bodySemibold, { color: '#0B1F44', marginTop: 8 }]}>{value}</Text>
    </View>
  );
}

type GoalRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
};

function GoalRow({ icon, title, description }: GoalRowProps) {
  return (
    <View style={profileStyles.listRow}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Ionicons name={icon} size={18} color="#0E52FF" />
        <View>
          <Text style={[textStyles.bodySemibold, { color: '#0B1F44' }]}>{title}</Text>
          <Text style={[textStyles.caption, { color: '#4B5C7A', marginTop: 4 }]}>{description}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#9BA1A6" />
    </View>
  );
}
