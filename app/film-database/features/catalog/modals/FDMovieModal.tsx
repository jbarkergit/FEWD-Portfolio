import { useEffect, useRef, useState } from 'react';
import FDCarousel from '../../../components/carousel/FDCarousel';
import { useTmdbFetcher, type Namespace_Tmdb } from '../../../composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '../../../context/CatalogContext';
import FDiFrame from '../../../components/iframe/FDiFrame';
import { tmdbMovieGenres } from '../../../composables/tmdb-api/data/tmdbGenres';
import { usePaginateData } from '../../../hooks/usePaginateData';

type ModalData = {
  castCrew: ReturnType<typeof usePaginateData> | undefined;
  watchProviders: Namespace_Tmdb.WatchProviders_Obj | undefined;
};

const FDMovieModal = () => {
  const { heroData, isModalOpen, setIsModalOpen } = useCatalogProvider();
  const [modalData, setModalData] = useState<ModalData>({
    castCrew: undefined,
    watchProviders: undefined,
  });
  const fdMovieModal = useRef<HTMLDivElement>(null);

  // Fetch
  const fetch = async (): Promise<void> => {
    if (!heroData) return;
    // Fetch data
    const castCrewResponse = (await useTmdbFetcher({ credits: (heroData as Namespace_Tmdb.BaseMedia_Provider).id })) as Namespace_Tmdb.Credits_Obj;
    const castCrew = usePaginateData(castCrewResponse);
    const watchProviders = (await useTmdbFetcher({ watchProviders: heroData.id })) as Namespace_Tmdb.WatchProviders_Obj;
    // Set state
    setModalData({ castCrew: castCrew, watchProviders: watchProviders });
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

  if (!isModalOpen || !heroData || !modalData.castCrew || !modalData.watchProviders) return;

  return (
    <div className='fdMovieModal'>
      <div className='fdMovieModal__container' ref={fdMovieModal}>
        <div className='fdMovieModal__container__player'>
          <FDiFrame />
        </div>
        <article className='fdMovieModal__article'>
          <div className='fdMovieModal__article__container'>
            <div className='fdMovieModal__article__container__wrapper'>
              <span>Release Date: {new Date(heroData.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <ul className='fdMovieModal__article__container__wrapper'>
              Genres:
              {heroData?.genre_ids.map((genreId) => {
                const genreName = Object.keys(tmdbMovieGenres).find((key) => tmdbMovieGenres[key as keyof typeof tmdbMovieGenres] === genreId);
                return genreName ? <li key={`genreId-${genreId}`}>{genreName.replaceAll('_', ' ')}</li> : null;
              })}
            </ul>
          </div>
          <header>
            <h2>{heroData?.title}</h2>
          </header>
          <p>{heroData?.overview}</p>
        </article>
        <div className='fdMovieModal__container__castCrew'>
          {modalData.castCrew.map(([key, value], index) => (
            <FDCarousel type={key === 'cast' ? 'cast' : 'crew'} mapIndex={index} heading={key} data={value} key={`${key}-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FDMovieModal;
