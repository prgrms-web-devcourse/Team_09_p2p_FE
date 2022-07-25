import { useCallback, useState } from 'react';

const useToggle = (initialState = false) => {
  const [state, setState] = useState<typeof initialState>(initialState);
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};

export default useToggle;
