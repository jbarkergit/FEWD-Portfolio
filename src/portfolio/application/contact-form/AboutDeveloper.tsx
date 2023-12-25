import { useRef, useState, useEffect } from 'react';

/** Assistance Questions */
const assistanceData = [
  {
    type: 'about',
    summary: `About`,
    details: (
      <>
        Hey there! I'm Justin, a <abbr title='React: A JavaScript library for building user interfaces'>React</abbr> Front End Developer. I create responsive,
        interactive, <abbr title='Search Engine Optimization'>SEO</abbr>-friendly, and{' '}
        <abbr title='Web Accessibility Initiative - Accessible Rich Internet Applications'>WAI-ARIA</abbr>-compliant web applications, always keeping an eye on Core
        Web Vitals for a smooth user experience. For any inquiries, kindly share the requested contact information and I'll be sure to respond in a timely fashion.
      </>
    ),
  },
  {
    type: 'general',
    summary: `Availability`,
    details: `I am available throughout the entire week; however, I will not respond to inquiries after business hours. CDT (GMT-5)`,
  },
  {
    type: 'general',
    summary: `Form Security`,
    details: `I do not collect personal information for malicious intentions. This form and it's contents are redirected to my personal Google Mail inbox via Netlify. The information requested is solely to comprehend and determine whether or not I can satisfy your inquiry in advance. I have no control over what third party services do with said information and will not be held responsible for their actions nor security breaches. Please provide only the information you're comfortable sharing.`,
  },
  {
    type: 'general',
    summary: `Inclusivity & Accessibility`,
    details: `I will, without question, welcome the opportunity to connect and/or work with individuals of any race, background, disability, or circumstance. There will be no reservations or communication barriers between any person(s) who may employ me. I will adapt to ensure you or an individual you know is treated with the utmost respect and dignity.`,
  },

  {
    type: 'support',
    summary: `Contacting on behalf of`,
    details: `If you have permission/consent from the inquiring person(s), please premise the inquiry with, "I am contacting you on behalf of
              (person's FIRST name).". If you do not have permission/consent, please fill the contact form out with your own information. Please note that a person commits the offense of identity theft of another person if he possesses or uses, through any means, identifying information of
              another person without the consent of that other person to further any unlawful purpose.`,
  },
  {
    type: 'support',
    summary: `Contact Number Error`,
    details: `Your contact number must be ten digits in length. This excludes any extension (1). Example: 123-456-7890`,
  },
  {
    type: 'support',
    summary: `Email Address Error`,
    details: `You will be prompted with an error in the event that: The email address contains special characters with the exception of asperands (@) and a period (.).`,
  },

  {
    type: 'support',
    summary: `Website URL Error`,
    details: `For my own security, I will not visit insecure URLS; therefore, any provided URL must be secured. Example: https://`,
  },
];

const AboutDeveloper = () => {
  const parentArticleRef = useRef<HTMLDivElement>(null);
  const detailsInformation = useRef<HTMLParagraphElement>(null);

  const arrayOfDetails = useRef<HTMLLIElement[]>([]);
  const detailsReference = (reference: HTMLLIElement) => {
    if (reference && !arrayOfDetails.current.includes(reference)) arrayOfDetails.current.push(reference);
  };

  /** Track previous and current index state */
  const [activeDetailsIndex, setActiveDetailsIndex] = useState<number[]>([0, 0]);

  /** Handle animations */
  useEffect(() => {
    if (arrayOfDetails.current && detailsInformation.current) {
      /** DRY */
      const previousDetail = arrayOfDetails.current[activeDetailsIndex[0]];
      const currentDetail = arrayOfDetails.current[activeDetailsIndex[1]];

      if (parentArticleRef.current && previousDetail && currentDetail) {
        if (activeDetailsIndex[0] !== activeDetailsIndex[1]) {
          previousDetail.removeAttribute('data-status');
          currentDetail.setAttribute('data-status', 'active');
        } else {
          currentDetail.setAttribute('data-status', 'active');
        }
      }
    }
  }, [activeDetailsIndex]);

  return (
    <section className='contactForm__section'>
      <h2>Contact form and information</h2>
      <section className='contactForm__section__block'>
        <h2>About the Developer and form assistance information</h2>
        <article className='contactForm__section__block__article'>
          <span>{assistanceData[activeDetailsIndex[1]].type === 'about' ? `Let's build something together.` : assistanceData[activeDetailsIndex[1]].summary}</span>
          <p ref={detailsInformation}>{assistanceData[activeDetailsIndex[1]].details}</p>
        </article>
      </section>

      <section className='contactForm__section__compartment' ref={parentArticleRef}>
        <h2>Have questions?</h2>

        <ul className='contactForm__section__compartment__general'>
          <span>General</span>
          {assistanceData.map((object, index: number) =>
            object.type === 'about' || object.type === 'general' ? (
              <li key={object.summary} ref={detailsReference}>
                <button onClick={() => setActiveDetailsIndex([activeDetailsIndex[1], index])}>{object.summary}</button>
              </li>
            ) : null
          )}
        </ul>

        <ul className='contactForm__section__compartment__support'>
          <span>Form Assistance</span>
          {assistanceData.map((object, index: number) =>
            object.type === 'support' ? (
              <li key={object.summary} ref={detailsReference}>
                <button key={object.summary} onClick={() => setActiveDetailsIndex([activeDetailsIndex[1], index])}>
                  {object.summary}
                </button>
              </li>
            ) : null
          )}
        </ul>
      </section>
    </section>
  );
};

export default AboutDeveloper;
