type Type_PropDrill = {
  carouselComponents: JSX.Element[];
  isMenuOpen: boolean;
};

const FDUserAccount = ({ carouselComponents, isMenuOpen }: Type_PropDrill) => {
  // console.log(carouselComponents);
  return (
    <main className='fdUserAccount'>
      <article className='fdUserAccount__article'>
        <h1 className='fdUserAccount__article--h1'>Stay in the know about the hottest new movies.</h1>
        <h2>Create an account to queue release notifications via sms.</h2>
        <h3>Powered by TMDB</h3>
      </article>
      <form className='fdUserAccount__form' id='fdRegistery'>
        <div className='fdUserAccount__form__container'>
          <legend>
            <h2>Create an account</h2>
          </legend>
          <fieldset>
            <ul>
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
            </ul>
          </fieldset>
        </div>
      </form>
      {/* <section className='fdUserAccount__display'>{carouselComponents.slice(0, 7).map((component) => component.props)}</section> */}
    </main>
  );
};

export default FDUserAccount;
