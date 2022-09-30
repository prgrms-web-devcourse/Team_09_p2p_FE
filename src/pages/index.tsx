import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { FormEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { Button, Link, PageContainer, Image, Icon } from '~/components/atom';
import { CourseList, PlaceList, Toast } from '~/components/common';
import Layout from '~/components/common/Layout';
import ArrowTitle from '~/components/common/ArrowTitle';
import { CourseApi, PlaceApi } from '~/service';
import theme from '~/styles/theme';
import { TAGS_THEME } from '~/utils/constants';
import { IMAGE_URL } from '~/utils/constants/images';
import { IPlaceItem } from '~/types/place';
import { ICourseItem } from '~/types/course';
import { useUser } from '~/hooks/useUser';

const COURSE_COUNT = 6;
const PLACE_COUNT = 4;
const SORT = '인기순';

const getCoursesAndPlaces = async () => {
  const getCourses = CourseApi.getCourses({ size: COURSE_COUNT, sorting: SORT });
  const getPlaces = PlaceApi.getPlaces({ size: PLACE_COUNT, sorting: SORT });
  const [courses, places] = await Promise.allSettled([getCourses, getPlaces]);
  return {
    courses: courses.status === 'fulfilled' ? courses.value.content : null,
    places: places.status === 'fulfilled' ? places.value.content : null
  };
};

export const getServerSideProps = async () => {
  try {
    const { courses, places } = await getCoursesAndPlaces();

    return {
      props: {
        courses: courses,
        places: places
      }
    };
  } catch (e) {
    return {
      props: { places: null, courses: null }
    };
  }
};

interface Props {
  places?: IPlaceItem[];
  courses?: ICourseItem[];
}

const HomePage = ({ places, courses }: Props) => {
  const router = useRouter();
  const mainSearchInputRef = useRef<HTMLInputElement>(null);
  const [courseList, setCourseList] = useState(courses || []);
  const [placeList, setPlaceList] = useState(places || []);
  const { isLoggedIn } = useUser();

  const getCategoryData = async () => {
    const { courses, places } = await getCoursesAndPlaces();
    setCourseList(courses);
    setPlaceList(places);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (mainSearchInputRef.current) {
      const keyword = mainSearchInputRef.current.value.trim();
      if (keyword) {
        router.push(`/search?keyword=${keyword}`);
      }
    }
  };

  useEffect(() => {
    if (!courses || !places) {
      Toast.show('데이터 요청에 실패하였습니다.');
    }

    if (isLoggedIn) {
      getCategoryData();
    }
  }, [isLoggedIn]);

  return (
    <React.Fragment>
      <main>
        <PageContainer>
          <SearchArea>
            <Image
              width={550}
              src={`${IMAGE_URL}/assets/search-img.png`}
              alt="여행할 땐 이곳저곳"
              priority={true}
            />
            <MainSearchForm onSubmit={handleSearch}>
              <SearchIcon name="searchBlue" size={30} />
              <MainSearchInput
                type="name"
                name="main-search"
                placeholder="지역, 장소를 검색해보세요."
                ref={mainSearchInputRef}
              />
            </MainSearchForm>
            <Tags>
              {TAGS_THEME.map((tag) => (
                <Button
                  key={tag}
                  buttonType="tag"
                  onClick={() => router.push(`/search?themes=${tag}`)}
                >
                  #{tag}
                </Button>
              ))}
            </Tags>
          </SearchArea>
        </PageContainer>
        <MainContent>
          <PageContainer>
            <CategoryArea>
              <Link href="/course">
                <ArrowTitle name="인기 여행코스" />
              </Link>
              {courseList && <CourseList courses={courseList} />}
            </CategoryArea>
            <CategoryArea>
              <Link href="/place">
                <ArrowTitle name="추천 핫플레이스" />
              </Link>
              {placeList && <PlaceList places={placeList} />}
            </CategoryArea>
          </PageContainer>
        </MainContent>
      </main>
    </React.Fragment>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout footer>{page}</Layout>;
};

const { backgroundLightGray, mainColor } = theme.color;
const { basicShadow } = theme.shadow;

const SearchArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 90px;
`;

const MainSearchForm = styled.form`
  margin-top: 20px;
  box-shadow: ${basicShadow};
  border-radius: 8px;
  position: relative;
`;

const SearchIcon = styled(Icon)`
  position: absolute;
  top: 26px;
  left: 22px;
`;

const MainSearchInput = styled.input`
  width: 640px;
  height: 80px;

  padding: 20px 24px 20px 66px;
  font-size: 24px;
  color: black;
  border: 1px solid ${mainColor};
  border-radius: 8px;
  background-color: #f1f7ff;
  box-sizing: border-box;
  transition: box-shadow 0.1s;

  &::placeholder {
    color: ${mainColor};
  }

  &:focus {
    outline: 0;
    box-shadow: 0px 0px 0px 1px ${mainColor};
  }
`;

const MainContent = styled.div`
  padding-top: 1px;
  background-color: ${backgroundLightGray};
  margin-top: 80px;
  padding-bottom: 80px;
`;

const Tags = styled.div`
  text-align: center;
  margin-top: 30px;

  button:not(:first-of-type) {
    margin-left: 10px;
  }
`;

const CategoryArea = styled.div`
  margin-top: 80px;
`;
