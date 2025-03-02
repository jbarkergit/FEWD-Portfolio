import { useEffect, useRef, useState } from 'react';
import FDCarousel from '../../../components/carousel/FDCarousel';
import { useTmdbFetcher, type Namespace_Tmdb } from '../../../composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '../../../context/CatalogContext';
import FDiFrame from '../../../components/iframe/FDiFrame';
import { usePaginateData } from '../../../hooks/usePaginateData';
import FDDetails from '../../../components/movie/FDDetails';

const FDMovieModal = () => {
  const { heroData, isModalOpen, setIsModalOpen } = useCatalogProvider();
  const [castCrew, setCastCrew] = useState<ReturnType<typeof usePaginateData> | undefined>(undefined);
  const fdMovieModal = useRef<HTMLDivElement>(null);

  const fetch = async (): Promise<void> => {
    const castCrewResponse = (await useTmdbFetcher({ credits: (heroData as Namespace_Tmdb.BaseMedia_Provider).id })) as Namespace_Tmdb.Credits_Obj;
    const castCrew = usePaginateData(castCrewResponse);
    setCastCrew(castCrew);
  };

  useEffect(() => {
    fetch();
  }, [heroData]);

  const handleExteriorClicks = (event: PointerEvent) => {
    if (!fdMovieModal.current?.contains(event.target as Node)) setIsModalOpen(false);
  };

  useEffect(() => {
    const unmount = () => document.body.removeEventListener('pointerdown', handleExteriorClicks);
    if (isModalOpen && fdMovieModal.current) document.body.addEventListener('pointerdown', handleExteriorClicks);
    else unmount();
    return () => unmount();
  }, [isModalOpen]);

  if (isModalOpen && heroData && castCrew)
    return (
      <div className='fdMovieModal'>
        <div className='fdMovieModal__container' ref={fdMovieModal}>
          <section className='fdMovieModal__container__player'>
            <FDiFrame />
          </section>
          <FDDetails modal={true} />
          <section className='fdMovieModal__container__castCrew'>
            {castCrew.map(([key, value], index) => (
              <FDCarousel type={key === 'cast' ? 'cast' : 'crew'} mapIndex={index} heading={key} data={value} key={`${key}-${index}`} />
            ))}
          </section>
        </div>
      </div>
    );
};

export default FDMovieModal;
