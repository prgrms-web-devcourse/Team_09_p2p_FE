import { ICourseItem } from '~/types/course';

export const courseListData: ICourseItem[] = [
  {
    id: 1,
    title: '[1박 2일] 제주도 여행 추천~ 다들 추천하는 여행지입니다',
    thumbnail: '/assets/location/course1.jpg',
    region: '제주',
    period: '1박 2일',
    themes: ['혼자여행', '데이트코스'],
    places: ['인천공항', '도렐제주본점', '서귀포 1번길', '기타'],
    likes: 12,
    isBookmarked: false,
    nickname: 'Jinist',
    profileUrl: ''
  },
  {
    id: 2,
    title: '[3박 4일] 경주여행 다녀왔어요~ 힐링하기 좋은 곳 추천!',
    thumbnail: '/assets/location/course2.jpg',
    region: '경북',
    period: '4~7일',
    themes: ['혼자여행', '드라이브', '힐링'],
    places: ['황리단길', '첨성대', '대릉원', '경주월드'],
    likes: 8,
    isBookmarked: false,
    nickname: 'Jinist',
    profileUrl: ''
  },
  {
    id: 3,
    title: '[2박 3일] 부산 여행코스! 여름엔 부산으로 떠나요!',
    thumbnail: '/assets/location/course3.PNG',
    region: '부산',
    period: '1~3일',
    themes: ['맛집', '데이트코스', '드라이브', '힐링'],
    places: ['광안리 해수욕장', '청사포 전망대', '흰여울 문화마을', '김천 문화마을'],
    likes: 23,
    isBookmarked: true,
    nickname: 'Grew',
    profileUrl: ''
  },
  {
    id: 4,
    title: '춘천 1박 2일 여행',
    thumbnail: '/assets/location/course5.jpg',
    region: '강원',
    period: '1~3일',
    themes: ['맛집', '힐링'],
    places: ['강촌 레일바이크', '제이드가든 수목원', '구곡폭포', '삼악산'],
    likes: 2,
    isBookmarked: false,
    nickname: 'Joe',
    profileUrl: ''
  },
  {
    id: 5,
    title: '[4박 5일] 강릉 여행',
    thumbnail: '/assets/location/course6.PNG',
    region: '강원',
    period: '4~5일',
    themes: ['드라이브', '힐링', '맛집'],
    places: ['강릉역', '동화가든', '강문해수욕장', '경포호', '택지골수제생갈비', '맘스카롱'],
    likes: 27,
    isBookmarked: true,
    nickname: 'Grew',
    profileUrl: ''
  },
  {
    id: 6,
    title: '[1박 2일] 춘천 여행 떠나요',
    thumbnail: '',
    region: '강원',
    period: '1~3일',
    themes: ['데이트코스', '이쁜카페'],
    places: ['호반공원', '애니메이션 박물관', '볼트', '레고랜드'],
    likes: 18,
    isBookmarked: false,
    nickname: 'Joe',
    profileUrl: ''
  }
];

export const placeListData = [
  {
    id: 1,
    title: '도렐 제주본점',
    likeCount: 2,
    usedCount: 1,
    category: '',
    thumbnail: '/assets/location/place1.jpg',
    bookmarked: false
  },
  {
    id: 2,
    title: '레고랜드',
    likeCount: 2,
    usedCount: 1,
    category: '',
    thumbnail: '/assets/location/course6.PNG',
    bookmarked: false
  },
  {
    id: 3,
    title: '대릉원',
    likeCount: 2,
    usedCount: 1,
    category: '',
    thumbnail: '/assets/location/course2.jpg',
    bookmarked: false
  },
  {
    id: 4,
    title: '광안리해수욕장',
    likeCount: 2,
    usedCount: 1,
    category: '',
    thumbnail: '/assets/location/course5.jpg',
    bookmarked: false
  }
];
