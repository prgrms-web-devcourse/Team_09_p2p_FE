import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { SignupForm } from '~/components/domain';
import { SignupValues } from '~/types';

const Signup: NextPage = () => {
  const handleSubmit = (data: SignupValues) => {
    //TODO
    //회원가입 api 로직 추가
    console.log(data);
    const response = axios
      .post('http://3.38.118.35:8080/api/v1/users/', data)
      .then((res) => console.log(res));
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
