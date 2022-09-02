import { useCallback } from 'react';

function useMoveScroll(id: string) {
  const onMoveToElement = useCallback(() => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [id]);

  return { onMoveToElement };
}

export default useMoveScroll;
