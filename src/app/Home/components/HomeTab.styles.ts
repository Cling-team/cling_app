import { StyleSheet } from 'react-native';

export const homeTabStyles = StyleSheet.create({
  container: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    gap: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  graphPlaceholder: {
    height: 120,
    borderRadius: 16,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  mapActionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0E52FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0E52FF',
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  historySection: {
    gap: 16,
  },
  historyList: {
    gap: 12,
  },
  historyCard: {
    backgroundColor: 'white',
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },
  historyMeta: {
    gap: 4,
  },
  historyMetricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  historyMetric: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});
