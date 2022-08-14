import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { LoginForm } from '~/components/domain';
import { LoginValues } from '~/types';
import { useUser } from '~/hooks/useUser';
import { useRouter } from 'next/router';

const Login: NextPage = () => {
  const { login } = useUser();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (data: LoginValues) => {
    const result = await login(data);
    if (!result.isError) {
      router.push('/');
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>로그인 | 이곳저곳</title>
      </Head>

      <main>
        <LoginForm onSubmit={handleSubmit} errorMessage={errorMessage} />
      </main>
    </React.Fragment>
  );
};

export default Login;
