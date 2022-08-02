import styled from '@emotion/styled';
import CourseItem from './CourseItem';

/*
  TODO: Props로 courses 데이터 받아서 CourseItem에 전달하도록 구현
*/

const CourseList = () => {
  return (
    <StyledCourseList>
      {Array.from({ length: 6 }).map((_, index) => (
        <CourseItem key={index} />
      ))}
    </StyledCourseList>
  );
};

export default CourseList;

const StyledCourseList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 40px 20px;
`;
