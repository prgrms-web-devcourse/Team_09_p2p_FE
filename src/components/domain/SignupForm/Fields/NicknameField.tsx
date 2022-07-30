import styled from '@emotion/styled';
import React, { ChangeEvent } from 'react';
import { Button, Input, Label, Text } from '~/components/atom';
import { Field } from '~/components/common';
import theme from '~/styles/theme';

interface NicknameFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: string | undefined;
}

const NicknameField: React.FC<NicknameFieldProps> = ({ value, onChange, errors }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    onChange(e);
  };

  const handleBlur = () => {
    console.log(errors);
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
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Button width="120px" fontSize={16}>
          중복확인
        </Button>
      </StyledField>
    </Field>
  );
};

export default NicknameField;

const StyledField = styled.div`
  display: flex;
  gap: 10px;
`;
