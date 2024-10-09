// Deps
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
// Composable Types
import { Type_Tmdb_Api_Union } from '../composables/tmdb-api/types/TmdbDataTypes';
// Features
import FDAccountArticle from '../features/account/FDAccountArticle';
import FDAccountBackground from '../features/account/FDAccountBackground';
import FDAccountRegistry from '../features/account/FDAccountRegistry';
import FDAccountSignIn from '../features/account/FDAccountSignIn';

type Type_PropDrill = {
  rootRef: RefObject<HTMLDivElement>;
};

const FDUserAccount = ({ rootRef }: Type_PropDrill) => {
  const [responseSets, setResponseSets] = useState<Type_Tmdb_Api_Union[][]>([]);

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

  /** Component */
  return (
    <>
      <FDAccountBackground responseSets={responseSets} setResponseSets={setResponseSets} />
      <FDAccountArticle toggleComponent={toggleComponent} ref={articleRefReceiver} />
      <FDAccountSignIn toggleComponent={toggleComponent} ref={signInRefReceiver} />
      <FDAccountRegistry toggleComponent={toggleComponent} ref={registryRefReceiver} />
    </>
  );
};

export default FDUserAccount;
