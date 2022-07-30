import styled from '@emotion/styled';
import PlaceItem from '../PlaceItem';

const PlaceList = () => {
  return (
    <StyledPlaceList>
      {Array.from({ length: 4 }).map((_, index) => (
        <PlaceItem key={index} />
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
