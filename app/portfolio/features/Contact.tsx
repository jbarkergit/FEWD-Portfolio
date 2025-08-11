import React, { useState } from 'react';
import { z } from 'zod';
import { zodSchema } from '~/base/validation/zodSchema';

type Inputs = Record<
  'firstName' | 'lastName' | 'email' | 'phone' | 'agency' | 'role',
  Record<'htmlFor' | 'label' | 'inputType' | 'inputReg', string>
>;

const inputs: Inputs = {
  firstName: { htmlFor: 'first-name', label: 'First Name', inputType: 'text', inputReg: 'first' },
  lastName: { htmlFor: 'last-name', label: 'Last Name', inputType: 'text', inputReg: 'last' },
  email: { htmlFor: 'email', label: 'Email', inputType: 'email', inputReg: 'email' },
  phone: { htmlFor: 'phone', label: 'Phone', inputType: 'tel', inputReg: 'phone' },
  agency: { htmlFor: 'agency', label: 'Agency (Optional)', inputType: 'text', inputReg: 'agency' },
  role: { htmlFor: 'role', label: 'Role (Optional)', inputType: 'text', inputReg: 'role' },
};

const schema = z.object({
  firstName: zodSchema.user.shape.firstName,
  lastName: zodSchema.user.shape.lastName,
  phoneNumber: zodSchema.contact.shape.phoneNumber,
  emailAddress: zodSchema.contact.shape.emailAddress,
  business: zodSchema.entity.shape.business,
  role: zodSchema.entity.shape.role,
  message: zodSchema.fields.shape.message,
});

type FormData = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  message: string;
  business?: string;
  role?: string;
};

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    message: '',
    business: '',
    role: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Web3Forms submission
  const submitForm = async (data: typeof formData) => {
    const formDataObj = new FormData();
    formDataObj.append('access_key', import.meta.env.VITE_WEB_FORMS_KEY!);

    for (const key in data) {
      const value = data[key as keyof typeof data];
      if (value !== undefined) {
        formDataObj.append(key, value);
      }
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formDataObj,
    });

    const result = (await response.json()) as { success: boolean };

    if (!result.success) {
      throw new Error(JSON.stringify(result));
    }
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Zod Schema Validation
    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    // Clear errors
    setErrors({});

    try {
      await submitForm(result.data);

      // Reset form input values to provide a visual indicator that the form has been submitted
      setFormData({
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: '',
        business: '',
        role: '',
        message: '',
      });
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
            A response will be provided as promptly as possible. Rest assured, every effort will be made to address your
            inquiry in a timely manner. Your matter is important, and any additional details you wish to provide will
            help ensure a more efficient response.
          </p>
        </article>
        <form
          id='user-form'
          className='contact__container__form'
          onSubmit={handleSubmit}
          aria-labelledby='form-title'>
          <ul className='contact__container__form__ul'>
            {Object.entries(inputs).map(([key, { htmlFor, label, inputType }]) => (
              <li key={`contact-list-item-${key}`}>
                <label htmlFor={htmlFor}>{label}</label>
                <input
                  id={htmlFor}
                  type={inputType}
                  name={key === 'phone' ? 'phoneNumber' : key === 'email' ? 'emailAddress' : key} // match schema keys
                  value={
                    key === 'phone'
                      ? formData.phoneNumber
                      : key === 'email'
                        ? formData.emailAddress
                        : formData[key as keyof FormData]
                  }
                  onChange={handleChange}
                  aria-invalid={!!errors[key === 'phone' ? 'phoneNumber' : key === 'email' ? 'emailAddress' : key]}
                  aria-describedby={`${htmlFor}-error`}
                />
                {errors[key === 'phone' ? 'phoneNumber' : key === 'email' ? 'emailAddress' : key] && (
                  <span
                    id={`${htmlFor}-error`}
                    role='alert'>
                    {errors[key === 'phone' ? 'phoneNumber' : key === 'email' ? 'emailAddress' : key]}
                  </span>
                )}
              </li>
            ))}

            {/* Message textarea */}
            <li>
              <label htmlFor='message'>Message</label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
                aria-describedby='message-error'
              />
              {errors.message && (
                <span
                  id='message-error'
                  role='alert'>
                  {errors.message}
                </span>
              )}
            </li>
          </ul>

          <button type='submit'>Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
