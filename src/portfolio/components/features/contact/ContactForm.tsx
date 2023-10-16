import { ChangeEvent, Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from 'react';
import ContactFormErrorHandler from './ContactFormErrorHandler';

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
    { input: 'lastName', placeholder: 'Last name', optional: false, value: '' },
    { input: 'emailAddress', placeholder: 'Email address', value: '' },
    { input: 'phoneNumber', placeholder: 'Phone number', optional: false, value: '' },
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
      <section className='contactFormSection'>
        <article className='contact__information'>
          <details>
            <summary>What services do you provide?</summary>
            <p>
              I am a Front End Web Developer. I exclusively develop with the library React. I provide DRY dynamic type safe documented logic, responsive and
              interactive UI, performance oriented component and asset rendering, BEM convention SEO-Optimized Markup, alongside screen readers for the visually
              impaired. If you are a company interested in hiring, please reach out. If you are looking for freelance work and require a UI/UX design, I do not
              specialize in those fields but am willing to work with you for an additional fee to ensure you find the right layout and style that suite your
              application's needs.
            </p>
          </details>
          <details>
            <summary>What services do you not provide?</summary>
            <p>I do not build backends, offer payment proccessing solutions nor do I handle advertisement needs. I am not a professional UI/UX/Graphic designer.</p>
          </details>
          <details>
            <summary>How long until I receive a response?</summary>
            <p>
              Kindly share the requested contact information and I'll be sure to respond in a timely fashion. My availability extends throughout the entire week;
              however, I do not respond to inquiries after business hours.
            </p>
          </details>
          <details>
            <summary>Why do I need to provide my information?</summary>
            <p>
              Don't worry, I'm not collecting your personal data for malicious intentions! Before I respond, I'd like to get a better understanding of your needs and
              determine whether or not I can satisfy the tasks ahead.
            </p>
          </details>
          <details>
            <summary>Will the information I share be secure?</summary>
            <p>
              This form and it's contents are redirected to my personal Google Mail inbox. I have no control over what services do with said information, so please
              only provide the information you're comfortable sharing.
            </p>
          </details>
          <details>
            <summary>Can I email you directly?</summary>
            <p>
              Absolutely! Below I've listed an email address that will redirect to my personal inbox.
              <br />
              <span className='copyPaste'>email@gmail.com</span>
            </p>
          </details>
          <details>
            <summary>Error?</summary>
            <p>
              Email address must contain no special characters with the exception of asperands (@) and a period (.).
              <br />
              Phone number must be ten digits in length. Please do not premise your phone number with the one (1) extension.
              <br />
              Website url must be secure (https://), I will, without question, reject any inquiry with an insecure url.
            </p>
          </details>
        </article>
      </section>
      <section className='contactFormSection'>
        <form className='contact__form'>
          {contactFormFields.map((field: ContactFormFieldsType, index) => (
            <Fragment key={field.input}>
              <label className='contact__form__label' htmlFor={field.input} ref={contactFormLabel} data-status='disabled'>
                {field.optional ? `${field.placeholder} (optional)` : field.placeholder}
              </label>
              <input
                className='contact__form__input'
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
              <div className='contact__form__errorMessage'>
                {contactFormFields[index].value.length > 0 ? (
                  <ContactFormErrorHandler contactFormFields={contactFormFields} formValidation={formValidation} indexParam={index} />
                ) : null}
              </div>
            </Fragment>
          ))}
        </form>
      </section>
    </aside>
  );
};

export default ContactForm;
