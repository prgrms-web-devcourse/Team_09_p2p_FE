import { ReactNode, useEffect } from 'react';
import { Header } from '~/components/common';
import Footer from '~/components/common/Footer';
import { useUser } from '~/hooks/useUser';
import WebStorage from '~/service/core/WebStorage';

interface LayoutProps {
  children: ReactNode;
  footer?: boolean;
  full?: boolean;
}

const Layout = ({ children, footer, full }: LayoutProps) => {
  const { currentUser, updateUser } = useUser();

  useEffect(() => {
    const token = WebStorage.getToken();
    if (token && currentUser.accessToken !== token) {
      updateUser(token);
    }
  }, [currentUser.accessToken]);

  useEffect(() => {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(process.env.NEXT_PUBLIC_KAKAO_SHARE_KEY);
    }
  }, []);

  return (
    <div>
      <Header full={full} />
      {children}
      {footer && <Footer />}
    </div>
  );
};

export default Layout;
