import React, { ReactNode } from 'react';
import Portal from './Portal';
import BackgroundDim from './BackgroundDim';
import styled from '@emotion/styled';

export interface ModalProps {
  visible: boolean;
  children: ReactNode;
  onClose?: () => void;
  closeDimActive?: boolean;
  dimOpacity?: number;
}

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
