import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { zodSchema } from '~/base/validation/schema/zodSchema';

type Inputs = Record<
  'firstName' | 'lastName' | 'email' | 'phone' | 'agency' | 'role',
  Record<'htmlFor' | 'label' | 'inputType' | 'inputReg', string>
>;

const inputs: Inputs = {
  firstName: { htmlFor: 'first-name', label: 'First Name', inputType: 'text', inputReg: 'first' },
  lastName: { htmlFor: 'last-name', label: 'Last Name', inputType: 'text', inputReg: 'last' },
  email: { htmlFor: 'email', label: 'Email', inputType: 'email', inputReg: 'email' },
  phone: { htmlFor: 'phone', label: 'Phone', inputType: 'tel', inputReg: 'phone' },
  agency: { htmlFor: 'agency', label: 'Agency (Optional)', inputType: 'text', inputReg: 'agency' },
  role: { htmlFor: 'role', label: 'Role (Optional)', inputType: 'text', inputReg: 'role' },
};

const schema = z.object({
  firstName: zodSchema.user.shape.firstName,
  lastName: zodSchema.user.shape.lastName,
  phoneNumber: zodSchema.contact.shape.phoneNumber,
  emailAddress: zodSchema.contact.shape.emailAddress,
  business: zodSchema.entity.shape.business,
  role: zodSchema.entity.shape.role,
  message: zodSchema.fields.shape.message,
});

const Contact = () => {
  // Form submission handler
  const onSubmit = async (data: any) => {
    // Prep form data to send via Web3Forms API
    const formData = new FormData();
    formData.append('access_key', import.meta.env.VITE_WEB_FORMS_KEY!);

    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const result = (await response.json()) as { success: boolean };

      if (!result.success) throw new Error(JSON.stringify(result));
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
            A response will be provided as promptly as possible. Rest assured, every effort will be made to address your
            inquiry in a timely manner. Your matter is important, and any additional details you wish to provide will
            help ensure a more efficient response.
          </p>
        </article>
        <form
          id='user-form'
          className='contact__container__form'
          onSubmit={handleSubmit(onSubmit)}
          aria-labelledby='form-title'>
          <ul className='contact__container__form__ul'>
            {/* Inputs */}
            {Object.entries(inputs).map((key, []) => (
              <li>
                <label htmlFor='message'>Message</label>
                <textarea
                  id='message'
                  placeholder=' '
                  {...register('message')}
                />
                {errors.message && <span>{String(errors.message?.message)}</span>}
              </li>
            ))}
            {/* Message */}
            <li>
              <label htmlFor='message'>Message</label>
              <textarea
                id='message'
                placeholder=' '
                {...register('message')}
              />
              {errors.message && <span>{String(errors.message?.message)}</span>}
            </li>
          </ul>
          {/* Submit Button */}
          <button type='submit'>Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
