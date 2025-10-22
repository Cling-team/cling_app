import { StyleSheet } from 'react-native';

export const weeklySummaryStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    gap: 24,
  },
  header: {
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
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  titleBlock: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    gap: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 14,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryCell: {
    width: '48%',
    backgroundColor: '#F0F4FF',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 6,
  },
  summaryLabel: {
    color: '#4B5C7A',
  },
  summaryValue: {
    color: '#0B1F44',
  },
  trendSection: {
    gap: 16,
  },
  trendList: {
    gap: 12,
  },
  trendRow: {
    backgroundColor: 'white',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  trendMeta: {
    gap: 6,
  },
  highlightCard: {
    backgroundColor: '#0E52FF',
    borderRadius: 24,
    padding: 24,
    gap: 16,
    shadowColor: '#0E52FF',
    shadowOpacity: 0.35,
    shadowRadius: 18,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  highlightBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
});
