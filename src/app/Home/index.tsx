import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { textStyles } from '../../constants/Fonts';
import { mockRideHistory } from '../../constants/mockRideHistory';
import FeedTab from './components/FeedTab';
import HomeTab from './components/HomeTab';
import PartyTab from './components/PartyTab';
import { homeStyles } from './styles';

type TabKey = 'home' | 'feed' | 'party';

const TAB_ITEMS: Record<TabKey, { label: string; icon: keyof typeof Ionicons.glyphMap }> = {
  home: { label: 'Home', icon: 'home-outline' },
  feed: { label: 'Feed', icon: 'newspaper-outline' },
  party: { label: 'Party', icon: 'people-outline' },
};

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const insets = useSafeAreaInsets();
  const rideHistory = mockRideHistory;

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <FeedTab
            onSelectFeed={(id) =>
              router.push({ pathname: '/feed/[id]', params: { id } })
            }
          />
        );
      case 'party':
        return <PartyTab />;
      default:
        return (
          <HomeTab
            onStartRide={() => router.push('/ride')}
            onViewWeeklySummary={() => router.push('/ride/weekly-summary')}
            onViewFullHistory={() => router.push('/ride/history')}
            onSelectRide={(rideId) =>
              router.push({ pathname: '/ride/history/[id]', params: { id: rideId } })
            }
            rideHistory={rideHistory}
          />
        );
    }
  };

  return (
    <View style={homeStyles.root}>
      <View style={[homeStyles.safeSpacer, { height: insets.top }]} />
      <View style={homeStyles.headerSection}>
        <Text style={[textStyles.h2, { color: '#11181C' }]}>Cling</Text>
        <View style={homeStyles.headerActions}>
          <Pressable style={homeStyles.headerIcon} accessibilityLabel="검색" accessibilityRole="button">
            <Ionicons name="search-outline" size={20} color="#11181C" />
          </Pressable>
          <Pressable style={homeStyles.headerIcon} accessibilityLabel="알림" accessibilityRole="button">
            <Ionicons name="notifications-outline" size={20} color="#11181C" />
          </Pressable>
          <Pressable
            style={[homeStyles.headerIcon, homeStyles.avatar]}
            accessibilityLabel="마이페이지로 이동"
            accessibilityRole="button"
            onPress={() => router.push('/profile')}
          >
            <Ionicons name="person" size={20} color="#0B1F44" />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={homeStyles.scroll}
        contentContainerStyle={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>

      <View style={[homeStyles.tabBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        {Object.entries(TAB_ITEMS).map(([key, item]) => {
          const tabKey = key as TabKey;
          const selected = tabKey === activeTab;
          return (
            <Pressable
              key={tabKey}
              style={homeStyles.tabButton}
              onPress={() => setActiveTab(tabKey)}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
            >
              <Ionicons
                name={selected ? (item.icon.replace('-outline', '') as any) : item.icon}
                size={22}
                color={selected ? '#11181C' : '#9BA1A6'}
              />
              <Text style={[textStyles.caption, { color: selected ? '#11181C' : '#9BA1A6', marginTop: 4 }]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}