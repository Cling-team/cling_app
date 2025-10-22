import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CommentBubble from '../../components/feed/CommentBubble';
import CommentComposer from '../../components/feed/CommentComposer';
import FeedCard from '../../components/feed/FeedCard';
import { textStyles } from '../../constants/Fonts';
import { FEED_ITEMS } from '../../constants/mockFeed';
import { feedDetailStyles } from './styles';

export default function FeedDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const feedItem = FEED_ITEMS.find((item) => item.id === id);

  if (!feedItem) {
    return (
      <View style={[feedDetailStyles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <Pressable
          style={feedDetailStyles.backButton}
          onPress={() => router.back()}
          accessibilityRole="button"
        >
          <Ionicons name="chevron-back" size={20} color="#11181C" />
        </Pressable>
        <View style={feedDetailStyles.emptyState}>
          <Text style={[textStyles.h3, { color: '#11181C' }]}>피드를 찾을 수 없어요.</Text>
          <Text style={[textStyles.body, { color: '#9BA1A6', marginTop: 8 }]}>목록으로 돌아가 다시 시도해 주세요.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={feedDetailStyles.root}>
      <View style={{ height: insets.top }} />

      <View style={feedDetailStyles.header}>
        <Pressable
          style={feedDetailStyles.headerPill}
          onPress={() => router.back()}
          accessibilityRole="button"
        >
          <Ionicons name="chevron-back" size={18} color="#11181C" />
        </Pressable>
        <View style={feedDetailStyles.headerTitlePill}>
          <Text style={[textStyles.bodySemibold, { color: '#11181C' }]}>상세 보기</Text>
        </View>
        <View style={feedDetailStyles.headerSpacer} />
      </View>

      <ScrollView
        style={feedDetailStyles.scroll}
        contentContainerStyle={feedDetailStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FeedCard item={feedItem} />

        <View style={feedDetailStyles.commentsHeader}>
          <Text style={[textStyles.bodySemibold, { color: '#11181C' }]}>댓글 수: {feedItem.comments.length}</Text>
        </View>

        <View style={{ gap: 16 }}>
          {feedItem.comments.map((comment) => (
            <CommentBubble key={comment.id} comment={comment} />
          ))}
        </View>
      </ScrollView>

      <CommentComposer avatar={feedItem.avatar} bottomInset={insets.bottom} />
    </View>
  );
}
