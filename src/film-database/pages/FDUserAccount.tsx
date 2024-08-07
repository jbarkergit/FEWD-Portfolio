// Deps
import { RefObject, useEffect, useRef, useState } from 'react';
// Features
import FDAccountArticle from '../features/account/FDAccountArticle';
import FDAccountBackground from '../features/account/FDAccountBackground';
import FDAccountRegistry from '../features/account/FDAccountRegistry';

type Type_PropDrill = {
  rootRef: RefObject<HTMLDivElement>;
};

const FDUserAccount = ({ rootRef }: Type_PropDrill) => {
  /** Attribute setter */
  const [modal, setModal] = useState<'article' | 'registry' | 'signin'>('article');
  const articleRefReceiver = useRef<HTMLElement>(null);
  const registryRefReceiver = useRef<HTMLFormElement>(null);

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

  useEffect(() => {
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
  }, [modal]);

  /** Component */
  return (
    <>
      <FDAccountBackground />
      <FDAccountArticle setModal={setModal} ref={articleRefReceiver} />
      <FDAccountRegistry setModal={setModal} ref={registryRefReceiver} />
    </>
  );
};

export default FDUserAccount;
