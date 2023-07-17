import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Developer = (): JSX.Element => {
  return (
    <section className="developer">
      <hgroup className="developer__nameLoc">
        <h1>Justin Barker</h1>
        <h2>React Front-end Developer</h2>
      </hgroup>
    </section>
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

  return (
    <section className="currentTimeCDT">
      {currentTime} • CDT (GMT-5) <span style={{ display: 'none' }}>Current time in Central Daylight Time, GMT-5</span>
    </section>
  );
};

const PortFooter = (): JSX.Element => {
  const AboutDeveloper = (): JSX.Element => {
    return (
      <section className="developerLinks">
        <Link to="https://github.com/jbarkergit" target="_blank">
          <i className="fa-brands fa-github"></i>
          <h2>{'Github'}</h2>
        </Link>
      </section>
    );
  };
  return (
    <footer className="portFooter">
      <Developer />
      <CurrentTimeCDT />
      <AboutDeveloper />
    </footer>
  );
};

export default PortFooter;
