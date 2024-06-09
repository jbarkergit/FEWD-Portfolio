import { Type_ReactYouTube_YouTubeEvent } from '../../features/iframe/FDiFrame';

const IFrameControllerPlayback = ({ player }: Type_ReactYouTube_YouTubeEvent) => {
  return (
    <div className='iFrameController__features__playback'>
      <div className='iFrameController__features__playback--current'></div>
      <div className='iFrameController__features__playback--duration'></div>
    </div>
  );
};

export default IFrameControllerPlayback;
