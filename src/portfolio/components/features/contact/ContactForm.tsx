import { Dispatch, SetStateAction } from 'react';

// Prop drill from pages/Portfolio
type ContactType = {
  contactFormActive: boolean;
  setContactFormActive: Dispatch<SetStateAction<boolean>>;
};

export type ContactFormFieldsType = Record<string, string>;

const contactFormFields: ContactFormFieldsType[] = [
  { input: 'firstName', placeholder: 'First name' },
  { input: 'lastName', placeholder: 'Last name' },
  { input: 'emailAddress', placeholder: 'Email address' },
  { input: 'country', placeholder: 'Country' },
  { input: 'company', placeholder: 'Company' },
  { input: 'website', placeholder: 'Company website' },
  { input: 'inquiry', placeholder: 'inquiry' },
];

function handleFocus() {}

function handleBlur() {}

function onChange() {}

const ContactForm = ({ contactFormActive, setContactFormActive }: ContactType) => {
  return (
    <div id='contactWrapper' data-status={contactFormActive === true ? 'active' : 'false'}>
      <aside className='contact' role='dialog' aria-label='Developer Contact Form' data-status={contactFormActive === true ? 'active' : 'false'}>
        {contactFormFields.map((field: ContactFormFieldsType) => (
          <label htmlFor={field.input}>
            <input
              key={field.input}
              type={'text'}
              id={field.input}
              name={field.input}
              // value={}
              required={field.input === 'company' || field.input === 'website' ? false : true}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={onChange}
            />
          </label>
        ))}
      </aside>
    </div>
  );
};

export default ContactForm;
