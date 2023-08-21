import { useRef, useState, useEffect } from 'react';
import HyundaiHeader from '../components/header/HyundaiHeader';
import HyundaiHero from '../components/hero-section/HyundaiHero';

const HyundaiPageStructure = () => {
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
      <div className="initial">
        <video
          className="initial__teaserVideo"
          preload="metadata"
          playsInline
          autoPlay
          loop
          muted
          poster="src/hyundai-n/assets/production-images/loader/poster-gallery-12-n-vision74.jpg"
          aria-label="Hyundai-N N-Vision-74 Teaser Clip from Top Gear"
          ref={teaserVideo}
        >
          <source src="src/hyundai-n/assets/production-videos/loader/Hyundai-N-N-Vision-74-Teaser-Clip-Splice-Original-From-Top-Gear.webm" type="video/webm" />
        </video>
      </div>
      <div className="hyundai">
        <HyundaiHeader />
        <HyundaiHero />
      </div>
    </>
  );
};

export default HyundaiPageStructure;
