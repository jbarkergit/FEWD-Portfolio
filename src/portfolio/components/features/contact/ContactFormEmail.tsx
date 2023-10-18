import { ChangeEvent, useRef } from 'react';
import { ContactFormFieldsType, ContactFormPropsType } from './ContactForm';

const ContactFormEmail = ({ ...ContactFormProps }: ContactFormPropsType) => {
  //** Prop drill alias */
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
    <section className='contactForm__section'>
      <form className='emailPreview'>
        <fieldset className='emailPreview__fieldset'>
          {props.contactFormFields.map((field: ContactFormFieldsType, index) =>
            field.input !== 'inquiry' ? (
              <>
                <div className='emailPreview__fieldset__container'>
                  <label className='emailPreview__fieldset__container--label' key={field.input} htmlFor={field.input} ref={contactFormLabel} data-status='disabled'>
                    {field.optional ? `${field.placeholder} (optional)` : field.placeholder}
                  </label>
                  <input
                    className='emailPreview__fieldset__container--input'
                    id={field.input}
                    name={field.input}
                    type={'text'}
                    value={field.value}
                    required={field.optional ? true : false}
                    // onFocus={handleFocusHook}
                    // onBlur={handleBlurHook}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      props.updateContactFormFieldsState(field.input, e.target.value);
                      props.useContactFormValidator(index);
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className='emailPreview__fieldset__container' key={field.input}>
                  <label className='emailPreview__fieldset__container--label' htmlFor={field.input} ref={contactFormLabel} data-status='disabled'>
                    {field.optional ? `${field.placeholder} (optional)` : field.placeholder}
                  </label>
                  <textarea
                    className='emailPreview__fieldset__container--input'
                    id={field.input}
                    name={field.input}
                    value={field.value}
                    required={field.optional ? true : false}
                    rows={8}
                    cols={50}
                    // onFocus={handleFocusHook}
                    // onBlur={handleBlurHook}
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
      </form>
    </section>
  );
};
export default ContactFormEmail;
