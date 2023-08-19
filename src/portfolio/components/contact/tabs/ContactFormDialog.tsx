import React, { useState, ChangeEvent } from 'react';
import FormInputs from '../data/FormInputs';
import FormLabelDialogProp from '../props/FormLabelDialogProp';

type FormValuesType = {
  [key: string]: string;
};

const ContactFormDialog = () => {
  const initialFormValues: FormValuesType = FormInputs.reduce((acc, input) => ({ ...acc, [input.name]: '' }), {});

  const [formValues, setFormValues] = useState<FormValuesType>(initialFormValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <section className="dialog__modal__contact">
      <h2 style={{ display: 'none' }}>Contact the Developer</h2>
      <form method="dialog" onSubmit={handleSubmit} className="dialog__modal__contact__form">
        {FormInputs.map((input) => (
          <FormLabelDialogProp
            key={input.id}
            name={input.name}
            placeholder={input.placeholder}
            type={input.type}
            value={formValues[input.name]}
            required={input.required}
            onChange={handleChange}
          />
        ))}
      </form>
    </section>
  );
};

export default ContactFormDialog;
