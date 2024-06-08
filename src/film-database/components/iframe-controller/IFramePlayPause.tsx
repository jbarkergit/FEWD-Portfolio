import { useRef } from 'react';

import { Type_ReactYouTube_YouTubeEvent } from '../../features/iframe/FDiFrame';

import { MaterialSymbolsPlayArrow, MaterialSymbolsPause } from '../../assets/iFrameSymbols';

const IFramePlayPause = ({ player }: Type_ReactYouTube_YouTubeEvent) => {
  const playRef = useRef<HTMLSpanElement>(null);
  const pauseRef = useRef<HTMLSpanElement>(null);

  const playPause = async (): Promise<void> => {
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
    <button className='iFrameController__interact__playpause' onClick={() => playPause()}>
      <span className='iFrameController__interact__playpause--play' ref={playRef} data-visible='false'>
        <MaterialSymbolsPlayArrow />
      </span>
      <span className='iFrameController__interact__playpause--pause' ref={pauseRef} data-visible='true'>
        <MaterialSymbolsPause />
      </span>
    </button>
  );
};

export default IFramePlayPause;
