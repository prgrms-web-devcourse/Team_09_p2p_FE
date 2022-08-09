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
import { isNumber } from '~/utils/converter';

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
      // 바로 이동시키거나
      router.push(`/userinfo/${userId}`);
      // 알림 모달을 띄우기
      // ConfirmModal...
      return;
    }

    try {
      const response = await UserApi.edit({ nickname, birth, sex });
      if (response.status === 200) {
        // 바로 이동시키거나
        router.push(`/userinfo/${userId}`);
        // 알림 모달을 띄우기
        // ConfirmModal...
      }
    } catch (e) {
      console.error('정보 수정에 실패했어요.');
    }
  };

  const getUserData = async () => {
    const userInfo = await UserApi.getUser();
    const { email, nickname, sex, birth } = userInfo;
    setInitialValues(() => ({
      email,
      nickname,
      sex,
      birth
    }));
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
