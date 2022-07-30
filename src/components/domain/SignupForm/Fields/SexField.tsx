import React, { ChangeEvent } from 'react';
import { Label } from '~/components/atom';
import { Field } from '~/components/common';

interface SexFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SexField: React.FC<SexFieldProps> = ({ value, onChange }) => {
  return (
    <Field>
      <Label htmlFor="gender" text="성별" />
      <input type="radio" id="male" name="sex" value="male" />
      <label htmlFor="male">남성</label>
      <input type="radio" value="female" />
      <label htmlFor="female">여성</label>
    </Field>
  );
};

export default SexField;
