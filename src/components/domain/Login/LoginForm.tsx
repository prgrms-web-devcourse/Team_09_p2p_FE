import Link from 'next/link';
import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import { SchemaOf, object, string } from 'yup';
import styled from '@emotion/styled';
import theme from '~/styles/theme';
import { PageContainer, Logo, Input, Label, Button } from '~/components/atom';
import { LoginValues } from '~/types';
import { Form } from '~/components/common';

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
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit: handleSubmitAction }) => {
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: (data: LoginValues) => {
      handleSubmitAction && handleSubmitAction(data);
    },
    validationSchema: LoginValidationSchema
  });

  const disableButton = useMemo(() => {
    return Boolean(!values.email || !values.password || errors.email || errors.password);
  }, [values.email, values.password, errors.email, errors.password]);

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
            />
            <Button type="submit" disabled={disableButton}>
              로그인
            </Button>
          </Form>
        </FormWrapper>
        <div>
          {/* TODO - Text컴포넌트 머지 후 변경 */}
          <span>
            아직 회원이 아니신가요?{' '}
            <Link href="/signup" passHref>
              회원가입
            </Link>
          </span>
        </div>
      </Container>
    </Layout>
  );
};

export default LoginForm;

const Layout = styled(PageContainer)`
  height: calc(100vh - 100px);
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
