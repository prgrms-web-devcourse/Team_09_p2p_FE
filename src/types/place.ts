export interface IPlaceItem {
  id: number;
  title: string;
  likeCount: number;
  usedCount: number;
  category: string;
  thumbnail: string;
  bookmarked: boolean;
}

export interface IPlace {
  id: number;
  name: string;
  description: string;
  address: string;
  latitude: string;
  longitude: string;
  phoneNumber: string;
  imageUrl: string;
  isRecommended: boolean;
  isThumbnail: boolean;
}
