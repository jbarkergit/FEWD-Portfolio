import { ContactFormFieldsType, FormValidationStateType } from '../ContactForm';

type ContactFormErrorHandlerType = {
  contactFormFields: ContactFormFieldsType[];
  formValidation: FormValidationStateType[];
  indexParam: number;
};

const ContactFormErrorHandler = ({ contactFormFields, formValidation, indexParam }: ContactFormErrorHandlerType) => {
  const verifierIndex = formValidation.findIndex((verifier: FormValidationStateType) => verifier.input === contactFormFields[indexParam].input);
  const verifierObject = formValidation[verifierIndex];
  const updatedField = contactFormFields[indexParam];

  if (verifierObject && verifierObject.validBoolean === false) {
    //** Email Address */
    if (updatedField.input === 'emailAddress') {
      // Ensure @ symbol is present
      if (!updatedField.value.includes('@')) {
        return <>Please enter a valid email address.</>;
      } else {
        return <>Email address cannot contain special characters.</>;
      }
    }

    //** Phone Number */
    else if (updatedField.input === 'phoneNumber') {
      // If length is less than/greater than 10 throw error
      if (updatedField.value.length > 10 || updatedField.value.length < 10) {
        return <>Phone number must be ten digits long, excluding one (1) extension.</>;
      } else {
        return <>Please enter a valid phone number.</>;
      }
    }

    //** Website URL */
    else if (updatedField.input === 'websiteUrl') {
      return <>Disclaimer: Insecure websites will not be considered.</>;
    }

    //** Fallback */
    else return null;
  }
};

export default ContactFormErrorHandler;
