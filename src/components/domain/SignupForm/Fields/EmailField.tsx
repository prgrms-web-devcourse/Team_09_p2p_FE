import React, { ChangeEvent, useCallback, useState } from 'react';
import { Button, Input, Label } from '~/components/atom';
import { ErrorMessage, Field } from '~/components/common';
import { FONT_SIZES } from '~/utils/constants';

interface EmailFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: string | undefined;
}

const EmailField: React.FC<EmailFieldProps> = ({ value, onChange, errors }) => {
  const [error, setError] = useState(errors);

  const handleBlur = useCallback(() => {
    setError(errors);
  }, [errors]);

  const handleClickDuplicate = async () => {
    //TODO
    // 1. 이메일 중복확인 로직 추가
    // 2. 응답에 따라 ConfirmModal 불러오기
    console.log('이메일 중복확인!');
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
        onChange={onChange}
        onBlur={handleBlur}
      />
      {error && <ErrorMessage message={error} />}
      <Button onClick={handleClickDuplicate} fontSize={FONT_SIZES.sm}>
        이메일 중복확인
      </Button>
    </Field>
  );
};

export default React.memo(EmailField);
