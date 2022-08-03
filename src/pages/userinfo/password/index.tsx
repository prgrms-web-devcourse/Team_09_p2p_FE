import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Button, PageContainer, Text, Title } from '~/components/atom';
import theme from '~/styles/theme';

const UserinfoEdit: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>우리의 여행코스 | 이곳저곳</title>
        <meta name="description" content="our travel course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PageContainer>
          <Container>
            <Title>비밀번호 변경</Title>
            <Form>
              <FormItem>
                <FormTitle>
                  <Text>현재 비밀번호</Text>
                </FormTitle>
                <FormGroup>
                  <input type="password" name="password" />
                </FormGroup>
              </FormItem>
              <FormItem>
                <FormTitle>
                  <Text>새 비밀번호</Text>
                </FormTitle>
                <FormGroup>
                  <input type="password" name="newPassword" />
                </FormGroup>
              </FormItem>
              <FormItem>
                <FormTitle>
                  <Text>새 비밀번호 확인</Text>
                </FormTitle>
                <FormGroup>
                  <input type="password" name="newPasswordConfirm" />
                </FormGroup>
              </FormItem>
              <Button size="md" width={195} style={{ marginLeft: 150 }}>
                내 정보 수정
              </Button>
            </Form>
          </Container>
        </PageContainer>
      </main>
    </React.Fragment>
  );
};

export default UserinfoEdit;

const { borderGray } = theme.color;

const Container = styled.div`
  margin-top: 40px;
  border: 1px solid ${borderGray};
  padding: 74px 76px;
`;

const Form = styled.div`
  margin-top: 76px;
`;

const FormItem = styled.div`
  display: flex;
  height: 70px;
`;

const FormTitle = styled.div`
  width: 150px;
  font-weight: 500;
`;

const FormGroup = styled.div``;
