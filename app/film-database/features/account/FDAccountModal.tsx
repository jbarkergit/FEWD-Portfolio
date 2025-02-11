import { useState, useRef, useEffect } from 'react';
import FDAccountRegistry from './fieldsets/FDAccountRegistry';
import FDAccountSignIn from './fieldsets/FDAccountSignIn';
import FDAccountArticle from './article/FDAccountArticle';

const FDAccountModal = () => {
  const [modal, setModal] = useState<'signin' | 'registry'>('signin');

  const accountRef = useRef<HTMLDivElement>(null),
    registryRefReceiver = useRef<HTMLUListElement>(null),
    signInRefReceiver = useRef<HTMLUListElement>(null);

  function toggleComponent() {
    const attribute: string = 'data-visible';

    for (const ref of [registryRefReceiver, signInRefReceiver]) {
      if (ref.current) {
        const visibility: string | null = ref.current.getAttribute(attribute);
        const isVisible: boolean = visibility === 'true' || visibility === 'mount';
        ref.current.setAttribute(attribute, isVisible ? 'false' : 'true');
      }
    }

    let compRef: React.RefObject<HTMLUListElement | null>;
    const isModalSignin: boolean = modal === 'signin';

    compRef = isModalSignin ? signInRefReceiver : registryRefReceiver;
    setModal(isModalSignin ? 'signin' : 'registry');

    if (compRef.current) compRef.current.setAttribute(attribute, 'true');
  }

  useEffect(() => toggleComponent(), [modal]);

  useEffect(() => {
    setTimeout(() => accountRef.current?.setAttribute('data-visible', 'true'), 3200);
  }, []);

  return (
    <main className='fdAccountModal' ref={accountRef} data-visible='false'>
      <FDAccountArticle />
      <form className='fdAccountModal__form'>
        <fieldset className='fdAccountModal__form__fieldset'>
          {modal === 'signin' ? (
            <FDAccountSignIn setModal={setModal} ref={signInRefReceiver} />
          ) : (
            <FDAccountRegistry setModal={setModal} ref={registryRefReceiver} />
          )}
        </fieldset>
      </form>
    </main>
  );
};

export default FDAccountModal;
