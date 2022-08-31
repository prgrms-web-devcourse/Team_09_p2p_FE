import { ReactNode, useEffect, useState } from 'react';
import { Header } from '~/components/common';
import Footer from '~/components/common/Footer';
import { useToken } from '~/hooks';
import { useUser } from '~/hooks/useUser';

interface LayoutProps {
  children: ReactNode;
  footer?: boolean;
  full?: boolean;
}

const Layout = ({ children, footer, full }: LayoutProps) => {
  const { token } = useToken();
  const { currentUser, updateUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const compareUser = async (token: string) => {
    setIsLoading(true);
    await updateUser(token);
    setIsLoading(false);
  };
  useEffect(() => {
    if (token && currentUser.accessToken !== token) {
      compareUser(token);
    }
  }, [currentUser.accessToken, token]);

  return (
    <div>
      <Header full={full} isLoading={isLoading} />
      {children}
      {footer && <Footer />}
    </div>
  );
};

export default Layout;
