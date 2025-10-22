import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, Text, View } from 'react-native';

import { textStyles } from '../../constants/Fonts';
import type { FeedItem } from '../../constants/mockFeed';
import { feedCardStyles } from './FeedCard.styles';

type Props = {
  item: FeedItem;
  onPress?: () => void;
  showActions?: boolean;
};

export default function FeedCard({ item, onPress, showActions = true }: Props) {
  const Container: typeof Pressable | typeof View = onPress ? Pressable : View;
  return (
    <Container
      style={feedCardStyles.card}
      {...(onPress ? { onPress } : {})}
      accessibilityRole={onPress ? 'button' : undefined}
    >
      <View style={feedCardStyles.headerRow}>
        <View style={feedCardStyles.authorRow}>
          <Image source={item.avatar} style={feedCardStyles.avatar} />
          <View style={feedCardStyles.authorMeta}>
            <Text style={[textStyles.bodySemibold, { color: '#11181C' }]}>{item.author}</Text>
            <Text style={[textStyles.caption, { color: '#9BA1A6', marginTop: 4 }]}>{item.timeAgo}</Text>
          </View>
        </View>
        <Ionicons name="ellipsis-horizontal" size={18} color="#9BA1A6" />
      </View>

      <Text style={[textStyles.body, { color: '#687076', marginTop: 12 }]}>{item.message}</Text>

      <View style={feedCardStyles.rideBox}>
        <Text style={[textStyles.bodySemibold, { color: '#9BA1A6' }]}>{item.rideLabel}</Text>
      </View>

      {showActions && (
        <View style={feedCardStyles.actionRow}>
          <View style={feedCardStyles.actionItem}>
            <Ionicons name="heart-outline" size={18} color="#9BA1A6" />
            <Text style={[textStyles.caption, { color: '#9BA1A6', marginLeft: 4 }]}>{item.likes}</Text>
          </View>
          <View style={feedCardStyles.actionItem}>
            <Ionicons name="chatbubble-ellipses-outline" size={18} color="#9BA1A6" />
            <Text style={[textStyles.caption, { color: '#9BA1A6', marginLeft: 4 }]}>{item.comments.length}</Text>
          </View>
        </View>
      )}
    </Container>
  );
}
