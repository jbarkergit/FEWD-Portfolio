// Deps
import { useEffect, useId, useRef, useState } from 'react';
// Lib
import type { YouTubePlayer } from 'react-youtube';
// Assets
import { MaterialSymbolsSettings } from '../../../assets/google-material-symbols/GoogleMaterialIcons';

const IFrameControllerPlayback = ({
  player,
  qualityState,
}: {
  player: YouTubePlayer;
  qualityState:
    | {
        resolution: string;
        definition: string | undefined;
      }[]
    | undefined;
}) => {
  /** Modal */
  const menuRef = useRef<HTMLUListElement>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const setModal = (arg: string) => menuRef.current?.setAttribute('data-modal', arg);

  useEffect(() => {
    isModalOpen ? setModal('open') : setModal('closed');
  }, [isModalOpen]);

  /** Modal exterior clicks */
  const playbackCogRef = useRef<HTMLButtonElement>(null);

  const handleExteriorModalClick = (target: EventTarget | null) => {
    if (menuRef.current && !menuRef.current.contains(target as Node) && !playbackCogRef.current?.contains(target as Node)) {
      setIsModalOpen(false);
      unmountEventListeners();
    }
  };

  const mountEventListeners = () => window.addEventListener('pointerup', (event) => handleExteriorModalClick(event.target));
  const unmountEventListeners = () => window.removeEventListener('pointerup', (event) => handleExteriorModalClick(event.target));

  return (
    <div className='fdiFrame__controller__controls__playback'>
      <button
        className='iFrameController__controls__playback__cog'
        ref={playbackCogRef}
        aria-label='Change video playback quality'
        onClick={() => {
          setIsModalOpen((prevState) => (prevState === true ? false : true));
          mountEventListeners();
        }}>
        <MaterialSymbolsSettings />
      </button>
      <ul className='iFrameController__controls__playback__menu' ref={menuRef} data-modal='closed'>
        {qualityState?.map((rate, index) => (
          <li key={useId()}>
            <button
              aria-label={`Set video quality to ${rate.resolution}`}
              onClick={() => {
                player?.setPlaybackQuality(`${qualityState[index]}`);
                setIsModalOpen(false);
              }}>
              <span className='iFrameController__controls__playback__cog--rate'>{rate.resolution}</span>
              {rate.definition !== undefined ? <span className='iFrameController__controls__playback__cog--definition'>{rate.definition}</span> : null}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IFrameControllerPlayback;
