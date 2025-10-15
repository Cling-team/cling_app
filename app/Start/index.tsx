import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import BottomDrawer from '../../components/BottomDrawer';

export default function Page() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const goOnboarding = () => router.push('/onboarding/nickname' as any);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
      <View style={styles.avatarPlaceholder}>
        <Image source={require('../../assets/images/icon.png')} style={{ width: 64, height: 64, opacity: 0.6 }} />
      </View>

      <Pressable style={styles.primaryButton} onPress={() => setDrawerOpen(true)}>
        <Text style={styles.primaryText}>시작하기</Text>
      </Pressable>

      <BottomDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} height={340}>
        <Pressable style={styles.socialButton} onPress={goOnboarding}>
          <Text style={styles.socialText}>구글 로그인</Text>
        </Pressable>
        <Pressable style={[styles.socialButton, { marginTop: 12 }]} onPress={goOnboarding}>
          <Text style={styles.socialText}>애플 로그인</Text>
        </Pressable>
      </BottomDrawer>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#11181C',
    paddingVertical: 14,
    borderRadius: 10,
  },
  primaryText: { color: 'white', textAlign: 'center', fontSize: 16, fontWeight: '600' },
  socialButton: { backgroundColor: '#F2F2F2', paddingVertical: 14, borderRadius: 10 },
  socialText: { textAlign: 'center', fontSize: 16, fontWeight: '600', color: '#11181C' },
});
