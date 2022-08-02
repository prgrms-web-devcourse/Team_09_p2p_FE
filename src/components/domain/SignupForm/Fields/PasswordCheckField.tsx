import React, { ChangeEvent, useCallback, useState } from 'react';
import { Input, Label } from '~/components/atom';
import { ErrorMessage, Field } from '~/components/common';

interface PasswordCheckFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: string | undefined;
}

const PasswordCheckField: React.FC<PasswordCheckFieldProps> = ({ value, onChange, errors }) => {
  const [error, setError] = useState(errors);

  const handleBlur = useCallback(() => {
    setError(errors);
  }, [errors]);

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
