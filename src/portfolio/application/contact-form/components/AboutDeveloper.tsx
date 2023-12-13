import { useRef, useState, useEffect } from 'react';

/** Assistance Questions */
const assistanceData = [
  {
    summary: `Response Time`,
    details: `My availability extends throughout the entire week; however, I do not respond to inquiries after business hours.`,
  },
  {
    summary: `Form Security`,
    details: `I do not collect personal information for malicious intentions. This form and it's contents are redirected to my personal Google Mail inbox via Netlify. The information requested is solely to comprehend and determine whether or not I can satisfy your inquiry in advance. I have no control over what third party services do with said information. Please provide only the information you're comfortable sharing.`,
  },
  {
    summary: `Inclusivity & Accessibility`,
    details: `I will, without question, welcome the opportunity to connect and/or work with individuals of any race, background, disability, or circumstance. There will be no reservations or communication barriers between any person(s) who may employ me. I will adapt to ensure you or an individual you know is treated with the utmost respect and dignity.`,
  },
  {
    summary: `Contacting on behalf of`,
    details: `If you have permission/consent from the inquiring person(s), please premise the inquiry with, "I am contacting you on behalf of
              (person's FIRST name).". If you do not have permission/consent, please fill the contact form out with your own information. Please note that a person commits the offense of identity theft of another person if he possesses or uses, through any means, identifying information of
              another person without the consent of that other person to further any unlawful purpose.`,
  },
  {
    summary: `Email Address Issues`,
    details: `You will be prompted with an error in the event that: The email address contains special characters with the exception of asperands (@) and a period (.).`,
  },
  {
    summary: `Contact Number Issues`,
    details: `Your contact number must be ten digits in length. This excludes any extension (1). Example: 123-456-7890`,
  },
  {
    summary: `Website URL Issues`,
    details: `For my own security, I will not visit insecure URLS; therefore, any provided URL must be secured. Example: https://`,
  },
];

const AboutDeveloper = () => {
  const parentArticleRef = useRef<HTMLDivElement>(null);
  const detailsInformation = useRef<HTMLParagraphElement>(null);

  const arrayOfDetails = useRef<HTMLButtonElement[]>([]);
  const detailsReference = (reference: HTMLButtonElement) => {
    if (reference && !arrayOfDetails.current.includes(reference)) arrayOfDetails.current.push(reference);
  };

  /** Track previous and current index state */
  const [activeDetailsIndex, setActiveDetailsIndex] = useState<number[]>([0, 0]);
  const [userQuestion, setUserQuestion] = useState<boolean>(false);

  useEffect(() => {
    if (arrayOfDetails.current && detailsInformation.current) {
      /** DRY */
      const previousDetail = arrayOfDetails.current[activeDetailsIndex[0]];
      const currentDetail = arrayOfDetails.current[activeDetailsIndex[1]];

      if (parentArticleRef.current && previousDetail && currentDetail) {
        /** Handle animations */
        if (activeDetailsIndex[0] !== activeDetailsIndex[1]) {
          previousDetail.removeAttribute('data-status');
          detailsInformation.current.removeAttribute('data-status');

          setTimeout(() => {
            currentDetail.setAttribute('data-status', 'open');
            detailsInformation.current?.setAttribute('data-status', 'open');
          }, 360);
        } else {
          currentDetail.setAttribute('data-status', 'open');
          detailsInformation.current.setAttribute('data-status', 'open');
        }
        /** Contact Question Answer State */
        // setUserQuestion(true)
      }
    }
  }, [activeDetailsIndex]);

  return (
    <section className='contactForm__section'>
      <section className='contactForm__section__block'>
        {!userQuestion ? (
          <article className='contactForm__section__block__article'>
            <h2>Looking to hire?</h2>
            <p>
              Hey there! I'm Justin, a <abbr title='React: A JavaScript library for building user interfaces'>React</abbr> Front End Developer. I create responsive,
              interactive, <abbr title='Search Engine Optimization'>SEO</abbr>-friendly, and{' '}
              <abbr title='Web Accessibility Initiative - Accessible Rich Internet Applications'>WAI-ARIA</abbr>-compliant web applications, always keeping an eye on
              Core Web Vitals for a smooth user experience. For any inquiries, kindly share the requested contact information and I'll be sure to respond in a timely
              fashion.
            </p>
          </article>
        ) : (
          <article className='contactForm__section__article__block'>
            <h2>{assistanceData[activeDetailsIndex[1]].summary}</h2>
            <p ref={detailsInformation}>{assistanceData[activeDetailsIndex[1]].details}</p>
          </article>
        )}
      </section>

      <section className='contactForm__section__compartment' ref={parentArticleRef}>
        <h2>Have questions?</h2>
        {assistanceData.map((object, index: number) => (
          <button
            ref={detailsReference}
            key={object.summary}
            onClick={() => {
              setActiveDetailsIndex([activeDetailsIndex[1], index]);
              setUserQuestion(true);
            }}>
            {object.summary}
          </button>
        ))}
        {userQuestion === true ? (
          <button ref={detailsReference} onClick={() => setUserQuestion(false)}>
            About
          </button>
        ) : null}
      </section>
    </section>
  );
};

export default AboutDeveloper;
