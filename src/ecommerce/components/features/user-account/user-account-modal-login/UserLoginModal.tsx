import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { Apple, Google, LinkedIn } from '../../../../assets/production-images/user-account-svg/PasskeySvgs';
import { userEmailAddressRegex, userPasswordRegex } from '../authentication/userAccountRegExp';

//Prop drill from UserAccountModal
type PropType = {
  uiModal: string;
  setUiModal: Dispatch<SetStateAction<string>>;
};

const UserLoginModal = ({ uiModal, setUiModal }: PropType): JSX.Element => {
  const userLoginModal = useRef<HTMLFormElement>(null); //Form Reference
  const emailAddressInputFieldRef = useRef<HTMLInputElement>(null); //Email Address Input Field Reference
  const passwordInputFieldRef = useRef<HTMLInputElement>(null); //Password Input Field Reference

  //Form validation state
  const [formValidation, setFormValidation] = useState<{
    emailAddress: string;
    emailAddressValid: boolean;
    password: string;
    passwordVisible: boolean;
    passwordValid: boolean;
  }>({
    emailAddress: 'test@test.com',
    emailAddressValid: true,
    password: 'HelloWorld1!',
    passwordVisible: false,
    passwordValid: true,
  });

  //Form input value clear hook
  const clearFormInputValues = (): void => {
    setFormValidation({
      emailAddress: 'test@test.com',
      emailAddressValid: true,
      password: 'HelloWorld1!',
      passwordVisible: false,
      passwordValid: true,
    });
  };

  //Form Exterior Click Handler
  useEffect(() => {
    const handleExteriorClick = (e: PointerEvent) => {
      if (
        uiModal === 'userLogin' &&
        userLoginModal.current &&
        userLoginModal.current.getAttribute('data-status') === 'active' &&
        !userLoginModal.current?.contains(e.target as Node)
      ) {
        setUiModal('');
        clearFormInputValues();
      }
    };

    document.body.addEventListener('pointerdown', handleExteriorClick);
    return () => document.body.removeEventListener('pointerdown', handleExteriorClick);
  }, [uiModal]);

  //RegExp test for email input value -> sets state validation boolean
  useEffect(() => {
    setFormValidation({ ...formValidation, emailAddressValid: userEmailAddressRegex.test(formValidation.emailAddress) });
  }, [formValidation.emailAddress]);

  //RegExp test for password input value -> sets state validation boolean
  useEffect(() => {
    setFormValidation({ ...formValidation, passwordValid: userPasswordRegex.test(formValidation.password) });
  }, [formValidation.password]);

  //Input field ERROR state
  const [formError, setFormError] = useState<{
    emailAddressError: boolean;
    passwordError: boolean;
  }>({
    emailAddressError: false,
    passwordError: false,
  });

  //Email validation -> sets error state boolean
  useEffect(() => {
    formValidation.emailAddressValid ? setFormError({ ...formError, emailAddressError: false }) : setFormError({ ...formError, emailAddressError: true });
  }, [formValidation.emailAddressValid]);

  //Password validation -> sets error state boolean
  useEffect(() => {
    formValidation.passwordValid ? setFormError({ ...formError, passwordError: false }) : setFormError({ ...formError, passwordError: true });
  }, [formValidation.passwordValid]);

  //Form submission hook
  const useLoginFormSubmission = (e: FormEvent): void => {
    e.preventDefault();
    if (
      formValidation.emailAddressValid &&
      formValidation.passwordValid &&
      JSON.parse(localStorage.getItem('emailAddress')!) === formValidation.emailAddress &&
      JSON.parse(localStorage.getItem('password')!) === formValidation.password
    ) {
      localStorage.setItem('userSignedIn', JSON.stringify(true));
      setUiModal('userActive');
    } else {
      localStorage.setItem('userSignedIn', JSON.stringify(false));
    }
  };

  return (
    <section className='modalWrapper' data-status={uiModal === 'userLogin' ? 'active' : 'false'}>
      <form className='ecoModal' onSubmit={useLoginFormSubmission} data-status={uiModal === 'userLogin' ? 'active' : 'false'} ref={userLoginModal}>
        <div className='ecoModal__container'>
          <legend>
            <h2>Account Login</h2>
          </legend>
          <fieldset>
            <label htmlFor='emailAddress'>
              <input
                type='text'
                placeholder='Email Address'
                value={formValidation.emailAddress}
                required={true}
                aria-required={'true'}
                autoFocus
                aria-invalid={formValidation.emailAddressValid ? 'false' : 'true'}
                aria-describedby='uidnote'
                ref={emailAddressInputFieldRef}
                onClick={() => focus()}
                onChange={(event) => setFormValidation({ ...formValidation, emailAddress: event.target.value.toLowerCase() })}
              />
            </label>
            {formError.emailAddressError ? (
              <figure className='inputFieldErrorMessage'>
                <figcaption style={{ display: 'none' }}>Error Message</figcaption>
                <p>Invalid email address: cannot contain special characters.</p>
              </figure>
            ) : null}
            <label htmlFor='password' className='passwordLabel'>
              <input
                type={formValidation.passwordVisible ? 'text' : 'password'}
                placeholder='Password'
                value={formValidation.password}
                required={true}
                aria-required={'true'}
                aria-invalid={formValidation.passwordValid ? 'false' : 'true'}
                aria-describedby='pwdnote'
                ref={passwordInputFieldRef}
                onClick={() => focus()}
                onChange={(event) => setFormValidation({ ...formValidation, password: event.target.value })}
              />
              <button
                className='passwordLabel__visibility'
                onClick={(e) => {
                  e.preventDefault();
                  setFormValidation({ ...formValidation, passwordVisible: formValidation.passwordVisible ? false : true });
                }}>
                {formValidation.passwordVisible ? (
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
            {formError.passwordError ? (
              <figure className='inputFieldErrorMessage'>
                <figcaption>Error Message</figcaption>
                <p>Your password is invalid, please try again.</p>
              </figure>
            ) : null}
          </fieldset>
          <div className='ecoModal__container__buttons'>
            <button type='submit' onClick={() => SubmitEvent}>
              Log in
            </button>
            <button onClick={() => setUiModal('userRegistry')}>Sign up</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setUiModal('');
              }}>
              <svg xmlns='http://www.w3.org/2000/svg' width='1.6em' height='1.6em' viewBox='0 0 24 24'>
                <path
                  fill='#ffffff'
                  d='M9 19q-.5 0-.938-.225t-.712-.625l-3.525-5Q3.45 12.625 3.45 12t.375-1.15l3.525-5q.275-.4.713-.625T9 5h10q.825 0 1.413.588T21 7v10q0 .825-.588 1.413T19 19H9Zm5-5.6l1.9 1.9q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7L15.4 12l1.9-1.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L14 10.6l-1.9-1.9q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l1.9 1.9l-1.9 1.9q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275l1.9-1.9Z'></path>
              </svg>
              Return
            </button>
            <button id='resetPassword' onClick={(e) => e.preventDefault()}>
              Forgot your password?
            </button>
          </div>
          <div className='ecoModal__container__passkeys'>
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
          <div className='ecoModal__container__notice'>
            <p>This form validates input fields and aims to simulate user authentication via localStorage.</p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default UserLoginModal;
