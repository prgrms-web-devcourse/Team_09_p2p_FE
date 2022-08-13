import styled from '@emotion/styled';
import { useState } from 'react';
import { Text } from '~/components/atom';
import { useTimeout } from '~/hooks';
import theme from '~/styles/theme';

export interface Toast {
  id: string;
  message: string;
  duration: number;
}

interface ToastItemProps {
  toast: Toast;
  onDone?: () => void;
}

const ToastItem = ({ toast, onDone }: ToastItemProps) => {
  const { message, duration } = toast;
  const [show, setShow] = useState(true); // animation을 위한 상태
  useTimeout(() => {
    setShow(false);
    setTimeout(() => onDone && onDone(), 400);
  }, duration);

  return (
    <Container style={{ opacity: show ? 1 : 0 }}>
      <ProgressBar style={{ animationDuration: `${duration}ms` }} />
      <Text>{message}</Text>
    </Container>
  );
};

export default ToastItem;

const Container = styled.div`
  position: relative;
  display: flex;
  width: 300px;
  height: 70px;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  /* border-top-left-radius: 0;
  border-top-right-radius: 0; */
  border: 1px solid #ccc;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  opacity: 1;
  transition: opacity 0.4s ease-out;
  &:first-of-type {
    animation: move 0.4s ease-out forwards;
  }
  &:not(:first-of-type) {
    margin-top: 8px;
  }
  @keyframes move {
    0% {
      margin-top: -80px;
    }
    100% {
      margin-top: 0;
    }
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 4px;
  //background-color: ${theme.color.mainColor};
  animation-name: progress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  @keyframes progress {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;
