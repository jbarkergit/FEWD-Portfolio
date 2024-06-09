import { useEffect, useState } from 'react';

import { YouTubeEvent } from 'react-youtube';

import IFramePlayPause from './IFrameControllerPlayPause';
import IFramePlayback from './IFrameControllerPlayback';
import IFrameVolumeIndicator from './IFrameControllerVolumeIndicator';
import IFrameVolumeSlider from './IFrameControllerVolumeSlider';

export type Type_iFrameController_Props = {
  player: YouTubeEvent | undefined;
  playerVolume?: number;
  setPlayerVolume?: React.Dispatch<React.SetStateAction<number>>;
};

const IFrameController = ({ player }: Type_iFrameController_Props) => {
  if (!player) return;

  /** Hoisted dependencies */
  const [playerVolume, setPlayerVolume] = useState<number>(0);

  useEffect(() => {
    player.target.setVolume(playerVolume);
  }, [playerVolume]);

  return (
    <div className='iFrameController'>
      <div className='iFrameController__features'>
        <IFramePlayPause player={player} />
        <IFrameVolumeIndicator player={player} playerVolume={playerVolume} />
        <IFrameVolumeSlider player={player} playerVolume={playerVolume} setPlayerVolume={setPlayerVolume} />
        <IFramePlayback player={player} />
      </div>

      <div className='iFrameController__features'></div>
    </div>
  );
};

export default IFrameController;
