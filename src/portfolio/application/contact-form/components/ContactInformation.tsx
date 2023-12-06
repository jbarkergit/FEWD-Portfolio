import { useEffect, useRef } from 'react';

const ContactFormInformation = () => {
  // Storage for <details> with "open" attr
  let activePrimaryQuestionRef = useRef<HTMLDetailsElement>();
  let activeAssistanceQuestionRef = useRef<HTMLDetailsElement>();

  // Storage for all primary <details>
  const primaryQuestions: HTMLDetailsElement[] = [];

  const primaryQuestionRef = (reference: HTMLDetailsElement) => {
    if (reference && !primaryQuestions.includes(reference)) primaryQuestions.push(reference);
  };

  // Storage for all form assistance <details>
  const assistanceQuestions: HTMLDetailsElement[] = [];

  const assistanceQuestionRef = (reference: HTMLDetailsElement) => {
    if (reference && !assistanceQuestions.includes(reference)) assistanceQuestions.push(reference);
  };

  useEffect(() => {
    // Store active <details> references on mount
    if (primaryQuestions.length > 0) activePrimaryQuestionRef.current = primaryQuestions[0];

    // Initialize useRef by using an absolute falsey ref
    if (assistanceQuestions.length > 0) activeAssistanceQuestionRef.current = primaryQuestions[0];

    /**
     * Remove open attribute from previous <details> with open attr
     * Update reference with new <details> that's now open
     */
    const handlePrimaryQuestions = (e: PointerEvent) => {
      const currentTarget = e.currentTarget as HTMLDetailsElement;

      // Prevent event bubbling down the tree
      e.stopPropagation();

      if (activePrimaryQuestionRef.current && currentTarget !== activePrimaryQuestionRef.current) {
        activePrimaryQuestionRef.current.removeAttribute('open');
        activePrimaryQuestionRef.current = currentTarget;
      }
    };

    /**
     * Prevent updateOpenedDetails from removing form assistance question <details> open attr
     * Remove open attribute from previously opened assistance question
     */
    const handleAssistanceQuestions = (e: PointerEvent) => {
      const currentTarget = e.currentTarget as HTMLDetailsElement;

      if (activeAssistanceQuestionRef.current && currentTarget !== activeAssistanceQuestionRef.current) {
        activeAssistanceQuestionRef.current.removeAttribute('open');
        activeAssistanceQuestionRef.current = currentTarget;
      }
    };

    // Event listeners mount
    if (primaryQuestions) primaryQuestions.forEach((child: HTMLDetailsElement) => child.addEventListener('pointerup', handlePrimaryQuestions));
    if (assistanceQuestions) assistanceQuestions.forEach((child: HTMLDetailsElement) => child.addEventListener('pointerup', handleAssistanceQuestions));

    // Event listeners unmount
    return () => {
      if (primaryQuestions) primaryQuestions.forEach((child: HTMLDetailsElement) => child.removeEventListener('pointerup', handlePrimaryQuestions));
      if (assistanceQuestions) assistanceQuestions.forEach((child: HTMLDetailsElement) => child.removeEventListener('pointerup', handleAssistanceQuestions));
    };
  }, [primaryQuestions, assistanceQuestions]);

  return (
    <section className='contactForm__section'>
      <h2>Contact information</h2>
      <article className='contact__questions'>
        <details className='contact__questions__responseTime' ref={primaryQuestionRef} open>
          <summary className='contact__questions__responseTime--question'>
            How long until I receive a response?
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
              <path fill='currentColor' d='m12 15l-5-5h10l-5 5Z'></path>
            </svg>
          </summary>
          <p>My availability extends throughout the entire week; however, I do not respond to inquiries after business hours.</p>
        </details>
        <details className='contact__questions__provisions' ref={primaryQuestionRef}>
          <summary className='contact__questions__provisions--question'>
            Will the information I share be secure?
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
              <path fill='currentColor' d='m12 15l-5-5h10l-5 5Z'></path>
            </svg>
          </summary>
          <p>
            <span>
              I do not collect personal information for malicious intentions. This form and it's contents are redirected to my personal Google Mail inbox. The
              information requested is solely to comprehend and determine whether or not I can satisfy your inquiry in advance. I have no control over what third
              party services do with said information. Please provide only the information you're comfortable sharing. If you are uncomfortable with using the
              provided form, you may contact me using the following email address.
            </span>
            <span>email@gmail.com</span>
          </p>
        </details>
        <details className='contact__questions__inclusivityAccessibility' ref={primaryQuestionRef}>
          <summary className='contact__questions__inclusivityAccessibility--question'>
            Inclusivity and Accessibility
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
              <path fill='currentColor' d='m12 15l-5-5h10l-5 5Z'></path>
            </svg>
          </summary>
          <p>
            I will, without question, welcome the opportunity to connect and/or work with individuals of any race, background, disability, or circumstance. There
            will be no reservations or communication barriers between any person(s) who may employ me. I will adapt to ensure you or an individual you know is
            treated with the utmost respect and dignity.
          </p>
        </details>
        <details className='contact__questions__formErrors' ref={primaryQuestionRef}>
          <summary className='contact__questions__formErrors--question'>
            Form assistance
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
              <path fill='currentColor' d='m12 15l-5-5h10l-5 5Z'></path>
            </svg>
          </summary>
          <ol id='errorMessageFAQ'>
            <li>
              <details ref={assistanceQuestionRef}>
                <summary>I'm contacting on behalf of another person.</summary>
                <ul>
                  <li>Step one: Fill out the form with your contact information. Do not provide anybody's information except for your own.</li>
                  <li>
                    Step two: If you have permission/consent from the inquiring person(s), please premise the inquiry with, "I am contacting you on behalf of
                    (person's FIRST name).".
                  </li>
                  <li>Step three: With permission/consent, you may provide contact details such as their first name, contact information and company name.</li>
                  <li>
                    Notice - A person commits the offense of identity theft of another person if he possesses or uses, through any means, identifying information of
                    another person without the consent of that other person to further any unlawful purpose.
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details ref={assistanceQuestionRef}>
                <summary>I'm having issues with the email address.</summary>
                <ul>
                  <li>You will be prompted with an error in the event that:</li>
                  <li>The email address contains special characters with the exception of asperands (@) and a period (.).</li>
                  <li>
                    The email address is not registered on the following domains:
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
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details ref={assistanceQuestionRef}>
                <summary>My contact number is being rejected.</summary>
                <ul>
                  <li>Your contact number must be ten digits in length excluding the extension.</li>
                  <li>Example: 123-456-7890</li>
                </ul>
              </details>
            </li>
            <li>
              <details ref={assistanceQuestionRef}>
                <summary>I can't submit my website url.</summary>
                <ul>
                  <li>I will not visit insecure URLS; therefore, any provided URL must be secure (https://).</li>
                </ul>
              </details>
            </li>
          </ol>
        </details>
      </article>
    </section>
  );
};

export default ContactFormInformation;
