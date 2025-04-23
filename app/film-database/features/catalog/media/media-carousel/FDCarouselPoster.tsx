import { useEffect, useRef, useState } from 'react';
import { BxDotsVerticalRounded, IcOutlinePlayCircle, TablerCategoryPlus } from '~/film-database/assets/svg/icons';
import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import { addUserCollection } from '~/film-database/hooks/addUserCollection';

type Prop_Drill = {
  mapIndex: number;
  index: number;
  article: Namespace_Tmdb.BaseMedia_Provider;
};

const FDCarouselPoster = ({ mapIndex, index, article }: Prop_Drill) => {
  const { userCollections, setUserCollections, setHeroData, viewportChunkSize } = useCatalogProvider();

  const prop = article as Namespace_Tmdb.BaseMedia_Provider;
  const props: { src: string | null; alt: string; member?: string | undefined; knownFor?: string | undefined } = { src: prop.poster_path, alt: prop.title };

  const collectionsMenu = useRef<HTMLUListElement>(null);
  const cmAttribute: string = 'data-active';
  const [isCmOpen, setIsCmOpen] = useState<boolean>(false);

  /**
   * @function toggleCollectionMenu
   * @returns {void}
   * Toggles the collection menu on independent movie list items
   */
  const toggleCollectionMenu = (): void => {
    if (collectionsMenu.current) {
      const status: string | null = collectionsMenu.current.getAttribute(cmAttribute);
      setIsCmOpen(status === 'false' ? true : false);
    }
  };

  /**
   * @function handleExteriorClicks
   * @returns void
   * Sets modal state to false when the user isn't directly interacting with modal
   */
  const handleExteriorClicks = (event: PointerEvent): void => {
    if (collectionsMenu.current && !collectionsMenu.current?.contains(event.target as Node)) {
      setIsCmOpen(false);
    }
  };

  useEffect(() => {
    if (isCmOpen) document.addEventListener('pointerup', handleExteriorClicks);
    else document.removeEventListener('pointerup', handleExteriorClicks);
    return () => document.removeEventListener('pointerup', handleExteriorClicks);
  }, [isCmOpen]);

  /** @returns */
  return (
    <li className='fdCarousel__wrapper__ul__li' data-hidden={index < viewportChunkSize + 1 ? 'false' : 'true'}>
      <picture className='fdCarousel__wrapper__ul__li__picture'>
        <img
          className='fdCarousel__wrapper__ul__li__picture--img'
          src={`https://image.tmdb.org/t/p/w780/${props.src}`}
          alt={`${props.alt}`}
          fetchPriority={mapIndex === 0 ? 'high' : 'low'}
        />
      </picture>
      <div className='fdCarousel__wrapper__ul__li__overlay'>
        <button className='fdCarousel__wrapper__ul__li__overlay--collections' aria-label='Add movie to collections' onPointerUp={() => toggleCollectionMenu()}>
          <BxDotsVerticalRounded />
        </button>
        <button
          className='fdCarousel__wrapper__ul__li__overlay--play'
          aria-label='Play trailer'
          onClick={() => setHeroData(article as Namespace_Tmdb.BaseMedia_Provider)}>
          <IcOutlinePlayCircle />
        </button>
      </div>
      <ul className='fdCarousel__wrapper__ul__li__collections' ref={collectionsMenu} data-active={isCmOpen ? 'true' : 'false'}>
        {Object.entries(userCollections).map(([key, collection], i) => {
          const keyIndex = parseInt(key.split('-').pop() || '0', 10);

          return (
            <li key={`movie-dropdown-collections-${i}`}>
              <button
                aria-label={`Add movie to ${collection.header}`}
                onPointerUp={() =>
                  addUserCollection({
                    userCollections,
                    setUserCollections,
                    isEditMode: false,
                    payload: {
                      data: [prop],
                      colIndex: keyIndex,
                    },
                  })
                }>
                {collection.header}
              </button>
            </li>
          );
        })}
        {Object.entries(userCollections).length < 5 ? (
          <li className='fdCarousel__wrapper__ul__li__collections__mtnc'>
            <button
              aria-label='Add movie to a new collection'
              onPointerUp={() =>
                addUserCollection({
                  userCollections,
                  setUserCollections,
                  isEditMode: false,
                  payload: {
                    data: [prop],
                    colIndex: Object.keys(userCollections).length + 1,
                  },
                })
              }>
              <TablerCategoryPlus /> New Collection
            </button>
          </li>
        ) : null}
      </ul>
    </li>
  );
};

export default FDCarouselPoster;
