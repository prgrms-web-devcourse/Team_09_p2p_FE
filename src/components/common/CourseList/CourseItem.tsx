import styled from '@emotion/styled';
import React from 'react';
import { Text, Title } from '~/components/atom';
import Avatar from '~/components/atom/Avatar';
import theme from '~/styles/theme';
import BookmarkIcon from '../BookmarkIcon';
import LikeCount from '../LikeCount';

interface CourseItemProps {
  course?: CourseItem;
  grid?: number;
}

interface CourseItem {
  id: number;
  title: string;
  thumbnail: string;
  region: string;
  period: string;
  theme: string[];
  places: string[];
  likes: number;
  isBookmarked: boolean;
  nickname: string;
  profileUrl: string;
}

const courseItemData: CourseItem = {
  id: 1,
  title: '[1박 2일] 제주도 여행 추천~ 다들 추천하는 여행지입니다',
  thumbnail: '',
  region: '제주',
  period: '당일',
  theme: ['혼자여행', '데이트코스'],
  places: ['인천공항', '도렐제주본점', '서귀포 1번길', '기타'],
  likes: 12,
  isBookmarked: false,
  nickname: 'Jinist',
  profileUrl: ''
};

const CourseItem = ({ course = courseItemData, grid = 3 }: CourseItemProps) => {
  const { region, title, places, theme, likes, profileUrl } = course;
  const COURSE_COUNT = course.places.length;

  return (
    <ItemContainer grid={grid}>
      <Thumbnail>
        <BookmarkIcon />
        <Text size="xs">
          {region} · {COURSE_COUNT}코스
        </Text>
        <Title level={3} size={18} ellipsis>
          {title}
        </Title>
      </Thumbnail>
      <CourseInfo>
        <Text block ellipsis>
          {places.map((place, index) => (
            <>
              {place}
              {COURSE_COUNT - 1 !== index && ' → '}
            </>
          ))}
        </Text>
        <Text block style={{ marginTop: 4 }}>
          {theme.map((item) => `#${item} `)}
        </Text>
        <InfoFooter>
          <LikeCount count={likes} />
          <Profile>
            <Avatar src={profileUrl} size={26} />
            <Text color="gray">jinist</Text>
          </Profile>
        </InfoFooter>
      </CourseInfo>
    </ItemContainer>
  );
};

export default CourseItem;

const { borderGray, fontDarkGray } = theme.color;

const ItemContainer = styled.li<Pick<CourseItemProps, 'grid'>>`
  width: ${({ grid }) => (grid === 3 ? '33.3%' : '50%')};
  box-sizing: border-box;
  padding: 0 10px 46px 10px;
  overflow: hidden;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 210px;
  background-image: url('/assets/location/jeju.jpg');
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 14px;
  box-sizing: border-box;
  color: white;
  line-height: 1.5;
  position: relative;
  background-size: cover;
  border-radius: 8px 8px 0 0;
`;

const CourseInfo = styled.div`
  padding: 14px;
  border: 1px solid ${borderGray};
  font-size: 16px;
  line-height: 1.5;
  background-color: white;
  color: ${fontDarkGray};
  border-radius: 0 0 8px 8px;
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
