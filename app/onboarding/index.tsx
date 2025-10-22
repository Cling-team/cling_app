import { useRouter } from 'expo-router';
import { ReactNode, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import BikeStep from '../../components/onboarding/BikeStep';
import LocationStep from '../../components/onboarding/LocationStep';
import NicknameStep from '../../components/onboarding/NicknameStep';
import ProfileStep from '../../components/onboarding/ProfileStep';

const TOTAL_STEPS = 4;

type Gender = '남자' | '여자';

type ProfileState = {
  gender: Gender | null;
  birth: string;
};

type StepKey = 'nickname' | 'location' | 'profile' | 'bike';

const INITIAL_PROFILE: ProfileState = { gender: null, birth: '2000-06-22' };

export default function OnboardingFlow() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileState>(INITIAL_PROFILE);
  const [bike, setBike] = useState<string | null>(null);

  const progress = { current: stepIndex + 1, total: TOTAL_STEPS };

  const anim = useRef(new Animated.Value(1)).current;
  const direction = useRef<'forward' | 'backward'>('forward');

  const goNext = () => {
    direction.current = 'forward';
    // fade/slide out then in
    Animated.timing(anim, {
      toValue: 0,
      duration: 160,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setStepIndex((idx) => Math.min(TOTAL_STEPS - 1, idx + 1));
      Animated.timing(anim, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    });
  };

  const handleCompletion = () => {
    router.replace('/Home' as any);
  };

  const steps: Record<StepKey, ReactNode> = {
    nickname: (
      <NicknameStep
        initialValue={nickname}
        progress={progress}
        onSubmit={(value) => {
          setNickname(value);
          goNext();
        }}
      />
    ),
    location: (
      <LocationStep
        initialValue={location}
        progress={progress}
        onSubmit={(value) => {
          setLocation(value);
          goNext();
        }}
      />
    ),
    profile: (
      <ProfileStep
        initialGender={profile.gender}
        initialBirth={profile.birth}
        progress={progress}
        onSubmit={({ gender, birth }) => {
          setProfile({ gender, birth });
          goNext();
        }}
      />
    ),
    bike: (
      <BikeStep
        initialValue={bike}
        progress={progress}
        onSubmit={(value) => {
          setBike(value);
          handleCompletion();
        }}
      />
    ),
  };

  const order: StepKey[] = ['nickname', 'location', 'profile', 'bike'];
  const currentKey = order[stepIndex] ?? 'bike';

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: direction.current === 'forward' ? [12, 0] : [-12, 0],
  });
  const opacity = anim;

  return (
    <View style={styles.container}>
      <Animated.View style={{ flex: 1, opacity, transform: [{ translateX }] }}>
        {steps[currentKey]}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
