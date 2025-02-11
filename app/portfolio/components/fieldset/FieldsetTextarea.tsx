import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { schema } from '~/portfolio/data/schema';

const FieldsetTextarea = () => {
  const {
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  return (
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
    </li>
  );
};

export default FieldsetTextarea;
