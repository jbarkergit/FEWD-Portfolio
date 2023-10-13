import React, { useState, ChangeEvent, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import FormInputs from './form-data-objects/FormInputs';
import FormLabelDialogProp from './props/FormLabelDialogProp';

//Prop drill from Portfolio page
type ContactType = {
  contactFormActive: boolean;
  setContactFormActive: Dispatch<SetStateAction<boolean>>;
};

type FormValuesType = {
  [key: string]: string;
};

const ContactForm = ({ contactFormActive, setContactFormActive }: ContactType) => {
  const initialFormValues: FormValuesType = FormInputs.reduce((acc, input) => ({ ...acc, [input.name]: '' }), {});
  const [formValues, setFormValues] = useState<FormValuesType>(initialFormValues);

  // Set input values
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  // Form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  //Form Exterior Click Handler
  const contact = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleExteriorClick = (e: PointerEvent) => {
      if (
        contactFormActive === true &&
        contact.current &&
        contact.current.getAttribute('data-status') === 'active' &&
        !contact.current?.contains(e.target as Node)
      ) {
        setContactFormActive(false);
      }
    };

    document.body.addEventListener('pointerdown', handleExteriorClick);
    return () => document.body.removeEventListener('pointerdown', handleExteriorClick);
  }, [contactFormActive]);

  return (
    <div id='contactWrapper' data-status={contactFormActive === true ? 'active' : 'false'}>
      <aside className='contact' data-status={contactFormActive === true ? 'active' : 'false'} ref={contact}>
        <section className='contact__section' role='dialog' aria-modal='true' data-show='false' aria-label='About Developer and Developer Contact information'>
          <h2>Contact Justin</h2>
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
