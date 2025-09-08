// Deps
import { useEffect, useState, type JSX } from 'react';
// Lib
import type { YouTubePlayer } from 'react-youtube';
// Assets
import { MaterialSymbolsPause, IcOutlinePlayCircle, SvgSpinnersRingResize } from '../../../assets/svg/icons';
import { useModal } from '~/film-database/context/ModalContext';

const IFrameControllerPlayPause = ({
  player,
  playState,
}: {
  player: YouTubePlayer;
  playState: 'unstarted' | 'ended' | 'playing' | 'paused' | 'buffering' | 'cued' | undefined;
}) => {
  const { isModal } = useModal();
  const [playStateSymbolComponent, setPlayStateSymbolComponent] = useState<JSX.Element>(<SvgSpinnersRingResize />);

  // Reflect player state
  useEffect(() => {
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
        setPlayStateSymbolComponent(<IcOutlinePlayCircle />);
        break;

      default:
        setPlayStateSymbolComponent(<SvgSpinnersRingResize />);
        break;
    }
  }, [playState]);

  const alterPlayState = async () => (playState === 'playing' ? player.pauseVideo() : player.playVideo());

  // Pause video when modal opens
  useEffect(() => {
    if (isModal) player.pauseVideo();
  }, [isModal]);

  return (
    <button
      className='fdiFrame__controller__controls__button'
      aria-label={playState === 'playing' ? 'Pause video' : 'Play video'}
      onClick={() => alterPlayState()}>
      {playStateSymbolComponent}
    </button>
  );
};

export default IFrameControllerPlayPause;
