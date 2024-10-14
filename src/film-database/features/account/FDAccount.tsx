import { useRef, useCallback, RefObject, useEffect } from 'react';
// Features
import FDAccountRegistry from './FDAccountRegistry';
import FDAccountSignIn from './FDAccountSignIn';
import FDAccountGuide from './FDAccountGuide';

type Type_PropDrill = {
  rootRef: RefObject<HTMLDivElement>;
};

const FDAccount = ({ rootRef }: Type_PropDrill) => {
  /** Attribute setter */
  const guideRef = useRef<HTMLElement>(null),
    registryRefReceiver = useRef<HTMLUListElement>(null),
    signInRefReceiver = useRef<HTMLUListElement>(null);

  const toggleComponent = useCallback((modal: 'registry' | 'signin'): void => {
    switch (modal) {
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
    setTimeout(() => guideRef.current?.setAttribute('data-activity', 'mount'), 50);
  }, []);

  return (
    <div className='fdAccount'>
      <div className='fdAccount__container'>
        <aside className='fdAccount__container__guide' ref={guideRef} data-activity='disabled'>
          <FDAccountGuide />
        </aside>
        <main className='fdAccount__container__form'>
          <article className='fdAccount__container__form__article'>
            <hgroup className='fdAccount__container__form__article__hgroup'>
              <span>Film Database</span>
              <p>Watch trailers, get cast details, save movies, create a watch queue and more. Free of charge now, free forever.</p>
            </hgroup>
          </article>
          <fieldset className='fdAccount__container__form__fieldset'>
            <FDAccountSignIn toggleComponent={toggleComponent} ref={signInRefReceiver} />
            <FDAccountRegistry toggleComponent={toggleComponent} ref={registryRefReceiver} />
          </fieldset>
        </main>
      </div>
    </div>
  );
};

export default FDAccount;
