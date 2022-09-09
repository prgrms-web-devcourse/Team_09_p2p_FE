import styled from '@emotion/styled';
import { Link, Text, Title } from '~/components/atom';
import theme from '~/styles/theme';
import { ICourseItem } from '~/types/course';
import RelevantSlider from './RelevantSlider';

interface RelevantCoursesProps {
  placeId: number;
  courses: ICourseItem[];
}

const RelevantCourses = ({ placeId, courses }: RelevantCoursesProps) => {
  return (
    <Container>
      <RelevantHeader>
        <Title size="sm">이 장소가 포함된 코스</Title>
        <Link href={`/course/search/${placeId}`}>
          <Text color="gray">전체보기</Text>
        </Link>
      </RelevantHeader>
      <RelevantSlider courses={courses} />
    </Container>
  );
};

export default RelevantCourses;

const Container = styled.div`
  margin-top: 30px;
  padding: 50px 0;
  border-top: 1px solid ${theme.color.borderGray};
`;

const RelevantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
