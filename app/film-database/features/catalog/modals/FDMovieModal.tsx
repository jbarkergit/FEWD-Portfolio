import { useEffect, useRef, useState } from 'react';
import FDCarousel from '../../../components/carousel/FDCarousel';
import { useTmdbFetcher, type Namespace_Tmdb } from '../../../composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '../../../context/CatalogContext';
import FDiFrame from '../../../components/iframe/FDiFrame';
import { tmdbMovieGenres } from '../../../composables/tmdb-api/data/tmdbGenres';
import { usePaginateData } from '../../../hooks/usePaginateData';

const FDMovieModal = () => {
  const { heroData, isModalOpen, setIsModalOpen } = useCatalogProvider();
  const [castCrew, setCastCrew] = useState<ReturnType<typeof usePaginateData> | undefined>(undefined);
  const fdMovieModal = useRef<HTMLDivElement>(null);

  // Fetch
  const fetch = async (): Promise<void> => {
    if (!heroData) return;
    // Fetch data
    const data = (await useTmdbFetcher({ credits: (heroData as Namespace_Tmdb.BaseMedia_Provider).id })) as Namespace_Tmdb.Credits_Obj;
    const store = usePaginateData(data);
    // Set state
    setCastCrew(store);
  };

  useEffect(() => {
    if (heroData) fetch();
  }, [heroData]);

  const handleExteriorClicks = (event: PointerEvent) => {
    if (!fdMovieModal.current?.contains(event.target as Node)) setIsModalOpen(false);
  };

  useEffect(() => {
    const unmount = () => document.body.removeEventListener('pointerdown', handleExteriorClicks);

    if (isModalOpen) document.body.addEventListener('pointerdown', handleExteriorClicks);
    else unmount();

    return () => unmount();
  }, [isModalOpen]);

  if (!isModalOpen || !castCrew || !heroData) return null;
  else
    return (
      <div className='fdMovieModal'>
        <div className='fdMovieModal__container' ref={fdMovieModal}>
          <div className='fdMovieModal__container__player'>
            <FDiFrame />
          </div>
          <article className='fdMovieModal__container__info'>
            <div>
              <span>{heroData.release_date}</span>
              {heroData?.genre_ids.map((genreId) => {
                const genreName = Object.keys(tmdbMovieGenres).find((key) => tmdbMovieGenres[key as keyof typeof tmdbMovieGenres] === genreId);
                return genreName ? <span key={`genreId-${genreId}`}>{genreName.replaceAll('_', ' ')}</span> : null;
              })}
            </div>
            <header>
              <h2>{heroData?.title}</h2>
            </header>
            <p>{heroData?.overview}</p>
          </article>
          <div className='fdMovieModal__container__castCrew'>
            {castCrew.map(([key, value], index) => (
              <FDCarousel type={key === 'cast' ? 'cast' : 'crew'} mapIndex={index} heading={key} data={value} key={`${key}-${index}`} />
            ))}
          </div>
        </div>
      </div>
    );
};

export default FDMovieModal;
