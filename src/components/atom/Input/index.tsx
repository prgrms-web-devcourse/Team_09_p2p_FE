import styled from '@emotion/styled';
import React, { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';
import theme from '~/styles/theme';
import { FONT_SIZES } from '~/types/font';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: 'email' | 'password' | 'text' | 'date';
  placeholder: string;
  required?: boolean;
  value: string;
  height?: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      type = 'text',
      placeholder = '입력해주세요.',
      required,
      value,
      height = 60,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    return (
      <StyledInput
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        height={height}
        ref={ref}
        onBlur={onBlur}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
export default Input;

const StyledInput = styled.input<Pick<InputProps, 'height'>>`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  font-size: ${FONT_SIZES.sm};
  border: 1px solid ${theme.color.borderDarkGray};
  border-radius: 4px;
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  :focus {
    outline: none;
    border: 1px solid ${theme.color.mainColor};
  }
  ::placeholder {
    color: ${theme.color.fontGray};
  }
`;
