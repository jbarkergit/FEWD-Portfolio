import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

// Prop drill from pages/Portfolio
type ContactType = {
  contactFormActive: boolean;
  setContactFormActive: Dispatch<SetStateAction<boolean>>;
};

//** Contact form field array of objects types */
type ContactFormFieldsType = Array<{ [key: string]: string }>;
type ContactFormFieldType = { [key: string]: string };

//** Handle input field animation */
const handleFocusHook = () => {};

const handleBlurHook = () => {};
//** */

const ContactForm = ({ contactFormActive, setContactFormActive }: ContactType) => {
  const [contactFormFields, setContactFormFields] = useState<ContactFormFieldsType>([
    { input: 'firstName', placeholder: 'First name', value: '' },
    { input: 'lastName', placeholder: 'Last name', value: '' },
    { input: 'emailAddress', placeholder: 'Email address', value: '' },
    { input: 'country', placeholder: 'Country', value: '' },
    { input: 'company', placeholder: 'Company', value: '' },
    { input: 'website', placeholder: 'Company website', value: '' },
    { input: 'inquiry', placeholder: 'inquiry', value: '' },
  ]);

  //** Store input field values in state */
  const onChangeHook = (inputParam: string, valueParam: string) => {
    const formFieldStateIndex = contactFormFields.findIndex((field: ContactFormFieldType) => field.input === inputParam);

    // Ensure that the field exists
    if (formFieldStateIndex !== -1) {
      // Envoke state setter
      setContactFormFields(
        // Map shallow copy of state for safe mutation
        [...contactFormFields].map((field: ContactFormFieldType, index: number) => {
          // Ensure the correct field is being updated via iteration && index comparison
          if (index === formFieldStateIndex)
            // Update the field's key, value
            field.value = valueParam;
          // Satisfy the map function
          return field;
        })
      );
    }
  };

  return (
    <div id='contactWrapper' data-status={contactFormActive === true ? 'active' : 'false'}>
      <aside className='contact' role='dialog' aria-label='Developer Contact Form' data-status={contactFormActive === true ? 'active' : 'false'}>
        {contactFormFields.map((field: ContactFormFieldType) => (
          <label htmlFor={field.input} key={field.input}>
            <input
              type={'text'}
              id={field.input}
              name={field.input}
              value={field.input}
              required={field.input === 'company' || field.input === 'website' ? false : true}
              onFocus={handleFocusHook}
              onBlur={handleBlurHook}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHook(field.input, e.target.value)}
            />
          </label>
        ))}
      </aside>
    </div>
  );
};

export default ContactForm;
