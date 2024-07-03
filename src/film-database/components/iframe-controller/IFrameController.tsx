import { useEffect, Dispatch, SetStateAction } from 'react';

import { YouTubePlayer } from 'react-youtube';
import PlayerStates from 'youtube-player/dist/constants/PlayerStates';

import IFrameControllerPlayPause from './IFrameControllerPlayPause';
import IFrameControllerVolumeIndicator from './IFrameControllerVolumeIndicator';
import IFrameControllerVolumeSlider from './IFrameControllerVolumeSlider';
import IFrameControllerTimeStamp from './IFrameControllerTimeStamp';
import IFrameControllerSeeker from './IFrameControllerSeeker';
import IFrameControllerPlayback from './IFrameControllerPlayback';

const IFrameController = ({
  player,
  playerStates,
  playerVolume,
  setPlayerVolume,
}: {
  player: YouTubePlayer | undefined;
  playerStates: PlayerStates | undefined;
  playerVolume: number;
  setPlayerVolume: Dispatch<SetStateAction<number>>;
}) => {
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
      <IFrameControllerSeeker player={player} />
      <div className='iFrameController__controls'>
        <IFrameControllerPlayPause player={player} playerStates={playerStates} />
        <IFrameControllerVolumeIndicator player={player} playerVolume={playerVolume} />
        <IFrameControllerVolumeSlider player={player} playerVolume={playerVolume} setPlayerVolume={setPlayerVolume} />
        <IFrameControllerTimeStamp player={player} />
        <IFrameControllerPlayback player={player} />
      </div>
    </div>
  );
};

export default IFrameController;
