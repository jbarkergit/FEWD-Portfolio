const NotFound = () => {
  return (
    <section className="fourzerofour flexBoxY justifyCenter">
      <div
        className="fourzerofour__message flexBox flexColumn"
        aria-label="HTTP 404 The browser was able to communicate with the server; however, the requested page could not be found."
      >
        <h1 className="flexBox highlight">RUH ROH, HTTP 404</h1>
        <p>
          The browser was able to communicate with the server; however, the requested page could not be found. Please return to the{' '}
          <a href="/" className="notFound--link highlight">
            landing page
          </a>
          &nbsp;to continue browsing.
        </p>
        <a href="/" className="notFound--link highlight">
          <i className="fa-solid fa-person-walking-arrow-loop-left"></i>
        </a>
      </div>
    </section>
  );
};

export default NotFound;
