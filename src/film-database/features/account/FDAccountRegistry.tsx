import { ChangeEvent, FormEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../../app/config/firebaseConfig';

type Type_PropDrill = {
  toggleComponent: (modal: 'registry' | 'signin') => void;
};

const FDAccountRegistry = forwardRef<HTMLUListElement, Type_PropDrill>(({ toggleComponent }, registryRefReceiver) => {
  /** Collect array of labels */
  const [labelElements, setLabelElements] = useState<HTMLLabelElement[]>([]);
  const labelsRef = (reference: HTMLLabelElement) => {
    if (reference && !labelElements.includes(reference)) setLabelElements((prevState) => [...prevState, reference]);
  };

  const [values, setValues] = useState({
    firstName: { value: '', valid: false },
    lastName: { value: '', valid: false },
    dobMonth: { value: 'January', valid: false },
    dobDay: { value: '01', valid: false },
    dobYear: { value: `${new Date().getFullYear() - 18}`, valid: false },
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

  const valueSetter = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const key = e.target.name as Type_ValuesKey;
    const value: string = e.target.value;

    setValues((prevValues) => {
      return { ...prevValues, [key]: { ...prevValues[key], value: value } };
    });

    validateField(key);
    handleLabels(key);
  };

  const validateField = (targetName: Type_ValuesKey): void => {
    const pattern: [string, RegExp] | undefined = Object.entries(regex).find(([name]) => name === targetName);
    if (pattern) {
      setValues((prevValues) => {
        const isValueValid: boolean = pattern[1].test(prevValues[targetName].value);
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

  const handleLabels = (key: Type_ValuesKey): void => {
    const matchingEntry = Object.entries(values).find(([name]) => name === key);
    const matchingElement = labelElements.find((child: HTMLLabelElement) => child.id === key);
    if (!matchingEntry || !matchingElement) return;
    matchingElement.setAttribute('data-entry', matchingEntry[0] && matchingEntry[0].length > 0 ? 'true' : 'false');
  };

  const [formSections, setFormSections] = useState<HTMLUListElement[]>([]);

  const formSectionReceiver = (ref: HTMLUListElement) => {
    if (ref && !formSections.includes(ref))
      setFormSections((prevArr: HTMLUListElement[]) => {
        return [...prevArr, ref];
      });
  };

  const [activeFormSection, setActiveFormSection] = useState<number>(0);

  useEffect(() => {
    formSections.forEach((section: HTMLUListElement, index: number) => {
      section.setAttribute('data-visibility', index === activeFormSection ? 'visible' : 'hidden');
    });
  }, [activeFormSection]);

  const requestNextSection = (index: number): void => {
    let isValid: boolean = false;

    switch (index) {
      case 0:
        isValid = values.firstName.valid && values.lastName.valid;
        break;

      case 2:
        isValid = values.emailAddress.valid;
        break;

      case 3:
        isValid = values.password.valid && values.passwordConfirmation.valid;
        break;

      default:
        break;
    }

    if (isValid) setActiveFormSection((prev) => prev + 1);
  };

  const getOptionalYears = (): number[] => {
    const currentYear: number = new Date().getFullYear();
    const initYear: number = currentYear - 110;
    const ofAgeYear: number = currentYear - 18;
    const optionalYears: number[] = Array.from({ length: 111 }, (_, index: number) => initYear + index);
    const filteredYears: number[] = optionalYears.filter((year: number) => year <= ofAgeYear).reverse();
    return filteredYears;
  };

  return (
    <ul className='fdAccount__container__form__fieldset__ul' ref={registryRefReceiver} data-status='none'>
      <div className='fdAccount__container__form__fieldset__ul__name'>
        {[
          { labelId: 'firstName', id: 'fdUserAccountFirstName', name: 'firstName', label: 'First name', isRequired: true, placeholder: 'John' },
          { labelId: 'lastName', id: 'fdUserAccountLastName', name: 'lastName', label: 'Last name', isRequired: false, placeholder: 'Doe' },
        ].map((field) => (
          <li key={field.id}>
            <label id={field.labelId} htmlFor={field.id} ref={labelsRef} data-entry='false'>
              {field.label}
            </label>
            <input
              form='fdRegistery'
              id={field.id}
              name={field.name}
              type='text'
              inputMode='text'
              size={12}
              required={field.isRequired}
              aria-required={field.isRequired ? 'true' : 'false'}
              aria-invalid={values.firstName.valid}
              autoCapitalize='words'
              placeholder={field.placeholder}
              onClick={() => focus()}
              onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
            />
          </li>
        ))}
      </div>
      <div className='fdAccount__container__form__fieldset__ul__dob'>
        <li>
          <label id='dobMonth' htmlFor='fdUserAccountDobMonth' ref={labelsRef} data-entry='false'>
            Month
          </label>
          <select
            id='fdUserAccountDobMonth'
            name='dobMonth'
            form='fdRegistery'
            required={true}
            aria-required='true'
            aria-invalid={values.dobMonth.valid}
            value={values.dobMonth.value}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => valueSetter(e)}>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month: string) => (
              <option key={`dobMonth${month}`} value={month} aria-label={month}>
                {month}
              </option>
            ))}
          </select>
        </li>
        <li>
          <label id='dobDay' htmlFor='fdUserAccountDobDay' ref={labelsRef} data-entry='false'>
            Day
          </label>
          <select
            id='fdUserAccountDobDay'
            name='dobDay'
            form='fdRegistery'
            required={true}
            aria-required='true'
            aria-invalid={values.dobDay.valid}
            value={values.dobDay.value}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => valueSetter(e)}>
            {Array.from({ length: 31 }).map((_, index: number) => (
              <option key={`dobDay${index + 1}`} value={`${index + 1}`} aria-label={`${index + 1}`}>
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </option>
            ))}
          </select>
        </li>
        <li>
          <label id='dobYear' htmlFor='fdUserAccountDobYear' ref={labelsRef} data-entry='false'>
            Year
          </label>
          <select
            id='fdUserAccountDobYear'
            name='dobYear'
            form='fdRegistery'
            required={true}
            aria-required='true'
            aria-invalid={values.dobYear.valid}
            value={values.dobYear.value}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => valueSetter(e)}>
            {getOptionalYears().map((year: number) => (
              <option key={`dobYear${year}`} value={year} aria-label={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </li>
      </div>
      <li className='fdAccount__container__form__fieldset__ul__emailAddress'>
        <label id='emailAddress' htmlFor='fdUserAccountEmailAddress' ref={labelsRef} data-entry='false'>
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
          placeholder='johndoe@gmail.com'
          onClick={() => focus()}
          onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
        />
      </li>
      <div className='fdAccount__container__form__fieldset__ul__password'>
        <li>
          <label id='password' htmlFor='fdUserAccountPassword' ref={labelsRef} data-entry='false'>
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
            placeholder='••••••••'
            onClick={() => focus()}
            onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
          />
        </li>
        <li>
          <label id='passwordConfirmation' htmlFor='fdUserAccountPasswordConfirmation' ref={labelsRef} data-entry='false'>
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
            placeholder='••••••••'
            onClick={() => focus()}
            onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
          />
        </li>
      </div>
      <li className='fdAccount__container__form__fieldset__ul__cta'>
        {activeFormSection < 3 ? (
          <button id='fdUserAccountSubmitForm' aria-label='Submit registration form' onClick={(e: React.PointerEvent<HTMLButtonElement>) => submitForm(e)}>
            Complete sign up
          </button>
        ) : null}
      </li>
    </ul>
  );
});

export default FDAccountRegistry;
