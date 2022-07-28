import styled from '@emotion/styled';
import React, { ChangeEvent } from 'react';
import theme from '~/styles/theme';

interface InputProps {
  name: string;
  type?: 'email' | 'password';
  placeholder: string;
  required: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  height?: string | number;
}

const Input: React.FC<InputProps> = ({
  name,
  type = 'text',
  placeholder = '입력해주세요.',
  required,
  value,
  onChange,
  height = 60
}) => {
  return (
    <StyledInput
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      height={height}
    />
  );
};

export default Input;

const StyledInput = styled.input<Pick<InputProps, 'height'>>`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid ${theme.color.borderDarkGray};
  border-radius: 4px;
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  :focus {
    outline: none;
    border: 1px solid ${theme.color.mainColor};
  }
`;
