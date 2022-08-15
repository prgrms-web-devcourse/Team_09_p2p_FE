import styled from '@emotion/styled';
import React from 'react';
import { Button, Icon, Modal, Text, Title } from '~/components/atom';
import { ModalProps } from '~/components/atom/Modal';

interface ConfirmModalProps extends Omit<ModalProps, 'children'> {
  message?: string;
  subMessage?: string;
  onConfirm: () => void;
}

const ConfirmModal = ({ ...props }: ConfirmModalProps) => {
  return (
    <Modal {...props}>
      <Container>
        <Icon name="alert" size={75} />
        <Message>
          <Title>{props.message || '삭제'}</Title>
          <Text color="gray" size="sm">
            {props.subMessage || '정말 삭제할까요?'}
          </Text>
        </Message>
        <Buttons>
          <Button fontSize={20} onClick={props.onConfirm}>
            확인
          </Button>
          <Button fontSize={20} onClick={props.onClose}>
            취소
          </Button>
        </Buttons>
      </Container>
    </Modal>
  );
};

export default ConfirmModal;

const Container = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;

  button {
    padding: 16px 0;
    flex: 1;
  }
`;
