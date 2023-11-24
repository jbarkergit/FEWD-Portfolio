import { ChangeEvent, useRef } from 'react';
import { ContactFormFieldsType, ContactFormPropsType } from './ContactForm';
import ContactFormErrorHandler from './ContactFormErrorHandler';

const ContactFormStandard = ({ ...ContactFormProps }: ContactFormPropsType) => {
  // Prop drill alias
  const props = ContactFormProps;

  // useRef
  const contactFormLabels: HTMLLabelElement[] = [];

  const contactFormLabel = (reference: HTMLLabelElement) => {
    if (reference && !contactFormLabels.includes(reference)) {
      contactFormLabels.push(reference);
    }
  };

  //** Handle input field label animation (not using traditional placeholder solely to animate the text) */
  const handleFocusHook = (index: number) => {
    contactFormLabels[index].setAttribute('data-status', 'active');
  };

  const handleBlurHook = (index: number) => {
    contactFormLabels[index].setAttribute('data-status', 'disabled');
  };

  return (
    <section className='contactForm__section'>
      <h2>Contact Form</h2>
      <form className='standardForm'>
        <fieldset className='standardForm__fieldset'>
          {props.contactFormFields.map((field: ContactFormFieldsType, index: number) =>
            field.input !== 'inquiry' ? (
              <div className='standardForm__fieldset__container' key={field.input}>
                <label className='standardForm__fieldset__container--label' htmlFor={field.input} ref={contactFormLabel} data-status='disabled'>
                  {field.optional ? `${field.placeholder} (optional)` : field.placeholder}
                </label>
                <input
                  className='standardForm__fieldset__container--input'
                  id={field.input}
                  name={field.input}
                  type={'text'}
                  value={field.value}
                  required={field.optional ? true : false}
                  aria-required={field.optional ? 'true' : 'false'}
                  onFocus={() => handleFocusHook(index)}
                  onBlur={() => handleBlurHook(index)}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    props.updateContactFormFieldsState(field.input, e.target.value);
                    props.useContactFormValidator(index);
                  }}
                />
                {props.contactFormFields[index].value.length > 0 ? (
                  <div className='standardForm__fieldset__container--errorMessage'>
                    <ContactFormErrorHandler contactFormFields={props.contactFormFields} formValidation={props.formValidation} indexParam={index} />
                  </div>
                ) : null}
              </div>
            ) : (
              <div className='standardForm__fieldset__container' key={field.input}>
                <label className='standardForm__fieldset__container--label' htmlFor={field.input} ref={contactFormLabel} data-status='disabled'>
                  {field.optional ? `${field.placeholder} (optional)` : field.placeholder}
                </label>
                <textarea
                  className='standardForm__fieldset__container--input'
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
                    props.updateContactFormFieldsState(field.input, e.target.value);
                    props.useContactFormValidator(index);
                  }}
                />
              </div>
            )
          )}
        </fieldset>
      </form>
    </section>
  );
};

export default ContactFormStandard;
