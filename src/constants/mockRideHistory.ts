export type RideHistoryEntry = {
  id: string;
  routeName: string;
  dateLabel: string;
  duration: string;
  distance: number;
  averageSpeed: number;
};

export const mockRideHistory: RideHistoryEntry[] = [
  {
    id: 'ride-001',
    routeName: '한강 순환 라이딩',
    dateLabel: '10월 18일 · 토요일 오전 8:30',
    duration: '01:24:12',
    distance: 32.5,
    averageSpeed: 23.1,
  },
  {
    id: 'ride-002',
    routeName: '북악 스카이웨이',
    dateLabel: '10월 15일 · 화요일 저녁 7:10',
    duration: '00:58:40',
    distance: 14.8,
    averageSpeed: 15.2,
  },
  {
    id: 'ride-003',
    routeName: '양수리 맛집 탐방',
    dateLabel: '10월 12일 · 토요일 오전 9:50',
    duration: '02:12:05',
    distance: 48.3,
    averageSpeed: 22.6,
  },
];
