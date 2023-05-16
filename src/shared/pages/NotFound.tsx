const NotFound = () => {
  return (
    <main className="notfound">
      <div
        className="notfound__container"
        aria-label="HTTP 404 The browser was able to communicate with the server; however, the requested page could not be found."
      >
        <h1 className="flexBox highlight">HTTP 404</h1>
        <p>
          The browser was able to communicate with the server; however, the requested page could not be found. Please return to the{' '}
          <a href="/" className="notFound--link highlight">
            landing page
          </a>
          &nbsp;to continue browsing.
        </p>
        <a href="/" className="notFound--link highlight"></a>
      </div>
    </main>
  );
};

export default NotFound;
