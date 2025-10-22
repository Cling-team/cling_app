import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import FeedCard from '../../../components/feed/FeedCard';
import { textStyles } from '../../../constants/Fonts';
import {
  FEED_LOCATIONS,
  type FeedScope,
  filterFeedItems,
} from '../../../constants/mockFeed';
import { feedTabStyles } from './FeedTab.styles';

type Props = {
  onSelectFeed: (id: string) => void;
};

type ScopeTab = {
  key: FeedScope;
  label: string;
};

const FEED_SCOPE_TABS: ScopeTab[] = [
  { key: 'all', label: 'All' },
  { key: 'neighborhood', label: 'Neighborhood' },
  { key: 'friends', label: 'Friends' },
];

export default function FeedTab({ onSelectFeed }: Props) {
  const [scope, setScope] = useState<FeedScope>('all');
  const [location, setLocation] = useState(FEED_LOCATIONS[0]);
  const [locationOpen, setLocationOpen] = useState(false);

  const feedItems = useMemo(() => filterFeedItems(scope, location), [scope, location]);

  return (
    <View style={feedTabStyles.container}>
      <View style={feedTabStyles.scopeTabs}>
        {FEED_SCOPE_TABS.map((tab) => {
          const selected = tab.key === scope;
          return (
            <Pressable
              key={tab.key}
              style={feedTabStyles.scopeTab}
              onPress={() => setScope(tab.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
            >
              <Text style={[textStyles.bodySemibold, { color: selected ? '#11181C' : '#9BA1A6' }]}>
                {tab.label}
              </Text>
              <View
                style={[
                  feedTabStyles.scopeIndicator,
                  { opacity: selected ? 1 : 0 },
                ]}
              />
            </Pressable>
          );
        })}
      </View>

      <View style={feedTabStyles.locationWrapper}>
        <Pressable
          style={feedTabStyles.locationButton}
          onPress={() => setLocationOpen((prev) => !prev)}
          accessibilityRole="button"
        >
          <Text style={[textStyles.bodySemibold, { color: '#11181C' }]}>{location}</Text>
          <Ionicons
            name={locationOpen ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={18}
            color="#11181C"
          />
        </Pressable>

        {locationOpen && (
          <View style={feedTabStyles.locationDropdown}>
            {FEED_LOCATIONS.map((item) => (
              <Pressable
                key={item}
                onPress={() => {
                  setLocation(item);
                  setLocationOpen(false);
                }}
                style={feedTabStyles.locationOption}
              >
                <Text style={[textStyles.body, { color: '#687076' }]}>{item}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <View style={feedTabStyles.friendPrompt}>
        <Text style={[textStyles.h3, { color: '#11181C' }]}>지금 나의 친구들은?</Text>
      </View>

      <View style={feedTabStyles.feedList}>
        {feedItems.map((item) => (
          <FeedCard key={item.id} item={item} onPress={() => onSelectFeed(item.id)} />
        ))}
      </View>
    </View>
  );
}
