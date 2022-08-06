import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { LoginForm } from '~/components/domain';
import { LoginValues } from '~/types';
import { useUser } from '~/hooks/useUser';
import { useRouter } from 'next/router';

const Login: NextPage = () => {
  const { login } = useUser();
  const router = useRouter();

  const handleSubmit = async (data: LoginValues) => {
    login(data);
    router.push('/');
  };

  return (
    <React.Fragment>
      <Head>
        <title>로그인 | 이곳저곳</title>
        <meta name="description" content="login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <LoginForm onSubmit={handleSubmit} />
      </main>
    </React.Fragment>
  );
};

export default Login;
