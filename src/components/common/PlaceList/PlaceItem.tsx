import styled from '@emotion/styled';
import { Link, Text, Title } from '~/components/atom';
import BookmarkIcon from '../BookmarkIcon';
import LikeCount from '../LikeCount';
import { IPlaceItem } from '.';
import theme from '~/styles/theme';

export type PlaceGrid = 3 | 4;
interface PlaceItemProps {
  place: IPlaceItem;
  grid: PlaceGrid;
}

const PlaceItem = ({ place, grid }: PlaceItemProps) => {
  const { id, title, likeCount, usedCount, thumbnail } = place;
  const THUMBNAIL_URL = thumbnail ? thumbnail : '/assets/location/jeju.jpg';

  return (
    <PlaceContainer grid={grid}>
      <Link href={`/place/${id}`}>
        <ThumbnailWrapper grid={grid}>
          <Thumbnail
            className="placeImage"
            style={{ backgroundImage: `url(${THUMBNAIL_URL})` }}
          ></Thumbnail>
          <BookmarkIcon bookmarked={place.bookmarked} />
        </ThumbnailWrapper>

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
      </Link>
    </PlaceContainer>
  );
};

export default PlaceItem;

const { fontGray } = theme.color;
const PlaceContainer = styled.li<Pick<PlaceItemProps, 'grid'>>`
  width: ${({ grid }) => (grid === 3 ? '33.3%' : '25%')};
  padding: 0 10px 40px 10px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover .placeImage {
    transform: scale(1.05);
  }
  &:hover .placeImage {
    color: ${fontGray};
  }
`;

const ThumbnailWrapper = styled.div<Pick<PlaceItemProps, 'grid'>>`
  width: 100%;
  height: ${({ grid }) => (grid === 3 ? '215px' : '195px')};
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  position: relative;
  background-size: cover;
  border-radius: 8px;
  position: relative;
  background-size: cover;
  transition: transform 0.2s;
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
