import styled from '@emotion/styled';
import { Link, Text, Title } from '~/components/atom';
import BookmarkIcon from '../BookmarkIcon';
import LikeCount from '../LikeCount';
import { IPlaceItem } from '.';
import theme from '~/styles/theme';
import { BookmarkApi } from '~/service';
import { useUser } from '~/hooks/useUser';
import { useRouter } from 'next/router';
import { forwardRef, LegacyRef, MouseEvent, useState } from 'react';

export type PlaceGrid = 3 | 4;
interface PlaceItemProps {
  place: IPlaceItem;
  grid: PlaceGrid;
}

const PlaceItem = forwardRef(({ place, grid }: PlaceItemProps, ref) => {
  const { id, title, likeCount, usedCount, thumbnail, bookmarked } = place;
  const THUMBNAIL_URL = thumbnail ? thumbnail : '/assets/images/image-not-found.png';
  const { isLoggedIn } = useUser();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  const handleClickBookmark = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    const result = await BookmarkApi.bookmarkPlace(Number(id));
    setIsBookmarked(result.isBookmarked);
  };

  return (
    <PlaceContainer grid={grid} ref={ref as LegacyRef<HTMLLIElement>}>
      <Link href={`/place/${id}`}>
        <ThumbnailWrapper grid={grid}>
          <Thumbnail
            className="placeImage"
            style={{ backgroundImage: `url(${THUMBNAIL_URL})` }}
          ></Thumbnail>
          <BookmarkIcon bookmarked={isBookmarked} onClick={handleClickBookmark} />
        </ThumbnailWrapper>

        <PlaceInfo className="placeInfo">
          <InfoHead>
            <Title size={16} ellipsis>
              {title}
            </Title>
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
});

PlaceItem.displayName = 'PlaceItem';

export default PlaceItem;

const { fontGray, backgroundGray } = theme.color;
const PlaceContainer = styled.li<Pick<PlaceItemProps, 'grid'>>`
  width: ${({ grid }) => (grid === 3 ? '33.3%' : '25%')};
  padding: 0 10px 40px 10px;
  box-sizing: border-box;

  &:hover .placeImage {
    transform: scale(1.05);
  }
  &:hover .placeInfo {
    color: ${fontGray};
  }
  a {
    cursor: pointer;
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
  background-position: center;
  background-color: ${backgroundGray};
  border-radius: 8px;
  position: relative;
  background-size: cover;
  transition: transform 0.2s;
`;

const PlaceInfo = styled.div`
  padding: 12px 8px;
  transition: color 0.2s;
`;

const InfoHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Description = styled.div`
  margin-top: 8px;
`;
