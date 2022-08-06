import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { SignupForm } from '~/components/domain';
import { UserApi } from '~/service';
import { SignupValues } from '~/types';

const Signup: NextPage = () => {
  const router = useRouter();

  const handleSubmit = async (data: SignupValues) => {
    // TODO
    // 회원가입 실패 시 로직 추가해야함
    const response = await UserApi.signup(data);
    if (response.nickname === data.nickname) {
      if (window.confirm(`${response.nickname}님 환영합니다! 로그인하러 갈까요?`)) {
        router.push('/login');
      }
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>여행할 땐 | 이곳저곳</title>
        <meta name="description" content="sign-up" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SignupForm onSubmit={handleSubmit} />
      </main>
    </React.Fragment>
  );
};

export default Signup;
