import styled from '@emotion/styled';
import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react';
import { Button, PageContainer, Title } from '~/components/atom';
import { Form } from '~/components/common';
import theme from '~/styles/theme';
import { SignupValues } from '~/types';
import {
  BirthField,
  EmailField,
  NicknameField,
  PasswordCheckField,
  PasswordField,
  SexField
} from './Fields';
import { SignupValidationSchema } from './rules';

interface SignupFormProps {
  onSubmit: (data: SignupValues) => void;
}

const initialValues: SignupValues = {
  email: '',
  password: '',
  passwordCheck: '',
  nickname: '',
  birth: '',
  sex: 'male'
};

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit: handleSubmitAction }) => {
  const [isCheckedDuplicateEmail, setIsCheckedDuplicateEmail] = useState(false);
  const [isCheckedDuplicateNickname, setIsCheckedDuplicateNickname] = useState(false);

  const validDuplicateEmail = () => setIsCheckedDuplicateEmail(true);
  const validDuplicateNickname = () => setIsCheckedDuplicateNickname(true);

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: (data: SignupValues) => {
      console.log(values);
      handleSubmitAction && handleSubmitAction(data);
    },
    validationSchema: SignupValidationSchema
  });

  const submittable = useMemo(() => {
    return !(
      Object.values(values).every((value) => value.length > 0) &&
      isCheckedDuplicateEmail &&
      isCheckedDuplicateNickname
    );
  }, [values, isCheckedDuplicateEmail, isCheckedDuplicateNickname]);

  return (
    <Layout>
      <Container>
        <Title level={1} style={{ margin: '20px 0' }}>
          회원가입
        </Title>
        <Form onSubmit={handleSubmit}>
          <Fields>
            <EmailField value={values.email} onChange={handleChange} errors={errors.email} />
            <PasswordField
              value={values.password}
              onChange={handleChange}
              errors={errors.password}
            />
            <PasswordCheckField
              value={values.passwordCheck}
              onChange={handleChange}
              errors={errors.passwordCheck}
            />
            <NicknameField
              value={values.nickname}
              onChange={handleChange}
              errors={errors.nickname}
            />
            <BirthField value={values.birth} onChange={handleChange} errors={errors.birth} />
            <SexField value={values.sex} onChange={handleChange} />
          </Fields>
          <Button type="submit" style={{ margin: '0 auto' }} disabled={submittable}>
            회원가입
          </Button>
        </Form>
      </Container>
    </Layout>
  );
};

export default SignupForm;

const Layout = styled(PageContainer)`
  margin: 30px auto;
`;

const Container = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  width: 568px;
  border: 1px solid ${theme.color.borderDarkGray};
  padding: 60px;
`;

const Fields = styled.div`
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
