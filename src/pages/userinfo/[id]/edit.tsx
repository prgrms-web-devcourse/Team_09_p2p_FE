import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PageContainer, Title } from '~/components/atom';
import UserEditForm, { UserEditFormValues } from '~/components/domain/UserInfo/EditForm';
import { useUser } from '~/hooks/useUser';
import { UserApi } from '~/service';
import theme from '~/styles/theme';

const UserinfoEdit: NextPage = () => {
  const { currentUser } = useUser();
  const router = useRouter();
  const userId = Number(router.query.id);
  const [initialValues, setInitialValues] = useState<UserEditFormValues | null>(null);

  const handleSubmit = async (data: UserEditFormValues) => {
    if (!initialValues) {
      return;
    }
    const { nickname: prevNickname, birth: prevBirth, sex: prevSex } = initialValues;
    const { nickname, birth, sex } = data;
    if (prevNickname === nickname && prevBirth === birth && prevSex === sex) {
      router.push(`/userinfo/${userId}`);
      return;
    }

    try {
      const response = await UserApi.edit({ nickname, birth, sex });
      if (response.status === 200) {
        router.push(`/userinfo/${userId}`);
      }
    } catch (e) {
      // TODO 이후 status code에 따른 예외처리
      console.error('회원정보 수정 실패', e);
    }
  };

  const getUserData = async () => {
    const userInfo = await UserApi.getUser(userId);
    const { email, nickname, sex, birth } = userInfo;
    setInitialValues(() => ({
      email,
      nickname,
      sex,
      birth
    }));
  };

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      if (currentUser.user.id !== userId) {
        alert('잘못된 요청입니다.');
        router.push('/');
        return;
      }
      getUserData();
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
            <Title>내 정보 수정</Title>
            {initialValues && (
              <UserEditForm initialValues={initialValues} onSubmit={handleSubmit} />
            )}
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
