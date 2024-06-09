import { useRef } from 'react';

import { Type_iFrameController_Props } from './IFrameController';

import { MaterialSymbolsPlayArrow, MaterialSymbolsPause } from '../../assets/iFrameSymbols';

const IFrameControllerPlayPause = ({ player }: Type_iFrameController_Props) => {
  const playRef = useRef<HTMLSpanElement>(null);
  const pauseRef = useRef<HTMLSpanElement>(null);

  const playPause = async (): Promise<void> => {
    if (!player) return;
    const isMuted: boolean = await player.target.isMuted();

    if (isMuted) {
      player.target.unMute();
      player.target.playVideo();
      playRef.current?.setAttribute('data-visible', 'true');
      pauseRef.current?.setAttribute('data-visible', 'false');
    } else {
      player.target.mute();
      player.target.pauseVideo();
      playRef.current?.setAttribute('data-visible', 'false');
      pauseRef.current?.setAttribute('data-visible', 'true');
    }
  };

  return (
    <button className='iFrameController__features__button' onClick={() => playPause()}>
      <span className='iFrameController__features__button--play' ref={playRef} data-visible='false'>
        <MaterialSymbolsPlayArrow />
      </span>
      <span className='iFrameController__features__button--pause' ref={pauseRef} data-visible='true'>
        <MaterialSymbolsPause />
      </span>
    </button>
  );
};

export default IFrameControllerPlayPause;
