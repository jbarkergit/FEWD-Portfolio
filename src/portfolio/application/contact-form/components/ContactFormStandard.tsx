import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import ContactFormErrorHandler from './ContactFormErrorHandler';

//** Contact form field array of objects types */
export type ContactFormFieldsType = {
  input: string;
  placeholder: string;
  optional?: boolean;
  value: string;
};

//** Contact form validator types */
export type FormValidationStateType = { input: string; regExpPattern: RegExp; validBoolean: boolean };

/** Component */
const ContactFormStandard = () => {
  /** References */
  const arrayOfFormLabels: HTMLLabelElement[] = [];
  const pushFormLabel = (reference: HTMLLabelElement) => {
    if (reference && !arrayOfFormLabels.includes(reference)) arrayOfFormLabels.push(reference);
  };

  //** Form input field validation state && RegExp patterns */
  const [formValidation, setFormValidation] = useState<FormValidationStateType[]>([
    { input: 'emailAddress', regExpPattern: /[a-zA-Z0-9]+@/, validBoolean: false },
    { input: 'phoneNumber', regExpPattern: /^\d{10}$/, validBoolean: false },
    { input: 'websiteUrl', regExpPattern: /^https:\/\//, validBoolean: false },
  ]);

  //** Contact form fields */
  const [contactFormFields, setContactFormFields] = useState<ContactFormFieldsType[]>([
    { input: 'firstName', placeholder: 'First name', optional: false, value: '' },
    { input: 'lastName', placeholder: 'Last name', optional: true, value: '' },
    { input: 'emailAddress', placeholder: 'Email address', optional: false, value: '' },
    { input: 'phoneNumber', placeholder: 'Phone number', optional: true, value: '' },
    { input: 'company', placeholder: 'Company', optional: true, value: '' },
    { input: 'websiteUrl', placeholder: 'Website url', optional: true, value: '' },
    { input: 'inquiry', placeholder: 'How may I help you?', optional: false, value: '' },
  ]);

  //** Stores input field values in appropriate state onChange */
  const updateContactFormFieldsState = (inputParam: string, valueParam: string) => {
    // DRY
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

  /** Submit Form */
  const submitForm = () => {
    const isFormValid = formValidation.every((item) => item.validBoolean);
    // if (isFormValid)
  };

  //** Handle input field label animation (not using traditional placeholder solely to animate the text) */
  const handleFocusHook = (index: number) => arrayOfFormLabels[index].setAttribute('data-status', 'active');
  const handleBlurHook = (index: number) => arrayOfFormLabels[index].setAttribute('data-status', 'disabled');

  return (
    <section className='contactForm__section'>
      <h2 className='contactForm--h2'>Contact Form</h2>
      <form className='contactForm__section__standardForm'>
        <fieldset className='contactForm__section__standardForm__fieldset'>
          {contactFormFields.map((field: ContactFormFieldsType, index: number) =>
            field.input !== 'inquiry' ? (
              <div className='contactForm__section__standardForm__fieldset__container' key={field.input}>
                <label className='contactForm__section__standardForm__fieldset__container--label' htmlFor={field.input} ref={pushFormLabel} data-status='disabled'>
                  {field.optional ? `${field.placeholder} (optional)` : field.placeholder}
                </label>
                <input
                  className='contactForm__section__standardForm__fieldset__container--input'
                  id={field.input}
                  name={field.input}
                  type={'text'}
                  value={field.value}
                  required={field.optional ? false : true}
                  aria-required={field.optional ? 'true' : 'false'}
                  onFocus={() => handleFocusHook(index)}
                  onBlur={() => {
                    if (field.value.length === 0) handleBlurHook(index);
                  }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    updateContactFormFieldsState(field.input, e.target.value);
                    useContactFormValidator(index);
                  }}
                />
                {contactFormFields[index].value.length > 0 ? (
                  <div className='contactForm__section__standardForm__fieldset__container--errorMessage'>
                    <ContactFormErrorHandler contactFormFields={contactFormFields} formValidation={formValidation} indexParam={index} />
                  </div>
                ) : null}
              </div>
            ) : (
              <div className='contactForm__section__standardForm__fieldset__container' key={field.input}>
                <label className='contactForm__section__standardForm__fieldset__container--label' htmlFor={field.input} ref={pushFormLabel} data-status='disabled'>
                  {field.placeholder}
                </label>
                <textarea
                  className='contactForm__section__standardForm__fieldset__container--input'
                  id={field.input}
                  name={field.input}
                  value={field.value}
                  required={field.optional ? true : false}
                  aria-required={field.optional ? 'true' : 'false'}
                  rows={8}
                  cols={50}
                  onFocus={() => handleFocusHook(index)}
                  onBlur={() => handleBlurHook(index)}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    updateContactFormFieldsState(field.input, e.target.value);
                    useContactFormValidator(index);
                  }}
                />
              </div>
            )
          )}
        </fieldset>
        <button onClick={() => submitForm()}>Send Message</button>
      </form>
    </section>
  );
};

export default ContactFormStandard;
