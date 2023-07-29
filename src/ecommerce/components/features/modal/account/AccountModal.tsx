import { useState } from 'react';
import { Apple, Google, LinkedIn } from './SignInVia';

const AccountModal = (): JSX.Element => {
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userSignedIn, setUserSignedIn] = useState<boolean>(false);

  function handleSubmit() {}

  return (
    <section className="accountModal" data-activity="inactive">
      <form className="account" onSubmit={handleSubmit}>
        <legend className="account__header">
          <h2>Account</h2>
        </legend>
        <div className="account__signInVia">
          <button>
            <Google />
          </button>
          <button>
            <Apple />
          </button>
          <button>
            <LinkedIn />
          </button>
        </div>
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
