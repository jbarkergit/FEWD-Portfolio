import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ContactFormTicket = () => {
  /** Timezone CDT */
  const [currentTime, setCurrentTime] = useState('');

  const getTime = () => {
    setCurrentTime(
      new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/Chicago',
        hour12: false,
        hour: 'numeric',
        minute: '2-digit',
      })
    );
  };

  useEffect(() => {
    getTime();
    const interval = setInterval(getTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='contactForm__section'>
      <div className='contactForm__section__ticket'>
        <h2>Business • Contact</h2>

        <ul className='contactForm__section__ticket__person'>
          <li>Guest</li>
          <li>UNKNOWN RESERVER</li>
        </ul>

        <ul className='contactForm__section__ticket__destination'>
          <li>From:</li>
          <li>To:</li>
          <li>Design</li>
          <li>Prod</li>
          <li>
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 36 36'>
              <path
                fill='currentColor'
                d='M6.25 11.5L12 13.16l6.32-4.59l-9.07.26a.52.52 0 0 0-.25.08l-2.87 1.65a.51.51 0 0 0 .12.94'
                className='clr-i-solid clr-i-solid-path-1'></path>
              <path
                fill='currentColor'
                d='M34.52 6.36L28.22 5a3.78 3.78 0 0 0-3.07.67L6.12 19.5l-4.57-.2a1.25 1.25 0 0 0-.83 2.22l4.45 3.53a.55.55 0 0 0 .53.09c1.27-.49 6-3 11.59-6.07l1.12 11.51a.55.55 0 0 0 .9.37l2.5-2.08a.76.76 0 0 0 .26-.45l2.37-13.29c4-2.22 7.82-4.37 10.51-5.89a1.55 1.55 0 0 0-.43-2.88'
                className='clr-i-solid clr-i-solid-path-2'></path>
              <path fill='none' d='M0 0h36v36H0z'></path>
            </svg>
          </li>
        </ul>

        <ul className='contactForm__section__ticket__details'>
          <li>Flight</li>
          <li>Date</li>
          <li>Dep Time</li>

          <li>AL 001</li>
          <li>{new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'long' })}</li>
          <li>{currentTime}</li>
        </ul>

        <ul className='contactForm__section__ticket__details'>
          <li />
          <li />
          <li>Timezone •</li>

          <li />
          <li />
          <li>CDT(GMT-5) </li>
        </ul>

        <ul className='contactForm__section__ticket__footer'>
          <li>{uuidv4().slice(0, 13)}</li>
          <li>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M1.5 20.5v-4h1v3h3v1zm17 0v-1h3v-3h1v4zM4 18V6h2v12zm3 0V6h1v12zm3 0V6h2v12zm3 0V6h3v12zm4 0V6h1v12zm2 0V6h1v12zM1.5 7.5v-4h4v1h-3v3zm20 0v-3h-3v-1h4v4z'></path>
            </svg>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ContactFormTicket;
