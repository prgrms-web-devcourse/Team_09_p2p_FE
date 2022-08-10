import styled from '@emotion/styled';
import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react';
import { Button, Input } from '~/components/atom';
import { ErrorMessage } from '~/components/common';
import { UserPasswordFormValues } from '~/types/user';
import { ValidationRules } from './rules';

const initialValues: UserPasswordFormValues = {
  oldPassword: '',
  password: '',
  passwordCheck: ''
};

interface PasswordChangeFormProps {
  onSubmit: (data: UserPasswordFormValues) => void;
}

const PasswordChangeForm = ({ onSubmit: onSubmitAction }: PasswordChangeFormProps) => {
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: ValidationRules,
    onSubmit: (data: UserPasswordFormValues) => {
      onSubmitAction && onSubmitAction(data);
    }
  });

  const handleBlurPassword = () => {
    setPasswordError(errors.password || '');
    values.passwordCheck && setPasswordCheckError(errors.passwordCheck || '');
  };

  const handleBlurPasswordCheck = () => {
    setPasswordCheckError(errors.passwordCheck || '');
  };

  const submitButtonDisabled = useMemo(() => {
    return (
      Object.values(values).some((value) => value.length === 0) ||
      Object.entries(errors).some((error) => !!error)
    );
  }, [values, errors]);

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <label htmlFor="oldPassword">현재 비밀번호</label>
        <Input
          type="password"
          style={{ width: '437px', marginRight: '10px' }}
          name="oldPassword"
          placeholder="현재 비밀번호를 입력해주세요."
          value={values.oldPassword}
          onChange={handleChange}
          required
        />
      </Field>
      <Field>
        <label htmlFor="password">새 비밀번호</label>
        <Input
          type="password"
          style={{ width: '437px', marginRight: '10px' }}
          name="password"
          placeholder="새 비밀번호를 입력해주세요."
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlurPassword}
        />
      </Field>
      {passwordError && (
        <Error>
          <ErrorMessage message={passwordError} />
        </Error>
      )}

      <Field>
        <label htmlFor="passwordCheck">새 비밀번호 확인</label>
        <Input
          type="password"
          style={{ width: '437px', marginRight: '10px' }}
          name="passwordCheck"
          placeholder="새 비밀번호를 다시 입력해주세요."
          value={values.passwordCheck}
          onChange={handleChange}
          onBlur={handleBlurPasswordCheck}
        />
      </Field>
      {passwordCheckError && (
        <Error>
          <ErrorMessage message={passwordCheckError} />
        </Error>
      )}

      <Button
        type="submit"
        size="md"
        width={195}
        style={{ marginLeft: 150 }}
        disabled={submitButtonDisabled}
      >
        내 정보 수정
      </Button>
    </Form>
  );
};

export default PasswordChangeForm;

const Form = styled.form`
  margin-top: 50px;
  > button {
    margin-top: 30px;
  }
`;

const Field = styled.div`
  box-sizing: border-box;
  height: 70px;
  display: flex;
  align-items: center;
  > :first-of-type {
    width: 150px;
    font-weight: 500;
  }

  input {
    &::placeholder {
      font-weight: 400;
    }
  }
`;

const Error = styled.div`
  margin-left: 160px;
`;
