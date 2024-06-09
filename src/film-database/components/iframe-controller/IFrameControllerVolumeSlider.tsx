import { Type_ReactYouTube_YouTubeEvent } from '../../features/iframe/FDiFrame';

const IFrameControllerVolumeSlider = ({ player }: Type_ReactYouTube_YouTubeEvent) => {
  return (
    <button className='iFrameController__features__slider'>
      <span className='iFrameController__features__slider--range' />
      <span className='iFrameController__features__slider--handle' />
    </button>
  );
};

export default IFrameControllerVolumeSlider;
