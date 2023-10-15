import { ContactFormFieldsType, FormValidationStateType } from './ContactForm';

type ContactFormErrorHandlerType = {
  contactFormFields: ContactFormFieldsType[];
  formValidation: FormValidationStateType[];
  indexParam: number;
};

const ContactFormErrorHandler = ({ contactFormFields, formValidation, indexParam }: ContactFormErrorHandlerType) => {
  const verifierIndex = formValidation.findIndex((verifier: FormValidationStateType) => verifier.input === contactFormFields[indexParam].input);

  if (formValidation[verifierIndex] && !formValidation[verifierIndex].validBoolean) {
    return <>{formValidation[verifierIndex].errorMessage}</>;
  }
};

export default ContactFormErrorHandler;
