const FDARLastName = () => {
  return (
    <li>
      <label htmlFor='fdUserAccountLastName'>
        <input
          form='fdRegistery'
          id='fdUserAccountLastName'
          type='text'
          inputMode='text'
          placeholder='Last name'
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

export default FDARLastName;
