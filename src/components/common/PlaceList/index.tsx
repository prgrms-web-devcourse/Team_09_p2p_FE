import styled from '@emotion/styled';
import PlaceItem from './PlaceItem';

export interface IPlaceItem {
  id: number;
  title: string;
  likeCount: number;
  usedCount: number;
  category: string;
  thumbnail: string;
  bookmarked: boolean;
}

const placesData = [
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

interface PlaceListProps {
  places?: IPlaceItem[];
}

const PlaceList = ({ places = placesData }: PlaceListProps) => {
  return (
    <StyledPlaceList>
      {places.map((place, index) => (
        <PlaceItem key={index} place={place} />
      ))}
    </StyledPlaceList>
  );
};

export default PlaceList;

const StyledPlaceList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px 20px;
`;
