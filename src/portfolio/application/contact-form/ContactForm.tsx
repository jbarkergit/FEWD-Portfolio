import { useEffect, useRef } from 'react';
import AboutDeveloper from './components/AboutDeveloper';
import ContactFormStandard from './components/ContactFormStandard';

const ContactForm = () => {
  const blob = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const useBlobSizer = () => {
      if (blob.current) blob.current.style.width = `${window.innerWidth / 3}px`;
    };

    useBlobSizer();

    const useBlob = (e: PointerEvent) => {
      if (blob.current) {
        blob.current.animate({ top: `${e.clientY}px`, left: `${e.clientX}px` }, { duration: 6000, fill: 'forwards' });
      }
    };

    window.addEventListener('resize', useBlobSizer);
    window.addEventListener('pointermove', useBlob);

    return () => {
      window.removeEventListener('resize', useBlobSizer);
      window.removeEventListener('pointermove', useBlob);
    };
  }, []);

  return (
    <section className='contactForm'>
      <h2>Developer contact form and general information</h2>
      <div className='contactForm__blob'>
        <div className='contactForm__blob--blob' ref={blob} />
        <div className='contactForm__blob--blur' />
      </div>
      <section className='contactForm__container'>
        <AboutDeveloper />
        <ContactFormStandard />
      </section>
    </section>
  );
};

export default ContactForm;
