import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Apple, Google, LinkedIn } from '../../../../assets/production-images/user-account-svg/SignInViaSVGS';
import { userEmailAddressRegex, userPasswordRegex } from '../shared/authentication/userAccountRegExp';

//Prop drilling
type PropType = {
  uiModal: string;
  setUiModal: Dispatch<SetStateAction<string>>;
  setUserSignedIn: Dispatch<SetStateAction<boolean>>;
};

const UserLoginModal = ({ uiModal, setUiModal, setUserSignedIn }: PropType): JSX.Element => {
  const userLoginModal = useRef<HTMLFormElement>(null); //Form Reference
  const emailAddressInputFieldRef = useRef<HTMLInputElement>(null); //Email Address Input Field Reference
  const passwordInputFieldRef = useRef<HTMLInputElement>(null); //Password Input Field Reference

  //Form Toggle
  useEffect(() => userLoginModal.current?.setAttribute('data-status', uiModal === 'userLogin' ? 'active' : 'false'), [uiModal]);

  //Feature: toggle password visibility state
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  //Form validation state
  const [emailAddress, setEmailAddress] = useState<string>('test@email.com');
  const [validEmailAddress, setValidEmailAddress] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('test');
  const [validPassword, setValidPassword] = useState<boolean>(false);

  //Form input value clear hook
  const clearLoginInputValues = (): void => {
    setEmailAddress('');
    setValidEmailAddress(false);
    setPassword('');
    setValidPassword(false);
  };

  //Form Exterior Click Handler
  useEffect(() => {
    const handleExteriorClick = (e: PointerEvent) => {
      if (!userLoginModal.current?.contains(e.target as Node)) {
        setUiModal('');
        clearLoginInputValues();
      }
    };
    document.body.addEventListener('pointerdown', handleExteriorClick);
    return () => document.body.removeEventListener('pointerdown', handleExteriorClick);
  }, [uiModal]);

  //Form input value RegExp validation
  useEffect(() => setValidEmailAddress(userEmailAddressRegex.test(emailAddress)), [emailAddress]);
  useEffect(() => setValidPassword(userPasswordRegex.test(password)), [password]);

  //Input field ERROR state
  const [emailAddressErrorPrompt, setEmailAddressErrorPrompt] = useState<boolean>(false);
  const [passwordErrorPrompt, setPasswordErrorPrompt] = useState<boolean>(false);

  useEffect(() => (!validEmailAddress && emailAddress.length > 0 ? setEmailAddressErrorPrompt(true) : setEmailAddressErrorPrompt(false)), [validEmailAddress]);
  useEffect(() => (!validPassword && password.length > 0 ? setPasswordErrorPrompt(true) : setPasswordErrorPrompt(false)), [validPassword]);

  //Form submission hook
  const useLoginFormSubmission = () => (validEmailAddress && validPassword ? setUserSignedIn(true) : setUserSignedIn(false));

  return (
    <section className='ecoModalWrap'>
      <form className='ecoModal accountModal' onSubmit={useLoginFormSubmission} data-status='false' ref={userLoginModal}>
        <legend>
          <h2>My Account</h2>
        </legend>
        <>
          <fieldset className='ecoModal__inputField'>
            <label htmlFor='emailAddress' data-error={!validPassword ? 'true' : 'false'}>
              <input
                type='text'
                placeholder='Email Address'
                value={emailAddress}
                required
                autoFocus
                aria-invalid={validEmailAddress ? 'false' : 'true'}
                aria-describedby='uidnote'
                ref={emailAddressInputFieldRef}
                onClick={() => focus()}
                onChange={(event) => setEmailAddress(event.target.value)}
              />
            </label>
            {emailAddressErrorPrompt ? (
              <figure className='inputFieldErrorMessage'>
                <figcaption style={{ display: 'none' }}>Error Message</figcaption>
                <p>Invalid Email Address</p>
              </figure>
            ) : null}
            <label htmlFor='password' className='passwordLabel' data-error={!validPassword ? 'true' : 'false'}>
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder='Password'
                value={password}
                required
                aria-invalid={validPassword ? 'false' : 'true'}
                aria-describedby='pwdnote'
                ref={passwordInputFieldRef}
                onClick={() => focus()}
                onChange={(event) => setPassword(event.target.value)}
              />
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
            {passwordErrorPrompt ? (
              <figure className='inputFieldErrorMessage'>
                <figcaption style={{ display: 'none' }}>Error Message</figcaption>
                <p>Password must contain at least one special character, one lowercase and uppercase letter.</p>
              </figure>
            ) : null}
          </fieldset>
          <div className='ecoModal__actions'>
            <button type='submit'>Log in</button>
            <button onClick={() => setUiModal('userRegistry')}>Sign up</button>
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
