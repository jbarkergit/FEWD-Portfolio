import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Apple, Google, LinkedIn } from '../../../../assets/production-images/user-account-svg/SignInViaSVGS';

//Prop drilling
type PropType = {
  uiModal: string;
  setUiModal: Dispatch<SetStateAction<string>>;
};

const UserLoginModal = ({ uiModal, setUiModal }: PropType): JSX.Element => {
  //Form Toggle
  const userLoginModal = useRef<HTMLFormElement>(null);
  useEffect(() => userLoginModal.current?.setAttribute('data-status', uiModal === 'userLogin' ? 'active' : 'false'), [uiModal]);

  //Form Exterior Click Handler
  useEffect(() => {
    const handleExteriorClick = (e: PointerEvent) => {
      if (!userLoginModal.current?.contains(e.target as Node)) setUiModal('');
      clearLoginInputValues();
    };
    document.body.addEventListener('pointerdown', handleExteriorClick);
    return () => document.body.removeEventListener('pointerdown', handleExteriorClick);
  }, [uiModal]);

  //Feature: toggle password visibility
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  //Form validation state
  const [emailAddressInputFocus, setEmailAddressInputFocus] = useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>('test@email.com');
  const [validEmailAddress, setValidEmailAddress] = useState<boolean>(false);

  const [passwordInputFocus, setPasswordInputFocus] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('test');
  const [validPassword, setValidPassword] = useState<boolean>(false);

  // const [passwordInputFocus, setPasswordInputFocus] = useState<boolean>(false);
  // const [password, setPassword] = useState<string>('test');
  // const [validPassword, setValidPassword] = useState<boolean>(false);

  // const [passwordInputFocus, setPasswordInputFocus] = useState<boolean>(false);
  // const [password, setPassword] = useState<string>('test');
  // const [validPassword, setValidPassword] = useState<boolean>(false);

  //Form input value clear hook
  const clearLoginInputValues = () => {
    //Clear Email Address state
    setEmailAddressInputFocus(false);
    setEmailAddress('');
    setValidEmailAddress(false);
    //Clear Password state
    setPasswordInputFocus(false);
    setPassword('');
    setValidPassword(false);
  };

  //Focus & Error References
  const userRef = useRef();
  const errorRef = useRef();

  //Form submission hook
  const useLoginFormSubmission = () => {};

  return (
    <section className='ecoModalWrap'>
      <form className='ecoModal accountModal' onSubmit={useLoginFormSubmission} data-status='false' ref={userLoginModal}>
        <legend>
          <h2>My Account</h2>
        </legend>
        <>
          <fieldset className='ecoModal__inputField'>
            <label htmlFor='emailAddress'>
              <input type='text' placeholder='Email Address' value={emailAddress} required onChange={(event) => setEmailAddress(event.target.value)} />
            </label>
            <label htmlFor='password' className='passwordLabel'>
              {passwordVisible ? (
                <input type='text' placeholder='Password' value={password} required onChange={(event) => setPassword(event.target.value)} />
              ) : (
                <input type='password' placeholder='Password' value={password} required onChange={(event) => setPassword(event.target.value)} />
              )}
              <button className='passwordLabel__visibility' onClick={() => setPasswordVisible(passwordVisible ? false : true)}>
                {passwordVisible ? (
                  <svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' viewBox='0 0 14 14'>
                    <g fill='none' stroke='hsl(0, 0%, 20%)' strokeLinecap='round' strokeLinejoin='round'>
                      <path d='M13.23 6.33a1 1 0 0 1 0 1.34C12.18 8.8 9.79 11 7 11S1.82 8.8.77 7.67a1 1 0 0 1 0-1.34C1.82 5.2 4.21 3 7 3s5.18 2.2 6.23 3.33Z'></path>
                      <circle cx='7' cy='7' r='2'></circle>
                    </g>
                  </svg>
                ) : (
                  <svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' viewBox='0 0 14 14'>
                    <g fill='none' stroke='hsl(0, 0%, 20%)' strokeLinecap='round' strokeLinejoin='round'>
                      <path d='M12.29 5.4c.38.34.7.67.94.93a1 1 0 0 1 0 1.34C12.18 8.8 9.79 11 7 11h-.4m-2.73-.87a12.4 12.4 0 0 1-3.1-2.46a1 1 0 0 1 0-1.34C1.82 5.2 4.21 3 7 3a6.56 6.56 0 0 1 3.13.87M12.5 1.5l-11 11'></path>
                      <path d='M5.59 8.41A2 2 0 0 1 5 7a2 2 0 0 1 2-2a2 2 0 0 1 1.41.59M8.74 8a2 2 0 0 1-.74.73'></path>
                    </g>
                  </svg>
                )}
              </button>
            </label>
          </fieldset>
          <div className='ecoModal__actions'>
            <button type='submit'>Log in</button>
            <button type='submit'>Sign up</button>
          </div>
          <div className='ecoModal__signInVia'>
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
          <div className='ecoModal__notice'>
            <span>Privacy notice</span>
            <p>
              This input field is not submitted to 3rd party services. Optional account registry features are solely cosmetic. Any information provided will not be
              stored externally nor locally. A dummy account has been provided to protect your privacy.
            </p>
          </div>
        </>
      </form>
    </section>
  );
};

export default UserLoginModal;
