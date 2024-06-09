import { useRef, useState, PointerEvent, Dispatch, SetStateAction } from 'react';

import { YouTubeEvent } from 'react-youtube';

const IFrameControllerVolumeSlider = ({ player, setPlayerVolume }: { player: YouTubeEvent | undefined; setPlayerVolume: Dispatch<SetStateAction<number>> }) => {
  const sliderRef = useRef<HTMLButtonElement>(null);
  const handleRef = useRef<HTMLSpanElement>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const moveHandle = (e: PointerEvent<HTMLButtonElement>) => {
    if (player && sliderRef.current && handleRef.current && isDragging) {
      const sliderRect: DOMRect = sliderRef.current.getBoundingClientRect();
      const xOffset: number = e.clientX - sliderRect.left;
      const position: number = (xOffset / sliderRect.width) * 100;
      const clampedPosition: number = Math.min(100, Math.max(0, position));
      handleRef.current.style.left = `${clampedPosition}%`;
      setPlayerVolume(clampedPosition);
      player.target.unMute();
    }
  };

  return (
    <button
      className='iFrameController__features__slider'
      ref={sliderRef}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      onPointerMove={(e: PointerEvent<HTMLButtonElement>) => moveHandle(e)}>
      <span className='iFrameController__features__slider--range' />
      <span className='iFrameController__features__slider--handle' ref={handleRef} style={{ left: '0%' }} />
    </button>
  );
};

export default IFrameControllerVolumeSlider;
