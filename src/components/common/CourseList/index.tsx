import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { forwardRef, useState } from 'react';
import { ICourseItem } from '~/types/course';
import ConfirmModal from '../ConfirmModal';
import CourseItem from './CourseItem';

interface CourseListProps {
  courses: ICourseItem[];
  grid?: number;
}

const CourseList = forwardRef(({ courses, grid = 3 }: CourseListProps, ref) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const handleGoLogin = () => {
    setModalVisible(false);
    router.push('/login');
  };

  return (
    <>
      <StyledCourseList>
        {courses.map((course, index) => (
          <CourseItem
            course={course}
            grid={grid}
            key={course.id}
            ref={courses.length - 1 === index ? ref : null}
            index={index}
            onModal={setModalVisible}
          />
        ))}
      </StyledCourseList>
      <ConfirmModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleGoLogin}
        message="로그인이 필요한 서비스입니다."
        subMessage="로그인 페이지로 이동할까요?"
      />
    </>
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
