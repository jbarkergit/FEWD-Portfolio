import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Zod validation schema
const schema = z.object({
  first: z.string().trim().min(1, { message: 'First name is required.' }),
  last: z.string().trim().min(1, { message: 'Last name is required.' }),
  phone: z.string().min(10, { message: 'Invalid phone number.' }),
  email: z.string().trim().email({ message: 'Invalid email address.' }),
  agency: z.string().trim().optional(),
  role: z.string().trim().optional(),
  message: z.string().trim().min(1, { message: 'Please type your inquiry.' }),
});

const Contact = () => {
  // Initialize react-hook-form, connect Zod schema via zodResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Form submission handler
  const onSubmit = async (data: any) => {
    // Prep form data to send via Web3Forms API
    const formData = new FormData();
    formData.append('access_key', import.meta.env.VITE_WEB_FORMS_KEY!);
    formData.append('first', data.first);
    formData.append('last', data.last);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('agency', data.agency || '');
    formData.append('role', data.role || '');
    formData.append('message', data.message);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) reset();
      else throw new Error(result);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <section className='contact'>
      <div className='contact__container'>
        <article className='contact__container__article'>
          <h2 id='form-title'>Let's Work Together</h2>
          <p>
            A response will be provided as promptly as possible. Rest assured, every effort will be made to address your inquiry in a timely manner. Your matter is
            important, and any additional details you wish to provide will help ensure a more efficient response.
          </p>
        </article>
        <form
          id='user-form'
          className='contact__container__form'
          onSubmit={handleSubmit(onSubmit)} // Use handleSubmit for form submission
          aria-labelledby='form-title'>
          <ul className='contact__container__form__ul'>
            {/* First Name */}
            <li className='contact__container__form__ul__li'>
              <label htmlFor='first-name' className='contact__container__form__ul__li__label'>
                First Name
              </label>
              <input
                type='text'
                id='first-name'
                className='contact__container__form__ul__li__input'
                {...register('first')} // Register input with react-hook-form
                placeholder=' '
                aria-invalid={errors.first ? 'true' : 'false'}
              />
              {errors.first && (
                <span className='form-message' role='alert'>
                  {errors.first.message} {/* Display error message */}
                </span>
              )}
            </li>

            {/* Last Name */}
            <li className='contact__container__form__ul__li'>
              <label htmlFor='last-name' className='contact__container__form__ul__li__label'>
                Last Name
              </label>
              <input
                type='text'
                id='last-name'
                className='contact__container__form__ul__li__input'
                {...register('last')}
                placeholder=' '
                aria-invalid={errors.last ? 'true' : 'false'}
              />
              {errors.last && (
                <span className='form-message' role='alert'>
                  {errors.last.message}
                </span>
              )}
            </li>

            {/* Email */}
            <li className='contact__container__form__ul__li'>
              <label htmlFor='email' className='contact__container__form__ul__li__label'>
                Email
              </label>
              <input
                type='email'
                id='email'
                className='contact__container__form__ul__li__input'
                {...register('email')}
                placeholder=' '
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <span className='form-message' role='alert'>
                  {errors.email.message}
                </span>
              )}
            </li>

            {/* Phone */}
            <li className='contact__container__form__ul__li'>
              <label htmlFor='phone' className='contact__container__form__ul__li__label'>
                Phone
              </label>
              <input
                type='tel'
                id='phone'
                className='contact__container__form__ul__li__input'
                {...register('phone')}
                placeholder=' '
                aria-invalid={errors.phone ? 'true' : 'false'}
              />
              {errors.phone && (
                <span className='form-message' role='alert'>
                  {errors.phone.message}
                </span>
              )}
            </li>

            {/* Agency */}
            <li className='contact__container__form__ul__li'>
              <label htmlFor='agency' className='contact__container__form__ul__li__label'>
                Agency (Optional)
              </label>
              <input type='text' id='agency' className='contact__container__form__ul__li__input' {...register('agency')} placeholder=' ' />
            </li>

            {/* Role */}
            <li className='contact__container__form__ul__li'>
              <label htmlFor='role' className='contact__container__form__ul__li__label'>
                Role (Optional)
              </label>
              <input type='text' id='role' className='contact__container__form__ul__li__input' {...register('role')} placeholder=' ' />
            </li>

            {/* Message */}
            <li className='contact__container__form__ul__li'>
              <label htmlFor='message' className='contact__container__form__ul__li__label'>
                Message
              </label>
              <textarea
                id='message'
                className='contact__container__form__ul__li__textarea'
                {...register('message')}
                placeholder=' '
                aria-invalid={errors.message ? 'true' : 'false'}
              />
              {errors.message && (
                <span className='form-message' role='alert'>
                  {errors.message.message}
                </span>
              )}
            </li>
          </ul>

          {/* Submit Button */}
          <button type='submit' className='contact__container__form--btn'>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
