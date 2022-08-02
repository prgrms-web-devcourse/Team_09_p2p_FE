import React from 'react';
import Portal from './Portal';
import BackgroundDim, { BackgroundDimProps } from './BackgroundDim';
import styled from '@emotion/styled';

type ModalProps = BackgroundDimProps;

const Modal = ({ ...props }: ModalProps) => {
  return (
    <Portal selector="#portal">
      <BackgroundDim {...props}>
        <StyledContents>{props.children}</StyledContents>
      </BackgroundDim>
    </Portal>
  );
};

export default Modal;

const StyledContents = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;
