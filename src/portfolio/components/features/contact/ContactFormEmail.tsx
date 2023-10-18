const ContactFormEmail = () => {
  return (
    <section className='contactFormSection'>
      <form className='contact__form'>
        <fieldset className='contact__form__fieldset'>
          {contactFormFields.map((field: ContactFormFieldsType, index) =>
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
                      onChangeHook(field.input, e.target.value);
                      useContactFormValidator(index);
                    }}
                  />
                  {contactFormFields[index].value.length > 0 ? (
                    <div className='contact__form__fieldset__container__errorMessage'>
                      <ContactFormErrorHandler contactFormFields={contactFormFields} formValidation={formValidation} indexParam={index} />
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
                      onChangeHook(field.input, e.target.value);
                      useContactFormValidator(index);
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
