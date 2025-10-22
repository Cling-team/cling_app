import { StyleSheet } from 'react-native';

export const rideStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#061730',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 24,
  },
  metricGrid: {
    gap: 18,
  },
  currentSpeedCard: {
    backgroundColor: '#0B1F44',
    borderRadius: 20,
    paddingVertical: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  metricLabel: {
    color: '#7D90B2',
  },
  currentSpeedValue: {
    fontFamily: 'SpaceGroteskBold',
    fontSize: 56,
    color: 'white',
    marginTop: 10,
  },
  metricUnit: {
    fontFamily: 'SpaceGroteskRegular',
    fontSize: 16,
    color: '#7D90B2',
    marginTop: 4,
  },
  secondaryRow: {
    flexDirection: 'row',
    gap: 16,
  },
  secondaryCard: {
    flex: 1,
    backgroundColor: '#0B1F44',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  secondaryValue: {
    fontFamily: 'SpaceGroteskBold',
    fontSize: 28,
    color: 'white',
    marginTop: 8,
  },
  timerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: 18,
    backgroundColor: '#0B1F44',
    paddingVertical: 14,
  },
  timerText: {
    fontFamily: 'SpaceGroteskBold',
    fontSize: 24,
    color: 'white',
  },
  map: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapOverlay: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 18,
    backgroundColor: '#061730',
  },
  controlButton: {
    flex: 1,
    height: 72,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseButton: {
    backgroundColor: '#0E52FF',
  },
  stopButton: {
    backgroundColor: '#E11D48',
  },
  controlLabel: {
    fontFamily: 'SpaceGroteskBold',
    fontSize: 16,
    color: 'white',
  },
});
