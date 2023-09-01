import { useEffect, useRef } from 'react';
import ContactForm from './sections/ContactForm';

type ContactType = {
  contactForm: boolean;
};

const Contact = ({ contactForm }: ContactType) => {
  const contactWrapperRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    contactForm ? contactWrapperRef.current?.setAttribute('data-status', 'active') : contactWrapperRef.current?.setAttribute('data-status', 'false');
    contactForm ? contactRef.current?.setAttribute('data-status', 'active') : contactRef.current?.setAttribute('data-status', 'false');
  }, [contactForm]);

  return (
    <div className="contactWrapper" data-status="false" ref={contactWrapperRef}>
      <aside className="contact" data-status="false" ref={contactRef}>
        <section className="contact__section">
          <hgroup className="contact__section__information">
            <h2>Justin Barker</h2>
            <h3>React Developer</h3>
          </hgroup>
        </section>
        <ContactForm />
      </aside>
    </div>
  );
};
export default Contact;
