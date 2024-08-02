const FDARFirstName = () => {
  return (
    <li>
      <label htmlFor='fdUserAccountFirstName'>
        <input
          form='fdRegistery'
          id='fdUserAccountFirstName'
          type='text'
          inputMode='text'
          placeholder='First name'
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

export default FDARFirstName;
