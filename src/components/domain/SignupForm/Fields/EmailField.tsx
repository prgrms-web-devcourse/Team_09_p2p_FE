import React, { ChangeEvent } from 'react';
import { Button, Input, Label } from '~/components/atom';
import { Field } from '~/components/common';

interface EmailFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EmailField: React.FC<EmailFieldProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
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
        onChange={handleChange}
      />
      <Button fontSize={16}>이메일 중복확인</Button>
    </Field>
  );
};

export default EmailField;
