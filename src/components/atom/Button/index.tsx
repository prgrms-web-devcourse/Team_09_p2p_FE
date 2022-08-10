import styled from '@emotion/styled';
import { CSSProperties, MouseEvent, ReactNode } from 'react';
import theme from '~/styles/theme';

type ButtonTypes = 'primary' | 'borderPrimary' | 'tag' | 'darkGray' | 'borderNone';
type ButtonSizes = 'sm' | 'md' | 'lg';

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

interface buttonStyleInterface {
  [key: string]: string;
}

const { mainColor, fontDarkGray, borderDarkGray } = theme.color;

const buttonStyle: buttonStyleInterface = {
  primary: `
    color: #fff;
    background-color:${mainColor};

    &:hover{
      background-color:#438ce1;
    }
  `,
  borderPrimary: `
    color: ${mainColor};
    background-color: #fff;
    border: 1px solid ${mainColor};

    &:hover {
      background-color: #f6f9ff;
    }
  `,
  tag: `
    color: ${fontDarkGray};
    border: 1px solid ${borderDarkGray};
    box-shadow: 0px 2px 4px 1px rgb(0 0 0 / 5%);

    &:hover {
      background-color: #f4f8fb;
      background-color: #f7f8f9;
 
    }
  `,
  darkGray: `
    color: #fff;
    background-color: #909090;

  `,
  borderNone: `
    color: ${mainColor};
    background-color: #fff;

    &:hover {
      background-color: #f6f9ff;
    }

  `
};

const buttonSize: buttonStyleInterface = {
  sm: `
    padding: 10px 20px;
    font-size: 18px;
  `,
  md: `
    padding: 16px 22px;
    font-size: 20px;
  `,
  lg: `
    padding: 20px 45px;
    font-size: 22px;
  `
};

interface ButtonInterface {
  buttonType?: string;
  size?: string;
  width?: number | string;
  height?: number;
  fontSize?: number;
  disabled?: boolean;
}

const StyledButton = styled.button<ButtonInterface>`
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
