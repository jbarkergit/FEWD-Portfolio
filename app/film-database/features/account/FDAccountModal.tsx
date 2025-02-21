import { useState, useRef, useEffect, type FC, type ReactNode } from 'react';
import FDAccountRegistry from './fieldsets/FDAccountRegistry';
import FDAccountSignIn from './fieldsets/FDAccountSignIn';
import FDAccountArticle from './article/FDAccountArticle';
import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import FDAccountReset from './fieldsets/FDAccountReset';

const FDAccountModal = ({ responseSetArr }: { responseSetArr: Namespace_Tmdb.BaseMedia_Provider[][] }) => {
  // Primary state forcing rerenders
  const [modal, setModal] = useState<'signin' | 'registry' | 'reset'>('signin');

  // References to modal's children components
  const accountRef = useRef<HTMLDivElement>(null),
    registryRefReceiver = useRef<HTMLUListElement>(null),
    signInRefReceiver = useRef<HTMLUListElement>(null),
    resetRefReceiver = useRef<HTMLUListElement>(null);

  // Delay modal visibility on mount
  setTimeout(() => accountRef.current?.setAttribute('data-visible', 'true'), 3200);

  // Handle visibility of modal's components (sign in && registry)
  function toggleModalVisibility() {
    const attribute: string = 'data-visible';

    for (const ref of [registryRefReceiver, signInRefReceiver, resetRefReceiver]) {
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

  useEffect(() => toggleModalVisibility(), [modal]);

  // Modal components shared parents
  const ModalParent: FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <form className='fdAccountModal__form'>
        <fieldset className='fdAccountModal__form__fieldset'>{children}</fieldset>
      </form>
    );
  };

  // JSX
  return (
    <main className='fdAccountModal' ref={accountRef} data-visible='false'>
      <FDAccountArticle responseSetArr={responseSetArr} />
      <div className='fdAccountModal__modals'>
        {modal === 'signin' && <FDAccountSignIn ModalParent={ModalParent} setModal={setModal} ref={signInRefReceiver} />}
        {modal === 'registry' && <FDAccountRegistry ModalParent={ModalParent} setModal={setModal} ref={registryRefReceiver} />}
        {modal === 'reset' && <FDAccountReset ModalParent={ModalParent} setModal={setModal} ref={resetRefReceiver} />}
      </div>
    </main>
  );
};

export default FDAccountModal;
