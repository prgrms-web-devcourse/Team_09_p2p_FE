import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Input, Label } from '~/components/atom';
import { ErrorMessage, Field } from '~/components/common';

interface PasswordCheckFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: string | undefined;
  password: string;
}

const PasswordCheckField: React.FC<PasswordCheckFieldProps> = ({
  value,
  onChange,
  errors,
  password
}) => {
  const [error, setError] = useState(errors);

  const handleBlur = useCallback(() => {
    setError(errors);
  }, [errors]);

  useEffect(() => {
    if (value && password !== value) {
      setError(errors);
    }
  }, [password, errors, value]);

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
