import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { SignupForm } from '~/components/domain';
import { SignupValues } from '~/types';

const Signup: NextPage = () => {
  const handleSubmit = (data: SignupValues) => {
    console.log('제출!');
    console.log(data);
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
