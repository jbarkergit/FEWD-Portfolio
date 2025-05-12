import { useState, useRef, useEffect } from 'react';
import FDAccountRegistry from './fieldsets/FDAccountRegistry';
import FDAccountSignIn from './fieldsets/FDAccountSignIn';
import FDAccountReset from './fieldsets/FDAccountReset';
import { useLoaderData } from 'react-router';
const FDAccountModal = () => {
  // Loader data
  const { accountData } = useLoaderData();

  // Primary state forcing rerenders
  const [modal, setModal] = useState<'signin' | 'registry' | 'reset'>('signin');

  // References to modal's children components
  const accountRef = useRef<HTMLDivElement>(null),
    registryRefReceiver = useRef<HTMLUListElement>(null),
    signInRefReceiver = useRef<HTMLUListElement>(null),
    resetRefReceiver = useRef<HTMLUListElement>(null);

  /**
   * @function setTimeout
   * @description Sets timeout to delay modal visibility
   */
  setTimeout(() => accountRef.current?.setAttribute('data-visible', 'true'), 3200);

  /**
   * @function toggleModalVisibility
   * @description Toggles visibility of modal's components
   */
  function toggleModalVisibility(): void {
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

  // JSX
  return (
    <main className='fdAccountModal' ref={accountRef} data-visible='false'>
      <article className='fdAccountModal__article'>
        <img
          className='fdAccountBackground__backdrop__set__li__container--img'
          src={`https://image.tmdb.org/t/p/${`original`}/${accountData[0][0].backdrop_path}`}
          alt={`${accountData[0][0]?.title}`}
        />
        <h2>Film Database</h2>
        <p>Watch trailers, get cast details, save movies, create a watch queue and more. Free of charge now, free forever.</p>
      </article>
      <div className='fdAccountModal__modals'>
        {modal === 'signin' && <FDAccountSignIn setModal={setModal} ref={signInRefReceiver} />}
        {modal === 'registry' && <FDAccountRegistry setModal={setModal} ref={registryRefReceiver} />}
        {modal === 'reset' && <FDAccountReset setModal={setModal} ref={resetRefReceiver} />}
      </div>
    </main>
  );
};

export default FDAccountModal;
