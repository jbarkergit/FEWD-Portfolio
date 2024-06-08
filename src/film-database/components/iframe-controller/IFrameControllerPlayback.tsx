import { Type_ReactYouTube_YouTubeEvent } from '../../features/iframe/FDiFrame';

const IFrameControllerPlayback = ({ player }: Type_ReactYouTube_YouTubeEvent) => {
  return (
    <div className='iFrameController__interact__playback'>
      <div className='iFrameController__interact__playback--current'></div>
      <div className='iFrameController__interact__playback--duration'></div>
    </div>
  );
};

export default IFrameControllerPlayback;
