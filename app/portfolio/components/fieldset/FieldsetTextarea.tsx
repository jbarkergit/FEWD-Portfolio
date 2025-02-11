import { type FieldErrors, type UseFormRegister } from 'react-hook-form';

type FieldsetTextareaProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
};

const FieldsetTextarea = ({ register, errors }: FieldsetTextareaProps) => (
  <li>
    <label htmlFor='message'>Message</label>
    <textarea id='message' {...register('message')} />
    {errors.message && <span>{String(errors.message?.message)}</span>}
  </li>
);

export default FieldsetTextarea;
