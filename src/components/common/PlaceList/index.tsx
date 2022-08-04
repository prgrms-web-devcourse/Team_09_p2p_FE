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
  grid?: 3 | 4;
}

const PlaceList = ({ grid = 3, places = placeListData }: PlaceListProps) => {
  return (
    <StyledPlaceList>
      {places.map((place, index) => (
        <PlaceItem key={index} grid={grid} place={place} />
      ))}
    </StyledPlaceList>
  );
};

export default PlaceList;

const StyledPlaceList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
`;
