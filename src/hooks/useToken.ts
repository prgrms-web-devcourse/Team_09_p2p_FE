import { useEffect, useMemo, useState } from 'react';
import TokenStorage from '~/utils/storage/TokenStorage';

const useToken = () => {
  const storage = useMemo(() => TokenStorage, []);
  const [tokenState, setTokenState] = useState<string | undefined>();

  useEffect(() => {
    setTokenState(storage.getToken());
  }, [storage]);

  return {
    token: tokenState,
    setToken: (token: string) => storage.setToken(token),
    removeToken: () => storage.removeToken()
  };
};

export default useToken;
