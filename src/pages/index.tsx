import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FormEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { Button, Link, PageContainer, Image } from '~/components/atom';
import { CourseList, PlaceList } from '~/components/common';
import Layout from '~/components/common/Layout';
import MainCategoryTitle from '~/components/domain/home/MainCategoryTitle';
import { CourseApi, PlaceApi } from '~/service';
import theme from '~/styles/theme';
import { Theme } from '~/types';
import { TAGS_THEME } from '~/utils/constants';

const HomePage = () => {
  const router = useRouter();
  const mainSearchInputRef = useRef<HTMLInputElement>(null);
  const [courseList, setCourseList] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const COURSE_COUNT = 6;
  const PLACE_COUNT = 4;

  const getCourseList = async () => {
    const filter = { size: COURSE_COUNT };
    const result = await CourseApi.getCourses(filter);
    console.log('[Courses] :', result.content);
    setCourseList(result.content);
  };

  const getPlaceList = async () => {
    const result = await PlaceApi.getPlaces({ size: PLACE_COUNT });
    setPlaceList(result.content);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (mainSearchInputRef.current) {
      const keyword = mainSearchInputRef.current.value;
      if (keyword) {
        router.push(`/search?keyword=${keyword}`);
      }
    }
  };

  useEffect(() => {
    getCourseList();
    getPlaceList();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PageContainer>
          <SearchArea>
            <Image width={550} src="/assets/search-img.png" alt="여행할 땐 이곳저곳" />
            <form onSubmit={handleSearch}>
              <MainSearchInput
                type="text"
                placeholder="지역, 장소를 검색해보세요."
                ref={mainSearchInputRef}
              />
            </form>
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
                <MainCategoryTitle name="인기 여행코스" />
              </Link>
              <CourseList courses={courseList} />
            </CategoryArea>
            <CategoryArea>
              <Link href="/place">
                <MainCategoryTitle name="추천 핫플레이스" />
              </Link>
              <PlaceList places={placeList} />
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

const SearchArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 90px;
`;
const MainSearchInput = styled.input`
  width: 690px;
  height: 80px;
  margin-top: 20px;
  padding: 24px;
  font-size: 24px;
  color: ${mainColor};
  border: 1px solid ${mainColor};
  border-radius: 8px;
  background-color: #f1f7ff;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px 1px rgb(0 0 0 / 5%); // TODO :shadow 종류별로 파일 나누기

  &::placeholder {
    color: ${mainColor};
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
