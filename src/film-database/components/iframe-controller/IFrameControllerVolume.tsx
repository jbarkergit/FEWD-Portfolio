import { useEffect, useState } from 'react';

import { YouTubeEvent } from 'react-youtube';

import IFrameControllerVolumeIndicator from './IFrameControllerVolumeIndicator';
import IFrameControllerVolumeSlider from './IFrameControllerVolumeSlider';

const IFrameControllerVolume = ({ player }: { player: YouTubeEvent | undefined }) => {
  const [playerVolume, setPlayerVolume] = useState<number>(0);

  useEffect(() => {
    if (player) player.target.setVolume(playerVolume);
  }, [playerVolume]);

  return (
    <>
      <IFrameControllerVolumeIndicator player={player} playerVolume={playerVolume} />
      <IFrameControllerVolumeSlider player={player} playerVolume={playerVolume} setPlayerVolume={setPlayerVolume} />
    </>
  );
};

export default IFrameControllerVolume;
