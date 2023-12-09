import { useEffect, useRef, useState } from 'react';

const EmailAddressOL = () => {
  return (
    <ol>
      <li>Gmail - @gmail.com</li>
      <li>Outlook - @outlook.com</li>
      <li>Yahoo Mail - @yahoo.com</li>
      <li>Apple Mail - @icloud.com</li>
      <li>AOL Mail - @aol.com</li>
      <li>Mail.com - @mail.com</li>
      <li>ProtonMail - @protonmail.com</li>
      <li>Zoho Mail - @zoho.com</li>
    </ol>
  );
};

const ContactFormInformation = () => {
  const parentArticleRef = useRef<HTMLElement>(null);

  const arrayOfDetails = useRef<HTMLDivElement[]>([]);
  const detailsReference = (reference: HTMLDivElement) => {
    if (reference && !arrayOfDetails.current.includes(reference)) arrayOfDetails.current.push(reference);
  };

  const arrayOfDetailsInformation = useRef<HTMLDivElement[]>([]);
  const detailsInformationReference = (reference: HTMLDivElement) => {
    if (reference && !arrayOfDetailsInformation.current.includes(reference)) arrayOfDetailsInformation.current.push(reference);
  };

  const arrayOfNestedDetails = useRef<HTMLDivElement[]>([]);
  const nestedDetailsRef = (reference: HTMLDivElement) => {
    if (reference && !arrayOfNestedDetails.current.includes(reference)) arrayOfNestedDetails.current.push(reference);
  };

  /** Track previous and current index state */
  const [activeDetailsIndex, setActiveDetailsIndex] = useState<number[]>([0, 0]);

  useEffect(() => {
    if (arrayOfDetails.current && arrayOfDetailsInformation.current) {
      /** DRY */
      const previousDetail = arrayOfDetails.current[activeDetailsIndex[0]];
      const currentDetail = arrayOfDetails.current[activeDetailsIndex[1]];
      const previousDetailInfo = arrayOfDetailsInformation.current[activeDetailsIndex[0]];
      const currentDetailInfo = arrayOfDetailsInformation.current[activeDetailsIndex[1]];

      if (parentArticleRef.current && previousDetail && currentDetail && previousDetailInfo && currentDetailInfo) {
        /** Handle animations */
        if (activeDetailsIndex[0] !== activeDetailsIndex[1]) {
          previousDetail.removeAttribute('data-status');
          previousDetailInfo.removeAttribute('data-status');

          setTimeout(() => {
            currentDetail.setAttribute('data-status', 'open');
            currentDetailInfo.setAttribute('data-status', 'open');
          }, 360);
        } else {
          currentDetail.setAttribute('data-status', 'open');
          currentDetailInfo.setAttribute('data-status', 'open');
        }
      }
    }
  }, [activeDetailsIndex]);

  /** Assistance Questions */
  const assistanceData = [
    {
      summary: `How long until I receive a response?`,
      details: `My availability extends throughout the entire week; however, I do not respond to inquiries after business hours.`,
    },
    {
      summary: `Will the information I share be secure?`,
      details: `I do not collect personal information for malicious intentions. This form and it's contents are redirected to my personal Google Mail inbox. The information requested is solely to comprehend and determine whether or not I can satisfy your inquiry in advance. I have no control over what third party services do with said information. Please provide only the information you're comfortable sharing. If you are uncomfortable with using the provided form, you may contact me using the following email address.`,
    },
    {
      summary: `Inclusivity and Accessibility`,
      details: `I will, without question, welcome the opportunity to connect and/or work with individuals of any race, background, disability, or circumstance. There will be no reservations or communication barriers between any person(s) who may employ me. I will adapt to ensure you or an individual you know is treated with the utmost respect and dignity.`,
    },
    {
      summary: `I'm contacting on behalf of another person.`,
      details: `If you have permission/consent from the inquiring person(s), please premise the inquiry with, "I am contacting you on behalf of
              (person's FIRST name). If you do not have permission/consent, please fill the contact form out with your information. NOTICE - A person commits the offense of identity theft of another person if he possesses or uses, through any means, identifying information of
              another person without the consent of that other person to further any unlawful purpose.`,
    },
    {
      summary: `I'm having issues with the email address.`,
      details: `You will be prompted with an error in the event that: The email address contains special characters with the exception of asperands (@) and a period (.) and/or the email address is not registered on the following domains:`,
      ol: <EmailAddressOL />,
    },
    {
      summary: `My contact number is being rejected.`,
      details: `Your contact number must be ten digits in length excluding the extension. Example: 123-456-7890`,
    },
    {
      summary: `I can't submit my website url.`,
      details: `I will not visit insecure URLS; therefore, any provided URL must be secure (https://).`,
    },
  ];

  return (
    <section className='contactForm__section' ref={parentArticleRef}>
      <h2>Contact information</h2>
      <article className='contact__questions' ref={parentArticleRef}>
        <>
          {assistanceData.map((object, index: number) => (
            <div
              className='contact__questions__details'
              ref={detailsReference}
              key={object.summary}
              onClick={() => setActiveDetailsIndex([activeDetailsIndex[1], index])}>
              <div className='contact__questions__details--summary'>
                {object.summary}
                <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
                  <path fill='currentColor' d='m12 15l-5-5h10l-5 5Z'></path>
                </svg>
              </div>
              <p ref={detailsInformationReference}>{object.details}</p>
            </div>
          ))}
        </>
      </article>
    </section>
  );
};

export default ContactFormInformation;
