import IFramePlayPause from '../../components/iframe-controller/IFramePlayPause';
import IFramePlayback from '../../components/iframe-controller/IFramePlayback';
import IFrameVolumeIndicator from '../../components/iframe-controller/IFrameVolumeIndicator';
import IFrameVolumeSlider from '../../components/iframe-controller/IFrameVolumeSlider';

const IFrameController = () => {
  return (
    <div className='iFrameController'>
      <div className='iFrameController__interact'>
        <IFramePlayPause />
        <IFrameVolumeIndicator />
        <IFrameVolumeSlider />
        <IFramePlayback />
      </div>

      <div className='iFrameController__features'></div>
    </div>
  );
};

export default IFrameController;
