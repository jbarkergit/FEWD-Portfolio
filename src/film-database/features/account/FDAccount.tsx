import { useRef, useCallback, RefObject, useEffect } from 'react';
// Features
import FDAccountArticle from './FDAccountArticle';
import FDAccountRegistry from './FDAccountRegistry';
import FDAccountSignIn from './FDAccountSignIn';

type Type_PropDrill = {
  rootRef: RefObject<HTMLDivElement>;
};

const FDAccount = ({ rootRef }: Type_PropDrill) => {
  /** Attribute setter */
  const articleRefReceiver = useRef<HTMLElement>(null);
  const registryRefReceiver = useRef<HTMLDivElement>(null);
  const signInRefReceiver = useRef<HTMLDivElement>(null);

  const toggleComponent = useCallback((modal: 'article' | 'registry' | 'signin'): void => {
    switch (modal) {
      case 'article':
        if (articleRefReceiver.current) handleAttributes(articleRefReceiver);
        break;

      case 'registry':
        if (registryRefReceiver.current) handleAttributes(registryRefReceiver);
        break;

      case 'signin':
        if (signInRefReceiver.current) handleAttributes(signInRefReceiver);
        break;

      default:
        break;
    }
  }, []);

  const handleAttributes = (ref: RefObject<HTMLElement>): void => {
    if (!rootRef.current) return;
    const rootRefChildren = [...rootRef.current.children];

    rootRefChildren.forEach((child: Element) => {
      const activity: string | null = child.getAttribute('data-activity');
      if (activity === 'active' || activity === 'mount') {
        child.setAttribute('data-activity', 'disabled');
      }
    });

    ref.current?.setAttribute('data-activity', 'active');
  };

  useEffect(() => {
    setTimeout(() => articleRefReceiver.current?.setAttribute('data-activity', 'mount'), 50);
  }, []);

  return (
    <div className='fdAccount'>
      <FDAccountArticle toggleComponent={toggleComponent} ref={articleRefReceiver} />
      <FDAccountSignIn toggleComponent={toggleComponent} ref={signInRefReceiver} />
      <FDAccountRegistry toggleComponent={toggleComponent} ref={registryRefReceiver} />
    </div>
  );
};

export default FDAccount;
