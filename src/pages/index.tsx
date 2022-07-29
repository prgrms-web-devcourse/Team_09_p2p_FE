import styled from '@emotion/styled';
import Head from 'next/head';
import React from 'react';
import { Button, Icon, PageContainer, Title } from '~/components/atom';
import { CourseItem, PlaceItem } from '~/components/common';
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
              <CategoryTitle size="md" fontWeight={700}>
                인기 여행코스 <Icon name="arrow" size={25} />
              </CategoryTitle>
              <CourseList>
                {Array.from({ length: 6 }).map(() => (
                  <CourseItem />
                ))}
              </CourseList>
            </CategoryArea>
            <CategoryArea>
              <CategoryTitle size="md" fontWeight={700}>
                추천 핫플레이스 <Icon name="arrow" size={25} />
              </CategoryTitle>
              <PlaceList>
                {Array.from({ length: 4 }).map(() => (
                  <PlaceItem />
                ))}
              </PlaceList>
            </CategoryArea>
          </PageContainer>
        </MainContent>
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
  box-shadow: 0px 2px 4px 1px rgb(0 0 0 / 5%); // shadow 종류별로 파일 나눌 예정

  &::placeholder {
    color: ${mainColor};
  }
`;

const MainContent = styled.div`
  padding-top: 1px;
  background-color: ${backgroundLightGray};
  margin-top: 64px;
  padding-bottom: 80px;
`;

const Tags = styled.div`
  text-align: center;
  margin-top: 30px;

  button {
    margin-left: 10px;
  }
`;

const CategoryTitle = styled(Title)`
  margin-bottom: 30px;
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
