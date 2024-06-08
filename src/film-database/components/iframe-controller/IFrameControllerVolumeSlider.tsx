import { Type_ReactYouTube_YouTubeEvent } from '../../features/iframe/FDiFrame';

const IFrameControllerVolumeSlider = ({ player }: Type_ReactYouTube_YouTubeEvent) => {
  return (
    <button className='iFrameController__interact__slider'>
      <span className='iFrameController__interact__slider--range' />
      <span className='iFrameController__interact__slider--handle' />
    </button>
  );
};

export default IFrameControllerVolumeSlider;
