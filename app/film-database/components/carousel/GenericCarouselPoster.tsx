import { useRef, useState, useEffect, type ReactNode } from 'react';
import { BxDotsVerticalRounded, IcOutlinePlayCircle, TablerCategoryPlus } from '~/film-database/assets/svg/icons';
import type { GenericCarouselMap } from '~/film-database/components/carousel/GenericCarousel';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import { addUserCollection } from '~/film-database/hooks/addUserCollection';

function GenericCarouselPoster<K extends keyof GenericCarouselMap>({
  carouselName,
  carouselIndex,
  posterIndex,
  entry,
}: {
  carouselName: K;
  carouselIndex: number;
  posterIndex: number;
  entry: GenericCarouselMap[K][number];
}) {
  const { userCollections, setUserCollections, setHeroData, viewportChunkSize, modalChunkSize, setIsModal } =
    useCatalogProvider();
  const collectionsMenu = useRef<HTMLUListElement>(null);
  const collectionAttribute: string = 'data-active';
  const [isCollectionDropdown, setIsCollectionDropdown] = useState<boolean>(false);

  /**
   * @function toggleCollectionMenu
   * @returns {void}
   * @description Toggles the collection menu on independent movie list items
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
   * @description Sets modal state to false when the user isn't directly interacting with modal
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

  /** @Parent */
  const Parent = ({ children }: { children: ReactNode }) => (
    <li
      className='genericCarousel__wrapper__ul__li'
      data-hidden={posterIndex < viewportChunkSize + 1 ? 'false' : 'true'}>
      {children}
    </li>
  );

  /** @JSX */
  if (carouselName === 'media') {
    const mediaEntry = entry as GenericCarouselMap['media'][number];
    return (
      <Parent>
        <picture className='genericCarousel__wrapper__ul__li__picture'>
          <img
            className='genericCarousel__wrapper__ul__li__picture--img'
            src={`https://image.tmdb.org/t/p/w780/${mediaEntry.poster_path}`}
            alt={`${mediaEntry.title}`}
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
            onClick={() => setHeroData(mediaEntry)}>
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
                        data: [mediaEntry],
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
                      data: [mediaEntry],
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
      </Parent>
    );
  } else if (carouselName === 'cinemaInformation') {
    const cinemaEntry = entry as GenericCarouselMap['cinemaInformation'][number];
    return (
      <Parent>
        <button
          aria-label={`Read more about ${cinemaEntry.name}`}
          onPointerUp={() => setIsModal('person')}>
          <picture
            className='fdCineInfoCarousel__wrapper__ul__li__picture'
            data-missing={cinemaEntry.profile_path ? 'false' : 'true'}>
            {cinemaEntry.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w780/${cinemaEntry.profile_path}`}
                alt={`${cinemaEntry.name}`}
                fetchPriority={carouselIndex <= modalChunkSize ? 'high' : 'low'}
              />
            ) : (
              <img
                src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`}
                alt={`${cinemaEntry.name}`}
                fetchPriority='low'
              />
            )}
          </picture>
          <div className='fdCineInfoCarousel__wrapper__ul__li__member'>
            <span>{cinemaEntry.name}</span>
            {/* @ts-ignore */}
            <span>{cinemaEntry.character}</span>
            <span>{cinemaEntry.known_for_department !== 'Acting' ? cinemaEntry.known_for_department : null}</span>
          </div>
        </button>
      </Parent>
    );
  } else if (carouselName === 'person') {
    const personEntry = entry as GenericCarouselMap['cinemaInformation'][number];
    return (
      <Parent>
        <picture className='genericCarousel__wrapper__ul__li__picture'>
          <img
            className='genericCarousel__wrapper__ul__li__picture--img'
            src={`https://image.tmdb.org/t/p/w780/${personEntry.name}`}
            alt={`${personEntry.name}`}
            fetchPriority={carouselIndex === 0 ? 'high' : 'low'}
          />
        </picture>
      </Parent>
    );
  } else {
    console.error('Invalid carouselName');
    return null;
  }
}

export default GenericCarouselPoster;
