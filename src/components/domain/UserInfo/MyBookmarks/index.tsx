import styled from '@emotion/styled';
import { CourseList, PlaceList } from '~/components/common';
import { ICourseItem } from '~/types/course';
import { IPlaceItem } from '~/types/place';
import Tab from '../Tab';
import type { UserInfoTab } from '../types';

interface MyBookmarksProps {
  courses: ICourseItem[] | null;
  places: IPlaceItem[] | null;
  onActive: (value: UserInfoTab) => void;
  active: string;
}

const MyBookmarks = ({ places, courses, onActive, active }: MyBookmarksProps) => {
  return (
    <Wrapper>
      <Tab onActive={onActive} active={active} type="radio">
        <Tab.item title="여행코스" value="course">
          {courses && <CourseList grid={2} courses={courses} />}
        </Tab.item>
        <Tab.item title="장소" value="place">
          {places && <PlaceList grid={3} places={places} />}
        </Tab.item>
      </Tab>
    </Wrapper>
  );
};

export default MyBookmarks;

const Wrapper = styled.div`
  margin-top: 28px;
`;
