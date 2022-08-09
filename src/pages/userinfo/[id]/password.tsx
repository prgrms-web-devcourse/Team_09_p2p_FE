import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { PageContainer, Title } from '~/components/atom';
import PasswordChangeForm from '~/components/domain/UserInfo/PasswordChangeForm';
import { useUser } from '~/hooks/useUser';
import { UserApi } from '~/service';
import theme from '~/styles/theme';
import { UserPasswordFormValues } from '~/types/user';

const UserinfoEdit: NextPage = () => {
  const { currentUser } = useUser();
  const router = useRouter();
  const userId = Number(router.query.id);

  const handleSubmit = async (data: UserPasswordFormValues) => {
    const { oldPassword, password: newPassword } = data;
    console.log(data);
    try {
      const response = await UserApi.changePassword({ oldPassword, newPassword });
      if (response.status === 200) {
        console.log('비밀번호 변경 성공');
        console.log(response);
        // TODO- 비밀번호 변경 성공 시
        // 1. 다시 로그인을 시킬 것인지 말 것인지
        // 2. 페이징을 어떻게 할 것인지
        return;
      }
      console.error('비밀번호 변경에 실패했어요.');
    } catch (e: any) {
      const { response } = e;
      // Api 에러 픽스 시 예외처리
      if (response.status === 400) {
        console.log('비밀번호가 틀렸어요.');
        console.log(response);
        return;
      }

      if (response.status === 409) {
        console.log('동일한 비밀번호입니다.');
        console.log(response);
        return;
      }

      console.log(response);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      if (!currentUser.isLoading && currentUser.user.id !== userId) {
        alert('잘못된 요청입니다.');
        router.push('/');
        return;
      }
    }
  }, [currentUser, router, userId]);

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
