import { ChangeEvent, Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from 'react';
import ContactFormErrorHandler from './ContactFormErrorHandler';
import ContactInformation from './ContactInformation';

// Prop drill from pages/Portfolio
type ContactType = {
  contactFormActive: boolean;
  setContactFormActive: Dispatch<SetStateAction<boolean>>;
};

//** Contact form field array of objects types */
export type ContactFormFieldsType = {
  input: string;
  placeholder: string;
  optional?: boolean;
  value: string;
};

//** Contact form validator types */
export type FormValidationStateType = { input: string; regExpPattern: RegExp; validBoolean: boolean };

const ContactForm = ({ contactFormActive, setContactFormActive }: ContactType) => {
  //** Contact form fields */
  const [contactFormFields, setContactFormFields] = useState<ContactFormFieldsType[]>([
    { input: 'firstName', placeholder: 'First name', optional: false, value: '' },
    { input: 'lastName', placeholder: 'Last name', optional: true, value: '' },
    { input: 'emailAddress', placeholder: 'Email address', optional: false, value: '' },
    { input: 'phoneNumber', placeholder: 'Phone number', optional: true, value: '' },
    { input: 'company', placeholder: 'Company', optional: true, value: '' },
    { input: 'websiteUrl', placeholder: 'Website url', optional: true, value: '' },
    { input: 'inquiry', placeholder: 'Inquiry', optional: false, value: '' },
  ]);

  //** Stores input field values in appropriate state onChange */
  const onChangeHook = (inputParam: string, valueParam: string) => {
    const formFieldStateIndex = contactFormFields.findIndex((field: ContactFormFieldsType) => field.input === inputParam);

    // Ensure that the field exists (findIndex returns -1 IF condition is false)
    if (formFieldStateIndex !== -1) {
      // Envoke state setter
      setContactFormFields(
        // Map shallow copy of state for safe mutation
        [...contactFormFields].map((field: ContactFormFieldsType, index: number) => {
          // Ensure the correct field is being updated via iteration && index comparison
          if (index === formFieldStateIndex)
            // Update the field's key, value
            field.value = valueParam;
          // Satisfy the contactFormFields map function
          return field;
        })
      );
    }
  };

  //** Form input field validation state && RegExp patterns */
  const [formValidation, setFormValidation] = useState<FormValidationStateType[]>([
    { input: 'emailAddress', regExpPattern: /[a-zA-Z0-9]+@/, validBoolean: false },
    { input: 'phoneNumber', regExpPattern: /^\d{10}$/, validBoolean: false },
    { input: 'websiteUrl', regExpPattern: /^https:\/\//, validBoolean: false },
  ]);

  // useEffect(() => {
  //   console.log(contactFormFields);
  //   console.log(formValidation);
  // }, [contactFormFields, formValidation]);

  //** Validate input fields */
  const useContactFormValidator = (changedIndexParam: number) => {
    // Contact form field input (key/name) that's being typed in
    const updatedContactFormField: string = contactFormFields[changedIndexParam].input;

    // Index of the formValidation object correlated to the form field input (key/name) that's being updated
    const verifierIndex: number = formValidation.findIndex((verifier: FormValidationStateType) => verifier.input === updatedContactFormField);

    // Set formValidation valid state for [key: string]: boolean -> (key/name: valid) using a shallow copy
    const formValidationShallowCopy: FormValidationStateType[] = [...formValidation];

    if (formValidation[verifierIndex]) {
      const isBooleanValid = formValidation[verifierIndex].regExpPattern.test(contactFormFields[changedIndexParam].value);
      formValidationShallowCopy[verifierIndex].validBoolean = isBooleanValid;
    }

    setFormValidation(formValidationShallowCopy);
  };

  //** Handle input field label animation (not using traditional placeholder solely to animate the text) */
  const contactFormLabel = useRef<HTMLLabelElement>(null);

  const handleFocusHook = () => {
    if (contactFormLabel.current) contactFormLabel.current.setAttribute('data-status', 'active');
  };

  const handleBlurHook = () => {
    if (contactFormLabel.current) contactFormLabel.current.setAttribute('data-status', 'disabled');
  };
  //** */

  return (
    <aside className='contact' role='dialog' aria-label='Developer Contact Form' data-status={contactFormActive === true ? 'active' : 'false'}>
      <ContactInformation />
      <section className='contactFormSection'>
        <form className='contact__form'>
          <fieldset className='contact__form__fieldset'>
            {contactFormFields.map((field: ContactFormFieldsType, index) => (
              <div className='contact__form__fieldset__container' key={field.input}>
                <label className='contact__form__fieldset__container__label' htmlFor={field.input} ref={contactFormLabel} data-status='disabled'>
                  {field.optional ? `${field.placeholder} (optional)` : field.placeholder}
                </label>
                <input
                  className='contact__form__fieldset__container__input'
                  id={field.input}
                  name={field.input}
                  type={'text'}
                  value={field.value}
                  required={field.optional ? true : false}
                  onFocus={handleFocusHook}
                  onBlur={() => handleBlurHook()}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    onChangeHook(field.input, e.target.value);
                    useContactFormValidator(index);
                  }}
                />
                <div className='contact__form__fieldset__container__errorMessage'>
                  {contactFormFields[index].value.length > 0 ? (
                    <ContactFormErrorHandler contactFormFields={contactFormFields} formValidation={formValidation} indexParam={index} />
                  ) : null}
                </div>
              </div>
            ))}
          </fieldset>
        </form>
      </section>
    </aside>
  );
};

export default ContactForm;
