import { Dispatch, SetStateAction, useState } from 'react';
import ContactFormStandard from './ContactFormStandard';
import ContactFormInformation from './ContactInformation';

//** Prop drill from pages/Portfolio */
type ContactFormType = {
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

//** Prop drilling destructor types */
export type ContactFormPropsType = {
  contactFormFields: ContactFormFieldsType[];
  setContactFormFields: Dispatch<SetStateAction<ContactFormFieldsType[]>>;
  formValidation: FormValidationStateType[];
  setFormValidation: Dispatch<SetStateAction<FormValidationStateType[]>>;
  updateContactFormFieldsState: (inputParam: string, valueParam: string) => void;
  useContactFormValidator: (changedIndexParam: number) => void;
};

const ContactForm = ({ contactFormActive, setContactFormActive }: ContactFormType) => {
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

  return (
    <aside className='contactFormWrapper' role='dialog' aria-label='Developer Contact Form' data-status={contactFormActive === true ? 'active' : 'false'}>
      <div className='contactForm'>
        <ContactFormStandard
          contactFormFields={contactFormFields}
          setContactFormFields={setContactFormFields}
          formValidation={formValidation}
          setFormValidation={setFormValidation}
          updateContactFormFieldsState={updateContactFormFieldsState}
          useContactFormValidator={useContactFormValidator}
        />
        <ContactFormInformation />
      </div>
    </aside>
  );
};

export default ContactForm;
