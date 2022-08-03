import styled from '@emotion/styled';
import { useRef } from 'react';
import theme from '~/styles/theme';

interface TextareaInterface {
  width: number | string;
  height: number | string;
  placeholder?: string;
  children?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textAreaRef?: React.MutableRefObject<HTMLTextAreaElement>;
}

const Textarea = ({
  width,
  height,
  placeholder,
  children,
  onChange,
  textAreaRef,
  ...props
}: TextareaInterface) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <StyledTextarea
      width={width}
      height={height}
      placeholder={placeholder}
      onChange={onChange}
      ref={textAreaRef}
      {...props}
    >
      {children}
    </StyledTextarea>
  );
};

export default Textarea;

export const StyledTextarea = styled.textarea<{
  width: number | string;
  height: number | string;
}>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  font-size: 16px;
  height: {{height}}px;

  border-color: #d8d9d9;
  outline-color: ${theme.color.mainColor};
  box-shadow: rgba(24, 144, 255, 0.2);
  border-radius: 10px;
  padding: 10px;
  line-height: 150%;
  @media (max-width: 700px) {
    padding: 0 18px;
    box-sizing: border-box;
  }

  overflow: 'auto';
  resize: none;

  &:hover {
    border-color: ${theme.color.fontBlueGray};
  }

  &:focus {
    outline: none;
    border-color: ${theme.color.mainColor};
  }
`;
