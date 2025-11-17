import { useRef, useState, type SVGProps } from 'react';
import { contactSchema } from '~/base/validation/zodSchema';
import { useFeatureState } from '~/portfolio/context/FeatureStateContext';

const contactInformationInputs = {
  name: { htmlFor: 'name', inputType: 'text' },
  emailAddress: { htmlFor: 'email', inputType: 'email' },
  phoneNumber: { htmlFor: 'phone', inputType: 'tel' },
  business: { htmlFor: 'business', inputType: 'text' },
  role: { htmlFor: 'role', inputType: 'text' },
} as const;

const inquiryInputs = {
  message: { htmlFor: 'message', inputType: 'text' },
  location: { htmlFor: 'location', inputType: 'text' },
  otherDetails: { htmlFor: 'other', inputType: 'text' },
} as const;

const submitToWeb3Forms = async (formData: FormData) => {
  formData.append('access_key', import.meta.env.VITE_WEB_FORMS_KEY!);

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData,
  });

  const result = (await response.json()) as { success: boolean };

  if (!result.success) throw new Error(JSON.stringify(result));
};

const Contact = () => {
  const { featureState, setFeatureState } = useFeatureState();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const submittingRef = useRef<boolean>(false);
  const contactContainerRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submittingRef.current) return;
    submittingRef.current = true;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    const result = contactSchema.safeParse(formObject);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        if (typeof issue.path[0] === 'string') {
          fieldErrors[issue.path[0]] = issue.message;
        }
      }

      setErrors(fieldErrors);
      submittingRef.current = false;
      return;
    }

    try {
      await submitToWeb3Forms(formData);
      setErrors({});
      form.reset();
      contactContainerRef.current?.removeAttribute('data-submission-invalid');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      contactContainerRef.current?.setAttribute('data-submission-invalid', 'true');
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <section className='contact'>
      <header className='contact__heading'>
        <h2>Contact Form</h2>
      </header>
      <form
        className='contact__form'
        action=''>
        <section
          className='contact__form__step'
          data-toggle='true'>
          <header className='contact__form__step__header'>
            <div>
              <span>
                <MaterialSymbolsShieldLock />
              </span>
              <h3>Contact Information</h3>
            </div>
            <h2>Let's get started with your contact information.</h2>
          </header>
          <ul className='contact__form__step__ul'>
            {Object.entries(contactInformationInputs).map(([key, { htmlFor, inputType }]) => (
              <li
                className='contact__form__step__ul__li'
                key={`contact-form-information-${key}`}>
                <label
                  htmlFor={htmlFor}
                  className='contact__form__step__ul__li__label'>
                  {htmlFor === 'business'
                    ? 'Agency (optional)'
                    : htmlFor === 'role'
                      ? 'Role (optional)'
                      : htmlFor.replaceAll('-', ' ')}
                </label>
                <input
                  className='contact__form__step__ul__li__input'
                  id={htmlFor}
                  type={inputType}
                  name={key}
                  placeholder=' '
                  aria-invalid={!!errors[key]}
                  aria-describedby={`${htmlFor}-error`}
                />
                {errors[key] && (
                  <div
                    className='contact__form__step__ul__li__error'
                    id={`${htmlFor}-error`}
                    role='alert'>
                    {errors[key]}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <button className='contact__form__step__button'>Next</button>
        </section>
        <section
          className='contact__form__step'
          data-toggle='false'>
          <header className='contact__form__step__header'>
            <nav className='contact__form__step__nav'>
              <span>
                <MaterialSymbolsArrowLeftAlt />
              </span>
              <h3>Inquiry Details</h3>
            </nav>
            <h2>What’s the focus of your inquiry, and how can I be of service?</h2>
          </header>
          <ul className='contact__form__step__ul'>
            {Object.entries(inquiryInputs).map(([key, { htmlFor, inputType }]) => (
              <li
                className='contact__form__step__ul__li'
                key={`contact-form-inquiry-${key}`}>
                <label
                  htmlFor={htmlFor}
                  className='contact__form__step__ul__li__label'>
                  {htmlFor === 'location'
                    ? 'Location'
                    : htmlFor === 'message'
                      ? 'Message'
                      : htmlFor === 'other'
                        ? 'Other Details'
                        : ''}
                </label>
                {htmlFor === 'message' ? (
                  <textarea
                    id='message'
                    name='message'
                    aria-invalid={!!errors.message}
                    aria-describedby='message-error'
                  />
                ) : (
                  <input
                    className='contact__form__step__ul__li__input'
                    id={htmlFor}
                    type={inputType}
                    name={key}
                    placeholder={key}
                    aria-invalid={!!errors[key]}
                    aria-describedby={`${htmlFor}-error`}
                  />
                )}
                {errors[key] && (
                  <div
                    className='contact__form__step__ul__li__error'
                    id={`${htmlFor}-error`}
                    role='alert'>
                    {errors[key]}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <button className='contact__form__step__button'>Next</button>
        </section>
        <section
          className='contact__form__step'
          data-toggle='false'>
          <header className='contact__form__step__header'>
            <nav className='contact__form__step__nav'>
              <span>
                <MaterialSymbolsArrowLeftAlt />
              </span>
              <h3>Booking</h3>
            </nav>
            <h2>Let's book a call.</h2>
          </header>
          <ul className='contact__form__step__ul'></ul>
          <button className='contact__form__step__button'>Submit</button>
        </section>
      </form>
      {/* <nav className='contact__nav'>
        <button
          className='contact__container--return'
          aria-label='Return to project hub'
          onPointerUp={() => setFeatureState((p) => ({ ...p, contactFormActive: false }))}>
          Return to Project Hub
        </button>
      </nav>
      <div
        className='contact__container'
        ref={contactContainerRef}>
        {!isSubmitted && (
          <>
            <article className='contact__container__article'>
              <h2 id='form-title'>Let's Work Together</h2>
              <p>
                A response will be provided as promptly as possible. Rest assured, every effort will be made to address
                your inquiry in a timely manner. Your matter is important, and any additional details you wish to
                provide will help ensure a more efficient response.
              </p>
            </article>
            <form
              id='user-form'
              className='contact__container__form'
              onSubmit={handleSubmit}
              aria-labelledby='form-title'>
              <ul className='contact__container__form__ul'>
                {Object.entries(inputs).map(([key, { htmlFor, inputType }]) => (
                  <li key={`contact-list-item-${key}`}>
                    <label htmlFor={htmlFor}>
                      {htmlFor === 'business'
                        ? 'Agency (optional)'
                        : htmlFor === 'role'
                          ? 'Role (optional)'
                          : htmlFor.replaceAll('-', ' ')}
                    </label>
                    {key === 'message' ? (
                      <textarea
                        id='message'
                        name='message'
                        aria-invalid={!!errors.message}
                        aria-describedby='message-error'
                      />
                    ) : (
                      <input
                        id={htmlFor}
                        type={inputType}
                        name={key}
                        placeholder=' '
                        aria-invalid={!!errors[key]}
                        aria-describedby={`${htmlFor}-error`}
                      />
                    )}
                    {errors[key] && (
                      <span
                        id={`${htmlFor}-error`}
                        role='alert'>
                        {errors[key]}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <button
                type='submit'
                aria-label='Submit form'
                disabled={submittingRef.current}>
                Submit
              </button>
            </form>
          </>
        )}

        {isSubmitted && (
          <p>
            Your inquiry has been successfully submitted. Every effort will be made to provide a prompt response. Thank
            you for your consideration.
          </p>
        )}
      </div> */}
    </section>
  );
};

export default Contact;

function MaterialSymbolsShieldLock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      {...props}>
      {/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}
      <path
        fill='currentColor'
        d='M12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22m-2-6h4q.425 0 .713-.288T15 15v-3q0-.425-.288-.712T14 11v-1q0-.825-.587-1.412T12 8t-1.412.588T10 10v1q-.425 0-.712.288T9 12v3q0 .425.288.713T10 16m1-5v-1q0-.425.288-.712T12 9t.713.288T13 10v1z'
      />
    </svg>
  );
}

function MaterialSymbolsArrowLeftAlt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      {...props}>
      {/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}
      <path
        fill='currentColor'
        d='m10 18l-6-6l6-6l1.4 1.45L7.85 11H20v2H7.85l3.55 3.55z'
      />
    </svg>
  );
}
