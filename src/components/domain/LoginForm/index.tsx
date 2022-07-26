import Link from 'next/link';
import React, { KeyboardEvent, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { SchemaOf, object, string } from 'yup';
import styled from '@emotion/styled';
import theme from '~/styles/theme';
import { PageContainer, Logo, Input, Label, Button, Text } from '~/components/atom';
import { ErrorMessage, Form } from '~/components/common';
import { LoginValues } from '~/types';

const LoginValidationSchema: SchemaOf<LoginValues> = object().shape({
  email: string().email('이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
  password: string().required('비밀번호를 입력해주세요.')
});

const initialValues: LoginValues = {
  email: '',
  password: ''
};

interface LoginFormProps {
  onSubmit: (data: LoginValues) => void;
  errorMessage: string;
}

const LoginForm = ({ onSubmit: handleSubmitAction, errorMessage }: LoginFormProps) => {
  const [capsLockWarning, setCapsLockWarning] = useState(false);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (data: LoginValues) => {
      handleSubmitAction && handleSubmitAction(data);
    },
    validationSchema: LoginValidationSchema
  });

  const handleCheckCapsLock = (e: KeyboardEvent<HTMLInputElement>) => {
    e.getModifierState('CapsLock') ? setCapsLockWarning(true) : setCapsLockWarning(false);
  };

  const submittable = useMemo(() => {
    return !Object.values(values).every((value) => value.length > 0);
  }, [values]);

  return (
    <Layout>
      <Container>
        <Logo width={150} height={100} />
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="email" text="이메일" display="none" />
            <Input
              name="email"
              type="email"
              placeholder="이메일"
              required
              value={values.email}
              onChange={handleChange}
            />
            <Label htmlFor="password" text="비밀번호" display="none" />
            <Input
              name="password"
              type="password"
              placeholder="비밀번호"
              required
              value={values.password}
              onChange={handleChange}
              onKeyUp={handleCheckCapsLock}
            />
            {capsLockWarning && <ErrorMessage message="CapsLock이 켜져있어요." />}
            <Text color="red">{errorMessage}</Text>
            <Button size="md" type="submit" disabled={submittable}>
              로그인
            </Button>
          </Form>
        </FormWrapper>
        <Texts>
          <Text size="md">아직 회원이 아니신가요?</Text>
          <Text fontWeight={700} size="md" color="main">
            <Link href="/signup" passHref>
              회원가입
            </Link>
          </Text>
        </Texts>
      </Container>
    </Layout>
  );
};

export default LoginForm;

const Layout = styled(PageContainer)`
  height: calc(100vh - 120px);
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 568px;
  height: 580px;
  border: 1px solid ${theme.color.borderDarkGray};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FormWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 60px;
`;

const Texts = styled.div`
  display: flex;
  gap: 10px;
`;
