import AboutDeveloper from './components/AboutDeveloper';
import ContactFormStandard from './components/ContactFormStandard';

const ContactForm = () => {
  return (
    <section className='contactForm'>
      <h2 className='contactForm--h2'>Developer contact form and general information</h2>

      <AboutDeveloper />
      <ContactFormStandard />
    </section>
  );
};

export default ContactForm;
