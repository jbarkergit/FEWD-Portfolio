import { useEffect, useRef, useState } from 'react';
import FDCarousel from '../../../components/carousel/FDCarousel';
import { useTmdbFetcher, Namespace_Tmdb } from '../../../composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '../../../context/CatalogContext';
import { usePaginateData } from '../../../hooks/usePaginateData';
import FDiFrame from '../../../components/iframe/FDiFrame';
import { tmdbMovieGenres, Type_MovieGenre_Keys } from '../../../composables/tmdb-api/data/tmdbGenres';

const FDMovieModal = () => {
  const { heroData, isModalOpen, setIsModalOpen } = useCatalogProvider();
  const [castCrew, setCastCrew] = useState<ReturnType<typeof usePaginateData> | undefined>(undefined);
  const fdMovieModal = useRef<HTMLDivElement>(null);

  const fetch = async (): Promise<void> => {
    const data = (await useTmdbFetcher({ credits: (heroData as Namespace_Tmdb.BaseMedia_Provider).id })) as Namespace_Tmdb.Credits_Obj;
    const paginatedData = usePaginateData(data);
    setCastCrew(paginatedData);
  };

  useEffect(() => {
    fetch();
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

  if (isModalOpen && castCrew)
    return (
      <div className='fdMovieModal'>
        <div className='fdMovieModal__container' ref={fdMovieModal}>
          <div className='fdMovieModal__container__player'>
            <FDiFrame />
          </div>
          <article className='fdMovieModal__container__info'>
            <div>
              {heroData?.release_date}
              {heroData?.genre_ids.map((genreId) => <span>{Object.keys(tmdbMovieGenres)[genreId]}</span>)}
            </div>
            <header>
              <h2>{heroData?.title}</h2>
            </header>
            <p>{heroData?.overview}</p>
          </article>
          <div className='fdMovieModal__container__castCrew'>
            {castCrew.map(([key, value], index) => {
              return <FDCarousel type={key === 'cast' ? 'cast' : 'crew'} mapIndex={index} heading={key} data={value} key={`${key}-${index}`} />;
            })}
          </div>
        </div>
      </div>
    );
};

export default FDMovieModal;
