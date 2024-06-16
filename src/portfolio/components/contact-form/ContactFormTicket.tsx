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
          <li>UNKNOWN</li>
          <li>Company</li>
          <li>Omitted</li>
          <li>Website</li>
          <li>Omitted</li>
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
          <li>Travel</li>
          <li>Date</li>
          <li>Dep Time</li>

          <li>Electronic</li>
          <li>{new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'long' })}</li>
          <li>{currentTime}</li>
        </ul>

        <ul className='contactForm__section__ticket__details'>
          <li></li>
          <li />
          <li>Timezone •</li>

          <li></li>
          <li />
          <li>CDT (GMT-5) </li>
        </ul>

        <ul className='contactForm__section__ticket__footer'>
          <li>{uuidv4().slice(0, 13)}</li>
          <li>
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
              <path fill='currentColor' d='M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21' opacity='0'>
                <animate id='svgSpinnersWifiFade0' fill='freeze' attributeName='opacity' begin='0;svgSpinnersWifiFade1.end+0.2s' dur='0.25s' values='0;1'></animate>
                <animate id='svgSpinnersWifiFade1' fill='freeze' attributeName='opacity' begin='svgSpinnersWifiFade3.end+0.5s' dur='0.1s' values='1;0'></animate>
              </path>
              <path
                fill='currentColor'
                d='M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z'
                opacity='0'>
                <animate id='svgSpinnersWifiFade2' fill='freeze' attributeName='opacity' begin='svgSpinnersWifiFade0.end' dur='0.25s' values='0;1'></animate>
                <animate fill='freeze' attributeName='opacity' begin='svgSpinnersWifiFade3.end+0.5s' dur='0.1s' values='1;0'></animate>
              </path>
              <path
                fill='currentColor'
                d='M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3'
                opacity='0'>
                <animate id='svgSpinnersWifiFade3' fill='freeze' attributeName='opacity' begin='svgSpinnersWifiFade2.end' dur='0.25s' values='0;1'></animate>
                <animate fill='freeze' attributeName='opacity' begin='svgSpinnersWifiFade3.end+0.5s' dur='0.1s' values='1;0'></animate>
              </path>
            </svg>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ContactFormTicket;
