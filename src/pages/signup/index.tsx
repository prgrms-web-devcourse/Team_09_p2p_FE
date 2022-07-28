import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { SignupForm } from '~/components/domain';

const Signup: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>여행할 땐 | 이곳저곳</title>
        <meta name="description" content="sign-up" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SignupForm />
      </main>
    </React.Fragment>
  );
};

export default Signup;
