import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { LoginForm } from '~/components/domain';
import { LoginValues } from '~/types';
import { UserApi } from '~/service';

const Login: NextPage = () => {
  const handleSubmit = async (data: LoginValues) => {
    console.log('로그인 시도!', data);
    // await fetch('http://3.38.118.35:8080/api/v1/users/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));

    const response = await UserApi.login(data);
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
        <LoginForm onSubmit={handleSubmit} />
      </main>
    </React.Fragment>
  );
};

export default Login;
