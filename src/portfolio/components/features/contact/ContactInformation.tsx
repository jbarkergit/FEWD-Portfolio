const ContactInformation = () => {
  return (
    <section className='contactFormSection'>
      <h2>Information</h2>
      <article className='contact__information'>
        <details className='contact__information__services'>
          <summary className='contact__information__services--question'>What services do you provide?</summary>
          <p>
            I am a Front End Web Developer. I exclusively develop with the library React. I provide DRY dynamic type safe documented logic, responsive and
            interactive UI, performance oriented component and asset rendering, BEM convention SEO-Optimized Markup and screen readers for the visually impaired. If
            you are a company interested in my skill acquisition for employment, please reach out. If you are looking for freelance work and require a UI/UX
            designer, I do not specialize in those fields; however, for an additional fee, I will work with you to conceptualize the right layout and style that
            suites your application's needs.
          </p>
        </details>
        <details className='contact__information__nonServices'>
          <summary className='contact__information__nonServices--question'>What services do you not provide?</summary>
          <p>I do not build backends, offer payment proccessing solutions nor do I handle advertisement needs. I am not a professional UI/UX/Graphic designer.</p>
        </details>
        <details className='contact__information__pricing'>
          <summary className='contact__information__pricing--question'>What is the pricing structure for your services?</summary>
          <p>
            Thank you for considering my services. If you are a company interested in hiring me as a part of your development team, please reach out. If you are an
            individual looking for freelance services, please read on.
            <ul>
              <li>ESTIMATE</li>
              <li>
                The cost associated with your website will vary dependant on what your project entails. For this reason, I ask that you reach out for a personal
                estimate.
              </li>
              <li>PAYMENT</li>
              <li>
                Upon agreement, I ask for 60% of the estimate upfront via direct deposit. Upon completion and prior to the delivery of your website, the remaining
                cost, which will differ from the original estimate, will be requested. The 60% down payment of the estimate will be subtracted from the new running
                total. Additional incurred costs for services rendered must be paid prior to delivery.
              </li>
              <li>REFUSAL TO PAY</li>
              <li>
                If you refuse to pay the final total, you will not be reimbursed the 60% of the estimate down payment back nor will you receive your completed
                project. You will receive only the written code you have paid for.
              </li>
              <li>ADDITIONAL SERVICES RENDERED</li>
              <li>For additional servicing after the project has been delivered, a fixed rate will apply on an hourly basis.</li>
              <li>DISCOUNTS & PROMOTIONS</li>
              <li>Due to the tedious nature of my craftsmanship, I do not offer discounts or promotions.</li>
            </ul>
          </p>
        </details>
        <details className='contact__information__responseTime'>
          <summary className='contact__information__responseTime--question'>How long until I receive a response?</summary>
          <p>
            Kindly share the requested contact information and I'll be sure to respond in a timely fashion. My availability extends throughout the entire week;
            however, I do not respond to inquiries after business hours.
          </p>
        </details>
        <details className='contact__information__provisions'>
          <summary className='contact__information__provisions--question'>Will the information I share be secure?</summary>
          <p>
            <span>
              Worry not, I do not collect personal information for malicious intentions! This form and it's contents are redirected to my personal Google Mail inbox.
              The information requested is solely to comprehend and determine whether or not I can satisfy your inquiry in advance. I have no control over what third
              party services do with said information. Please provide only the information you're comfortable sharing. If you are uncomfortable with using the
              provided form, you may contact me using the following email address.
            </span>
            <span>email@gmail.com</span>
          </p>
        </details>
        <details className='contact__information__inclusivityAccessibility'>
          <summary className='contact__information____inclusivityAccessibility--question'>Inclusivity and Accessibility</summary>
          <p>
            I will, without question, welcome the opportunity to connect and/or work with individuals of any race, background, disability, or circumstance. I grew up
            around children with Autism diagnoses and understand that not everybody is able to communicate in the same way. There will be no reservations or
            communication barriers between any person(s) who may employ me. I will adapt to ensure you or an individual you know is treated with the utmost respect
            and dignity.
          </p>
        </details>
        <details className='contact__information__formErrors'>
          <summary className='contact__information__formErrors--question'>Form assistance</summary>
          <ol id='errorMessageFAQ'>
            <li>
              <details>
                <summary>I'm contacting on behalf of another person.</summary>
                <ul>
                  <li>Step one: Fill out the form with your contact information. Do not provide anybody's information except for your own.</li>
                  <li>Step two: Please premise your inquiry with, "I am contacting you on behalf of (person's FIRST name).".</li>
                  <li>
                    Step three: If you have permission/consent from said person, you may provide contact details such as their first name, contact information and
                    company name.
                  </li>
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
                      <li>Gmail (by Google) - @gmail.com</li>
                      <li>Outlook (by Microsoft) - @outlook.com</li>
                      <li>Yahoo Mail (by Yahoo) - @yahoo.com</li>
                      <li>Apple Mail (by Apple) - @icloud.com</li>
                      <li>AOL Mail (by AOL) - @aol.com</li>
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

export default ContactInformation;
