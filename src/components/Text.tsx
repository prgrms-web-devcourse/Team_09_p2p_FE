import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  size?: string;
}

const Text: React.FC<TextProps> = ({ children, size }) => {
  return <TextContainer size={size}>{children}</TextContainer>;
};

export default Text;

const TextContainer = styled.text<Omit<TextProps, 'children'>>`
  font-size: ${({ size }) => size || 16};
`;
