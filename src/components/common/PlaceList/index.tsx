import styled from '@emotion/styled';
import { placeListData } from '~/utils/dummydata';
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

interface PlaceListProps {
  places?: IPlaceItem[];
}

const PlaceList = ({ places = placeListData }: PlaceListProps) => {
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
