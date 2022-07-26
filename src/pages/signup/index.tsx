import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { Toast } from '~/components/common';
import PageHead from '~/components/common/PageHead';
import { SignupForm } from '~/components/domain';
import { UserApi } from '~/service';
import { SignupValues } from '~/types';

const Signup: NextPage = () => {
  const router = useRouter();

  const handleSubmit = async (data: SignupValues) => {
    try {
      const response = await UserApi.signup(data);
      if (response.nickname === data.nickname) {
        Toast.show(`${response.nickname}님 환영합니다! 로그인해주세요.`);
        router.push('/login');
      }
    } catch (e) {
      console.error('회원가입 실패', e);
    }
  };

  return (
    <React.Fragment>
      <PageHead title="회원가입" />

      <main>
        <SignupForm onSubmit={handleSubmit} />
      </main>
    </React.Fragment>
  );
};

export default Signup;
