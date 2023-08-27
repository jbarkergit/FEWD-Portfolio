import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Apple, Google, LinkedIn } from '../../../assets/production-images/user-account-svg/SignInViaSVGS';

type PropType = {
  uiModal: string;
  setUiModal: Dispatch<SetStateAction<string>>;
};

function handleSubmit() {}

const UserLoginModal = ({ uiModal, setUiModal }: PropType): JSX.Element => {
  const userLoginModal = useRef<HTMLFormElement>(null);

  useEffect(() => userLoginModal.current?.setAttribute('data-status', uiModal === 'userLogin' ? 'active' : 'false'), [uiModal]);

  useEffect(() => {
    const handleExteriorClick = (e: PointerEvent) => {
      if (!userLoginModal.current?.contains(e.target as Node) && !(e.target as HTMLButtonElement).classList.contains('ctaBtn')) setUiModal('');
    };

    document.body.addEventListener('pointerdown', handleExteriorClick);
    return () => document.body.removeEventListener('pointerdown', handleExteriorClick);
  }, []);

  const [emailAddress, setEmailAddress] = useState<string>('test@email.com');
  const [password, setPassword] = useState<string>('test');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  let userSignedIn: boolean = false;

  return (
    <section className="ecoModalWrap">
      <form className="ecoModal accountModal" onSubmit={handleSubmit} data-status="false" ref={userLoginModal}>
        <legend>
          <h2>My Account</h2>
        </legend>
        {!userSignedIn ? (
          <>
            <fieldset className="ecoModal__inputField">
              <label htmlFor="emailAddress">
                <input type="text" placeholder="Email Address" value={emailAddress} required onChange={(event) => setEmailAddress(event.target.value)} />
              </label>
              <label htmlFor="password" className="passwordLabel">
                {passwordVisible ? (
                  <input type="text" placeholder="Password" value={password} required onChange={(event) => setPassword(event.target.value)} />
                ) : (
                  <input type="password" placeholder="Password" value={password} required onChange={(event) => setPassword(event.target.value)} />
                )}
                <button className="passwordLabel__visibility" onClick={() => setPasswordVisible(passwordVisible ? false : true)}>
                  {passwordVisible ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14">
                      <g fill="none" stroke="hsl(0, 0%, 20%)" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13.23 6.33a1 1 0 0 1 0 1.34C12.18 8.8 9.79 11 7 11S1.82 8.8.77 7.67a1 1 0 0 1 0-1.34C1.82 5.2 4.21 3 7 3s5.18 2.2 6.23 3.33Z"></path>
                        <circle cx="7" cy="7" r="2"></circle>
                      </g>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14">
                      <g fill="none" stroke="hsl(0, 0%, 20%)" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12.29 5.4c.38.34.7.67.94.93a1 1 0 0 1 0 1.34C12.18 8.8 9.79 11 7 11h-.4m-2.73-.87a12.4 12.4 0 0 1-3.1-2.46a1 1 0 0 1 0-1.34C1.82 5.2 4.21 3 7 3a6.56 6.56 0 0 1 3.13.87M12.5 1.5l-11 11"></path>
                        <path d="M5.59 8.41A2 2 0 0 1 5 7a2 2 0 0 1 2-2a2 2 0 0 1 1.41.59M8.74 8a2 2 0 0 1-.74.73"></path>
                      </g>
                    </svg>
                  )}
                </button>
              </label>
            </fieldset>
            <div className="ecoModal__actions">
              <button type="submit">Sign in</button>
            </div>
            <div className="ecoModal__signInVia">
              <button>
                <Google />
              </button>
              <button>
                <LinkedIn />
              </button>
              <button>
                <Apple />
              </button>
            </div>
            <div className="ecoModal__notice">
              <span>Privacy notice: for demo purposes only.</span>
              <p>
                This input field is not connected to live marketing services. Any information provided will not be stored externally nor locally. A dummy account has
                been provided for your convenience and privacy.
              </p>
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
