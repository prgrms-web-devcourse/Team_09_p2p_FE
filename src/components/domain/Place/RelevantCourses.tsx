import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CourseItem from '~/components/common/CourseList/CourseItem';
import { ICourseItem } from '~/types/course';
import SliderContainer from '~/components/common/SliderContainer';
import { useState } from 'react';
import ConfirmModal from '~/components/common/ConfirmModal';
import { useRouter } from 'next/router';

interface SliderProps {
  courses: ICourseItem[];
}
const RelevantCourses = ({ courses }: SliderProps) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const handleGoLogin = () => {
    setModalVisible(false);
    router.push('/login');
  };

  return (
    <>
      <SliderContainer>
        {courses.map((course) => (
          <CourseItem course={course} key={course.id} grid={1} onModal={setModalVisible} />
        ))}
      </SliderContainer>
      <ConfirmModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleGoLogin}
        message="로그인이 필요한 서비스입니다."
        subMessage="로그인 페이지로 이동할까요?"
      />
    </>
  );
};

export default RelevantCourses;
