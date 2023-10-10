import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import FormInputs from './form-data-objects/FormInputs';
import FormLabelDialogProp from './props/FormLabelDialogProp';

//Prop drill from Portfolio page
type ContactType = {
  contactForm: boolean;
  setContactForm: Dispatch<SetStateAction<boolean>>;
};

type FormValuesType = {
  [key: string]: string;
};

const ContactForm = ({ contactForm, setContactForm }: ContactType) => {
  const initialFormValues: FormValuesType = FormInputs.reduce((acc, input) => ({ ...acc, [input.name]: '' }), {});

  const [formValues, setFormValues] = useState<FormValuesType>(initialFormValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <div className='contactWrapper'>
      <aside className='contact'>
        <section className='contact__section' role='dialog' aria-modal='true' data-show='false' aria-label='About Developer and Developer Contact information'>
          <h2>Contact</h2>
          <form method='dialog' onSubmit={handleSubmit} className='contact__section__form'>
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
            <button>Send Message</button>
          </form>
        </section>
      </aside>
    </div>
  );
};

export default ContactForm;
