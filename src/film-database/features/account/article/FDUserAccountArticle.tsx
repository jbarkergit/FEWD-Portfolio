const FDUserAccountArticle = () => {
  return (
    <article className='fdUserAccount__article'>
      <section className='fdUserAccount__article__about'>
        <hgroup className='fdUserAccount__article__about__hgroup'>
          <h1 className='fdUserAccount__article__about__hgroup--h1'>Stay in the know about the hottest new movies.</h1>
          <h2 className='fdUserAccount__article__about__hgroup--h2'>Never miss a new release with sms alerts.</h2>
        </hgroup>
        <blockquote className='fdUserAccount__article__about--blockquote' cite='https://www.themoviedb.org/?language=en-US'>
          Powered by TMDB
        </blockquote>
      </section>
      <section className='fdUserAccount__article__cta'>
        <button className='fdUserAccount__article__cta--accBtn fdUserAccount__article--signin' aria-label='Sign in'>
          Sign in
        </button>
        <button className='fdUserAccount__article__cta--accBtn fdUserAccount__article--guest' aria-label='Browse as a guest with limited functionality'>
          Guest (limited) access
        </button>
        <button className='fdUserAccount__article__cta--accBtn fdUserAccount__article--signup' aria-label='Sign up'>
          New member
        </button>
      </section>
    </article>
  );
};

export default FDUserAccountArticle;
