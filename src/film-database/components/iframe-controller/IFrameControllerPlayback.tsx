import { useState, useEffect } from 'react';

import { YouTubePlayer } from 'react-youtube';

const IFrameControllerPlayback = ({ player }: { player: YouTubePlayer | undefined }) => {
  const [current, setCurrent] = useState<string>('00:00');
  const [duration, setDuration] = useState<string>('00:00');

  const formatTime = (time: number): string => {
    const minutes: number = Math.floor(time / 60);
    const seconds: number = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!player) return;

    const updateCurrentTime = async () => {
      const currentTime: number = await player.getCurrentTime();
      if (currentTime) setCurrent(formatTime(currentTime));
    };

    const updateDuration = async () => {
      const videoDuration: number = await player.getDuration();
      if (videoDuration) setDuration(formatTime(videoDuration));
    };

    updateCurrentTime();
    updateDuration();

    const interval = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(interval);
  }, [player]);

  return (
    <div className='iFrameController__playback'>
      <div className='iFrameController__playback--current'>{current}</div>
      <div className='iFrameController__playback--separator'> / </div>
      <div className='iFrameController__playback--duration'>{duration}</div>
    </div>
  );
};

export default IFrameControllerPlayback;
