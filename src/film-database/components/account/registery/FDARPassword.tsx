const FDARPassword = () => {
  return (
    <>
      <li>
        <label htmlFor='fdUserAccountPassword'>
          <input
            form='fdRegistery'
            id='fdUserAccountPassword'
            type='password'
            inputMode='text'
            // RFC 5310, NIST Special Publication 800-63B
            minLength={8}
            // RFC XOS
            maxLength={32}
            placeholder='Password'
            value={''}
            size={12}
            required={true}
            aria-required='true'
            aria-invalid={'false'}
            aria-describedby=''
            autoFocus
            autoCapitalize='true'
            onClick={() => focus()}
            onChange={(event: InputEvent) => {}}
          />
        </label>
      </li>
      <li>
        <label htmlFor='fdUserAccountPasswordConfirmation'>
          <input
            form='fdRegistery'
            id='fdUserAccountPasswordConfirmation'
            type='password'
            inputMode='text'
            // RFC 5310, NIST Special Publication 800-63B
            minLength={8}
            // RFC XOS
            maxLength={32}
            placeholder='Retype your password'
            value={''}
            size={12}
            required={true}
            aria-required='true'
            aria-invalid={'false'}
            aria-describedby=''
            autoFocus
            autoCapitalize='true'
            onClick={() => focus()}
            onChange={(event: InputEvent) => {}}
          />
        </label>
      </li>
    </>
  );
};

export default FDARPassword;
