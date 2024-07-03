import { useEffect, useState } from 'react';

import { YouTubePlayer } from 'react-youtube';

import { MaterialSymbolsVolumeUp, MaterialSymbolsVolumeDown, MaterialSymbolsVolumeOff } from '../../assets/google-material-symbols/iFrameSymbols';

const IFrameControllerVolumeIndicator = ({ player, playerVolume }: { player: YouTubePlayer | undefined; playerVolume: number }) => {
  const [symbolComponent, setSymbolComponent] = useState<JSX.Element>(<MaterialSymbolsVolumeOff />);
  const [isPlayerMuted, setIsPlayerMuted] = useState<boolean>(true);

  const handleVolumeIndicator = async () => {
    if (!player) return;

    switch (true) {
      case playerVolume === 0:
        setSymbolComponent(<MaterialSymbolsVolumeOff />);
        break;

      case playerVolume <= 50:
        setSymbolComponent(<MaterialSymbolsVolumeDown />);
        break;

      case playerVolume > 50:
        setSymbolComponent(<MaterialSymbolsVolumeUp />);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    handleVolumeIndicator();
  }, [playerVolume]);

  const muteUnmute = async () => {
    if (!player) return;

    const isPlayerMuted: boolean = await player.isMuted();

    if (isPlayerMuted) {
      player.unMute();
      handleVolumeIndicator();
      setIsPlayerMuted(false);
    } else {
      player.mute();
      setSymbolComponent(<MaterialSymbolsVolumeOff />);
      setIsPlayerMuted(true);
    }
  };

  return (
    <button className='iFrameController__controls__button' aria-label={isPlayerMuted ? 'Unmute video' : 'Mute video'} onClick={() => muteUnmute()}>
      {symbolComponent}
    </button>
  );
};

export default IFrameControllerVolumeIndicator;
