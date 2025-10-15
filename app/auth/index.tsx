import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function AuthPage() {
  const onSocialLogin = (provider: 'google' | 'apple') => {
    // TODO: integrate real social login. For now, proceed to onboarding.
    router.push('/onboarding/nickname' as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabIndicator} />
      <Pressable style={styles.socialButton} onPress={() => onSocialLogin('google')}>
        <Text style={styles.socialText}>구글 로그인</Text>
      </Pressable>
      <Pressable style={[styles.socialButton, { marginTop: 12 }]} onPress={() => onSocialLogin('apple')}>
        <Text style={styles.socialText}>애플 로그인</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  tabIndicator: { alignSelf: 'center', width: 160, height: 6, borderRadius: 3, backgroundColor: '#EAEAEA', marginBottom: 24 },
  socialButton: {
    backgroundColor: '#F2F2F2',
    paddingVertical: 14,
    borderRadius: 10,
  },
  socialText: { textAlign: 'center', fontSize: 16, fontWeight: '600', color: '#11181C' },
});
