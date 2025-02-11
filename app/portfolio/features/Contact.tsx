import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../data/schema';
import FieldsetInput from '../components/fieldset/FieldsetInput';
import FieldsetSubmit from '../components/fieldset/FieldsetSubmit';
import FieldsetTextarea from '../components/fieldset/FieldsetTextarea';

const Contact = () => {
  const { handleSubmit, reset } = useForm({
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

      const result = (await response.json()) as { success: boolean };

      if (result.success) reset();
      else throw new Error(JSON.stringify(result));
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
            <FieldsetInput htmlFor={'first-name'} label={'First Name'} inputType={'text'} inputId={'first-name'} inputReg={'first'} />
            {/* Last Name */}
            <FieldsetInput htmlFor={'last-name'} label={'Last Name'} inputType={'text'} inputId={'last-name'} inputReg={'last'} />
            {/* Email */}
            <FieldsetInput htmlFor={'email'} label={'Email'} inputType={'email'} inputId={'email'} inputReg={'email'} />
            {/* Phone */}
            <FieldsetInput htmlFor={'phone'} label={'Phone'} inputType={'tel'} inputId={'phone'} inputReg={'phone'} />
            {/* Agency */}
            <FieldsetInput htmlFor={'agency'} label={'Agency (Optional)'} inputType={'text'} inputId={'agency'} inputReg={'agency'} />
            {/* Role */}
            <FieldsetInput htmlFor={'role'} label={'Role (Optional)'} inputType={'text'} inputId={'role'} inputReg={'role'} />
            {/* Message */}
            <FieldsetTextarea />
          </ul>
          {/* Submit Button */}
          <FieldsetSubmit />
        </form>
      </div>
    </section>
  );
};

export default Contact;
