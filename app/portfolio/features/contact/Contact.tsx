import { useState } from 'react';
import { contactSchema } from '~/base/validation/zodSchema';
import { usePortfolioContext } from '~/portfolio/context/PortfolioContext';

const inputs = {
  firstName: { htmlFor: 'first-name', inputType: 'text' },
  lastName: { htmlFor: 'last-name', inputType: 'text' },
  emailAddress: { htmlFor: 'email', inputType: 'email' },
  phoneNumber: { htmlFor: 'phone', inputType: 'tel' },
  business: { htmlFor: 'business', inputType: 'text' },
  role: { htmlFor: 'role', inputType: 'text' },
  message: { htmlFor: 'message', inputType: 'text' },
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
  const { setFeatureState } = usePortfolioContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
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
    } else {
      try {
        await submitToWeb3Forms(formData);
        setErrors({});
      } catch (error) {
        console.error('Submission error:', error);
        // do something to inform the user of failure
      }
    }
  };

  return (
    <section className='contact'>
      <div className='contact__container'>
        <article className='contact__container__article'>
          <h2 id='form-title'>Let's Work Together</h2>
          <p>
            A response will be provided as promptly as possible. Rest assured, every effort will be made to address your
            inquiry in a timely manner. Your matter is important, and any additional details you wish to provide will
            help ensure a more efficient response.
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
            aria-label='Submit form'>
            Submit
          </button>
        </form>
        <button
          className='contact__container--return'
          onPointerUp={() => setFeatureState((p) => ({ ...p, contactFormActive: false }))}>
          Return
        </button>
      </div>
    </section>
  );
};

export default Contact;
