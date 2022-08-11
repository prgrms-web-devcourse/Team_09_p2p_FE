import styled from '@emotion/styled';
import { CSSProperties, ReactNode } from 'react';

type LayoutType = 'main' | 'detail';

interface PageContainer {
  type?: LayoutType;
  children: ReactNode;
  style?: CSSProperties;
}

const PageContainer = ({ type = 'main', children, ...props }: PageContainer) => {
  return (
    <Container type={type} {...props}>
      {children}
    </Container>
  );
};

export default PageContainer;

const Container = styled.div<{ type: LayoutType }>`
  width: ${({ type }) => (type === 'main' ? '1156px' : '796px')};
  margin: 0 auto;
`;
