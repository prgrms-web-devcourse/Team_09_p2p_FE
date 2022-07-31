import React from 'react';
import Portal from './Portal';
import BackgroundDim from './BackgroundDim';
import styled from '@emotion/styled';
import { Button, Text } from '~/components/atom';

interface ModalProps {
  condition: boolean;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  skipCancel?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  condition,
  message = '',
  onClose,
  onConfirm,
  onCancel,
  skipCancel = false
}) => {
  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
    onClose();
  };

  const handleCancel = async () => {
    if (!skipCancel && onCancel) {
      await onCancel();
    }
    onClose();
  };

  return condition ? (
    <Portal selector="#portal">
      <BackgroundDim>
        <StyledContents>
          <Text size="xl">{message}</Text>
          <Buttons>
            <Button onClick={handleConfirm}>확인</Button>
            {!skipCancel && <Button onClick={handleCancel}>취소</Button>}
          </Buttons>
        </StyledContents>
      </BackgroundDim>
    </Portal>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default Modal;

const StyledContents = styled.div`
  width: 500px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
