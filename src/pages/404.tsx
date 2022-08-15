import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { Button, Text, Title } from '~/components/atom';

const Custom404: NextPage = () => {
  const router = useRouter();
  const ref = useRef(null);
  React.useEffect(() => {
    import('@lottiefiles/lottie-player');
  });
  return (
    <>
      <lottie-player
        id="firstLottie"
        ref={ref}
        autoplay
        loop
        mode="normal"
        src="https://assets2.lottiefiles.com/packages/lf20_gjrcw6fo.json"
        style={{ marginTop: '80px', width: '100%', height: '400px' }}
      />
      <Container>
        <Title>요청하신 페이지를 찾을 수 없습니다.</Title>
        <Text size="sm">존재하지 않는 페이지이거나 삭제된 페이지입니다.</Text>
        <Button onClick={() => router.push('/')}>홈으로 이동</Button>
      </Container>
    </>
  );
};

export default Custom404;

const Container = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  button {
    margin-top: 10px;
  }
`;
