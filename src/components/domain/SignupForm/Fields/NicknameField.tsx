import styled from '@emotion/styled';
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Button, Input, Label, Text } from '~/components/atom';
import { ErrorMessage, Field } from '~/components/common';
import { UserApi } from '~/service';

interface NicknameFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: string | undefined;
  setInitDuplicateFn: () => void;
  setDuplicateCheckFn: () => void;
}

const NicknameField: React.FC<NicknameFieldProps> = ({
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
      await UserApi.nicknameCheck({ nickname: value });
      window.alert(`${value}는 사용가능한 닉네임입니다!`);
      setDuplicateCheckFn();
    } catch (e) {
      window.alert('이미 존재하는 닉네임이에요!');
    }
  };

  return (
    <Field>
      <Label htmlFor="nickname" text="닉네임" />
      <Text size="xs" color="gray">
        2~8자 이내의 닉네임을 입력해주세요.
      </Text>
      <StyledField>
        <Input
          name="nickname"
          placeholder="닉네임"
          required
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="off"
        />
        <Button onClick={handleClickDuplicate} width="120px" fontSize={16} disabled={disabled}>
          중복확인
        </Button>
      </StyledField>
      {error && <ErrorMessage message={error} />}
    </Field>
  );
};

export default React.memo(NicknameField);

const StyledField = styled.div`
  display: flex;
  gap: 10px;
`;
