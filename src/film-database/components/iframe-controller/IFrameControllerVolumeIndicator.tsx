import { useEffect, useState } from 'react';

import { YouTubeEvent } from 'react-youtube';

import { MaterialSymbolsVolumeUp, MaterialSymbolsVolumeDown, MaterialSymbolsVolumeOff } from '../../assets/iFrameSymbols';

const IFrameControllerVolumeIndicator = ({ player, playerVolume }: { player: YouTubeEvent | undefined; playerVolume: number }) => {
  const [symbolComponent, setSymbolComponent] = useState<JSX.Element>(<MaterialSymbolsVolumeOff />);

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
    const isPlayerMuted: boolean = await player.target.isMuted();
    if (isPlayerMuted) {
      player.target.unMute();
      handleVolumeIndicator();
    } else {
      player.target.mute();
      setSymbolComponent(<MaterialSymbolsVolumeOff />);
    }
  };

  return (
    <button className='iFrameController__button' onClick={() => muteUnmute()}>
      {symbolComponent}
    </button>
  );
};

export default IFrameControllerVolumeIndicator;
