const PortHeader = () => {
  return (
    <header className="portHeader">
      <section className="portHeader__index">
        <div className="portHeader__index__indicator">
          <span>{'You are here'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="portHeader__slideSelection__slideIndex"></div>
      </section>
      <section className="portHeader__menu">
        <nav className="portHeader__menu__nav">
          <span></span>
          <span>About</span>
          <span>Contact</span>
        </nav>
      </section>
    </header>
  );
};

export default PortHeader;
