import { YouTubePlayer } from 'react-youtube';

import IFrameControllerPlayPause from './IFrameControllerPlayPause';
import IFrameControllerPlayback from './IFrameControllerPlayback';
import IFrameControllerVolume from './IFrameControllerVolume';

const IFrameController = ({ player }: { player: YouTubePlayer | undefined }) => {
  return (
    <div className='iFrameController'>
      <IFrameControllerPlayPause player={player} />
      <IFrameControllerVolume player={player} />
      <IFrameControllerPlayback player={player} />
    </div>
  );
};

export default IFrameController;
