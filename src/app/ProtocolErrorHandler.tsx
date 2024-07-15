const ProtocolErrorHandler = () => {
  return (
    <main className='protocolError'>
      <article className='protocolError__article'>
        <h1 className='protocolError__article--h1'>Status 404</h1>
        <h2 className='protocolError__article--h2'>The requested page couldn't be found.</h2>
        <p className='protocolError__article--p'>
          The browser was able to communicate with the server; however, the requested page could not be found. Please return to the{' '}
          <a className='protocolError__article--a' aria-label='Return to landing page' href='/'>
            landing page
          </a>
          &nbsp;to continue browsing.
        </p>
      </article>
    </main>
  );
};

export default ProtocolErrorHandler;
