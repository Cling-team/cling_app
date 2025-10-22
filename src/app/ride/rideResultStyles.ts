import { StyleSheet } from 'react-native';

export const rideResultStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#061730',
  },
  content: {
    paddingHorizontal: 24,
    gap: 28,
  },
  header: {
    marginTop: 12,
    gap: 8,
  },
  title: {
    fontFamily: 'SpaceGroteskBold',
    fontSize: 32,
    color: 'white',
  },
  subtitle: {
    fontFamily: 'SpaceGroteskRegular',
    fontSize: 16,
    color: '#A5B2CC',
  },
  summaryCard: {
    backgroundColor: '#0B1F44',
    borderRadius: 24,
    padding: 24,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metricItem: {
    flex: 1,
    backgroundColor: '#102752',
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 8,
  },
  metricIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(14, 82, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricLabel: {
    fontFamily: 'SpaceGroteskRegular',
    fontSize: 14,
    color: '#8FA0C1',
  },
  metricValue: {
    fontFamily: 'SpaceGroteskBold',
    fontSize: 20,
    color: 'white',
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    borderRadius: 24,
    backgroundColor: '#0B1F44',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  suggestionTitle: {
    fontFamily: 'SpaceGroteskBold',
    fontSize: 18,
    color: 'white',
  },
  suggestionBody: {
    fontFamily: 'SpaceGroteskRegular',
    fontSize: 14,
    color: '#A5B2CC',
    marginTop: 4,
  },
  chevronButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0E52FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    gap: 12,
  },
  primaryButton: {
    borderRadius: 18,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryLabel: {
    fontFamily: 'SpaceGroteskBold',
    fontSize: 17,
    color: 'white',
  },
});
