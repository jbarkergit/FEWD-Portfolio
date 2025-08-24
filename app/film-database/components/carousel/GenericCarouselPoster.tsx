import { useRef, useState, useEffect } from 'react';
import { BxDotsVerticalRounded, IcOutlinePlayCircle, TablerCategoryPlus } from '~/film-database/assets/svg/icons';
import type { GenericCarouselMap } from '~/film-database/components/carousel/GenericCarousel';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import { addUserCollection } from '~/film-database/hooks/addUserCollection';

type Props = {
  [K in keyof GenericCarouselMap]: {
    carouselName: K;
    carouselIndex: number;
    posterIndex: number;
    entry: GenericCarouselMap[K][number];
  };
}[keyof GenericCarouselMap];

function GenericCarouselPoster({ carouselName, carouselIndex, posterIndex, entry }: Props) {
  const { userCollections, setUserCollections, setHeroData, viewportChunkSize, modalChunkSize, setIsModal } =
    useCatalogProvider();
  const collectionsMenu = useRef<HTMLUListElement>(null);
  const collectionAttribute: string = 'data-active';
  const [isCollectionDropdown, setIsCollectionDropdown] = useState<boolean>(false);

  /**
   * @function toggleCollectionMenu
   * @returns {void}
   * Toggles the collection menu on independent movie list items
   */
  const toggleCollectionMenu = (): void => {
    if (collectionsMenu.current) {
      const status: string | null = collectionsMenu.current.getAttribute(collectionAttribute);
      setIsCollectionDropdown(status === 'false' ? true : false);
    }
  };

  /**
   * @function handleExteriorClicks
   * @returns void
   * Sets modal state to false when the user isn't directly interacting with modal
   */
  const handleExteriorClicks = (event: PointerEvent): void => {
    if (collectionsMenu.current && !collectionsMenu.current?.contains(event.target as Node)) {
      setIsCollectionDropdown(false);
    }
  };

  useEffect(() => {
    if (isCollectionDropdown) document.addEventListener('pointerup', handleExteriorClicks);
    else document.removeEventListener('pointerup', handleExteriorClicks);
    return () => document.removeEventListener('pointerup', handleExteriorClicks);
  }, [isCollectionDropdown]);

  return (
    <li
      className='genericCarousel__wrapper__ul__li'
      data-hidden={posterIndex < viewportChunkSize + 1 ? 'false' : 'true'}>
      {carouselName === 'media' && (
        <>
          <picture className='genericCarousel__wrapper__ul__li__picture'>
            <img
              className='genericCarousel__wrapper__ul__li__picture--img'
              src={`https://image.tmdb.org/t/p/w780/${entry.poster_path}`}
              alt={`${entry.title}`}
              fetchPriority={carouselIndex === 0 ? 'high' : 'low'}
            />
          </picture>
          <div className='genericCarousel__wrapper__ul__li__overlay'>
            <button
              className='genericCarousel__wrapper__ul__li__overlay--collections'
              aria-label='Add movie to collections'
              onPointerUp={() => toggleCollectionMenu()}>
              <BxDotsVerticalRounded />
            </button>
            <button
              className='genericCarousel__wrapper__ul__li__overlay--play'
              aria-label='Play trailer'
              onClick={() => setHeroData(entry)}>
              <IcOutlinePlayCircle />
            </button>
          </div>
          <ul
            className='genericCarousel__wrapper__ul__li__collections'
            ref={collectionsMenu}
            data-active={isCollectionDropdown ? 'true' : 'false'}>
            {Object.entries(userCollections).map(([key, collection], i) => {
              const keyIndex = parseInt(key.split('-').pop() || '0', 10);
              return (
                <li key={`${carouselName}-carousel-${carouselIndex}-poster-${posterIndex}-collection-dropdown-${i}`}>
                  <button
                    aria-label={`Add movie to ${collection.header}`}
                    onPointerUp={() => {
                      addUserCollection({
                        userCollections,
                        setUserCollections,
                        isEditMode: false,
                        payload: {
                          data: [entry],
                          colIndex: keyIndex,
                        },
                      });
                      setIsCollectionDropdown(false);
                    }}>
                    {collection.header}
                  </button>
                </li>
              );
            })}
            {Object.entries(userCollections).length < 5 ? (
              <li className='genericCarousel__wrapper__ul__li__collections__mtnc'>
                <button
                  aria-label='Add movie to a new collection'
                  onPointerUp={() => {
                    addUserCollection({
                      userCollections,
                      setUserCollections,
                      isEditMode: false,
                      payload: {
                        data: [entry],
                        colIndex: Object.keys(userCollections).length + 1,
                      },
                    });
                    setIsCollectionDropdown(false);
                  }}>
                  <TablerCategoryPlus /> New Collection
                </button>
              </li>
            ) : null}
          </ul>
        </>
      )}
      {carouselName === 'cinemaInformation' && (
        <button
          aria-label={`Read more about ${entry.name}`}
          onPointerUp={() => setIsModal('person')}>
          <picture
            className='fdCineInfoCarousel__wrapper__ul__li__picture'
            data-missing={entry.profile_path ? 'false' : 'true'}>
            {entry.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w780/${entry.profile_path}`}
                alt={`${entry.name}`}
                fetchPriority={carouselIndex <= modalChunkSize ? 'high' : 'low'}
              />
            ) : (
              <img
                src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`}
                alt={`${entry.name}`}
                fetchPriority='low'
              />
            )}
          </picture>
          <div className='fdCineInfoCarousel__wrapper__ul__li__member'>
            <span>{entry.name}</span>
            {/* @ts-ignore */}
            <span>{entry.character}</span>
            <span>{entry.known_for_department !== 'Acting' ? entry.known_for_department : null}</span>
          </div>
        </button>
      )}
      {carouselName === 'person' && (
        <picture className='genericCarousel__wrapper__ul__li__picture'>
          <img
            className='genericCarousel__wrapper__ul__li__picture--img'
            src={`https://image.tmdb.org/t/p/w780/${entry.name}`}
            alt={`${entry.name}`}
            fetchPriority={carouselIndex === 0 ? 'high' : 'low'}
          />
        </picture>
      )}
    </li>
  );
}

export default GenericCarouselPoster;
