import { useEffect, useState } from 'react';

import { YouTubePlayer } from 'react-youtube';

import IFrameControllerPlayPause from './IFrameControllerPlayPause';
import IFrameControllerVolumeIndicator from './IFrameControllerVolumeIndicator';
import IFrameControllerVolumeSlider from './IFrameControllerVolumeSlider';
import IFrameControllerTimeStamp from './IFrameControllerTimeStamp';
import IFrameControllerSeeker from './IFrameControllerSeeker';

const IFrameController = ({
  player,
  playState,
}: {
  player: YouTubePlayer;
  playState: 'unstarted' | 'ended' | 'playing' | 'paused' | 'buffering' | 'cued' | undefined;
}) => {
  const [playerVolume, setPlayerVolume] = useState<number>(0);
  const alignIFrameVolume = () => player.setVolume(playerVolume);

  useEffect(() => {
    if (playerVolume > 0) player.unMute();
    alignIFrameVolume();
  }, [playerVolume]);

  return (
    <div className='fdiFrame__controller'>
      <IFrameControllerSeeker player={player} />
      <div className='fdiFrame__controller__controls'>
        <IFrameControllerPlayPause player={player} playState={playState} />
        <IFrameControllerVolumeIndicator player={player} playerVolume={playerVolume} />
        <IFrameControllerVolumeSlider setPlayerVolume={setPlayerVolume} />
        <IFrameControllerTimeStamp player={player} playState={playState} />
        {/* (depreciated) */}
        {/* <IFrameControllerPlayback player={player} qualityState={qualityState} /> */}
      </div>
    </div>
  );
};

export default IFrameController;
