import { useEffect, useState } from 'react';

import { YouTubeEvent } from 'react-youtube';

import { MaterialSymbolsVolumeUp, MaterialSymbolsVolumeDown, MaterialSymbolsVolumeOff } from '../../assets/iFrameSymbols';

const IFrameControllerVolumeIndicator = ({ player }: { player: YouTubeEvent | undefined }) => {
  const [symbolComponent, setSymbolComponent] = useState<JSX.Element>(<MaterialSymbolsVolumeOff />);

  const handleVolumeIndicator = (): void => {
    if (!player) return;

    switch (true) {
      case playerVolume === 0:
        setSymbolComponent(<MaterialSymbolsVolumeOff />);
        break;

      case playerVolume! <= 50:
        setSymbolComponent(<MaterialSymbolsVolumeDown />);
        break;

      case playerVolume! >= 90:
        setSymbolComponent(<MaterialSymbolsVolumeUp />);
        break;

      default:
        setSymbolComponent(<MaterialSymbolsVolumeOff />);
        break;
    }
  };

  useEffect(() => handleVolumeIndicator(), [playerVolume]);

  const muteUnmute = () => {
    playerVolume! > 0 ? setPlayerVolume!(0) : setPlayerVolume!((prevVolume) => prevVolume);
  };

  return (
    <button className='iFrameController__features__button' onClick={() => muteUnmute()}>
      <span className='iFrameController__features__button--symbol'>{symbolComponent}</span>
    </button>
  );
};

export default IFrameControllerVolumeIndicator;
