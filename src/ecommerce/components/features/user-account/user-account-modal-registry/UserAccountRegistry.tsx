import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Apple, Google, LinkedIn } from '../../../../assets/production-images/user-account-svg/PasskeySvgs';
import { userEmailAddressRegex, userPasswordRegex } from '../authentication/userAccountRegExp';

//Prop drill from UserAccountModal
type PropType = {
  uiModal: string;
  setUiModal: Dispatch<SetStateAction<string>>;
};

const UserAccountRegistry = ({ uiModal, setUiModal }: PropType): JSX.Element => {
  const userRegistryModal = useRef<HTMLFormElement>(null); //Form Reference
  const emailAddressInputFieldRef = useRef<HTMLInputElement>(null); //Email Address Input Field Reference
  const passwordInputFieldRef = useRef<HTMLInputElement>(null); //Password Input Field Reference

  //Form Toggle
  useEffect(() => {
    userRegistryModal.current?.setAttribute('data-status', uiModal === 'userRegistry' ? 'active' : 'false');
  }, [uiModal]);

  //Registry validation state
  const [registry, setRegistry] = useState<{
    firstNameRegistry: string;
    lastNameRegistry: string;
    birthRegistry: string;
    emailAddressRegistry: string;
    emailAddressValidRegistry: boolean;
    emailAddressRegistryCheck: string;
    passwordRegistry: string;
    passwordVisible: boolean;
    passwordValidRegistry: boolean;
    passwordRegistryCheck: string;
  }>({
    firstNameRegistry: '',
    lastNameRegistry: '',
    birthRegistry: '01/01/2000',
    emailAddressRegistry: '',
    emailAddressValidRegistry: true,
    emailAddressRegistryCheck: '',
    passwordRegistry: '',
    passwordVisible: true,
    passwordValidRegistry: true,
    passwordRegistryCheck: '',
  });

  //Form input value clear hook
  const clearFormInputValues = (): void => {
    setRegistry({
      firstNameRegistry: '',
      lastNameRegistry: '',
      birthRegistry: '01/01/2000',
      emailAddressRegistry: '',
      emailAddressValidRegistry: false,
      emailAddressRegistryCheck: '',
      passwordRegistry: '',
      passwordVisible: false,
      passwordValidRegistry: false,
      passwordRegistryCheck: '',
    });
  };

  //Form Exterior Click Handler
  useEffect(() => {
    const handleExteriorClick = (e: PointerEvent) => {
      if (!userRegistryModal.current?.contains(e.target as Node)) {
        setUiModal('');
        clearFormInputValues();
      }
    };
    document.body.addEventListener('pointerdown', handleExteriorClick);
    return () => document.body.removeEventListener('pointerdown', handleExteriorClick);
  }, [uiModal]);

  //RegExp test for email input value -> sets state validation boolean
  useEffect(() => {
    setRegistry({ ...registry, emailAddressValidRegistry: userEmailAddressRegex.test(registry.emailAddressRegistry) });
  }, [registry.emailAddressRegistry]);

  //RegExp test for password input value -> sets state validation boolean
  useEffect(() => {
    setRegistry({ ...registry, passwordValidRegistry: userPasswordRegex.test(registry.passwordRegistry) });
  }, [registry.passwordRegistry]);

  //Input field ERROR state
  const [registryError, setRegistryError] = useState<{
    emailAddressRegistryError: boolean;
    passwordRegistryError: boolean;
  }>({
    emailAddressRegistryError: false,
    passwordRegistryError: false,
  });

  //Email validation -> sets error state boolean
  useEffect(() => {
    !registry.emailAddressRegistry && registry.emailAddressRegistry.length > 0
      ? setRegistryError({ ...registryError, emailAddressRegistryError: true })
      : setRegistryError({ ...registryError, emailAddressRegistryError: false });
  }, [registry.emailAddressValidRegistry]);

  //Password validation -> sets error state boolean
  useEffect(() => {
    !registry.passwordRegistry && registry.passwordRegistry.length > 0
      ? setRegistryError({ ...registryError, passwordRegistryError: true })
      : setRegistryError({ ...registryError, passwordRegistryError: false });
  }, [registry.passwordValidRegistry]);

  //Registry form submission hook
  const useRegistryFormSubmission = () => {};

  return (
    <section className='modalWrapper'>
      <form className='ecoModal accountModal' onSubmit={useRegistryFormSubmission} data-status='false' ref={userRegistryModal}>
        <legend>
          <h2>Account Creation</h2>
        </legend>
        <>
          <fieldset className='ecoModal__inputField'>
            <label htmlFor='firstName' data-error={!registry.passwordValidRegistry ? 'true' : 'false'}>
              <input
                type='text'
                placeholder='First Name'
                value={registry.firstNameRegistry}
                required
                autoFocus
                aria-invalid={registry.firstNameRegistry ? 'false' : 'true'}
                aria-describedby='uidnote'
                ref={emailAddressInputFieldRef}
                onClick={() => focus()}
                onChange={(event) => setRegistry({ ...registry, firstNameRegistry: event.target.value })}
              />
            </label>
            <label htmlFor='lastName' data-error={!registry.passwordValidRegistry ? 'true' : 'false'}>
              <input
                type='text'
                placeholder='Last Name'
                value={registry.lastNameRegistry}
                required
                autoFocus
                aria-invalid={registry.emailAddressValidRegistry ? 'false' : 'true'}
                aria-describedby='uidnote'
                ref={emailAddressInputFieldRef}
                onClick={() => focus()}
                onChange={(event) => setRegistry({ ...registry, lastNameRegistry: event.target.value })}
              />
            </label>
            <label htmlFor='emailAddress' data-error={!registry.passwordValidRegistry ? 'true' : 'false'}>
              <input
                type='text'
                placeholder='Email Address'
                value={registry.emailAddressRegistry}
                required
                autoFocus
                aria-invalid={registry.emailAddressValidRegistry ? 'false' : 'true'}
                aria-describedby='uidnote'
                ref={emailAddressInputFieldRef}
                onClick={() => focus()}
                onChange={(event) => setRegistry({ ...registry, emailAddressRegistry: event.target.value })}
              />
            </label>
            {registryError.emailAddressRegistryError ? (
              <figure className='inputFieldErrorMessage'>
                <figcaption style={{ display: 'none' }}>Error Message</figcaption>
                <p>Invalid Email Address</p>
              </figure>
            ) : null}
            <label htmlFor='password' className='passwordLabel' data-error={!registry.passwordValidRegistry ? 'true' : 'false'}>
              <input
                type={registry.passwordVisible ? 'text' : 'password'}
                placeholder='Password'
                value={registry.passwordRegistry}
                required
                aria-invalid={registry.passwordValidRegistry ? 'false' : 'true'}
                aria-describedby='pwdnote'
                ref={passwordInputFieldRef}
                onClick={() => focus()}
                onChange={(event) => setRegistry({ ...registry, passwordRegistry: event.target.value })}
              />
              <button
                className='passwordLabel__visibility'
                onClick={(e) => {
                  e.preventDefault();
                  setRegistry({ ...registry, passwordVisible: registry.passwordVisible ? false : true });
                }}>
                {registry.passwordVisible ? (
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
            {registryError.passwordRegistryError ? (
              <figure className='inputFieldErrorMessage'>
                <figcaption>Error Message</figcaption>
                <p>Password must contain at least one special character, one lowercase and uppercase letter.</p>
              </figure>
            ) : null}
            <label htmlFor='password' className='passwordLabel' data-error={!registry.passwordValidRegistry ? 'true' : 'false'}>
              <input
                type={registry.passwordVisible ? 'text' : 'password'}
                placeholder='Password'
                value={registry.passwordRegistryCheck}
                required
                aria-invalid={registry.passwordValidRegistry ? 'false' : 'true'}
                aria-describedby='pwdnote'
                ref={passwordInputFieldRef}
                onClick={() => focus()}
                onChange={(event) => setRegistry({ ...registry, passwordRegistryCheck: event.target.value })}
              />
              <button className='passwordLabel__visibility' onClick={() => setRegistry({ ...registry, passwordVisible: registry.passwordVisible ? false : true })}>
                {registry.passwordVisible ? (
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
            {registry.passwordRegistry !== registry.passwordRegistryCheck ? (
              <figure className='inputFieldErrorMessage'>
                <figcaption>Error Message</figcaption>
                <p>Passwords do not match.</p>
              </figure>
            ) : null}
          </fieldset>
          <div className='ecoModal__buttons'>
            <button
              onClick={() => {
                clearFormInputValues();
              }}>
              Submit
            </button>
            <button onClick={() => setUiModal('userLogin')}>Return to Login</button>
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
