import IFramePlayPause from './IFrameControllerPlayPause';
import IFramePlayback from './IFrameControllerPlayback';
import IFrameVolumeIndicator from './IFrameControllerVolumeIndicator';
import IFrameVolumeSlider from './IFrameControllerVolumeSlider';
import { Type_ReactYouTube_YouTubeEvent } from '../../features/iframe/FDiFrame';

const IFrameController = ({ player }: Type_ReactYouTube_YouTubeEvent) => {
  return (
    <div className='iFrameController'>
      <div className='iFrameController__interact'>
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
