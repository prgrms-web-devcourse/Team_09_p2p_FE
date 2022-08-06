export interface ICourseItem {
  id: number;
  title: string;
  thumbnail: string;
  region: string;
  period: string;
  theme: string[];
  places: string[];
  likes: number;
  isBookmarked: boolean;
  nickname: string;
  profileUrl: string;
}
