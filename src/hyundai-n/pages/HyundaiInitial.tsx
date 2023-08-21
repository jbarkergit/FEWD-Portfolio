import { useEffect, useRef, useState } from 'react';
import HyundaiPageStructure from './HyundaiPageStructure';

const HyundaiInitial = () => {
  const teaserVideo = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(true);

  //Set teaser video display style to 'none' once video duration has concluded
  useEffect(() => {
    if (teaserVideo.current) {
      teaserVideo.current.onended = () => {
        teaserVideo.current!.style.display = 'none';
        setVideoPlaying(false);
      };
    }
  }, []);

  return (
    <>
      {videoPlaying ? (
        <div className="initial">
          <video
            className="initial__teaserVideo"
            preload="metadata"
            playsInline
            autoPlay
            muted
            poster="src/hyundai-n/assets/production-videos/poster-gallery-12-n-vision74.jpg"
            aria-label="Hyundai-N N-Vision-74 Teaser Clip from Top Gear"
            ref={teaserVideo}
          >
            <source src="src/hyundai-n/assets/production-videos/Hyundai-N-N-Vision-74-Teaser-Clip-Splice-Original-From-Top-Gear.webm" type="video/webm" />
          </video>
        </div>
      ) : (
        <HyundaiPageStructure />
      )}
    </>
  );
};
export default HyundaiInitial;
