import styled from '@emotion/styled';
import CourseItem from './CourseItem';

/*
  TODO: Props로 courses 데이터 받아서 CourseItem에 전달하도록 구현
*/

interface CourseList {
  grid?: number;
}

const CourseList = ({ grid = 3 }) => {
  return (
    <StyledCourseList>
      {Array.from({ length: 6 }).map((_, index) => (
        <CourseItem grid={grid} key={index} />
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
