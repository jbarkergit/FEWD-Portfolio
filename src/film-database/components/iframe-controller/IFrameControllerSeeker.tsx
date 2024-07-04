import { useEffect, useRef, useState } from 'react';
import { YouTubePlayer } from 'react-youtube';

const IFrameControllerSeeker = ({ player }: { player: YouTubePlayer }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragPos, setDragPos] = useState<number>(0);
  useEffect(() => setDragPos(0), [player]);
  const [time, setTime] = useState<number>(0);

  const seekerRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<HTMLSpanElement>(null);

  const useSeeker = async (travelDistance: number): Promise<void> => {
    if (!seekerRef.current || !sliderRef.current) return;

    const duration = await player.getDuration();

    if (time !== null && duration !== null) {
      const sliderWidth: number = seekerRef.current.clientWidth;
      const ratio: number = travelDistance / sliderWidth;
      const seekTime: number = ratio * duration;
      const clampedSeekTime: number = Math.max(0, Math.min(seekTime, duration));

      player.seekTo(clampedSeekTime, true);
    }
  };

  const useSlider = (e: React.PointerEvent<HTMLButtonElement>): void => {
    if (player && seekerRef.current && sliderRef.current && isDragging) {
      const seekerRect: DOMRect = seekerRef.current.getBoundingClientRect();
      const xOffset: number = e.clientX - seekerRect.left;
      setDragPos(xOffset);
      useSeeker(xOffset);
    }
  };

  const watchTime = async (): Promise<void> => {
    const currentTime: number = await player.getCurrentTime();
    setTime(currentTime);
  };

  useEffect(() => {
    const intervalId = setInterval(() => watchTime(), 1000);
    return () => clearInterval(intervalId);
  }, [player]);

  const autoSlide = async () => {
    if (seekerRef.current && !isDragging) {
      const sliderWidth: number = seekerRef.current.clientWidth;
      const offset: number = (time / (await player.getDuration())) * sliderWidth;
      setDragPos(offset);
    }
  };

  useEffect(() => {
    autoSlide();
  }, [player, time]);

  return (
    <button
      className='iFrameController__seeker'
      aria-label='Video time seeker'
      ref={seekerRef}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={(e: React.PointerEvent<HTMLButtonElement>) => {
        setIsDragging(false);
        useSlider(e);
      }}
      onPointerLeave={() => setIsDragging(false)}
      onPointerMove={(e: React.PointerEvent<HTMLButtonElement>) => useSlider(e)}>
      <span className='iFrameController__seeker--range' />
      <span className='iFrameController__seeker--slider' ref={sliderRef} style={{ width: `${dragPos}px` }} />
    </button>
  );
};

export default IFrameControllerSeeker;
