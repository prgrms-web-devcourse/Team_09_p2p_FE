import styled from '@emotion/styled';
import Head from 'next/head';
import React from 'react';
import { Button, Link, PageContainer, Image } from '~/components/atom';
import { CourseItem, PlaceItem } from '~/components/common';
import Footer from '~/components/common/Footer';
import CategoryTitle from '~/components/domain/home/CategoryTitle';
import theme from '~/styles/theme';

const HomePage = () => {
  // TODO :
  /*
    1. 메인페이지 기능 구현
    2. footer 추가
    3. hover시 애니메이션
    4. 메인 상단에 이미지 넣기
  */

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
            <MainSearchInput type="text" placeholder="지역, 장소를 검색해보세요." />
            <Tags>
              <Button buttonType="tag">#힐링</Button>
              <Button buttonType="tag">#이쁜카페</Button>
              <Button buttonType="tag">#드라이브</Button>
              <Button buttonType="tag">#맛집</Button>
              <Button buttonType="tag">#가족여행</Button>
              <Button buttonType="tag">#혼자여행</Button>
            </Tags>
          </SearchArea>
        </PageContainer>
        <MainContent>
          <PageContainer>
            <CategoryArea>
              <Link href="/course">
                <CategoryTitle name="인기 여행코스" />
              </Link>
              <CourseList>
                {Array.from({ length: 6 }).map((_, index) => (
                  <CourseItem key={index} />
                ))}
              </CourseList>
            </CategoryArea>
            <CategoryArea>
              <Link href="/place">
                <CategoryTitle name="추천 핫플레이스" />
              </Link>
              <PlaceList>
                {Array.from({ length: 4 }).map((_, index) => (
                  <PlaceItem key={index} />
                ))}
              </PlaceList>
            </CategoryArea>
          </PageContainer>
        </MainContent>
        <Footer />
      </main>
    </React.Fragment>
  );
};

export default HomePage;

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

const CourseList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const PlaceList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
