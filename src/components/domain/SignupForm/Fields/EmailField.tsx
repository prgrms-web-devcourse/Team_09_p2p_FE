import React, { ChangeEvent, useState } from 'react';
import { Button, Input, Label } from '~/components/atom';
import { Field } from '~/components/common';
import { FONT_SIZES } from '~/utils/constants';

interface EmailFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: string | undefined;
}

const EmailField: React.FC<EmailFieldProps> = ({ value, onChange, errors }) => {
  const [error, setError] = useState(errors);

  const handleBlur = () => {
    setError(errors);
  };

  return (
    <Field>
      <Label htmlFor="email" text="이메일" />
      <Input
        type="email"
        name="email"
        placeholder="이메일"
        required
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
      />
      {error && <div>{error}</div>}
      <Button fontSize={FONT_SIZES.sm}>이메일 중복확인</Button>
    </Field>
  );
};

export default EmailField;
