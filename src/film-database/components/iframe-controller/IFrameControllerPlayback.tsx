import { Type_ReactYouTube_YouTubeEvent } from '../../features/iframe/FDiFrame';

const IFrameControllerPlayback = ({ player }: Type_ReactYouTube_YouTubeEvent) => {
  return (
    <div className='iFrameController__features__playback'>
      <div className='iFrameController__features__playback--current'>0:03</div>
      <div className='iFrameController__features__playback--separator'> / </div>
      <div className='iFrameController__features__playback--duration'>12:09</div>
    </div>
  );
};

export default IFrameControllerPlayback;
