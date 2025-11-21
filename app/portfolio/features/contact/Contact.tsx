import { useState } from 'react';

import ContactForm from '~/portfolio/features/contact/ContactForm';
import ContactSubmitted from '~/portfolio/features/contact/ContactSubmitted';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  return isSubmitted ? <ContactSubmitted /> : <ContactForm setIsSubmitted={setIsSubmitted} />;
};

export default Contact;
