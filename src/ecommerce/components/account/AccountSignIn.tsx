import { useState } from 'react';

const AccountSignIn = () => {
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleSubmit() {}

  return (
    <section className="account">
      <form className="account__form" onSubmit={handleSubmit}>
        <div className="account__form__heading">
          <legend className="account__form__heading--part">
            <h1>Account</h1>
          </legend>
          <span className="account__form__heading--part">
            <button>
              <i className="fa-solid fa-xmark" />
            </button>
          </span>
        </div>
        <fieldset className="account__form__inputs">
          <label className="account__form__address" htmlFor="emailAddress">
            <input type="text" placeholder="Email Address" value={emailAddress} required onChange={(event) => setEmailAddress(event.target.value)} />
          </label>
          <label htmlFor="password">
            <input type="text" placeholder="Last Name" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
        </fieldset>
        <button className="account__form--formSubmit" type="submit">
          <h4>Submit</h4>
        </button>
      </form>
    </section>
  );
};

export default AccountSignIn;
