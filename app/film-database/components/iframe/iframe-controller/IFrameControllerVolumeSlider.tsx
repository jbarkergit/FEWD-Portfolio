// Deps
import { useRef, useState } from 'react';
import type { PointerEvent, Dispatch, SetStateAction } from 'react';
const IFrameControllerVolumeSlider = ({ setPlayerVolume }: { setPlayerVolume: Dispatch<SetStateAction<number>> }) => {
  const sliderRef = useRef<HTMLButtonElement>(null);
  const handleRef = useRef<HTMLSpanElement>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const moveHandle = (e: PointerEvent<HTMLButtonElement>) => {
    if (sliderRef.current && handleRef.current && isDragging) {
      const sliderRect: DOMRect = sliderRef.current.getBoundingClientRect();
      const xOffset: number = e.clientX - sliderRect.left;
      const position: number = (xOffset / sliderRect.width) * 100;
      const clampedPosition: number = Math.min(100, Math.max(0, position));

      handleRef.current.style.left = `${clampedPosition}%`;
      setPlayerVolume(clampedPosition);
    }
  };

  return (
    <button
      className='fdiFrame__controller__controls__slider'
      aria-label='Volume adjustment slider'
      ref={sliderRef}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
      onPointerMove={(e: PointerEvent<HTMLButtonElement>) => moveHandle(e)}>
      <span className='fdiFrame__controller__controls__slider--range' />
      <span className='fdiFrame__controller__controls__slider--handle' aria-label='Volume adjustment knob' ref={handleRef} style={{ left: '0%' }} />
    </button>
  );
};

export default IFrameControllerVolumeSlider;
