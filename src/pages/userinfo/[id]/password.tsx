import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { PageContainer, Title } from '~/components/atom';
import PasswordChangeForm from '~/components/domain/UserInfo/PasswordChangeForm';
import { useUser } from '~/hooks/useUser';
import theme from '~/styles/theme';
import { UserPasswordFormValues } from '~/types/user';

const UserinfoEdit: NextPage = () => {
  const { currentUser } = useUser();
  const router = useRouter();
  const userId = Number(router.query.id);

  const handleSubmit = async (data: UserPasswordFormValues) => {
    console.log(data);
  };

  useEffect(() => {
    if (currentUser.isLoading) {
      return;
    }

    if (typeof router.query.id === 'string') {
      if (currentUser.user.id !== userId) {
        alert('잘못된 요청입니다.');
        router.push('/');
        return;
      }
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
            <Title>비밀번호 변경</Title>
            <PasswordChangeForm onSubmit={handleSubmit} />
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
