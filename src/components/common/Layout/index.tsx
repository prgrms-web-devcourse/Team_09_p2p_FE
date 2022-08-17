import { ReactNode, useEffect, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);

  const compareUser = async (token: string) => {
    setIsLoading(true);
    await updateUser(token);
    setIsLoading(false);
  };
  useEffect(() => {
    const token = WebStorage.getToken();
    if (token && currentUser.accessToken !== token) {
      compareUser(token);
    }
  }, [currentUser.accessToken]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.NEXT_PUBLIC_KAKAO_SHARE_KEY);
      }
    }
  }, []);

  return (
    <div>
      <Header full={full} isLoading={isLoading} />
      {children}
      {footer && <Footer />}
    </div>
  );
};

export default Layout;
