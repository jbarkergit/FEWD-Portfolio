import { type FieldErrors, type UseFormRegister } from 'react-hook-form';

type FieldsetInputProps = {
  htmlFor: string;
  label: string;
  inputType: string;
  inputReg: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
};

const FieldsetInput = ({ htmlFor, label, inputType, inputReg, register, errors }: FieldsetInputProps) => (
  <li>
    <label htmlFor={htmlFor}>{label}</label>
    <input type={inputType} id={htmlFor} placeholder=' ' {...register(inputReg)} />
    {errors[inputReg] && <span>{String(errors[inputReg]?.message)}</span>}
  </li>
);

export default FieldsetInput;
