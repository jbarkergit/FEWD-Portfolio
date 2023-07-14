import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Developer = (): JSX.Element => {
  return (
    <div className="developer">
      <div className="developer__nameLoc">
        <h1>Justin Barker</h1>
        <h2>Remote, Front End Developer</h2>
      </div>
    </div>
  );
};

const CurrentTimeCDT = (): JSX.Element => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const getTime = () => {
      const currentDate: Date = new Date();
      const formattedTime: string = currentDate.toLocaleTimeString('en-US', {
        timeZone: 'America/Chicago',
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
      });

      setCurrentTime(formattedTime);
    };

    getTime();
    const interval = setInterval(getTime, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className="currentTimeCDT">{currentTime} • CDT (GMT-5)</div>;
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
      <CurrentTimeCDT />
      <AboutDeveloper />

      <AboutDialog />
    </header>
  );
};

export default PortHeader;
