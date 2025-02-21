import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FieldsetTextarea from '../components/fieldset/FieldsetTextarea';
import FieldsetInput from '../components/fieldset/FieldsetInput';
import { zodSchema } from '~/base/schema/zodSchema';
import { z } from 'zod';

const Contact = () => {
  const schema = z.object({
    firstName: zodSchema.user.shape.firstName,
    lastName: zodSchema.user.shape.lastName,
    phoneNumber: zodSchema.contact.shape.phoneNumber,
    emailAddress: zodSchema.contact.shape.emailAddress,
    business: zodSchema.entity.shape.business,
    role: zodSchema.entity.shape.role,
    message: zodSchema.fields.shape.message,
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Form submission handler
  const onSubmit = async (data: any) => {
    // Prep form data to send via Web3Forms API
    const formData = new FormData();
    formData.append('access_key', import.meta.env.VITE_WEB_FORMS_KEY!);
    for (const key in data) formData.append(key, data[key]);

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
            <FieldsetInput htmlFor={'first-name'} label={'First Name'} inputType={'text'} inputReg={'first'} register={register} errors={errors} />
            {/* Last Name */}
            <FieldsetInput htmlFor={'last-name'} label={'Last Name'} inputType={'text'} inputReg={'last'} register={register} errors={errors} />
            {/* Email */}
            <FieldsetInput htmlFor={'email'} label={'Email'} inputType={'email'} inputReg={'email'} register={register} errors={errors} />
            {/* Phone */}
            <FieldsetInput htmlFor={'phone'} label={'Phone'} inputType={'tel'} inputReg={'phone'} register={register} errors={errors} />
            {/* Agency */}
            <FieldsetInput htmlFor={'agency'} label={'Agency (Optional)'} inputType={'text'} inputReg={'agency'} register={register} errors={errors} />
            {/* Role */}
            <FieldsetInput htmlFor={'role'} label={'Role (Optional)'} inputType={'text'} inputReg={'role'} register={register} errors={errors} />
            {/* Message */}
            <FieldsetTextarea register={register} errors={errors} />
          </ul>
          {/* Submit Button */}
          <button type='submit'>Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
