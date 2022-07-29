import styled from '@emotion/styled';
import { Text, Title } from '~/components/atom';
import BookmarkIcon from '../BookmarkIcon';
import LikeCount from '../LikeCount';

const PlaceItem = () => {
  return (
    <PlaceContainer>
      <Thumbnail>
        <BookmarkIcon />
      </Thumbnail>
      <PlaceInfo>
        <InfoHead>
          <Title size={16}>도렐 제주본점</Title>
          <LikeCount count={15} />
        </InfoHead>
        <Discription>
          <Text color="gray" size={15} ellipsis>
            12개의 여행코스에 포함된 장소입니다.
          </Text>
        </Discription>
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
  background-image: url('/assets/location/jeju.jpg');
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
const Discription = styled.div`
  margin-top: 8px;
`;
