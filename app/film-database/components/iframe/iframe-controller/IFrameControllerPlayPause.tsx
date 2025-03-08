// Deps
import { useEffect, useState, type JSX } from 'react';
// Lib
import type { YouTubePlayer } from 'react-youtube';
// Assets
import { MaterialSymbolsPause, MaterialSymbolsPlayArrow, SvgSpinnersRingResize } from '../../../assets/google-material-symbols/GoogleMaterialIcons';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';

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

  // Pause video when modal opens
  const { isMovieModal } = useCatalogProvider();

  useEffect(() => {
    player.pauseVideo();
  }, [isMovieModal]);

  return (
    <button className='fdiFrame__controller__controls__button' aria-label={playState === 'playing' ? 'Pause video' : 'Play video'} onClick={() => alterPlayState()}>
      {playStateSymbolComponent}
    </button>
  );
};

export default IFrameControllerPlayPause;
