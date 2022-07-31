import styled from '@emotion/styled';
import React, { ChangeEvent, useState } from 'react';
import { Button, Input, Label, Text } from '~/components/atom';
import { ErrorMessage, Field } from '~/components/common';
import theme from '~/styles/theme';

interface NicknameFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: string | undefined;
}

const NicknameField: React.FC<NicknameFieldProps> = ({ value, onChange, errors }) => {
  const [error, setError] = useState(errors);

  const handleBlur = () => {
    setError(errors);
  };

  const handleClickDuplicate = async () => {
    //TODO
    // 1. 이메일 중복확인 로직 추가
    // 2. 응답에 따라 ConfirmModal 불러오기
    console.log('닉네임 중복확인!');
  };

  return (
    <Field>
      <Label htmlFor="nickname" text="닉네임" />
      <Text size="xs" color={theme.color.fontGray}>
        2-10자 이내의 닉네임을 입력해주세요.
      </Text>
      <StyledField>
        <Input
          name="nickname"
          placeholder="닉네임"
          required
          value={value}
          onChange={onChange}
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
