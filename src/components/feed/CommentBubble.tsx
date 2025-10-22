import { Ionicons } from '@expo/vector-icons';
import { Image, Text, View } from 'react-native';

import { textStyles } from '../../constants/Fonts';
import type { FeedComment } from '../../constants/mockFeed';
import { commentBubbleStyles } from './CommentBubble.styles';

type Props = {
  comment: FeedComment;
};

export default function CommentBubble({ comment }: Props) {
  return (
    <View style={commentBubbleStyles.container}>
      <Image source={comment.avatar} style={commentBubbleStyles.avatar} />
      <View style={{ flex: 1 }}>
        <View style={commentBubbleStyles.headerRow}>
          <View>
            <Text style={[textStyles.bodySemibold, { color: '#11181C' }]}>{comment.author}</Text>
            <Text style={[textStyles.caption, { color: '#9BA1A6', marginTop: 4 }]}>{comment.timeAgo}</Text>
          </View>
          <View style={commentBubbleStyles.likes}>
            <Ionicons name="heart-outline" size={16} color="#9BA1A6" />
            <Text style={[textStyles.caption, { color: '#9BA1A6', marginLeft: 4 }]}>{comment.likes}</Text>
          </View>
        </View>
        <Text style={[textStyles.body, { color: '#687076', marginTop: 8 }]}>{comment.message}</Text>
      </View>
    </View>
  );
}
