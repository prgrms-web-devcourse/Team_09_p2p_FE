import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
  selector: string;
}

const Portal = ({ children, selector }: PortalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setIsBrowser(true);
    if (!document.querySelector(selector)) {
      throw new Error('portal is not defined');
    }
    setPortalElement(() => document.querySelector(selector));
    return () => setPortalElement(null);
  }, [selector]);

  return isBrowser && portalElement ? ReactDOM.createPortal(children, portalElement) : null;
};

export default Portal;
