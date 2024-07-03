import { useEffect, useState } from 'react';

import { YouTubePlayer } from 'react-youtube';
import PlayerStates from 'youtube-player/dist/constants/PlayerStates';

import { MaterialSymbolsPlayArrow, MaterialSymbolsPause, SvgSpinnersRingResize } from '../../assets/google-material-symbols/iFrameSymbols';

const IFrameControllerPlayPause = ({ player, playerStates }: { player: YouTubePlayer | undefined; playerStates: PlayerStates | undefined }) => {
  const [symbolComponent, setSymbolComponent] = useState<JSX.Element>(<SvgSpinnersRingResize />);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  /** react-youtube PlayerStates
   * Player.on('stateChange') breaks app
   * (event as YouTubeEvent).target.addEventListener('stateChange') doesn't work
   * (event as YouTube).data provides nothing
   * getPlayerStates() type is Promise<enum> and doesn't provide types
   *
   * Solution: mount onStateChange to lib component, prop drill
   */

  const handleSymbols = async (): Promise<void> => {
    if (!player) return;

    switch (playerStates) {
      case 1:
        setSymbolComponent(<MaterialSymbolsPlayArrow />);
        setIsPlaying(true);
        break;

      case 2:
        setSymbolComponent(<MaterialSymbolsPause />);
        setIsPlaying(false);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (playerStates) handleSymbols();
  }, [playerStates]);

  const playPause = async () => {
    if (!player) return;

    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  return (
    <button className='iFrameController__controls__button' aria-label={isPlaying ? 'Pause video' : 'Play video'} onClick={() => playPause()}>
      {symbolComponent}
    </button>
  );
};

export default IFrameControllerPlayPause;
