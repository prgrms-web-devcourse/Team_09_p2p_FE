import { FormikErrors } from 'formik';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { Input, Label } from '~/components/atom';
import { ErrorMessage, Field } from '~/components/common';
import { SignupValues } from '~/types';

interface PasswordCheckFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: string | undefined;
  password: string;
  setError: (errors: FormikErrors<SignupValues>) => void;
}

const PasswordCheckField: React.FC<PasswordCheckFieldProps> = ({
  value,
  onChange,
  errors,
  password,
  setError: setErrorFormikFn
}) => {
  const [error, setError] = useState(errors);

  const handleBlur = useCallback(() => {
    setError(errors);
    if (value.length > 0 && password !== value) {
      setError(() => '동일한 비밀번호가 아니에요.');
      setErrorFormikFn({ passwordCheck: error });
    }
  }, [password, setErrorFormikFn, value, errors, error]);

  return (
    <Field>
      <Label htmlFor="passwordCheck" text="비밀번호 확인" />
      <Input
        type="password"
        name="passwordCheck"
        placeholder="비밀번호 확인"
        required
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
      />
      {error && <ErrorMessage message={error} />}
    </Field>
  );
};

export default React.memo(PasswordCheckField);
