import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { LoginForm } from '~/components/domain';
import { LoginValues } from '~/types';

const Login: NextPage = () => {
  const handleSubmit = async (values: LoginValues) => {
    // TODO
    // await 비동기 로직 수행
    console.log(values);
  };

  return (
    <React.Fragment>
      <Head>
        <title>로그인 | 이곳저곳</title>
        <meta name="description" content="login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <LoginForm onSubmit={(values: LoginValues) => handleSubmit(values)} />
      </main>
    </React.Fragment>
  );
};

export default Login;
