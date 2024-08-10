import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ChangeEvent, FormEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { firebaseAuth } from '../../../config/firebaseConfig';

type Type_PropDrill = {
  toggleComponent: (modal: 'article' | 'registry' | 'signin') => void;
};

const FDAccountRegistry = forwardRef<HTMLDivElement, Type_PropDrill>(({ toggleComponent }, registryRefReceiver) => {
  /** Collect array of labels */
  const [labelElements, setLabelElements] = useState<HTMLLabelElement[]>([]);
  const labelsRef = (reference: HTMLLabelElement) => {
    if (reference && !labelElements.includes(reference)) setLabelElements((prevState) => [...prevState, reference]);
  };

  const [values, setValues] = useState({
    firstName: { value: '', valid: false },
    lastName: { value: '', valid: false },
    dobMonth: { value: undefined, valid: false },
    dobDay: { value: undefined, valid: false },
    dobYear: { value: undefined, valid: false },
    emailAddress: { value: '', valid: false },
    password: { value: '', valid: false },
    passwordConfirmation: { value: '', valid: false },
  });

  type Type_ValuesKey = keyof typeof values;

  const regex = {
    /** First name, Last name
     * [a-zA-Z-']{1,}$: Followed by one or more letters, hyphens, or apostrophes.
     * Can include hyphens and apostrophes.
     */
    firstName: /[a-zA-Z-']{1,}$/,
    lastName: /[a-zA-Z-']{1,}$/,
    /** Email address
     * RFC 5322
     * (?i): Case-insensitive matching.
     * (?=.{1,256}): Ensure total length is up to 256 characters.
     * (?=.{1,64}@): Ensure the local part is up to 64 characters.
     * [a-z0-9._%+-]+: Local part of the email address.
     * @[a-z0-9.-]+: Domain part of the email address.
     * \.[a-z]{2,}$: Top-level domain with at least two letters.
     */
    emailAddress: /^(?=.{1,256}$)(?=.{1,64}@)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
    /** Password, Password confirmation
     * (?=.*[A-Za-z]): At least one letter.
     * (?=.*\d): At least one digit.
     * (?=.*[@$!%*?&]): At least one special character.
     * [A-Za-z\d@$!%*?&]{8,}$: At least 8 characters long.
     */
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    passwordConfirmation: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };

  const valueSetter = (e: ChangeEvent<HTMLInputElement>): void => {
    const key = e.target.name as Type_ValuesKey;

    setValues((prevValues) => {
      return { ...prevValues, [key]: { ...prevValues[key], value: e.target.value } };
    });

    validateField(key);
  };

  const validateField = (targetName: Type_ValuesKey): void => {
    if (targetName !== 'dobMonth' && targetName !== 'dobDay' && targetName !== 'dobYear') {
      setValues((prevValues) => {
        const isValueValid: boolean = regex[targetName].test(prevValues[targetName].value);
        const isMatchingPassword: boolean = prevValues['passwordConfirmation'].value === prevValues['password'].value;
        const propArg: boolean = targetName === 'passwordConfirmation' ? isMatchingPassword : isValueValid;
        return { ...prevValues, [targetName]: { ...prevValues[targetName], valid: propArg } };
      });
    }
  };

  const submitForm = async (e: React.PointerEvent<HTMLButtonElement>): Promise<void> => {
    if (Object.values(values).some((field) => field.valid === false)) {
      e.preventDefault();
    } else {
      try {
        await createUserWithEmailAndPassword(firebaseAuth, values.emailAddress.value, values.password.value);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleLabels = (): void => {
    if (!fieldsetRef.current) return;

    Object.entries(values).forEach(([name, { value }]) => {
      const element: HTMLLabelElement | undefined = labelElements.find((child: HTMLLabelElement) => child.id === name);
      if (!element) return;
      element.setAttribute('data-entry', value || (value && value.length > 0) ? 'true' : 'false');
    });
  };

  useEffect(() => handleLabels(), [values]);

  const fieldsetRef = useRef<HTMLFieldSetElement>(null);

  const handleUls = (): void => {
    if (!fieldsetRef.current) return;
    const fieldsetChildren = Array.from(fieldsetRef.current.children) as HTMLUListElement[];
  };

  return (
    <section className='fdAccountRegistry' id='fdRegistery' data-activity='active' ref={registryRefReceiver}>
      <div className='fdAccountRegistry__container'>
        {/*  */}
        <section className='fdAccountRegistry__container__col'>
          <div className='fdAccountRegistry__container__col__logo'>Film Database</div>
          <legend className='fdAccountRegistry__container__fieldset__legend'>
            <h2 className='fdAccountRegistry__container__fieldset__legend--h2'>Create an account</h2>
          </legend>
          <div className='fdAccountRegistry__container__col__hint'>Enter your name</div>
        </section>
        {/*  */}
        <fieldset className='fdAccountRegistry__container__fieldset' ref={fieldsetRef}>
          {/*  */}
          <ul className='fdAccountRegistry__container__fieldset__ul'>
            <li className='fdAccountRegistry__container__fieldset__ul__firstName'>
              <div className='fdAccountRegistry__container__field__ul__firstName__container'>
                <label id='firstName' htmlFor='fdUserAccountFirstName' ref={labelsRef}>
                  First name
                </label>
                <input
                  form='fdRegistery'
                  id='fdUserAccountFirstName'
                  name='firstName'
                  type='text'
                  inputMode='text'
                  size={12}
                  required={true}
                  aria-required='true'
                  aria-invalid={values.firstName.valid}
                  autoFocus
                  autoCapitalize='words'
                  onClick={() => focus()}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
                />
              </div>
            </li>

            <li className='fdAccountRegistry__container__fieldset__ul__lastName'>
              <div className='fdAccountRegistry__container__field__ul__lastName__container'>
                <label id='lastName' htmlFor='fdUserAccountLastName' ref={labelsRef}>
                  Last name
                </label>
                <input
                  form='fdRegistery'
                  id='fdUserAccountLastName'
                  name='lastName'
                  type='text'
                  inputMode='text'
                  size={12}
                  required={false}
                  aria-required='true'
                  aria-invalid={values.lastName.valid}
                  autoCapitalize='words'
                  onClick={() => focus()}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
                />
              </div>
            </li>
          </ul>
          {/*  */}
          <ul className='fdAccountRegistry__container__fieldset__ul'>
            <li className='fdAccountRegistry__container__fieldset__ul__dobMonth'>
              <div className='fdAccountRegistry__container__field__ul__dobMonth__container'>
                <label id='dobMonth' htmlFor='fdUserAccountDobMonth' ref={labelsRef}>
                  Month
                </label>
                <input
                  form='fdRegistery'
                  id='fdUserAccountDobMonth'
                  name='dobMonth'
                  type='text'
                  inputMode='text'
                  size={12}
                  required={true}
                  aria-required='true'
                  aria-invalid={values.dobMonth.valid}
                  autoFocus
                  autoCapitalize='words'
                  onClick={() => focus()}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
                />
              </div>
            </li>

            <li className='fdAccountRegistry__container__fieldset__ul__dobDay'>
              <div className='fdAccountRegistry__container__field__ul__dobDay__container'>
                <label id='dobDay' htmlFor='fdUserAccountDobDay' ref={labelsRef}>
                  Day
                </label>
                <input
                  form='fdRegistery'
                  id='fdUserAccountDobDay'
                  name='dobDay'
                  type='text'
                  inputMode='text'
                  size={12}
                  required={false}
                  aria-required='true'
                  aria-invalid={values.dobDay.valid}
                  autoCapitalize='words'
                  onClick={() => focus()}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
                />
              </div>
            </li>

            <li className='fdAccountRegistry__container__fieldset__ul__dobYear'>
              <div className='fdAccountRegistry__container__field__ul__dobYear__container'>
                <label id='dobYear' htmlFor='fdUserAccountDobYear' ref={labelsRef}>
                  Year
                </label>
                <input
                  form='fdRegistery'
                  id='fdUserAccountDobYear'
                  name='dobYear'
                  type='text'
                  inputMode='text'
                  size={12}
                  required={false}
                  aria-required='true'
                  aria-invalid={values.dobYear.valid}
                  autoCapitalize='words'
                  onClick={() => focus()}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
                />
              </div>
            </li>
          </ul>
          {/*  */}
          <ul className='fdAccountRegistry__container__fieldset__ul'>
            <li className='fdAccountRegistry__container__fieldset__ul__emailAddress'>
              <div className='fdAccountRegistry__container__field__ul__emailAddress__container'>
                <label id='emailAddress' htmlFor='fdUserAccountEmailAddress' ref={labelsRef}>
                  Email address
                </label>
                <input
                  form='fdRegistery'
                  id='fdUserAccountEmailAddress'
                  name='emailAddress'
                  type='email'
                  inputMode='email'
                  // name, @, domain
                  minLength={3}
                  // RFC 2045
                  maxLength={76}
                  size={12}
                  required={true}
                  aria-required='true'
                  aria-invalid={values.emailAddress.valid}
                  autoCapitalize='off'
                  onClick={() => focus()}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
                />
              </div>
            </li>
            {/*  */}
          </ul>

          <ul className='fdAccountRegistry__container__fieldset__ul'>
            <li className='fdAccountRegistry__container__fieldset__ul__password'>
              <div className='fdAccountRegistry__container__field__ul__password__container'>
                <label id='password' htmlFor='fdUserAccountPassword' ref={labelsRef}>
                  Password
                </label>
                <input
                  form='fdRegistery'
                  id='fdUserAccountPassword'
                  name='password'
                  type='password'
                  inputMode='text'
                  // RFC 5310, NIST Special Publication 800-63B
                  minLength={8}
                  // RFC XOS
                  maxLength={32}
                  size={12}
                  required={true}
                  aria-required='true'
                  aria-invalid={values.password.valid}
                  autoCapitalize='off'
                  onClick={() => focus()}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
                />
              </div>
            </li>

            <li className='fdAccountRegistry__container__fieldset__ul__passwordConfirmation'>
              <div className='fdAccountRegistry__container__field__ul__passwordConfirmation__container'>
                <label id='passwordConfirmation' htmlFor='fdUserAccountPasswordConfirmation' ref={labelsRef}>
                  Retype password
                </label>
                <input
                  form='fdRegistery'
                  id='fdUserAccountPasswordConfirmation'
                  name='passwordConfirmation'
                  type='password'
                  inputMode='text'
                  // RFC 5310, NIST Special Publication 800-63B
                  minLength={8}
                  // RFC XOS
                  maxLength={32}
                  size={12}
                  required={true}
                  aria-required='true'
                  aria-invalid={values.passwordConfirmation.valid}
                  autoCapitalize='off'
                  onClick={() => focus()}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
                />
              </div>
            </li>
            <li className='fdAccountRegistry__container__fieldset__ul__container__submitRegistrationForm'>
              <button
                id='fdUserAccountSubmitForm'
                aria-label='Submit registration form'
                style={{ color: 'black' }}
                onClick={(e: React.PointerEvent<HTMLButtonElement>) => submitForm(e)}>
                Register Account
              </button>
            </li>
          </ul>
        </fieldset>
      </div>
    </section>
  );
});

export default FDAccountRegistry;
