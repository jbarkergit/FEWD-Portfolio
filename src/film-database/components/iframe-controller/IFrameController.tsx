import { YouTubeEvent } from 'react-youtube';

import IFrameControllerPlayPause from './IFrameControllerPlayPause';
import IFrameControllerPlayback from './IFrameControllerPlayback';
import IFrameControllerVolume from './IFrameControllerVolume';

type TYPE_IFRAMECONTROLLER_PROP_REFERENCE = {
  player: YouTubeEvent | undefined;
};

const IFrameController = ({ player }: { player: YouTubeEvent | undefined }) => {
  return (
    <div className='iFrameController'>
      <IFrameControllerPlayPause player={player} />
      <IFrameControllerVolume player={player} />
      <IFrameControllerPlayback player={player} />
    </div>
  );
};

export default IFrameController;
