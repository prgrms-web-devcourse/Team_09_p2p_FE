import styled from '@emotion/styled';
import { CSSProperties, MouseEvent, ReactNode } from 'react';
import { buttonSize, ButtonSizes, buttonStyle, ButtonTypes } from './types';
interface ButtonProps {
  type?: 'button' | 'submit';
  buttonType?: ButtonTypes;
  size?: ButtonSizes;
  disabled?: boolean;
  width?: number | string;
  height?: number;
  fontSize?: number;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  style?: CSSProperties;
}

const Button = ({
  type = 'button',
  buttonType = 'primary',
  size = 'sm',
  fontSize,
  width,
  height,
  onClick,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      type={type}
      buttonType={buttonType}
      size={size}
      width={width}
      height={height}
      fontSize={fontSize}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  ${({ buttonType }) => buttonType && buttonStyle[buttonType]};
  ${({ size }) => size && buttonSize[size]};

  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '')};

  border-radius: 5px;
  font-weight: 500;
  transition: all 0.1s;

  &:disabled {
    opacity: 0.7;
  }
`;
