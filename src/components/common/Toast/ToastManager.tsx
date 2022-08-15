import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import ToastItem, { Toast } from './ToastItem';

export type CreateToast = (message: string, duration: number) => void;

interface ToastManagerProps {
  bind: (createToast: CreateToast) => void;
}

const ToastManager = ({ bind }: ToastManagerProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const createToast = useCallback((message: string, duration: number) => {
    const newToast = {
      id: Date.now().toString(),
      message,
      duration
    };
    setToasts((oldToasts) => [...oldToasts, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((oldToasts) => oldToasts.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    bind(createToast);
  }, [bind, createToast]);

  return (
    <Container>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDone={() => removeToast(toast.id)} />
      ))}
    </Container>
  );
};

export default ToastManager;

const Container = styled.div`
  position: fixed;
  top: 10px;
  z-index: 1500;
`;
