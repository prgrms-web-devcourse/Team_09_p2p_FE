import React from 'react';
import styled from '@emotion/styled';
interface FieldProps {
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ children }) => {
  return <StyledField>{children}</StyledField>;
};

export default Field;

const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
