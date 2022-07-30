import React, { ChangeEvent } from 'react';
import { Input, Label } from '~/components/atom';
import { Field } from '~/components/common';

interface BirthFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: string | undefined;
}

const BirthField: React.FC<BirthFieldProps> = ({ value, onChange, errors }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    onChange(e);
  };

  const handleBlur = () => {
    console.log(errors);
  };

  return (
    <Field>
      <Label htmlFor="birth" text="생년월일" />
      <Input
        name="birth"
        placeholder="YYYY-MM-DD"
        required
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Field>
  );
};

export default BirthField;
