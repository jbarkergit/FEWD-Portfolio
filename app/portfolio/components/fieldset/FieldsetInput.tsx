import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { schema } from '~/portfolio/data/schema';

const FieldsetLI = ({ htmlFor, label, inputType, inputId, inputReg }: { htmlFor: string; label: string; inputType: string; inputId: string; inputReg: string }) => {
  const {
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <li className='contact__container__form__ul__li'>
      <label htmlFor={htmlFor} className='contact__container__form__ul__li__label'>
        {label}
      </label>
      <input
        type={inputType}
        id={inputId}
        className='contact__container__form__ul__li__input'
        {...register(inputReg)} // Register input with react-hook-form
        placeholder=' '
        aria-invalid={errors.first ? 'true' : 'false'}
      />
      {errors.first && (
        <span className='form-message' role='alert'>
          {errors.first.message} {/* Display error message */}
        </span>
      )}
    </li>
  );
};

export default FieldsetLI;
