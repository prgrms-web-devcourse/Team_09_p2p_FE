import styled from '@emotion/styled';
import React, {
  Dispatch,
  forwardRef,
  LegacyRef,
  MouseEvent,
  SetStateAction,
  useState
} from 'react';
import { Link, Text, Title } from '~/components/atom';
import Avatar from '~/components/atom/Avatar';
import { useUser } from '~/hooks/useUser';
import { BookmarkApi } from '~/service';
import theme from '~/styles/theme';
import { ICourseItem } from '~/types/course';
import BookmarkIcon from '../BookmarkIcon';
import LikeCount from '../LikeCount';

interface CourseItemProps {
  course: ICourseItem;
  grid?: number;
  index?: number;
  onModal: Dispatch<SetStateAction<boolean>>;
}

const CourseItem = forwardRef(({ course, grid = 3, index, onModal }: CourseItemProps, ref) => {
  const {
    id,
    thumbnail,
    region,
    title,
    places,
    themes,
    likes,
    profileImage,
    nickname,
    isBookmarked: bookmarked
  } = course;

  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const { isLoggedIn } = useUser();

  const COURSE_COUNT = course.places.length;
  const THUMBNAIL_URL = thumbnail ? thumbnail : '';

  const handleClickBookmark = async (e: MouseEvent<HTMLButtonElement>) => {
    console.log('클릭 북마크');
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      onModal(true);
      return;
    }
    const result = await BookmarkApi.bookmarkCourse(Number(id));
    setIsBookmarked(result.isBookmarked);
  };

  return (
    <ItemContainer grid={grid} ref={ref as LegacyRef<HTMLLIElement>}>
      <Link href={`/course/${id}`}>
        <ThumbnailWrapper>
          <ThumbnailBackground></ThumbnailBackground>
          <Thumbnail className="courseImage" style={{ backgroundImage: `url(${THUMBNAIL_URL})` }} />
          <BookmarkIcon bookmarked={isBookmarked} onClick={handleClickBookmark} />
          <ThumbnailInfo>
            <Text size="xs">
              {region} · {COURSE_COUNT}코스
            </Text>
            <Title level={3} size={18} ellipsis>
              {title}
            </Title>
          </ThumbnailInfo>
        </ThumbnailWrapper>
        <CourseInfo className="courseInfo">
          <Text size={17} block ellipsis fontWeight={500}>
            {places.map((place, index) => (
              <React.Fragment key={index}>
                {place}
                {COURSE_COUNT - 1 !== index && ' → '}
              </React.Fragment>
            ))}
          </Text>
          <Text block style={{ marginTop: 4 }} ellipsis>
            {themes.map((item) => (
              <React.Fragment key={item}>#{item} </React.Fragment>
            ))}
          </Text>
          <InfoFooter>
            <LikeCount count={likes} />
            <Profile>
              <Avatar src={profileImage} size={26} />
              <Text color="gray">{nickname}</Text>
            </Profile>
          </InfoFooter>
        </CourseInfo>
      </Link>
    </ItemContainer>
  );
});

CourseItem.displayName = 'CourseItem';

export default CourseItem;

const { borderGray, fontDarkGray, fontGray } = theme.color;

const getGrid = (grid: number) => {
  switch (grid) {
    case 1:
      return '100%';
    case 2:
      return '50%';
    case 3:
      return '33.3%';
    case 4:
      return '25%';
    default:
      return '33.3%';
  }
};

const ItemContainer = styled.li<{ grid: number }>`
  width: ${({ grid }) => getGrid(grid)};
  box-sizing: border-box;
  padding: 0 10px 46px 10px;
  overflow: hidden;

  &:hover .courseImage {
    transform: scale(1.05);
  }
  &:hover .courseInfo {
    color: ${fontGray};
  }
  a {
    cursor: pointer;
  }
`;

const ThumbnailWrapper = styled.div`
  width: 100%;
  height: 210px;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  position: relative;
  color: white;
`;

const ThumbnailBackground = styled.div`
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 60%);
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
`;

const ThumbnailInfo = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 14px;
  box-sizing: border-box;
  line-height: 1.5;
  z-index: 11;
`;

const Thumbnail = styled.div`
  height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  background-size: cover;
  transition: transform 0.2s;
`;

const CourseInfo = styled.div`
  padding: 14px;
  border: 1px solid ${borderGray};
  font-size: 16px;
  line-height: 1.5;
  background-color: white;
  color: ${fontDarkGray};
  border-radius: 0 0 8px 8px;
  transition: color 0.2s;
`;

const InfoFooter = styled.div`
  display: flex;
  margin-top: 16px;
  justify-content: space-between;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 5px;
  }
`;
