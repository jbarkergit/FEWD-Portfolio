import { useState, useEffect } from 'react';

const CurrentTimeCDT = (): JSX.Element => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const getTime = () => {
      const formattedTime: string = new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/Chicago',
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
      });

      setCurrentTime(formattedTime);
    };

    getTime();
    const interval = setInterval(getTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='portFooter__nav__right--timezone'>
      {currentTime} • CDT (GMT-5) <h2 style={{ display: 'none' }}>Current time in Central Daylight Time, GMT-5</h2>
    </div>
  );
};

export default CurrentTimeCDT;
