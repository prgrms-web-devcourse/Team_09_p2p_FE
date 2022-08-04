import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { LoginForm } from '~/components/domain';
import { LoginValues } from '~/types';
import { UserApi } from '~/service';

const Login: NextPage = () => {
  const handleSubmit = async (values: LoginValues) => {
    const response = await UserApi.login(values);
    console.log(response);
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
