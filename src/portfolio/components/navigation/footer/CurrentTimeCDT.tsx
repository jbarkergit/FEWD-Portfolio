import { useState, useEffect } from 'react';

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
    <>
      {currentTime} • CDT (GMT-5) <h2 style={{ display: 'none' }}>Current time in Central Daylight Time, GMT-5</h2>
    </>
  );
};

export default CurrentTimeCDT;
