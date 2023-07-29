import { useEffect, useRef, useState } from 'react';
import { useModalContext } from '../../../../context/modal/ModalContext';
import { Apple, Google, LinkedIn } from '../data/SignInVia';

const AccountModal = (): JSX.Element => {
  //@ts-ignore
  const { ecoModalTab } = useModalContext(),
    ecoModal = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (ecoModal.current) ecoModalTab === 'account' ? ecoModal.current.setAttribute('data-status', 'active') : ecoModal.current.setAttribute('data-status', 'false');
  }, [ecoModalTab]);

  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userSignedIn, setUserSignedIn] = useState<boolean>(false);

  function handleSubmit() {}

  return (
    <section className="ecoModalWrap">
      <form className="ecoModal" onSubmit={handleSubmit} data-status="false" ref={ecoModal}>
        <legend className="ecoModal__header">
          <h2>Account</h2>
        </legend>
        <div className="ecoModal__signInVia">
          <button>
            <Google />
          </button>
          <button>
            <Apple />
          </button>
          <button>
            <LinkedIn />
          </button>
        </div>
        <fieldset className="ecoModal__inputField">
          <label htmlFor="emailAddress">
            <input type="text" placeholder="Email Address" value={emailAddress} required onChange={(event) => setEmailAddress(event.target.value)} />
          </label>
          <label htmlFor="password">
            <input type="text" placeholder="Last Name" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
        </fieldset>
        {!userSignedIn ? (
          <>
            <div>
              <p>Not a member? Sign up!</p>
            </div>
            <button type="submit">Sign in</button>
          </>
        ) : (
          <>
            <button type="submit">Sign out</button>
          </>
        )}
      </form>
    </section>
  );
};

export default AccountModal;
