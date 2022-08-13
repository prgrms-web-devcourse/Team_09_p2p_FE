import styled from '@emotion/styled';
import { forwardRef } from 'react';
import { ICourseItem } from '~/types/course';
import CourseItem from './CourseItem';

interface CourseListProps {
  courses: ICourseItem[];
  grid?: number;
}

const CourseList = forwardRef(({ courses, grid = 3 }: CourseListProps, ref) => {
  return (
    <StyledCourseList>
      {courses.map((course, index) => (
        <CourseItem
          course={course}
          grid={grid}
          key={course.id}
          ref={courses.length - 1 === index ? ref : null}
          index={index}
        />
      ))}
    </StyledCourseList>
  );
});

CourseList.displayName = 'CourseList';
export default CourseList;

const StyledCourseList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: -10px;
`;
