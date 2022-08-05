export interface ICourseItem {
  id: number;
  title: string;
  thumbnail: string;
  region: string;
  period: string;
  themes: string[];
  places: string[];
  likes: number;
  isBookmarked: boolean;
  nickname: string;
  profileUrl: string;
}
