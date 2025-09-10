// Deps
import { useEffect, useState } from 'react';
// Lib
import type { YouTubePlayer } from 'react-youtube';
// Components
import IFrameControllerPlayPause from './IFrameControllerPlayPause';
import IFrameControllerVolumeIndicator from './IFrameControllerVolumeIndicator';
import IFrameControllerVolumeSlider from './IFrameControllerVolumeSlider';
import IFrameControllerTimeStamp from './IFrameControllerTimeStamp';
import IFrameControllerSeeker from './IFrameControllerSeeker';
import IFrameControllerFullscreen from '~/film-database/components/iframe/iframe-controller/IFrameControllerFullscreen';

const IFrameController = ({
  player,
  playState,
}: {
  player: YouTubePlayer;
  playState: 'unstarted' | 'ended' | 'playing' | 'paused' | 'buffering' | 'cued' | undefined;
}) => {
  const [playerVolume, setPlayerVolume] = useState<number>(0);

  useEffect(() => {
    const handleVolume = () => {
      if (playerVolume > 0) player.unMute();
      player.setVolume(playerVolume);
    };
    handleVolume();
  }, [playerVolume]);

  return (
    <div className='fdiFrame__controller'>
      <IFrameControllerSeeker player={player} />
      <div className='fdiFrame__controller__controls'>
        <IFrameControllerPlayPause
          player={player}
          playState={playState}
        />
        <IFrameControllerVolumeIndicator
          player={player}
          playerVolume={playerVolume}
        />
        <IFrameControllerVolumeSlider setPlayerVolume={setPlayerVolume} />
        <IFrameControllerTimeStamp player={player} />
        {/* Fullscreen requires a reload of the embed, which breaks the embed. */}
        {/* <IFrameControllerFullscreen player={player} /> */}
      </div>
    </div>
  );
};

export default IFrameController;
