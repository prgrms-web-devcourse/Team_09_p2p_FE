import styled from '@emotion/styled';
import { Text, Title } from '~/components/atom';
import BookmarkIcon from '../BookmarkIcon';
import LikeCount from '../LikeCount';
import { IPlaceItem } from '.';

interface PlaceItemProps {
  place: IPlaceItem;
  grid: 3 | 4;
}

const PlaceItem = ({ place, grid }: PlaceItemProps) => {
  const { title, likeCount, usedCount, thumbnail } = place;
  const THUMBNAIL_URL = thumbnail ? thumbnail : '/assets/location/jeju.jpg';

  return (
    <PlaceContainer grid={grid}>
      <Thumbnail grid={grid} style={{ backgroundImage: `url(${THUMBNAIL_URL})` }}>
        <BookmarkIcon />
      </Thumbnail>
      <PlaceInfo>
        <InfoHead>
          <Title size={16}>{title}</Title>
          <LikeCount count={likeCount} />
        </InfoHead>
        <Description>
          <Text color="gray" size={15} ellipsis>
            {usedCount}개의 여행코스에 포함된 장소입니다.
          </Text>
        </Description>
      </PlaceInfo>
    </PlaceContainer>
  );
};

export default PlaceItem;

const PlaceContainer = styled.li<Pick<PlaceItemProps, 'grid'>>`
  width: ${({ grid }) => (grid === 3 ? '33.3%' : '25%')};
  padding: 0 10px 40px 10px;
  box-sizing: border-box;
`;

const Thumbnail = styled.div<Pick<PlaceItemProps, 'grid'>>`
  width: 100%;
  height: ${({ grid }) => (grid === 3 ? '215px' : '195px')};
  box-sizing: border-box;
  position: relative;
  background-size: cover;
  border-radius: 8px;
  position: relative;
`;

const PlaceInfo = styled.div`
  padding: 12px 8px;
`;

const InfoHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Description = styled.div`
  margin-top: 8px;
`;
