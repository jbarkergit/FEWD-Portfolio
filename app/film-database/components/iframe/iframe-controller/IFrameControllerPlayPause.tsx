import { useEffect, useState, type JSX } from 'react';
import type { YouTubePlayer } from 'react-youtube';
import { MaterialSymbolsPause, IcOutlinePlayCircle, SvgSpinnersRingResize } from '../../../assets/svg/icons';
import { useModalContext } from '~/film-database/context/ModalContext';

const IFrameControllerPlayPause = ({
  player,
  playState,
}: {
  player: YouTubePlayer;
  playState: 'unstarted' | 'ended' | 'playing' | 'paused' | 'buffering' | 'cued' | undefined;
}) => {
  const { modal } = useModalContext();
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
    if (modal) player.pauseVideo();
  }, [modal]);

  return (
    <button
      className='fdiFrame__controller__controls__button'
      aria-label={playState === 'playing' ? 'Pause video' : 'Play video'}
      onPointerUp={alterPlayState}>
      {playStateSymbolComponent}
    </button>
  );
};

export default IFrameControllerPlayPause;
