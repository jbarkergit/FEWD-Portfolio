const FDAREmailAddress = () => {
  return (
    <li>
      <label htmlFor='fdUserAccountEmailAddress'>
        <input
          form='fdRegistery'
          id='fdUserAccountEmailAddress'
          type='email'
          inputMode='email'
          // name, @, domain
          minLength={3}
          // RFC 2045
          maxLength={76}
          placeholder='Email address'
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
  );
};

export default FDAREmailAddress;
