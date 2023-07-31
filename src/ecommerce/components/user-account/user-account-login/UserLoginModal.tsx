import { useEffect, useRef, useState } from 'react';
import { useModalContext } from '../../../context/ModalContext';
import { Apple, Google, LinkedIn } from '../user-account-assets/SignInViaSVGS';

const UserLoginModal = (): JSX.Element => {
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
      <form className="ecoModal accountModal" onSubmit={handleSubmit} data-status="false" ref={ecoModal}>
        <legend className="ecoModal__heading">
          <h2>Account</h2>
        </legend>
        {!userSignedIn ? (
          <>
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
            <div className="ecoModal__actions">
              <p>Not a member? Sign up!</p>
              <button type="submit">Sign in</button>
            </div>
            <div className="ecoModal__notice">
              <span>Privacy notice: for demo purposes only.</span>
              <mark>
                <p>This input field is not connected to live marketing services. Any information provided will not be stored externally or locally.</p>
              </mark>
            </div>
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

export default UserLoginModal;
