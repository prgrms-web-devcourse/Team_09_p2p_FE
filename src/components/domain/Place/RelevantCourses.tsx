import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CourseItem from '~/components/common/CourseList/CourseItem';
import { ICourseItem } from '~/types/course';
import SliderContainer from '~/components/common/SliderContainer';

interface SliderProps {
  courses: ICourseItem[];
}
const RelevantCourses = ({ courses }: SliderProps) => {
  return (
    <SliderContainer>
      {courses.map((course) => (
        <CourseItem course={course} key={course.id} grid={1} />
      ))}
    </SliderContainer>
  );
};

export default RelevantCourses;
