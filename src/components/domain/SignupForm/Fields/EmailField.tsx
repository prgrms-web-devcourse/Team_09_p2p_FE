import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Button, Input, Label } from '~/components/atom';
import { ErrorMessage, Field } from '~/components/common';
import { UserApi } from '~/service';
import { FONT_SIZES } from '~/utils/constants';

interface EmailFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: string | undefined;
  checkDuplicate?: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailField: React.FC<EmailFieldProps> = ({ value, onChange, errors, checkDuplicate }) => {
  const [error, setError] = useState(errors);

  const handleBlur = useCallback(() => {
    setError(errors);
  }, [errors]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      checkDuplicate && checkDuplicate(false);
      onChange(e);
      setError('');
    },
    [onChange, checkDuplicate]
  );

  const disabled = useMemo(() => {
    return !!error || value.length === 0;
  }, [error, value]);

  const handleClickDuplicate = async () => {
    try {
      await UserApi.emailCheck({ email: value });
      setError('');
      checkDuplicate && checkDuplicate(true);
    } catch (e) {
      setError('이미 존재하는 메일입니다.');
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
      <Button size="md" onClick={handleClickDuplicate} fontSize={FONT_SIZES.sm} disabled={disabled}>
        이메일 중복확인
      </Button>
      {error && <ErrorMessage message={error} />}
    </Field>
  );
};

export default React.memo(EmailField);
