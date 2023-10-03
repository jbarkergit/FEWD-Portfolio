import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

//Prop drill from UserAccountModal
type PropType = {
  uiModal: string;
  setUiModal: Dispatch<SetStateAction<string>>;
};

const UserAccountActive = ({ uiModal, setUiModal }: PropType) => {
  const userAccountModal = useRef<HTMLElement>(null); //Modal form reference

  //Form Exterior Click Handler
  useEffect(() => {
    const handleExteriorClick = (e: PointerEvent) => {
      if (
        uiModal === 'userActive' &&
        userAccountModal.current &&
        userAccountModal.current.getAttribute('data-status') === 'active' &&
        !userAccountModal.current?.contains(e.target as Node)
      ) {
        setUiModal('');
      }
    };

    document.body.addEventListener('pointerdown', handleExteriorClick);
    return () => document.body.removeEventListener('pointerdown', handleExteriorClick);
  }, [uiModal]);

  return (
    <section className='modalWrapper' data-status={uiModal === 'userActive' ? 'active' : 'false'}>
      <section className='ecoModal' data-status={uiModal === 'userActive' ? 'active' : 'false'} ref={userAccountModal}>
        <div className='ecoModal__container'>
          <legend>
            <h2>My Account</h2>
          </legend>
          <div className='ecoModal__container__buttons'>
            <button onClick={() => localStorage.setItem('userSignedIn', JSON.stringify(false))}>Log out</button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default UserAccountActive;
