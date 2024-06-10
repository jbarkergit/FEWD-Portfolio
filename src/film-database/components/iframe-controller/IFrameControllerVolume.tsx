import { useEffect, useState } from 'react';

import { YouTubePlayer } from 'react-youtube';

import IFrameControllerVolumeIndicator from './IFrameControllerVolumeIndicator';
import IFrameControllerVolumeSlider from './IFrameControllerVolumeSlider';

const IFrameControllerVolume = ({ player }: { player: YouTubePlayer | undefined }) => {
  const [playerVolume, setPlayerVolume] = useState<number>(0);

  useEffect(() => {
    if (player) player.setVolume(playerVolume);
  }, [playerVolume]);

  return (
    <>
      <IFrameControllerVolumeIndicator player={player} playerVolume={playerVolume} />
      <IFrameControllerVolumeSlider player={player} playerVolume={playerVolume} setPlayerVolume={setPlayerVolume} />
    </>
  );
};

export default IFrameControllerVolume;
