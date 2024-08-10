// Deps
import { RefObject, useEffect, useRef } from 'react';
// Features
import FDAccountArticle from '../features/account/FDAccountArticle';
import FDAccountBackground from '../features/account/FDAccountBackground';
import FDAccountRegistry from '../features/account/FDAccountRegistry';

type Type_PropDrill = {
  rootRef: RefObject<HTMLDivElement>;
};

const FDUserAccount = ({ rootRef }: Type_PropDrill) => {
  /** Attribute setter */
  const articleRefReceiver = useRef<HTMLElement>(null);
  const registryRefReceiver = useRef<HTMLDivElement>(null);

  const toggleComponent = (modal: 'article' | 'registry' | 'signin'): void => {
    switch (modal) {
      case 'article':
        if (articleRefReceiver.current) handleAttributes(articleRefReceiver);
        break;

      case 'registry':
        handleAttributes(registryRefReceiver);
        break;

      // case 'signin':
      //   enableAttribute()
      //   break;

      default:
        console.log('default');
        break;
    }
  };

  useEffect(() => toggleComponent('article'), []);

  const handleAttributes = (ref: RefObject<HTMLElement>): void => {
    console.log(ref);

    if (!rootRef.current) return;
    const rootRefChildren = [...rootRef.current.children];

    rootRefChildren.forEach((child: Element) => {
      if (child.getAttribute('data-activity') === 'active') {
        child.setAttribute('data-activity', 'disabled');
      }
    });

    ref.current?.setAttribute('data-activity', 'active');
  };

  /** Component */
  return (
    <>
      <FDAccountBackground />
      <FDAccountArticle toggleComponent={toggleComponent} ref={articleRefReceiver} />
      <FDAccountRegistry toggleComponent={toggleComponent} ref={registryRefReceiver} />
    </>
  );
};

export default FDUserAccount;
