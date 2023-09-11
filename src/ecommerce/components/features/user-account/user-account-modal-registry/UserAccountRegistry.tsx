import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Apple, Google, LinkedIn } from '../../../../assets/production-images/user-account-svg/SignInViaSVGS';
import { userEmailAddressRegex, userPasswordRegex } from '../shared/authentication/userAccountRegExp';

//Prop drilling
type PropType = {
  uiModal: string;
  setUiModal: Dispatch<SetStateAction<string>>;
};

const UserAccountRegistry = ({ uiModal, setUiModal }: PropType): JSX.Element => {
  const userRegistryModal = useRef<HTMLFormElement>(null); //Form Reference
  const emailAddressInputFieldRef = useRef<HTMLInputElement>(null); //Email Address Input Field Reference
  const passwordInputFieldRef = useRef<HTMLInputElement>(null); //Password Input Field Reference

  //Form Toggle
  useEffect(() => userRegistryModal.current?.setAttribute('data-status', uiModal === 'userRegistry' ? 'active' : 'false'), [uiModal]);

  //Feature: toggle password visibility state
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  //Form validation state
  const [registryEmailAddress, setRegistryEmailAddress] = useState<string>('test@email.com');
  const [validRegistryEmailAddress, setValidRegistryEmailAddress] = useState<boolean>(false);
  const [registryPassword, setRegistryPassword] = useState<string>('test');
  const [validRegistryPassword, setValidRegistryPassword] = useState<boolean>(false);

  //Form input value clear hook
  const clearLoginInputValues = (): void => {
    setRegistryEmailAddress('');
    setValidRegistryEmailAddress(false);
    setRegistryPassword('');
    setValidRegistryPassword(false);
  };

  //Form Exterior Click Handler
  useEffect(() => {
    const handleExteriorClick = (e: PointerEvent) => {
      if (!userRegistryModal.current?.contains(e.target as Node)) {
        setUiModal('');
        clearLoginInputValues();
      }
    };
    document.body.addEventListener('pointerdown', handleExteriorClick);
    return () => document.body.removeEventListener('pointerdown', handleExteriorClick);
  }, [uiModal]);

  //Form input value RegExp validation
  useEffect(() => setValidRegistryEmailAddress(userEmailAddressRegex.test(registryEmailAddress)), [registryEmailAddress]);
  useEffect(() => setValidRegistryPassword(userPasswordRegex.test(registryPassword)), [registryPassword]);

  //Input field ERROR state
  const [emailAddressErrorPrompt, setEmailAddressErrorPrompt] = useState<boolean>(false);
  const [passwordErrorPrompt, setPasswordErrorPrompt] = useState<boolean>(false);

  useEffect(
    () => (!validRegistryEmailAddress && registryEmailAddress.length > 0 ? setEmailAddressErrorPrompt(true) : setEmailAddressErrorPrompt(false)),
    [validRegistryEmailAddress]
  );
  useEffect(() => (!validRegistryPassword && registryPassword.length > 0 ? setPasswordErrorPrompt(true) : setPasswordErrorPrompt(false)), [registryPassword]);

  //Registry form submission hook
  const useRegistryFormSubmission = () => {};

  return (
    <section className='ecoModalWrap'>
      <form className='ecoModal accountModal' onSubmit={useRegistryFormSubmission} data-status='false' ref={userRegistryModal}>
        <legend>
          <h2>Account Creation</h2>
        </legend>
        <>
          <fieldset className='ecoModal__inputField'>
            <label htmlFor='emailAddress' data-error={!validRegistryPassword ? 'true' : 'false'}>
              <input
                type='text'
                placeholder='Email Address'
                value={registryEmailAddress}
                required
                autoFocus
                aria-invalid={validRegistryEmailAddress ? 'false' : 'true'}
                aria-describedby='uidnote'
                ref={emailAddressInputFieldRef}
                onClick={() => focus()}
                onChange={(event) => setRegistryEmailAddress(event.target.value)}
              />
            </label>
            {emailAddressErrorPrompt ? (
              <figure className='inputFieldErrorMessage'>
                <figcaption style={{ display: 'none' }}>Error Message</figcaption>
                <p>Invalid Email Address</p>
              </figure>
            ) : null}
            <label htmlFor='password' className='passwordLabel' data-error={!validRegistryPassword ? 'true' : 'false'}>
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder='Password'
                value={registryPassword}
                required
                aria-invalid={validRegistryPassword ? 'false' : 'true'}
                aria-describedby='pwdnote'
                ref={passwordInputFieldRef}
                onClick={() => focus()}
                onChange={(event) => setRegistryPassword(event.target.value)}
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
                <figcaption>Error Message</figcaption>
                <p>Password must contain at least one special character, one lowercase and uppercase letter.</p>
              </figure>
            ) : null}
          </fieldset>
          <div className='ecoModal__actions'>
            <button onClick={() => setUiModal('userRegistry')}>Submit</button>
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
            <span>Notice</span>
            <p>This registration form is solely cosmetic.</p>
          </div>
        </>
      </form>
    </section>
  );
};

export default UserAccountRegistry;
