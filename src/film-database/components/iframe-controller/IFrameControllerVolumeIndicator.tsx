import { useEffect, useState } from 'react';

import { YouTubePlayer } from 'react-youtube';

import { MaterialSymbolsVolumeUp, MaterialSymbolsVolumeDown, MaterialSymbolsVolumeOff } from '../../assets/google-material-symbols/iFrameSymbols';

const IFrameControllerVolumeIndicator = ({ player, playerVolume }: { player: YouTubePlayer; playerVolume: number }) => {
  const [symbolComponent, setSymbolComponent] = useState<JSX.Element>(<MaterialSymbolsVolumeOff />);
  const [prevSymbolComponent, setPrevSymbolComponent] = useState<JSX.Element>(<MaterialSymbolsVolumeOff />);

  const handleVolumeIndicator = () => {
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
        setSymbolComponent(<MaterialSymbolsVolumeOff />);
        break;
    }
  };

  useEffect(() => {
    handleVolumeIndicator();
  }, [playerVolume]);

  const alterMuteState = async () => {
    const isPlayerMuted: boolean = await player.isMuted();

    if (isPlayerMuted) {
      player.unMute();
      setSymbolComponent(prevSymbolComponent);
    } else {
      player.mute();
      setPrevSymbolComponent(symbolComponent);
      setSymbolComponent(<MaterialSymbolsVolumeOff />);
    }
  };

  return (
    <button className='iFrameController__controls__button' aria-label={playerVolume === 0 ? 'Unmute video' : 'Mute video'} onClick={() => alterMuteState()}>
      {symbolComponent}
    </button>
  );
};

export default IFrameControllerVolumeIndicator;
