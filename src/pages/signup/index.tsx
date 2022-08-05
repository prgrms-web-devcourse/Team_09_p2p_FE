import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { SignupForm } from '~/components/domain';
import { UserApi } from '~/service';
import { SignupValues } from '~/types';

const Signup: NextPage = () => {
  const handleSubmit = async (data: SignupValues) => {
    console.log('회원가입 시도!', data);
    const response = await UserApi.signup(data);
    console.log(`회원가입 성공!`, response);
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
