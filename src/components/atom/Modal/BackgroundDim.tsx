import styled from '@emotion/styled';
import React, { ReactNode, useEffect } from 'react';
import { useClickAway } from '~/hooks';

export interface BackgroundDimProps {
  visible: boolean;
  children: ReactNode;
  onClose?: () => void;
  closeDimActive?: boolean;
  dimOpacity?: number;
}

const blockTabKey = (e: KeyboardEvent): void => {
  if (e.key === 'Tab') {
    e.preventDefault();
  }
};

const BackgroundDim = ({
  visible,
  children,
  onClose,
  closeDimActive = true,
  dimOpacity = 0.5
}: BackgroundDimProps) => {
  const ref = useClickAway<HTMLDivElement>(() => {
    if (closeDimActive && onClose) {
      onClose();
    }
  });

  useEffect(() => {
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', blockTabKey);
    document.addEventListener('keyup', blockTabKey);
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', blockTabKey);
      document.removeEventListener('keyup', blockTabKey);
    };
  }, []);
  return (
    <Background visible={visible} dimOpacity={dimOpacity}>
      <Inner ref={ref}>{children}</Inner>
    </Background>
  );
};

export default BackgroundDim;

const Background = styled.div<Pick<BackgroundDimProps, 'visible' | 'dimOpacity'>>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ dimOpacity }) => `rgba(0, 0, 0, ${dimOpacity})`};
  z-index: 1000;
  overflow: hidden;
`;

const Inner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: 4px;
`;
