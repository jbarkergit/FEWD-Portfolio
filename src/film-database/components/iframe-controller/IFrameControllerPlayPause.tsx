import { useState } from 'react';

import { YouTubeEvent } from 'react-youtube';

import { MaterialSymbolsPlayArrow, MaterialSymbolsPause } from '../../assets/iFrameSymbols';

const IFrameControllerPlayPause = ({ player }: { player: YouTubeEvent | undefined }) => {
  const [symbolComponent, setSymbolComponent] = useState<JSX.Element>(<MaterialSymbolsPause />);

  const playPause = async (): Promise<void> => {
    if (!player) return;
    const isMuted: boolean = await player.target.isMuted();

    if (isMuted) {
      player.target.unMute();
      player.target.playVideo();
      setSymbolComponent(<MaterialSymbolsPlayArrow />);
    } else {
      player.target.mute();
      player.target.pauseVideo();
      setSymbolComponent(<MaterialSymbolsPause />);
    }
  };

  return (
    <button className='iFrameController__button' onClick={() => playPause()}>
      {symbolComponent}
    </button>
  );
};

export default IFrameControllerPlayPause;
