import { useRef } from 'react';

import { Type_ReactYouTube_YouTubeEvent } from '../../features/iframe/FDiFrame';

import { MaterialSymbolsVolumeUp, MaterialSymbolsVolumeDown, MaterialSymbolsVolumeOff } from '../../assets/iFrameSymbols';

const IFrameControllerVolumeIndicator = ({ player }: Type_ReactYouTube_YouTubeEvent) => {
  const volumeUpRef = useRef<HTMLButtonElement>(null);
  const volumeDownRef = useRef<HTMLButtonElement>(null);
  const volumeOffRef = useRef<HTMLButtonElement>(null);

  const volumeIndicator = async (): Promise<void> => {
    if (!player) return;
    const isMuted: boolean = await player.target.isMuted();
    const getVolume: number = await player.target.getVolume();

    if (isMuted) {
      volumeUpRef.current?.setAttribute('data-visible', 'false');
      volumeDownRef.current?.setAttribute('data-visible', 'false');
      volumeOffRef.current?.setAttribute('data-visible', 'true');
    }

    if (getVolume <= 50) {
      volumeUpRef.current?.setAttribute('data-visible', 'false');
      volumeDownRef.current?.setAttribute('data-visible', 'true');
      volumeOffRef.current?.setAttribute('data-visible', 'false');
    }

    if (getVolume >= 90) {
      volumeUpRef.current?.setAttribute('data-visible', 'true');
      volumeDownRef.current?.setAttribute('data-visible', 'false');
      volumeOffRef.current?.setAttribute('data-visible', 'false');
    }
  };

  return (
    <button className='iFrameController__features__button' onClick={() => volumeIndicator()}>
      <span className='iFrameController__features__button--up' ref={volumeUpRef} data-visible='false'>
        <MaterialSymbolsVolumeUp />
      </span>
      <span className='iFrameController__features__button--down' ref={volumeDownRef} data-visible='true'>
        <MaterialSymbolsVolumeDown />
      </span>
      <span className='iFrameController__features__button--off' ref={volumeOffRef} data-visible='false'>
        <MaterialSymbolsVolumeOff />
      </span>
    </button>
  );
};

export default IFrameControllerVolumeIndicator;
