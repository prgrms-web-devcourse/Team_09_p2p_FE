import React, { ChangeEvent } from 'react';
import { Button, Input, Label, Text } from '~/components/atom';
import { Field } from '~/components/common';

interface NicknameFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const NicknameField: React.FC<NicknameFieldProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <Field>
      <Label htmlFor="nickname" text="닉네임" />
      <Text>2-10자 이내의 닉네임을 입력해주세요.</Text>
      <Input name="nickname" placeholder="닉네임" required value={value} onChange={handleChange} />
      <Button>중복확인</Button>
    </Field>
  );
};

export default NicknameField;
