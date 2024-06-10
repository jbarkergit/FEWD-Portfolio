import { useState } from 'react';

import { YouTubePlayer } from 'react-youtube';

import { MaterialSymbolsPlayArrow, MaterialSymbolsPause } from '../../assets/iFrameSymbols';

const IFrameControllerPlayPause = ({ player }: { player: YouTubePlayer | undefined }) => {
  const [symbolComponent, setSymbolComponent] = useState<JSX.Element>(<MaterialSymbolsPause />);

  const playPause = async (): Promise<void> => {
    if (!player) return;
    const isMuted: boolean = await player.isMuted();

    if (isMuted) {
      player.unMute();
      player.playVideo();
      setSymbolComponent(<MaterialSymbolsPlayArrow />);
    } else {
      player.mute();
      player.pauseVideo();
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
