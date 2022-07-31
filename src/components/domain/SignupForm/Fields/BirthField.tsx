import React, { ChangeEvent, useState } from 'react';
import { Input, Label } from '~/components/atom';
import { ErrorMessage, Field } from '~/components/common';

interface BirthFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: string | undefined;
}

const BirthField: React.FC<BirthFieldProps> = ({ value, onChange, errors }) => {
  const [error, setError] = useState(errors);

  const handleBlur = () => {
    setError(errors);
  };

  return (
    <Field>
      <Label htmlFor="birth" text="생년월일" />
      <Input
        type="date"
        name="birth"
        placeholder="YYYY-MM-DD"
        required
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        autoComplete="off"
      />
      {error && <ErrorMessage message={error} />}
    </Field>
  );
};

export default React.memo(BirthField);
