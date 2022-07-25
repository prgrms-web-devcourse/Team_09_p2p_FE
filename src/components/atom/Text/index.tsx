import styled from '@emotion/styled';
import React, { ReactNode } from 'react';
import { FONT_SIZE } from '~/utils/constants';

interface TextProps {
  children: ReactNode;
  size?: string;
  color?: string;
}

const Text: React.FC<TextProps> = ({ children, size, color }) => {
  return (
    <StyledButton size={size} color={color}>
      {children}
    </StyledButton>
  );
};

export default Text;

const StyledButton = styled.text<Omit<TextProps, 'children'>>`
  font-size: ${({ size }) => size || FONT_SIZE.normal};
`;
