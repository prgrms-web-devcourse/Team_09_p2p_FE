import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, PageContainer, Text, Title } from '~/components/atom';
import { useUser } from '~/hooks/useUser';
import { UserApi } from '~/service';
import theme from '~/styles/theme';
import { isNumber } from '~/utils/converter';

const UserinfoEdit: NextPage = () => {
  const { currentUser } = useUser();
  const router = useRouter();
  const userId = Number(router.query.id);
  const [email, setEmail] = useState('');

  const getUserData = async () => {
    const userInfo = await UserApi.getUser();
    setEmail(userInfo.email);
  };

  useEffect(() => {
    if (isNumber(userId)) {
      if (currentUser.isLoading) return;

      if (currentUser.user.id !== userId) {
        alert('잘못된 요청입니다.');
        router.push('/');
      }

      getUserData();
    }
  }, [currentUser]);

  if (currentUser.user.id !== userId) {
    return null;
  }

  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PageContainer>
          <Container>
            <Title>내 정보 수정</Title>
            <Form>
              <FormItem>
                <FormTitle>
                  <Text>이메일</Text>
                </FormTitle>
                <FormGroup>{email}</FormGroup>
              </FormItem>
              <FormItem>
                <FormTitle>
                  <Text>닉네임</Text>
                </FormTitle>
                <FormGroup>
                  <input type="text" name="nickname" />
                </FormGroup>
              </FormItem>
              <FormItem>
                <FormTitle>
                  <Text>성별</Text>
                </FormTitle>
                <FormGroup>
                  <input type="text" name="sex" />
                </FormGroup>
              </FormItem>
              <FormItem>
                <FormTitle>
                  <Text>생년월일</Text>
                </FormTitle>
                <FormGroup>
                  <input type="data" name="birth" />
                </FormGroup>
              </FormItem>
              <Button size="md" width={195} style={{ marginLeft: 150 }}>
                내 정보 수정
              </Button>
            </Form>
          </Container>
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default UserinfoEdit;

const { borderGray } = theme.color;

const Container = styled.div`
  margin-top: 40px;
  border: 1px solid ${borderGray};
  padding: 74px 76px;
`;

const Form = styled.div`
  margin-top: 76px;
`;

const FormItem = styled.div`
  display: flex;
  height: 70px;
`;

const FormTitle = styled.div`
  width: 150px;
  font-weight: 500;
`;

const FormGroup = styled.div``;
