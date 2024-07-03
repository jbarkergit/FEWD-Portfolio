import { useEffect, useRef, useState } from 'react';
import { YouTubePlayer } from 'react-youtube';

const IFrameControllerSeeker = ({ player }: { player: YouTubePlayer | undefined }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const seekerRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<HTMLSpanElement>(null);

  const useSeeker = async (travelDistance: number) => {
    if (!player || !seekerRef.current || !sliderRef.current) return;

    const time = await player.getCurrentTime();
    const duration = await player.getDuration();

    if (time !== null && duration !== null) {
      console.log(seekerRef.current);
      const sliderWidth: number = seekerRef.current.clientWidth;
      const ratio: number = travelDistance / sliderWidth;
      const seekTime: number = ratio * duration;
      const clampedSeekTime: number = Math.max(0, Math.min(seekTime, duration));

      player.seekTo(clampedSeekTime, true);
    }
  };

  const useSlider = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (player && seekerRef.current && sliderRef.current && isDragging) {
      const seekerRect: DOMRect = seekerRef.current.getBoundingClientRect();
      const xOffset: number = e.clientX - seekerRect.left;

      sliderRef.current.style.width = `${xOffset}px`;
      useSeeker(xOffset);
    }
  };

  return (
    <button
      className='iFrameController__seeker'
      ref={seekerRef}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
      onPointerMove={(e: React.PointerEvent<HTMLButtonElement>) => useSlider(e)}>
      <span className='iFrameController__seeker--range' />
      <span className='iFrameController__seeker--slider' ref={sliderRef} style={{ width: '0px' }} />
    </button>
  );
};

export default IFrameControllerSeeker;
