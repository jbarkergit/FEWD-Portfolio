import { useEffect, useState } from 'react';

import { YouTubePlayer } from 'react-youtube';

import { MaterialSymbolsPlayArrow, MaterialSymbolsPause, SvgSpinnersRingResize } from '../../assets/google-material-symbols/iFrameSymbols';

const IFrameControllerPlayPause = ({
  player,
  playState,
}: {
  player: YouTubePlayer;
  playState: 'unstarted' | 'ended' | 'playing' | 'paused' | 'buffering' | 'cued' | undefined;
}) => {
  const alterPlayState = async () => {
    playState === 'playing' ? player.pauseVideo() : player.playVideo();
  };

  const [playStateSymbolComponent, setPlayStateSymbolComponent] = useState<JSX.Element>(<SvgSpinnersRingResize />);

  const reflectPlayerState = async (): Promise<void> => {
    switch (playState) {
      case 'buffering':
      case 'cued':
        setPlayStateSymbolComponent(<SvgSpinnersRingResize />);
        break;

      case 'unstarted':
      case 'paused':
        setPlayStateSymbolComponent(<MaterialSymbolsPause />);
        break;

      case 'playing':
      case 'ended':
        setPlayStateSymbolComponent(<MaterialSymbolsPlayArrow />);
        break;

      default:
        setPlayStateSymbolComponent(<SvgSpinnersRingResize />);
        break;
    }
  };

  useEffect(() => {
    reflectPlayerState();
  }, [playState]);

  return (
    <button className='iFrameController__controls__button' aria-label={playState === 'playing' ? 'Pause video' : 'Play video'} onClick={() => alterPlayState()}>
      {playStateSymbolComponent}
    </button>
  );
};

export default IFrameControllerPlayPause;
