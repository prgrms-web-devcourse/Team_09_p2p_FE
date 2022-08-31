import styled from '@emotion/styled';
import { forwardRef } from 'react';
import PlaceItem, { PlaceGrid } from './PlaceItem';

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
  places: IPlaceItem[];
  grid?: PlaceGrid;
}

const PlaceList = forwardRef(({ grid = 4, places }: PlaceListProps, ref) => {
  return (
    <StyledPlaceList>
      {places.map((place, index) => (
        <PlaceItem
          key={place.id}
          grid={grid}
          place={place}
          ref={places.length - 1 === index ? ref : null}
        />
      ))}
    </StyledPlaceList>
  );
});

PlaceList.displayName = 'PlaceList';

export default PlaceList;

const StyledPlaceList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
`;
