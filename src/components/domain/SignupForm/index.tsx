import styled from '@emotion/styled';
import { useFormik } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
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
import { SignupValidationRules } from './rules';

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
  const initDuplicatedEmail = useCallback(() => setIsCheckedDuplicateEmail(false), []);
  const initDuplicatedNickname = useCallback(() => setIsCheckedDuplicateNickname(false), []);
  const checkDuplicatedEmail = () => setIsCheckedDuplicateEmail(true);
  const checkDuplicatedNickname = () => setIsCheckedDuplicateNickname(true);

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: SignupValidationRules,
    onSubmit: (data: SignupValues) => {
      if (!isCheckedDuplicateEmail) {
        //TODO - ConfirmModal 사용하기
        window.alert('이메일 중복확인을 해주세요.');
        return;
      }
      if (!isCheckedDuplicateNickname) {
        //TODO - ConfirmModal 사용하기
        window.alert('닉네임 중복확인을 해주세요.');
        return;
      }
      handleSubmitAction && handleSubmitAction(data);
    }
  });

  const disabled = useMemo(() => {
    return (
      Object.values(values).some((value) => value.length === 0) ||
      Object.entries(errors).some((error) => !!error)
    );
  }, [values, errors]);

  return (
    <Layout>
      <Container>
        <Title level={1} style={{ margin: '20px 0' }}>
          회원가입
        </Title>
        <Form onSubmit={handleSubmit}>
          <Fields>
            <EmailField
              value={values.email}
              onChange={handleChange}
              errors={errors.email}
              setInitDuplicateFn={initDuplicatedEmail}
              setDuplicateCheckFn={checkDuplicatedEmail}
            />
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
              setInitDuplicateFn={initDuplicatedNickname}
              setDuplicateCheckFn={checkDuplicatedNickname}
            />
            <BirthField value={values.birth} onChange={handleChange} errors={errors.birth} />
            <SexField value={values.sex} onChange={handleChange} />
          </Fields>
          <Button type="submit" style={{ margin: '0 auto' }} disabled={disabled}>
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
