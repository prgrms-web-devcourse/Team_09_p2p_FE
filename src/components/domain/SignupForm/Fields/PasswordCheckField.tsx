import React, { ChangeEvent } from 'react';
import { Input, Label } from '~/components/atom';
import { Field } from '~/components/common';

interface PasswordCheckFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: string | undefined;
}

const PasswordCheckField: React.FC<PasswordCheckFieldProps> = ({ value, onChange, errors }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    onChange(e);
  };

  const handleBlur = () => {
    console.log(errors);
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
        onBlur={handleBlur}
      />
    </Field>
  );
};

export default PasswordCheckField;
