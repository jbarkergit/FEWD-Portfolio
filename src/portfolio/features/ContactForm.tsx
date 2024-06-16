import { Dispatch, SetStateAction } from 'react';
import ContactFormFields from '../components/contact-form/ContactFormFields';
import ContactFormTicket from '../components/contact-form/ContactFormTicket';

type PropDrillType = { featureState: Record<string, boolean>; setFeatureState: Dispatch<SetStateAction<Record<string, boolean>>> };

const ContactForm = ({ featureState, setFeatureState }: PropDrillType) => {
  return (
    <section className='contactForm'>
      <h2 className='contactForm--h2'>Developer contact form and general information</h2>
      <div className='contactForm__container'>
        <div className='contactForm__container--topPunchOut' />
        <div className='contactForm__container--bottomPunchOut' />
        <ContactFormFields />
        <ContactFormTicket />
        {/* <button
          className='contactForm__container__return'
          aria-label='Return to project hub'
          onClick={() => setFeatureState({ ...featureState, contactFormActive: false })}>
          <svg xmlns='http://www.w3.org/2000/svg' width='1.6em' height='1.6em' viewBox='0 0 512 512'>
            <path
              d='M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z'
              fill='#ffffff'></path>
          </svg>
        </button> */}
      </div>
    </section>
  );
};

export default ContactForm;
