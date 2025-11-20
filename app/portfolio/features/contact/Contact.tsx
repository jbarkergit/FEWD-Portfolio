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
  inquiry: { htmlFor: 'inquiry', inputType: 'select' },
  message: { htmlFor: 'message', inputType: 'text' },
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

  const formRef = useRef<HTMLFormElement>(null);

  const handleSection = (index: number) => {
    if (!formRef.current) return;

    const steps = Array.from(formRef.current.children) as HTMLElement[];
    const clamped = Math.min(Math.max(index, 0), steps.length - 1);
    const attr = 'data-toggle';

    steps.forEach((el, i) => el.setAttribute(attr, i === clamped ? 'true' : 'false'));
  };

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
    <section
      className='contact'
      ref={contactContainerRef}>
      <header className='contact__heading'>
        <h2>Contact Form</h2>
      </header>
      <form
        className='contact__form'
        ref={formRef}
        onSubmit={handleSubmit}>
        <section
          className='contact__form__step'
          data-toggle='true'>
          <header className='contact__form__step__header'>
            <div className='contact__form__step__header__wrapper'>
              <span>
                <MaterialSymbolsCircle />
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
          <nav className='contact__form__step__stepper'>
            <div className='contact__form__step__stepper__section'>
              <button
                className='contact__form__step__stepper__section__button'
                aria-label='Return to Project Hub'
                type='button'
                onClick={() => {
                  handleSection(0);
                  setFeatureState({ contactFormActive: false, projectDetailsActive: false });
                }}>
                <MaterialSymbolsArrowLeftAlt />
              </button>
            </div>
            <div className='contact__form__step__stepper__section'>
              <button
                className='contact__form__step__stepper__section__button'
                aria-label='Continue to Inquiry Details'
                type='button'
                onClick={() => handleSection(1)}>
                <span>Next</span>
                <span>
                  <MaterialSymbolsArrowRightAlt />
                </span>
              </button>
            </div>
          </nav>
        </section>

        <section
          className='contact__form__step'
          data-toggle='false'>
          <header className='contact__form__step__header'>
            <nav className='contact__form__step__header__nav'>
              <button
                aria-label='Return to Contact Information'
                type='button'
                onClick={() => handleSection(0)}>
                <MaterialSymbolsArrowLeftAlt />
              </button>
            </nav>
            <div className='contact__form__step__header__wrapper'>
              <span>
                <MaterialSymbolsCircle />
              </span>
              <h3>Inquiry Details</h3>
            </div>
            <h2>What’s the focus of your inquiry, and how can I be of service?</h2>
          </header>
          <ul className='contact__form__step__ul'>
            {Object.entries(inquiryInputs).map(([key, { htmlFor, inputType }]) => {
              const labelText =
                htmlFor === 'inquiry'
                  ? 'Inquiry Focus'
                  : htmlFor === 'message'
                    ? 'Message'
                    : htmlFor === 'other'
                      ? 'Other Details'
                      : '';

              return (
                <li
                  className='contact__form__step__ul__li'
                  key={`contact-form-inquiry-${key}`}>
                  {inputType === 'select' ? (
                    <select
                      id={htmlFor}
                      name={key}
                      required
                      aria-invalid={!!errors[key]}
                      aria-describedby={`${htmlFor}-error`}>
                      <option
                        value=''
                        disabled
                        selected
                        hidden>
                        Select your inquiry
                      </option>
                      <option value='long-term'>I’m looking to hire a React developer for a full-time role.</option>
                      <option value='project-build'>
                        I need a React front-end developer to build a new web application.
                      </option>
                      <option value='feature-dev'>
                        I need a React front-end developer to add new features or improve an existing project.
                      </option>
                      <option value='maintenance'>
                        I'm looking for a React developer for debugging, optimization, or ongoing maintenance.
                      </option>
                      <option value='ui-ux-implementation'>I have designs I need implemented in React.</option>
                      <option value='collaboration'>
                        I’d like to discuss a partnership or joint project using React.
                      </option>
                    </select>
                  ) : (
                    <input
                      className='contact__form__step__ul__li__input'
                      id={htmlFor}
                      type={inputType}
                      name={key}
                      placeholder=' '
                      aria-invalid={!!errors[key]}
                      aria-describedby={`${htmlFor}-error`}
                    />
                  )}

                  {errors[key] && (
                    <div
                      className='contact__form__step__ul__li__error'
                      id={`${htmlFor}-error`}
                      role='alert'
                      aria-live='polite'>
                      {errors[key]}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <nav className='contact__form__step__stepper'>
            <div className='contact__form__step__stepper__section'>
              <button
                className='contact__form__step__stepper__section__button'
                aria-label='Return to Project Hub'
                type='button'
                onClick={() => {
                  handleSection(0);
                  setFeatureState({ contactFormActive: false, projectDetailsActive: false });
                }}>
                <MaterialSymbolsArrowLeftAlt />
              </button>
            </div>
            <div className='contact__form__step__stepper__section'>
              <button
                className='contact__form__step__stepper__section__button'
                aria-label='Continue to Booking'
                type='button'
                onClick={() => handleSection(2)}>
                <span>Next</span>
                <span>
                  <MaterialSymbolsArrowRightAlt />
                </span>
              </button>
            </div>
          </nav>
        </section>

        <section
          className='contact__form__step'
          data-toggle='false'>
          <header className='contact__form__step__header'>
            <nav className='contact__form__step__header__nav'>
              <button
                aria-label='Return to Inquiry Details'
                type='button'
                onClick={() => handleSection(1)}>
                <MaterialSymbolsArrowLeftAlt />
              </button>
            </nav>
            <div className='contact__form__step__header__wrapper'>
              <span>
                <MaterialSymbolsCircle />
              </span>
              <h3>Booking</h3>
            </div>
            <h2>Let's book a call.</h2>
          </header>
          <ul className='contact__form__step__ul'></ul>
          <nav className='contact__form__step__stepper'>
            <div className='contact__form__step__stepper__section'>
              <button
                className='contact__form__step__stepper__section__button'
                aria-label='Return to Project Hub'
                type='button'
                onClick={() => {
                  handleSection(0);
                  setFeatureState({ contactFormActive: false, projectDetailsActive: false });
                }}>
                <MaterialSymbolsArrowLeftAlt />
              </button>
            </div>
            <div className='contact__form__step__stepper__section'>
              <button
                className='contact__form__step__stepper__section__button'
                aria-label='Submit form'
                type='submit'>
                <span>Submit</span>
                <span>
                  <MaterialSymbolsArrowShapeUpStack2 />
                </span>
              </button>
            </div>
          </nav>
        </section>
      </form>
    </section>
  );
};

export default Contact;

function MaterialSymbolsCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      {...props}>
      {/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}
      <path
        fill='currentColor'
        d='M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22'
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

function MaterialSymbolsArrowRightAlt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      {...props}>
      {/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}
      <path
        fill='currentColor'
        d='m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z'
      />
    </svg>
  );
}

function MaterialSymbolsArrowShapeUpStack2(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      {...props}>
      {/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}
      <path
        fill='currentColor'
        d='M9 23v-3H4l8-9l8 9h-5v3zm-5-8l8-9l8 9h-2.675L12 9l-5.325 6zm0-5l8-9l8 9h-2.675L12 4l-5.325 6z'
      />
    </svg>
  );
}

{
  /* <nav className='contact__nav'>
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
      </div> */
}
