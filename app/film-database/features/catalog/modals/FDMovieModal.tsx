import { useEffect, useRef, useState } from 'react';
import FDCarousel from '../../../components/carousel/FDCarousel';
import { useTmdbFetcher, type Namespace_Tmdb } from '../../../composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '../../../context/CatalogContext';
import FDiFrame from '../../../components/iframe/FDiFrame';
import { usePaginateData } from '../../../hooks/usePaginateData';
import FDDetails from '../../../components/movie/FDDetails';

const FDMovieModal = () => {
  const { heroData, isMovieModal, setIsMovieModal } = useCatalogProvider();
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
    if (!fdMovieModal.current?.contains(event.target as Node)) setIsMovieModal(false);
  };

  useEffect(() => {
    const unmount = () => document.body.removeEventListener('pointerdown', handleExteriorClicks);
    if (isMovieModal && fdMovieModal.current) document.body.addEventListener('pointerdown', handleExteriorClicks);
    else unmount();
    return () => unmount();
  }, [isMovieModal]);

  if (isMovieModal && heroData && castCrew)
    return (
      <div className='fdMovieModal'>
        <div className='fdMovieModal__container' ref={fdMovieModal}>
          <FDiFrame />
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
