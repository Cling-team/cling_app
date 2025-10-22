import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useRef } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

type BottomDrawerProps = {
  visible: boolean;
  onClose: () => void;
  height?: number; // px height, default 60% of screen
  children: React.ReactNode;
};

export default function BottomDrawer({ visible, onClose, height, children }: BottomDrawerProps) {
  const modalRef = useRef<BottomSheetModal>(null);
  const screenH = Dimensions.get('window').height;
  const drawerH = height ?? Math.round(screenH * 0.6);
  const snapPoints = useMemo(() => {
    const pct = Math.min(100, Math.max(10, Math.round((drawerH / screenH) * 100)));
    return [`${pct}%`];
  }, [drawerH, screenH]);

  useEffect(() => {
    if (visible) {
      modalRef.current?.present();
    } else {
      modalRef.current?.dismiss();
    }
  }, [visible]);

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.35} />
  );

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onDismiss={onClose}
      enablePanDownToClose
      handleIndicatorStyle={styles.handle}
      keyboardBehavior="interactive"
    >
      <BottomSheetView style={styles.content}>{children}</BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  handle: { backgroundColor: '#E0E0E0' },
  content: { paddingHorizontal: 16, paddingBottom: 16 },
});
