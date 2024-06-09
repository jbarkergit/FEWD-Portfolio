import { YouTubeEvent } from 'react-youtube';

import IFramePlayPause from './IFrameControllerPlayPause';
import IFramePlayback from './IFrameControllerPlayback';
import IFrameVolumeIndicator from './IFrameControllerVolumeIndicator';
import IFrameVolumeSlider from './IFrameControllerVolumeSlider';

type TYPE_IFRAMECONTROLLER_PROP_REFERENCE = {
  player: YouTubeEvent | undefined;
};

const IFrameController = ({ player }: { player: YouTubeEvent | undefined }) => {
  return (
    <div className='iFrameController'>
      <div className='iFrameController__features'>
        <IFramePlayPause player={player} />
        <IFrameVolumeIndicator player={player} />
        <IFrameVolumeSlider player={player} />
        <IFramePlayback player={player} />
      </div>

      <div className='iFrameController__features'></div>
    </div>
  );
};

export default IFrameController;
