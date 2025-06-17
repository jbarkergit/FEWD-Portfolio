import { useRef, useCallback, type RefObject, useMemo } from 'react';
import { useLoaderData } from 'react-router';
import FDAccountSignIn from './fieldsets/FDAccountSignIn';
import FDAccountRegistry from './fieldsets/FDAccountRegistry';
import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import FDAccountModalPoster from './features/FDAccountModalPoster';

const FDAccountModal = () => {
  /** @loaderData */
  const { primaryData } = useLoaderData();
  const films = useMemo(() => (primaryData[0] as Namespace_Tmdb.Prefabs_Obj).now_playing.results, [primaryData]);

  /** @reference */
  const registryRef = useRef<HTMLFieldSetElement>(null),
    signInRef = useRef<HTMLFieldSetElement>(null);

  /**
   * @function setTimeout
   * @description Sets timeout to delay modal visibility
   */
  const accountRef = useRef<HTMLDivElement>(null);
  setTimeout(() => accountRef.current?.setAttribute('data-visible', 'true'), 3200);

  /**
   * @function toggleModalVisibility
   * @description Toggles visibility of modal's components
   */
  const toggleSectionVisibility = useCallback(() => {
    if (!registryRef.current || !signInRef.current) return;

    const attribute: string = 'data-visible';

    for (const reference of [signInRef.current, registryRef.current]) {
      const current: string | null = reference.getAttribute(attribute);
      const value: boolean = current === 'true';
      reference.setAttribute(attribute, String(!value));
    }
  }, []);

  /** @JSX */
  return (
    <div className='fdAccount' data-layout-carousel>
      <div className='fdAccount__container' ref={accountRef} data-visible='false'>
        <main className='fdAccount__container__wrapper'>
          <form className='fdAccount__container__wrapper__form'>
            <FDAccountRegistry toggleSectionVisibility={toggleSectionVisibility} ref={registryRef} />
            <FDAccountSignIn toggleSectionVisibility={toggleSectionVisibility} ref={signInRef} />
          </form>
        </main>
        <FDAccountModalPoster films={films} />
      </div>
    </div>
  );
};

export default FDAccountModal;
