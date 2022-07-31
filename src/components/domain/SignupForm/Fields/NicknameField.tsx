import styled from '@emotion/styled';
import React, { ChangeEvent, useState } from 'react';
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

  const handleBlur = () => {
    setError(errors);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInitDuplicateFn();
    onChange(e);
  };

  const handleClickDuplicate = async () => {
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
      <Text size="xs" color={theme.color.fontGray}>
        2~6자 이내의 닉네임을 입력해주세요.
      </Text>
      <StyledField>
        <Input
          name="nickname"
          placeholder="닉네임"
          required
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
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
