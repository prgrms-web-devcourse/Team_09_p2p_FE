import styled from '@emotion/styled';
import React, { ReactNode, useEffect } from 'react';

interface BackgroundDimProps {
  children: ReactNode;
}

const blockTabKey = (e: KeyboardEvent): void => {
  if (e.key === 'Tab') {
    e.preventDefault();
  }
};

const BackgroundDim: React.FC<BackgroundDimProps> = ({ children }) => {
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
    <Background>
      <Inner>{children}</Inner>
    </Background>
  );
};

export default BackgroundDim;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
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
