import styled from '@emotion/styled';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { Button, Input, Label, Text } from '~/components/atom';
import { ErrorMessage, Field } from '~/components/common';
import theme from '~/styles/theme';

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

  const handleClickDuplicate = async () => {
    if (error) {
      //TODO
      // error가 있으면 중복확인버튼을 disable
      return;
    }
    //TODO
    // 1. 이메일 중복확인 로직 추가
    // 2. 응답에 따라 ConfirmModal 불러오기
    if (!error && window.confirm(`${value}는 사용가능한 닉네임입니다!`)) {
      setDuplicateCheckFn();
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
        <Button onClick={handleClickDuplicate} width="120px" fontSize={16}>
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
