import styled from '@emotion/styled';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Button, PageContainer, Text } from '~/components/atom';
import NextLink from '~/components/atom/NextLink';
import Title from '~/components/atom/Title';
import theme from '~/styles/theme';

const HomePage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PageContainer>
          <div>
            <input />
            <Tags>
              <Button buttonType="tag">#힐링</Button>
              <Button buttonType="tag">#이쁜카페</Button>
              <Button buttonType="tag">#드라이브</Button>
              <Button buttonType="tag">#맛집</Button>
              <Button buttonType="tag">#가족여행</Button>
              <Button buttonType="tag">#혼자여행</Button>
            </Tags>
          </div>
        </PageContainer>
        <MainContent>
          <PageContainer>
            <Title size="md" fontWeight={700} style={{ marginBottom: 30 }}>
              인기 여행코스
            </Title>
            <ul>
              <CourseItem>
                <Thumbnail>
                  <Text size="xs">제주 5코스</Text>
                  <Title level={3} size={18} ellipsis>
                    [1박 2일] 제주도 여행 추천! 힐링하고 싶은 사람 모두 모여라!
                  </Title>
                </Thumbnail>
                <CourseInfo>
                  <Text block ellipsis>
                    인천공항→ 도렐제주본점 → 서귀포 1번길 → 기타등등의 여행지
                  </Text>
                  <Text block>#혼자여행 #맛집 #카페</Text>
                  <InfoFooter>
                    <div>
                      <img src="/assets/icons/heart.svg" width={20} height={20} />
                      <Text color="gray">12</Text>
                    </div>
                    <Text color="gray">jinist</Text>
                  </InfoFooter>
                </CourseInfo>
              </CourseItem>
            </ul>
          </PageContainer>
        </MainContent>
      </main>
    </React.Fragment>
  );
};

export default HomePage;

const { borderGray, backgroundLightGray, fontDarkGray } = theme.color;

const MainContent = styled.div`
  padding-top: 80px;
  background-color: ${backgroundLightGray};
  margin-top: 64px;
`;
const Tags = styled.div`
  text-align: center;

  button {
    margin-left: 10px;
  }
`;
const CategoryTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 30px;
`;

const CourseItem = styled.li`
  width: 372px;
  border-radius: 8px;
  overflow: hidden;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 210px;
  background-image: url('/assets/location/jeju.jpg');
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 14px;
  box-sizing: border-box;
  color: white;
  line-height: 1.5;
`;

const CourseTitle = styled.h3`
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CourseInfo = styled.div`
  padding: 14px;
  border: 1px solid ${borderGray};
  font-size: 16px;
  line-height: 1.5;
  background-color: white;
  color: ${fontDarkGray};
`;

const InfoFooter = styled.div`
  display: flex;
  margin-top: 16px;
  justify-content: space-between;
`;
