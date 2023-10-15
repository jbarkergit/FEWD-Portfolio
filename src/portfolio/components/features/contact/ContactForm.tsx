import { ChangeEvent, Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from 'react';

// Prop drill from pages/Portfolio
type ContactType = {
  contactFormActive: boolean;
  setContactFormActive: Dispatch<SetStateAction<boolean>>;
};

//** Contact form field array of objects types */
type ContactFormFieldsType = {
  input: string;
  placeholder: string;
  optional?: boolean;
  value: string;
};

//** Contact form validator types */
type FormValidationStateType = { input: string; regExpPattern: RegExp; validBoolean: boolean };

const ContactForm = ({ contactFormActive, setContactFormActive }: ContactType) => {
  //** Contact form fields */
  const [contactFormFields, setContactFormFields] = useState<ContactFormFieldsType[]>([
    { input: 'firstName', placeholder: 'First name', optional: false, value: '' },
    { input: 'lastName', placeholder: 'Last name', optional: false, value: '' },
    { input: 'emailAddress', placeholder: 'Email address', value: '' },
    { input: 'phoneNumber', placeholder: 'Phone number', optional: false, value: '' },
    { input: 'country', placeholder: 'Country', optional: false, value: '' },
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
    { input: 'emailAddress', regExpPattern: /[abc]/, validBoolean: false },
    { input: 'phoneNumber', regExpPattern: /[abc]/, validBoolean: false },
    { input: 'websiteUrl', regExpPattern: /[abc]/, validBoolean: true },
  ]);

  //** Validate input fields */
  const useContactFormValidator = (changedIndexParam: number) => {
    // Contact form field input (key/name) that's being typed in
    const updatedContactFormField: string = contactFormFields[changedIndexParam].input;

    // Index of the formValidation object correlated to the form field input (key/name) that's being updated
    const verifierIndex: number = formValidation.findIndex((verifier: FormValidationStateType) => verifier.input === updatedContactFormField);

    // Variables referencing correct formValidation object
    const useRegExpPattern: RegExp = formValidation[verifierIndex].regExpPattern;
    const isBooleanValid: boolean = useRegExpPattern.test(contactFormFields[changedIndexParam].value);

    // Set formValidation valid state for [key: string]: boolean -> (key/name: valid) using a shallow copy
    const formValidationShallowCopy: FormValidationStateType[] = [...formValidation];
    formValidationShallowCopy[verifierIndex].validBoolean = isBooleanValid;

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
      <section className='contactFormSection'>
        <article className='contact__information'>
          <h2>Contact Form</h2>
          <p>
            Kindly share the requested contact information and I'll be sure to respond in a timely fashion. Please note I do not respond to inquiries after business
            hours.
          </p>
        </article>
      </section>
      <section className='contactFormSection'>
        <form className='contact__form'>
          {contactFormFields.map((field: ContactFormFieldsType, index) => (
            <Fragment key={field.input}>
              <label className='contact__form__label' htmlFor={field.input} ref={contactFormLabel} data-status='disabled'>
                {field.placeholder}
              </label>
              <input
                className='contact__form__input'
                id={field.input}
                name={field.input}
                type={'text'}
                value={field.value}
                required={field.optional ? true : false}
                onFocus={handleFocusHook}
                onBlur={handleBlurHook}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  onChangeHook(field.input, e.target.value);
                  useContactFormValidator(index);
                }}
              />
            </Fragment>
          ))}
        </form>
      </section>
    </aside>
  );
};

export default ContactForm;
