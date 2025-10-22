import { StyleSheet } from 'react-native';

export const rideHistoryListStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    gap: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  rideList: {
    gap: 14,
  },
  listCard: {
    backgroundColor: 'white',
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  listMeta: {
    gap: 6,
  },
  listMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  metricPill: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F0F4FF',
  },
});

export const rideHistoryDetailStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#061730',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    gap: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  titleBlock: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: '#0B1F44',
    borderRadius: 24,
    padding: 24,
    gap: 18,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 18,
  },
  summaryMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricBox: {
    width: '48%',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#102752',
    gap: 6,
  },
  metricLabel: {
    color: '#8FA0C1',
  },
  metricValue: {
    color: 'white',
  },
  highlightSection: {
    gap: 16,
  },
  highlightCard: {
    backgroundColor: '#0E52FF',
    borderRadius: 22,
    padding: 20,
    gap: 12,
  },
  highlightRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  sectionCard: {
    backgroundColor: '#0B1F44',
    borderRadius: 22,
    padding: 20,
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailPill: {
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#102752',
  },
});
