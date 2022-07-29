import styled from '@emotion/styled';
import React, { FormEvent, ReactNode } from 'react';

interface FormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};

export default Form;

const StyledForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  & > :last-child {
    margin-top: 10px;
  }
`;
