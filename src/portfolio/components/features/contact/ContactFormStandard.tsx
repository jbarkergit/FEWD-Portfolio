import { ChangeEvent, useRef } from 'react';
import { ContactFormFieldsType, ContactFormPropsType } from './ContactForm';
import ContactFormErrorHandler from './ContactFormErrorHandler';

const ContactFormStandard = ({ ...ContactFormProps }: ContactFormPropsType) => {
  // Prop drill alias
  const props = ContactFormProps;

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
    <section className='contactFormSection'>
      <form className='contact__form'>
        <fieldset className='contact__form__fieldset'>
          {props.contactFormFields.map((field: ContactFormFieldsType, index) =>
            field.input !== 'inquiry' ? (
              <>
                <div className='contact__form__fieldset__container' key={field.input}>
                  <label className='contact__form__fieldset__container__label' htmlFor={field.input} ref={contactFormLabel} data-status='disabled'>
                    {field.optional ? `${field.placeholder} (optional)` : field.placeholder}
                  </label>
                  <input
                    className='contact__form__fieldset__container__input'
                    id={field.input}
                    name={field.input}
                    type={'text'}
                    value={field.value}
                    required={field.optional ? true : false}
                    onFocus={handleFocusHook}
                    onBlur={handleBlurHook}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      props.updateContactFormFieldsState(field.input, e.target.value);
                      props.useContactFormValidator(index);
                    }}
                  />
                  {props.contactFormFields[index].value.length > 0 ? (
                    <div className='contact__form__fieldset__container__errorMessage'>
                      <ContactFormErrorHandler contactFormFields={props.contactFormFields} formValidation={props.formValidation} indexParam={index} />
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <div className='contact__form__fieldset__container' key={field.input}>
                  <label className='contact__form__fieldset__container__label' htmlFor={field.input} ref={contactFormLabel} data-status='disabled'>
                    {field.optional ? `${field.placeholder} (optional)` : field.placeholder}
                  </label>
                  <textarea
                    className='contact__form__fieldset__container__input'
                    id={field.input}
                    name={field.input}
                    value={field.value}
                    required={field.optional ? true : false}
                    rows={8}
                    cols={50}
                    onFocus={handleFocusHook}
                    onBlur={handleBlurHook}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      props.updateContactFormFieldsState(field.input, e.target.value);
                      props.useContactFormValidator(index);
                    }}
                  />
                </div>
              </>
            )
          )}
        </fieldset>
        <button className='contact__form__submit'>Send</button>
      </form>
    </section>
  );
};

export default ContactFormStandard;
