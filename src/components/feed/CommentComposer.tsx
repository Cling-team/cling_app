import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, ImageSourcePropType, Pressable, TextInput, View } from 'react-native';

import { commentComposerStyles } from './CommentComposer.styles';

type Props = {
  avatar: ImageSourcePropType;
  bottomInset: number;
  onSend?: (message: string) => void;
};

export default function CommentComposer({ avatar, bottomInset, onSend }: Props) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    onSend?.(message.trim());
    setMessage('');
  };

  return (
    <View style={[commentComposerStyles.container, { paddingBottom: Math.max(bottomInset, 12) }]}>
      <Image
        source={avatar}
        style={commentComposerStyles.avatar}
        accessibilityIgnoresInvertColors
      />
      <TextInput
        style={commentComposerStyles.input}
        placeholder="Add your comment..."
        placeholderTextColor="#9BA1A6"
        value={message}
        onChangeText={setMessage}
        returnKeyType="send"
        onSubmitEditing={handleSend}
      />
      <Pressable
        style={commentComposerStyles.sendButton}
        accessibilityRole="button"
        accessibilityLabel="댓글 보내기"
        onPress={handleSend}
      >
        <Ionicons name="paper-plane-outline" size={18} color="white" />
      </Pressable>
    </View>
  );
}
