import styled from '@emotion/styled';
import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react';
import { Button, PageContainer, Title } from '~/components/atom';
import { Form } from '~/components/common';
import FieldMessage from '~/components/common/Form/FieldMessage';
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
  const [errorMessage, setErrorMessage] = useState(false);
  const [isCheckedDuplicateEmail, setIsCheckedDuplicateEmail] = useState(false);
  const [isCheckedDuplicateNickname, setIsCheckedDuplicateNickname] = useState(false);

  const { values, handleChange, handleSubmit, errors } = useFormik<SignupValues>({
    initialValues,
    validationSchema: SignupValidationRules,
    onSubmit: (data: SignupValues) => {
      if (!isCheckedDuplicateEmail || !isCheckedDuplicateNickname) {
        setErrorMessage(true);
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
              checkDuplicate={setIsCheckedDuplicateEmail}
            />
            {isCheckedDuplicateEmail ? (
              <Message>
                <FieldMessage color="green" message="사용가능한 메일입니다." />
              </Message>
            ) : (
              errorMessage && (
                <Message>
                  <FieldMessage color="red" message="이메일 중복 검사를 해주세요." />
                </Message>
              )
            )}
            <PasswordField
              value={values.password}
              onChange={handleChange}
              errors={errors.password}
            />
            <PasswordCheckField
              value={values.passwordCheck}
              onChange={handleChange}
              errors={errors.passwordCheck}
              password={values.password}
            />
            <NicknameField
              value={values.nickname}
              onChange={handleChange}
              errors={errors.nickname}
              checkDuplicate={setIsCheckedDuplicateNickname}
            />
            {isCheckedDuplicateNickname ? (
              <Message>
                <FieldMessage color="green" message="사용가능한 닉네임 입니다." />
              </Message>
            ) : (
              errorMessage && (
                <Message>
                  <FieldMessage color="red" message="닉네임 중복 검사를 해주세요." />
                </Message>
              )
            )}
            <BirthField value={values.birth} onChange={handleChange} errors={errors.birth} />
            <SexField value={values.sex} onChange={handleChange} />
          </Fields>
          <Button
            size="md"
            width={195}
            type="submit"
            style={{ margin: '0 auto' }}
            disabled={disabled}
          >
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
  margin: 20px 0px 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Message = styled.div`
  margin-top: -20px;
`;
