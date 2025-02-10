import { useState, useRef, useCallback, useEffect } from 'react';
import FDAccountRegistry from './fieldsets/FDAccountRegistry';
import FDAccountSignIn from './fieldsets/FDAccountSignIn';
import FDAccountArticle from './article/FDAccountArticle';

const FDAccountModal = () => {
  const [modal, setModal] = useState<'signin' | 'registry'>('signin');

  const containerRef = useRef<HTMLElement>(null),
    registryRefReceiver = useRef<HTMLUListElement>(null),
    signInRefReceiver = useRef<HTMLUListElement>(null);

  const toggleComponent = useCallback((modal: 'signin' | 'registry') => {
    const attribute: string = 'data-activity';

    for (const ref of [registryRefReceiver, signInRefReceiver]) {
      if (ref.current) {
        const activity: string | null = ref.current.getAttribute(attribute);
        ref.current.setAttribute(attribute, activity === 'active' || activity === 'mount' ? 'disabled' : 'active');
      }
    }

    let compRef: React.RefObject<HTMLUListElement | null>;
    const isModalSignin: boolean = modal === 'signin';

    compRef = isModalSignin ? signInRefReceiver : registryRefReceiver;
    setModal(isModalSignin ? 'signin' : 'registry');

    if (compRef.current) compRef.current.setAttribute('data-activity', 'active');
  }, []);

  useEffect(() => {
    setTimeout(() => containerRef.current?.setAttribute('data-visibility', 'active'), 3200);
  }, []);

  return (
    <main className='fdAccountModal' ref={containerRef}>
      <FDAccountArticle />
      <fieldset className='fdAccountModal__fieldset'>
        {modal === 'signin' ? (
          <FDAccountSignIn toggleComponent={toggleComponent} ref={signInRefReceiver} />
        ) : (
          <FDAccountRegistry toggleComponent={toggleComponent} ref={registryRefReceiver} />
        )}
      </fieldset>
    </main>
  );
};

export default FDAccountModal;
