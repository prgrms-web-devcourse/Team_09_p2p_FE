import { ReactNode } from 'react';
import { Header } from '~/components/common';
import Footer from '~/components/common/Footer';

interface LayoutProps {
  children: ReactNode;
  footer?: boolean;
  full?: boolean;
}

const Layout = ({ children, footer, full }: LayoutProps) => {
  return (
    <div>
      <Header full={full} />
      {children}
      {footer && <Footer />}
    </div>
  );
};

export default Layout;
