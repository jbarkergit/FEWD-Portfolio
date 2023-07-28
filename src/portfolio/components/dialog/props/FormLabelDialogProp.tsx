import { ChangeEvent, FunctionComponent, useRef } from 'react';

type FormLabelDialogPropProps = {
  name: string;
  placeholder: string;
  type: string;
  value: string;
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FormLabelDialogProp: FunctionComponent<FormLabelDialogPropProps> = ({ name, placeholder, type, value, required, onChange }) => {
  const fieldLabelRef = useRef<HTMLLabelElement>(null);

  const handleFocus = () => {
    if (fieldLabelRef.current) fieldLabelRef.current.setAttribute('data-status', 'active');
  };

  const handleBlur = () => {
    if (fieldLabelRef.current) fieldLabelRef.current.setAttribute('data-status', 'false');
  };

  return (
    <div className="dialog__modal__contact__form__field">
      <label className="dialog__modal__contact__form__field--label" htmlFor={name} ref={fieldLabelRef} data-status="false">
        {placeholder}
      </label>
      <input
        className="dialog__modal__contact__form__field--input"
        type={type}
        id={name}
        name={name}
        value={value}
        required={required}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
      />
    </div>
  );
};

export default FormLabelDialogProp;
