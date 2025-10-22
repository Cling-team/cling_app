import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import BottomDrawer from '../../components/BottomDrawer';
import { textStyles } from '../../constants/Fonts';

export default function Page() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const goOnboarding = () => router.push('/onboarding' as any);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
      <View style={styles.avatarPlaceholder}>
        <Image source={require('../../assets/images/icon.png')} style={{ width: 64, height: 64, opacity: 0.6 }} />
      </View>

      <Pressable style={styles.primaryButton} onPress={() => setDrawerOpen(true)}>
        <Text style={[textStyles.button, { color: 'white', textAlign: 'center' }]}>시작하기</Text>
      </Pressable>

      <BottomDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} height={340}>
        <Pressable style={styles.socialButton} onPress={goOnboarding}>
          <Text style={[textStyles.button, { color: '#11181C', textAlign: 'center' }]}>구글 로그인</Text>
        </Pressable>
        <Pressable style={[styles.socialButton, { marginTop: 12 }]} onPress={goOnboarding}>
          <Text style={[textStyles.button, { color: '#11181C', textAlign: 'center' }]}>애플 로그인</Text>
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
  socialButton: { backgroundColor: '#F2F2F2', paddingVertical: 14, borderRadius: 10 },
});
