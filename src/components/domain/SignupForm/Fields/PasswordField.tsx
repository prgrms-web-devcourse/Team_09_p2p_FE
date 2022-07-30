import React, { ChangeEvent } from 'react';
import { Input, Label, Text } from '~/components/atom';
import { Field } from '~/components/common';

interface PasswordFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <Field>
      <Label htmlFor="password" text="비밀번호" />
      <Text>영문, 숫자를 포함한 12자 이상의 비밀번호를 입력해주세요.</Text>
      <Input
        type="password"
        name="password"
        placeholder="비밀번호"
        required
        value={value}
        onChange={handleChange}
      />
    </Field>
  );
};

export default PasswordField;
