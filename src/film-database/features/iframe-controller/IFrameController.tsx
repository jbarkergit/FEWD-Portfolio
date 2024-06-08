import IFramePlayPause from '../../components/iframe-controller/IFramePlayPause';
import IFramePlayback from '../../components/iframe-controller/IFramePlayback';
import IFrameVolumeIndicator from '../../components/iframe-controller/IFrameVolumeIndicator';
import IFrameVolumeSlider from '../../components/iframe-controller/IFrameVolumeSlider';
import { Type_ReactYouTube_YouTubeEvent } from '../iframe/FDiFrame';

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
