import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ImageBackground, Pressable, SafeAreaView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { textStyles } from '../../constants/Fonts';
import { rideStyles } from './rideStyles';

type RideMetrics = {
  currentSpeed: number;
  averageSpeed: number;
  totalDistance: number;
  elapsedSeconds: number;
};

const MAP_URI = 'https://tile.openstreetmap.org/15/19635/10619.png';

function formatSpeed(value: number) {
  return value.toFixed(1);
}

function formatDistance(value: number) {
  return value.toFixed(1);
}

function formatDuration(seconds: number) {
  const hrs = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, '0');
  const mins = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');

  return `${hrs}:${mins}:${secs}`;
}

export default function RideScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [metrics, setMetrics] = useState<RideMetrics>({
    currentSpeed: 18.5,
    averageSpeed: 18.5,
    totalDistance: 0,
    elapsedSeconds: 0,
  });
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setMetrics((prev) => {
          const nextElapsed = prev.elapsedSeconds + 1;
          const variation = Math.sin(nextElapsed / 8) * 1.2;
          const currentSpeed = Math.max(6, prev.currentSpeed + variation * 0.2);
          const distance = prev.totalDistance + currentSpeed / 3600;
          const averageSpeed = distance === 0 ? currentSpeed : distance / (nextElapsed / 3600);

          return {
            currentSpeed,
            totalDistance: distance,
            averageSpeed,
            elapsedSeconds: nextElapsed,
          };
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPaused]);

  const formattedDuration = useMemo(
    () => formatDuration(metrics.elapsedSeconds),
    [metrics.elapsedSeconds],
  );

  return (
  <SafeAreaView style={[rideStyles.screen, { paddingTop: Math.max(insets.top, 20) }] }>
      <View style={rideStyles.container}>
        <View style={rideStyles.metricGrid}>
          <View style={rideStyles.currentSpeedCard}>
            <Text style={[textStyles.caption, rideStyles.metricLabel]}>현재 속도</Text>
            <Text style={rideStyles.currentSpeedValue}>{formatSpeed(metrics.currentSpeed)}</Text>
            <Text style={rideStyles.metricUnit}>km/h</Text>
          </View>

          <View style={rideStyles.secondaryRow}>
            <View style={rideStyles.secondaryCard}>
              <Text style={[textStyles.caption, rideStyles.metricLabel]}>평균 속도</Text>
              <Text style={rideStyles.secondaryValue}>{formatSpeed(metrics.averageSpeed)}</Text>
              <Text style={rideStyles.metricUnit}>km/h</Text>
            </View>
            <View style={rideStyles.secondaryCard}>
              <Text style={[textStyles.caption, rideStyles.metricLabel]}>주행 거리</Text>
              <Text style={rideStyles.secondaryValue}>{formatDistance(metrics.totalDistance)}</Text>
              <Text style={rideStyles.metricUnit}>km</Text>
            </View>
          </View>
        </View>

        <View style={rideStyles.timerCard}>
          <Ionicons name="time-outline" size={20} color="white" />
          <Text style={rideStyles.timerText}>{formattedDuration}</Text>
        </View>

        <ImageBackground
          source={{ uri: MAP_URI }}
          style={rideStyles.map}
          imageStyle={{ borderRadius: 20 }}
          resizeMode="cover"
        >
          <View style={rideStyles.mapOverlay}>
            <Ionicons name="navigate" size={28} color="#2f80ff" />
          </View>
        </ImageBackground>
      </View>

  <View style={[rideStyles.footer, { paddingBottom: Math.max(insets.bottom, 24) }] }>
        <Pressable
          style={[rideStyles.controlButton, rideStyles.pauseButton]}
          onPress={() => setIsPaused((prev) => !prev)}
        >
          <Ionicons
            name={isPaused ? 'play' : 'pause'}
            size={24}
            color="white"
            style={{ marginBottom: 4 }}
          />
          <Text style={rideStyles.controlLabel}>{isPaused ? '재개' : '일시정지'}</Text>
        </Pressable>

        <Pressable
          style={[rideStyles.controlButton, rideStyles.stopButton]}
          onPress={() => {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            router.push({
              pathname: '/ride/result',
              params: {
                distance: formatDistance(metrics.totalDistance),
                averageSpeed: formatSpeed(metrics.averageSpeed),
                duration: formattedDuration,
              },
            });
          }}
        >
          <Ionicons name="stop" size={24} color="white" style={{ marginBottom: 4 }} />
          <Text style={rideStyles.controlLabel}>종료</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
