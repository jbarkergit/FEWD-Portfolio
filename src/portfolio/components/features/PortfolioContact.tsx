import { useState } from 'react';

const PortfolioContact = () => {
  //form states
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  //form submit
  function handleSubmit(event: any) {
    event?.preventDefault();
    //logic
  }

  return (
    <section className="contact" data-activity="inactive">
      <form className="contact__form" onSubmit={handleSubmit}>
        <div className="contact__form__heading">
          <legend className="contact__form__heading--part">
            <h1>Contact</h1>
          </legend>
          <span className="contact__form__heading--part">
            <button>
              <i className="fa-solid fa-xmark" />
            </button>
          </span>
        </div>
        <fieldset className="contact__form__inputs">
          <label htmlFor="firstName">
            <input type="text" placeholder="First Name" value={firstName} required onChange={(event) => setFirstName(event.target.value)} />
          </label>
          <label htmlFor="lastName">
            <input type="text" placeholder="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
          </label>
        </fieldset>
        <label className="contact__form__address" htmlFor="emailAddress">
          <input type="text" placeholder="Email Address" value={emailAddress} required onChange={(event) => setEmailAddress(event.target.value)} />
        </label>
        <textarea
          className="contact__form__message"
          placeholder="Type your message here..."
          value={message}
          required
          onChange={(event) => setMessage(event.target.value)}
        />
        <button className="contact__form--formSubmit" type="submit">
          <h4>Submit</h4>
        </button>
      </form>
    </section>
  );
};

export default PortfolioContact;
