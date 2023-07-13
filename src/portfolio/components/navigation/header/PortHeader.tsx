import { useRef } from 'react';
import { Link } from 'react-router-dom';

const Developer = (): JSX.Element => {
  return (
    <div className="developer">
      <div className="developer__icon">
        <i className="fa-solid fa-location-dot"></i>
      </div>
      <div className="developer__nameLoc">
        <h1>Justin Barker</h1>
        <h2>Remote, Front End Developer</h2>
      </div>
    </div>
  );
};

const PortHeader = (): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null!),
    dialog: HTMLDialogElement = dialogRef?.current;

  const AboutDialog = () => {
    return (
      <section className="aboutDialog">
        <dialog ref={dialogRef} data-activity="disabled">
          <form method="dialog">hello, world</form>
        </dialog>
      </section>
    );
  };

  const AboutDeveloper = (): JSX.Element => {
    return (
      <div className="aboutDeveloper">
        <Link to="https://github.com/jbarkergit" target="_blank">
          <i className="fa-brands fa-github"></i>
        </Link>
        <button
          onClick={() => {
            dialog?.showModal();
            dialog?.getAttribute('data-activity') === 'disabled'
              ? dialog?.setAttribute('data-activity', 'active')
              : dialog?.setAttribute('data-activity', 'disabled');
          }}
        >
          <span>
            <i className="fa-brands fa-dev"></i>
            {'About'}
          </span>
        </button>
      </div>
    );
  };
  return (
    <header className="portHeader">
      <Developer />
      <AboutDeveloper />
      <AboutDialog />
    </header>
  );
};

export default PortHeader;
