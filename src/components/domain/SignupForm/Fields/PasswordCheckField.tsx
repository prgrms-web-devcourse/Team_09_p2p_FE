import React, { ChangeEvent } from 'react';
import { Input, Label } from '~/components/atom';
import { Field } from '~/components/common';

interface PasswordCheckFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PasswordCheckField: React.FC<PasswordCheckFieldProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <Field>
      <Label htmlFor="passwordCheck" text="비밀번호 확인" />
      <Input
        type="password"
        name="passwordCheck"
        placeholder="비밀번호 확인"
        required
        value={value}
        onChange={handleChange}
      />
    </Field>
  );
};

export default PasswordCheckField;
