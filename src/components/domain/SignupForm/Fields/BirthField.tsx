import React, { ChangeEvent } from 'react';
import { Input, Label } from '~/components/atom';
import { Field } from '~/components/common';

interface BirthFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BirthField: React.FC<BirthFieldProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };
  return (
    <Field>
      <Label htmlFor="birth" text="생년월일" />
      <Input name="birth" placeholder="YYYY-MM-DD" required value={value} onChange={handleChange} />
    </Field>
  );
};

export default BirthField;
