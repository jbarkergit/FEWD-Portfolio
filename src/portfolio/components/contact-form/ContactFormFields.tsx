import { ChangeEvent, useState } from 'react';

//** Contact form field array of objects types */
export type ContactFormFieldsType = {
  input: string;
  title: string;
  placeholder: string;
  optional?: boolean;
  value: string;
};

//** Contact form validator types */
export type FormValidationStateType = { input: string; regExpPattern: RegExp; validBoolean: boolean };

/** Component */
const ContactFormFields = () => {
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
    { input: 'fullName', title: `What's your name?`, placeholder: 'Full name', optional: false, value: '' },
    { input: 'emailAddress', title: `What's your email?`, placeholder: 'Email address', optional: false, value: '' },
    { input: 'company', title: `What's your company's name?`, placeholder: 'Company', optional: true, value: '' },
    { input: 'websiteUrl', title: `What's your company's website URL?`, placeholder: 'Website url', optional: true, value: '' },
    { input: 'inquiry', title: `How may I help you?`, placeholder: `I'm interested in...`, optional: false, value: '' },
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

  return (
    <section className='contactForm__section'>
      <h2 className='contactForm--h2'>Contact Form</h2>
      <form className='contactForm__section__standardForm'>
        <fieldset className='contactForm__section__standardForm__fieldset'>
          {contactFormFields.map((field: ContactFormFieldsType, index: number) =>
            field.input !== 'inquiry' ? (
              <div className='contactForm__section__standardForm__fieldset__container' key={field.input}>
                <label className='contactForm__section__standardForm__fieldset__container--label' htmlFor={field.input} ref={pushFormLabel} data-status='disabled'>
                  {field.optional ? `${field.title} (optional)` : field.title}
                </label>
                <input
                  className='contactForm__section__standardForm__fieldset__container--input'
                  id={field.input}
                  name={field.input}
                  type={'text'}
                  placeholder={field.placeholder}
                  value={field.value}
                  required={field.optional ? false : true}
                  aria-required={field.optional ? 'true' : 'false'}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    updateContactFormFieldsState(field.input, e.target.value);
                    useContactFormValidator(index);
                  }}
                />
                {/* {contactFormFields[index].value.length > 0 ? (
                  <div className='contactForm__section__standardForm__fieldset__container--errorMessage'>
                    <ContactFormErrorHandler contactFormFields={contactFormFields} formValidation={formValidation} indexParam={index} />
                  </div>
                ) : null} */}
              </div>
            ) : (
              <div className='contactForm__section__standardForm__fieldset__container' key={field.input}>
                <label className='contactForm__section__standardForm__fieldset__container--label' htmlFor={field.input} ref={pushFormLabel} data-status='disabled'>
                  {field.title}
                </label>
                <textarea
                  className='contactForm__section__standardForm__fieldset__container--input'
                  id={field.input}
                  name={field.input}
                  placeholder={field.placeholder}
                  value={field.value}
                  required={field.optional ? true : false}
                  aria-required={field.optional ? 'true' : 'false'}
                  rows={4}
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

export default ContactFormFields;
