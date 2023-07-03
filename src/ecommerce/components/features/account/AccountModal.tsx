import { useState } from 'react';

const AccountModal = (): JSX.Element => {
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userSignedIn, setUserSignedIn] = useState<boolean>(false);

  function handleSubmit() {}

  return (
    <section className="accountModal" data-activity="inactive">
      <form className="account" onSubmit={handleSubmit}>
        <legend>
          <h2>Account</h2>
        </legend>
        <fieldset>
          <label htmlFor="emailAddress">
            <input type="text" placeholder="Email Address" value={emailAddress} required onChange={(event) => setEmailAddress(event.target.value)} />
          </label>
          <label htmlFor="password">
            <input type="text" placeholder="Last Name" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
        </fieldset>
        {!userSignedIn ? (
          <>
            <div>
              <p>Not a member? Sign up!</p>
            </div>
            <button type="submit">Sign in</button>
          </>
        ) : (
          <>
            <button type="submit">Sign out</button>
          </>
        )}
      </form>
    </section>
  );
};

export default AccountModal;
