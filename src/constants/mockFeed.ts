import type { ImageSourcePropType } from 'react-native';

export type FeedScope = 'all' | 'neighborhood' | 'friends';

export type FeedComment = {
  id: string;
  author: string;
  handle: string;
  avatar: ImageSourcePropType;
  message: string;
  timeAgo: string;
  likes: number;
};

export type FeedItem = {
  id: string;
  author: string;
  handle: string;
  avatar: ImageSourcePropType;
  scope: FeedScope[];
  location: string;
  timeAgo: string;
  message: string;
  rideLabel: string;
  likes: number;
  comments: FeedComment[];
};

const baseAvatar = require('../assets/images/react-logo.png');
const friendAvatar = require('../assets/images/icon.png');
const commenter1 = require('../assets/images/partial-react-logo.png');
const commenter2 = require('../assets/images/react-logo.png');
const commenter3 = require('../assets/images/splash-icon.png');

export const FEED_LOCATIONS = ['부평구 갈산1동', '인천광역시 부평구 갈산1동', '인천광역시 부평구 갈산2동'];

export const FEED_ITEMS: FeedItem[] = [
  {
    id: 'feed-1',
    author: '나는염북동',
    handle: '@cling_rider',
    avatar: baseAvatar,
    scope: ['all', 'neighborhood', 'friends'],
    location: '부평구 갈산1동',
    timeAgo: '오늘 오후 3:23',
    message: '요즘 날씨가 많이 덥네요. 자전거 탈때 물 조심하세요~🔥',
    rideLabel: '주행 기록',
    likes: 14,
    comments: [
      {
        id: 'comment-1',
        author: '자전거스타',
        handle: '@bike_star',
        avatar: commenter1,
        message: '오늘 진짜 엄청 덥긴 하네요ㅠ 물 많이 드시고 쉬면서 라이딩하세요~!',
        timeAgo: '1시간 전',
        likes: 1,
      },
      {
        id: 'comment-2',
        author: '당근오이호박',
        handle: '@veggie_rider',
        avatar: commenter2,
        message: '당근이 좋아요 오이가 좋아요?',
        timeAgo: '10분 전',
        likes: 0,
      },
      {
        id: 'comment-3',
        author: '오이Hater',
        handle: '@no_cucumber',
        avatar: commenter3,
        message: '전 오이 냄새가 싫어서 당근이 그나마 나은 거 같아요',
        timeAgo: '방금',
        likes: 7,
      },
    ],
  },
  {
    id: 'feed-2',
    author: '클링라이더',
    handle: '@cling',
    avatar: friendAvatar,
    scope: ['all', 'friends'],
    location: '인천광역시 부평구 갈산2동',
    timeAgo: '어제 오후 6:12',
    message: '퇴근하고 야간 라이딩 다녀왔어요. 야경이 너무 예뻐요 ✨',
    rideLabel: '주행 기록',
    likes: 8,
    comments: [
      {
        id: 'comment-4',
        author: '자전거동호회',
        handle: '@club',
        avatar: commenter1,
        message: '사진도 공유해주세요! 궁금하네요.',
        timeAgo: '2시간 전',
        likes: 2,
      },
    ],
  },
];

export const filterFeedItems = (scope: FeedScope, location: string) =>
  FEED_ITEMS.filter((item) => item.scope.includes(scope)).filter((item) =>
    scope === 'neighborhood' ? item.location === location : true
  );
