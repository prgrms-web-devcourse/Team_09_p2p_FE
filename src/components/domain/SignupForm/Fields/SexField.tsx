import styled from '@emotion/styled';
import React, { ChangeEvent } from 'react';
import { Label } from '~/components/atom';
import { Field } from '~/components/common';

interface SexFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SexField: React.FC<SexFieldProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    onChange(e);
  };

  return (
    <Field>
      <Label htmlFor="sex" text="성별" />
      <Options role="sex" aria-labelledby="sex">
        <label>
          <input type="radio" name="sex" value="male" onChange={handleChange} /> <span>남성</span>
        </label>
        <label>
          <input type="radio" name="sex" value="female" onChange={handleChange} /> <span>여성</span>
        </label>
      </Options>
    </Field>
  );
};

export default SexField;

const Options = styled.div`
  display: flex;
  gap: 10px;
  span {
    font-size: 16px;
  }
`;
