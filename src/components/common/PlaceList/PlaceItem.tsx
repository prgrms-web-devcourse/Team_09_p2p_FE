import styled from '@emotion/styled';
import { Text, Title } from '~/components/atom';
import BookmarkIcon from '../BookmarkIcon';
import LikeCount from '../LikeCount';
import { IPlaceItem } from '.';
import { url } from 'inspector';

interface PlaceItemProps {
  place: IPlaceItem;
}

const PlaceItem = ({ place }: PlaceItemProps) => {
  const { title, likeCount, usedCount, thumbnail } = place;
  const THUMBNAIL_URL = thumbnail ? thumbnail : '/assets/location/jeju.jpg';
  console.log(THUMBNAIL_URL);

  return (
    <PlaceContainer>
      <Thumbnail style={{ backgroundImage: `url(${THUMBNAIL_URL})` }}>
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

const PlaceContainer = styled.li`
  width: 274px;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 195px;
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
