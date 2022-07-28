import styled from '@emotion/styled';
import React from 'react';

interface LabelProps {
  htmlFor: string;
  text: string;
  display: 'block' | 'inline-block' | 'none';
}

const Label: React.FC<LabelProps> = ({ text, htmlFor, display = 'block' }) => {
  return (
    <StyledLabel display={display} htmlFor={htmlFor}>
      {text}
    </StyledLabel>
  );
};

export default Label;

const StyledLabel = styled.label<Pick<LabelProps, 'display'>>`
  display: ${({ display }) => display};
`;
