import { useEffect, useRef, useState } from 'react';
import { YouTubePlayer } from 'react-youtube';
import { v4 as uuidv4 } from 'uuid';
import { MaterialSymbolsSettings } from '../../assets/google-material-symbols/iFrameSymbols';

const IFrameControllerPlayback = ({ player }: { player: YouTubePlayer | undefined }) => {
  /** Resolutions */
  const [playerRates, setPlayerRates] = useState<readonly string[]>([]);
  const [playbackRates, setPlaybackRates] = useState<JSX.Element[]>([]);

  const handlePlaybackRates = async () => {
    if (!player) return;

    const pbr: readonly string[] = await player.getAvailableQualityLevels();
    if (!pbr) return;

    setPlayerRates(pbr);

    const rates: JSX.Element[] = pbr.map((rate) => {
      const getRate = () => {
        switch (rate) {
          case 'tiny':
            return { resolution: '144p', definition: undefined };

          case 'small':
            return { resolution: '240p', definition: undefined };

          case 'medium':
            return { resolution: '360p', definition: undefined };

          case 'large':
            return { resolution: '480p', definition: undefined };

          case 'hd720':
            return { resolution: '720p', definition: 'HD' };

          case 'hd1080':
            return { resolution: '1080p', definition: 'FHD' };

          case 'hd1440':
            return { resolution: '1440p', definition: 'QHD' };

          case 'hd2160':
            return { resolution: '2160p', definition: 'UHD' };

          default:
            return { resolution: rate, definition: undefined };
        }
      };

      return (
        <>
          <span className='iFrameController__controls__playback__cog--rate'>{getRate().resolution}</span>
          <span className='iFrameController__controls__playback__cog--definition'>{getRate().definition}</span>
        </>
      );
    });

    setPlaybackRates(rates);
  };

  useEffect(() => {
    handlePlaybackRates();
  }, [player]);

  /** Modal */
  const menuRef = useRef<HTMLUListElement>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const setModal = (arg: string) => menuRef.current?.setAttribute('data-modal', arg);
    isModalOpen ? setModal('open') : setModal('closed');
  }, [isModalOpen]);

  /** Modal exterior clicks */
  const handleExteriorModalClick = (target: EventTarget | null) => {
    if (menuRef.current && !menuRef.current.contains(target as Node)) {
      setIsModalOpen(false);
    }
  };

  const mountEventListeners = () => {
    window.addEventListener('pointerup', (event) => handleExteriorModalClick(event.target));
  };

  useEffect(() => {
    return () => window.removeEventListener('pointerup', (event) => handleExteriorModalClick(event.target));
  }, []);

  return (
    <div className='iFrameController__controls__playback'>
      <button
        className='iFrameController__controls__playback__cog'
        onClick={() => {
          setIsModalOpen((prevState) => (prevState === true ? false : true));
          mountEventListeners();
        }}>
        <MaterialSymbolsSettings />
      </button>
      <ul className='iFrameController__controls__playback__menu' ref={menuRef} data-modal='closed'>
        {playbackRates?.map((rate, index) => (
          <li key={uuidv4()}>
            <button
              aria-label={`Set video quality to ${rate}`}
              onClick={() => {
                player?.setPlaybackQuality(`${playerRates[index]}`);
                setIsModalOpen(false);
              }}>
              {rate}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IFrameControllerPlayback;
