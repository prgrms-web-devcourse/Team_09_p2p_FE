import { useEffect, useMemo, useState } from 'react';
import TokenStorage from '~/utils/storage/TokenStorage';

const useToken = () => {
  const storage = useMemo(() => TokenStorage, []);
  const [token, _setToken] = useState<string | undefined>();

  useEffect(() => {
    _setToken(storage.getToken());
  }, [storage]);

  return {
    token,
    setToken: (token: string) => storage.setToken(token),
    removeToken: () => storage.removeToken()
  };
};

export default useToken;
