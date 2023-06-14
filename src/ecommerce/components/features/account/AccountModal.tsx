import { useState } from 'react';

const AccountModal = () => {
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleSubmit() {}

  return (
    <section className="modal" data-activity="inactive">
      <form className="account" onSubmit={handleSubmit}>
        <legend>
          <h1>Account</h1>
        </legend>
        <fieldset>
          <label htmlFor="emailAddress">
            <input type="text" placeholder="Email Address" value={emailAddress} required onChange={(event) => setEmailAddress(event.target.value)} />
          </label>
          <label htmlFor="password">
            <input type="text" placeholder="Last Name" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
        </fieldset>
        <button className="account--formSubmit" type="submit">
          <h4>Submit</h4>
        </button>
      </form>
    </section>
  );
};

export default AccountModal;
