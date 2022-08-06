import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Button, Input, Label } from '~/components/atom';
import { ErrorMessage, Field } from '~/components/common';
import { UserApi } from '~/service';
import { FONT_SIZES } from '~/utils/constants';

interface EmailFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: string | undefined;
  setInitDuplicateFn: () => void;
  setDuplicateCheckFn: () => void;
}

const EmailField: React.FC<EmailFieldProps> = ({
  value,
  onChange,
  errors,
  setInitDuplicateFn,
  setDuplicateCheckFn
}) => {
  const [error, setError] = useState(errors);

  const handleBlur = useCallback(() => {
    setError(errors);
  }, [errors]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInitDuplicateFn();
      onChange(e);
    },
    [onChange, setInitDuplicateFn]
  );

  const disabled = useMemo(() => !!error || value.length === 0, [error, value]);

  const handleClickDuplicate = async () => {
    if (disabled) {
      return;
    }
    try {
      await UserApi.emailCheck({ email: value });
      window.alert(`${value}는 사용가능한 메일입니다!`);
      setDuplicateCheckFn();
    } catch (e) {
      window.alert('이미 존재하는 메일이에요!');
    }
  };

  return (
    <Field>
      <Label htmlFor="email" text="이메일" />
      <Input
        type="email"
        name="email"
        placeholder="이메일"
        required
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {error && <ErrorMessage message={error} />}
      <Button onClick={handleClickDuplicate} fontSize={FONT_SIZES.sm} disabled={disabled}>
        이메일 중복확인
      </Button>
    </Field>
  );
};

export default React.memo(EmailField);
