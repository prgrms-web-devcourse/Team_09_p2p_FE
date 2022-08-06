import styled from '@emotion/styled';
import React from 'react';
import { Link, Text, Title } from '~/components/atom';
import Avatar from '~/components/atom/Avatar';
import theme from '~/styles/theme';
import { ICourseItem } from '~/types/course';
import BookmarkIcon from '../BookmarkIcon';
import LikeCount from '../LikeCount';

interface CourseItemProps {
  course: ICourseItem;
  grid?: number;
}

const CourseItem = ({ course, grid = 3 }: CourseItemProps) => {
  const { id, thumbnail, region, title, places, themes, likes, profileUrl, nickname } = course;
  const COURSE_COUNT = course?.places.length;

  const THUMBNAIL_URL = thumbnail ? thumbnail : '/assets/location/jeju.jpg';
  return (
    <ItemContainer grid={grid}>
      <Link href={`/course/${id}`}>
        <ThumbnailWrapper>
          <ThumbnailBackground></ThumbnailBackground>
          <Thumbnail className="courseImage" style={{ backgroundImage: `url(${THUMBNAIL_URL})` }} />
          <BookmarkIcon />
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
          <Text block ellipsis>
            {places.map((place, index) => (
              <React.Fragment key={place}>
                {place}
                {COURSE_COUNT - 1 !== index && ' → '}
              </React.Fragment>
            ))}
          </Text>
          <Text block style={{ marginTop: 4 }}>
            {themes.map((item) => (
              <React.Fragment key={item}>#{item} </React.Fragment>
            ))}
          </Text>
          <InfoFooter>
            <LikeCount count={likes} />
            <Profile>
              <Avatar src={profileUrl} size={26} />
              <Text color="gray">{nickname}</Text>
            </Profile>
          </InfoFooter>
        </CourseInfo>
      </Link>
    </ItemContainer>
  );
};

export default CourseItem;

const { borderGray, fontDarkGray, fontGray } = theme.color;

const ItemContainer = styled.li<Pick<CourseItemProps, 'grid'>>`
  width: ${({ grid }) => (grid === 3 ? '33.3%' : '50%')};
  box-sizing: border-box;
  padding: 0 10px 46px 10px;
  overflow: hidden;
  cursor: pointer;

  &:hover .courseImage {
    transform: scale(1.05);
  }
  &:hover .courseInfo {
    color: ${fontGray};
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
