import styled from '@emotion/styled';
import { useFormik } from 'formik';
import React, { KeyboardEvent, useMemo, useState } from 'react';
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
  const [capsLockWarningOld, setCapsLockWarningOld] = useState(false);
  const [capsLockWarningNew, setCapsLockWarningNew] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: ValidationRules,
    onSubmit: (data: UserPasswordFormValues) => {
      onSubmitAction && onSubmitAction(data);
    }
  });

  const handleCheckCapsLockOld = (e: KeyboardEvent<HTMLInputElement>) => {
    e.getModifierState('CapsLock') ? setCapsLockWarningOld(true) : setCapsLockWarningOld(false);
  };

  const handleCheckCapsLockNew = (e: KeyboardEvent<HTMLInputElement>) => {
    e.getModifierState('CapsLock') ? setCapsLockWarningNew(true) : setCapsLockWarningNew(false);
  };

  const handleBlurPassword = () => {
    setPasswordError(errors.password || '');
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
          onKeyUp={handleCheckCapsLockOld}
          required
        />
      </Field>
      {capsLockWarningOld && (
        <Error>
          <ErrorMessage message="CapsLock이 켜져있어요." />
        </Error>
      )}
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
          onKeyUp={handleCheckCapsLockNew}
        />
      </Field>
      {capsLockWarningNew && (
        <Error>
          <ErrorMessage message="CapsLock이 켜져있어요." />
        </Error>
      )}
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
        />
      </Field>
      {values.passwordCheck && errors.passwordCheck && (
        <Error>
          <ErrorMessage message={errors.passwordCheck} />
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
