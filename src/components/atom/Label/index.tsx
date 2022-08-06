import styled from '@emotion/styled';
import React from 'react';
import { FONT_SIZES } from '~/utils/constants';

interface LabelProps {
  htmlFor: string;
  text: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  display?: 'block' | 'inline-block' | 'none';
}

const Label: React.FC<LabelProps> = ({ text, htmlFor, size = 'md', display = 'block' }) => {
  return (
    <StyledLabel size={size} display={display} htmlFor={htmlFor}>
      {text}
    </StyledLabel>
  );
};

export default Label;

const StyledLabel = styled.label<Pick<LabelProps, 'display' | 'size'>>`
  display: ${({ display }) => display};
  font-size: ${({ size }) =>
    size && (typeof size === 'number' ? size + 'px' : FONT_SIZES[size] + 'px')};
`;
