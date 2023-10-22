const ContactFormInformation = () => {
  return (
    <section className='contactForm__section'>
      <h2>Developer Contact Information</h2>
      <article className='contact__about'>
        <h3>About</h3>
        <p>
          I'm Justin, a Front-End Developer specializing in React. I write <abbr title='Block Element Modifier'>BEM</abbr> convention,{' '}
          <abbr title='Search Engine Optimization'>SEO</abbr>-optimized,{' '}
          <abbr title='Web Accessibility Initiative - Accessible Rich Internet Applications'>WAI-ARIA</abbr>-compliant HTML, responsive and interactive{' '}
          <abbr title='Sass/SCSS: Syntactically Awesome/Cascading Style Sheets'>SCSS</abbr> modules, type-safe, documented JavaScript logic, adhering to{' '}
          <abbr title={`Don't Repeat Yourself`}>DRY</abbr>
          practices with a focus on performance-oriented <abbr title='Largest Contentful Paint'>LCP</abbr>, <abbr title='First Input Delay'>FID</abbr>, and{' '}
          <abbr title='Cumulative Layout Shift'>CLS</abbr> metrics. If you are a company interested in my skill acquisition for employment, please reach out for more
          information.
        </p>
      </article>
      <article className='contact__questions'>
        <h4>General Information</h4>
        <details className='contact__questions__responseTime'>
          <summary className='contact__questions__responseTime--question'>How long until I receive a response?</summary>
          <p>
            Kindly share the requested contact information and I'll be sure to respond in a timely fashion. My availability extends throughout the entire week;
            however, I do not respond to inquiries after business hours.
          </p>
        </details>
        <details className='contact__questions__provisions'>
          <summary className='contact__questions__provisions--question'>Will the information I share be secure?</summary>
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
        <details className='contact__questions__inclusivityAccessibility'>
          <summary className='contact__questions____inclusivityAccessibility--question'>Inclusivity and Accessibility</summary>
          <p>
            I will, without question, welcome the opportunity to connect and/or work with individuals of any race, background, disability, or circumstance. I grew up
            around children with Autism diagnoses and understand that not everybody is able to communicate in the same way. There will be no reservations or
            communication barriers between any person(s) who may employ me. I will adapt to ensure you or an individual you know is treated with the utmost respect
            and dignity.
          </p>
        </details>
        <details className='contact__questions__formErrors'>
          <summary className='contact__questions__formErrors--question'>Form assistance</summary>
          <ol id='errorMessageFAQ'>
            <li>
              <details>
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
              <details>
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
              <details>
                <summary>My contact number is being rejected.</summary>
                <ul>
                  <li>Your contact number must be ten digits in length excluding the extension.</li>
                  <li>Example: 123-456-7890</li>
                </ul>
              </details>
            </li>
            <li>
              <details>
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
