import { useState, useEffect } from 'react';

import { YouTubePlayer } from 'react-youtube';
import PlayerStates from 'youtube-player/dist/constants/PlayerStates';

import IFrameControllerPlayPause from './IFrameControllerPlayPause';
import IFrameControllerPlayback from './IFrameControllerPlayback';
import IFrameControllerVolumeIndicator from './IFrameControllerVolumeIndicator';
import IFrameControllerVolumeSlider from './IFrameControllerVolumeSlider';

const IFrameController = ({ player, playerStates }: { player: YouTubePlayer | undefined; playerStates: PlayerStates | undefined }) => {
  const [playerVolume, setPlayerVolume] = useState<number>(0);

  /** Keep player volume aligned with state */
  const alignPlayerVolume = async () => {
    player?.setVolume(playerVolume);
  };

  useEffect(() => {
    alignPlayerVolume();
  }, [playerVolume]);

  /** Component */
  return (
    <div className='iFrameController'>
      <IFrameControllerPlayPause player={player} playerStates={playerStates} />
      <IFrameControllerVolumeIndicator player={player} playerVolume={playerVolume} />
      <IFrameControllerVolumeSlider player={player} playerVolume={playerVolume} setPlayerVolume={setPlayerVolume} />
      <IFrameControllerPlayback player={player} />
    </div>
  );
};

export default IFrameController;
