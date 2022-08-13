import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { Input, Label, Text } from '~/components/atom';
import { ErrorMessage, Field } from '~/components/common';

interface PasswordFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: string | undefined;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ value, onChange, errors }) => {
  const [error, setError] = useState(errors);
  const [capsLockWarning, setCapsLockWarning] = useState(false);

  const handleBlur = useCallback(() => {
    setError(errors);
  }, [errors]);

  const handleCheckCapsLock = (e: KeyboardEvent<HTMLInputElement>) => {
    e.getModifierState('CapsLock') ? setCapsLockWarning(true) : setCapsLockWarning(false);
  };

  return (
    <Field>
      <Label htmlFor="password" text="비밀번호" />
      <Text size="xs" color="gray">
        영문, 숫자, 특수문자를 포함한 8~15자로 설정해주세요.
      </Text>
      <Input
        type="password"
        name="password"
        placeholder="비밀번호"
        required
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        onKeyUp={handleCheckCapsLock}
      />
      {capsLockWarning && <ErrorMessage message="CapsLock이 켜져있어요." />}
      {error && <ErrorMessage message={error} />}
    </Field>
  );
};

export default React.memo(PasswordField);
