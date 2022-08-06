import styled from '@emotion/styled';
import { ICourseItem } from '~/types/course';
import { courseListData } from '~/utils/dummydata';
import CourseItem from './CourseItem';

interface CourseListProps {
  courses?: ICourseItem[];
  grid?: number;
}

const CourseList = ({ courses = courseListData, grid = 3 }: CourseListProps) => {
  return (
    <StyledCourseList>
      {courses.map((course) => (
        <CourseItem course={course} grid={grid} key={course.id} />
      ))}
    </StyledCourseList>
  );
};

export default CourseList;

const StyledCourseList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: -10px;
`;
