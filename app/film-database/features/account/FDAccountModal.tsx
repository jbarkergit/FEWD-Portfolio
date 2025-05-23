import { useRef, useCallback, type RefObject, useMemo } from 'react';
import { useLoaderData } from 'react-router';
import FDAccountSignIn from './fieldsets/FDAccountSignIn';
import FDAccountRegistry from './fieldsets/FDAccountRegistry';
import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import FDAccountModalPoster from './features/FDAccountModalPoster';

const FDAccountModal = () => {
  /** @loaderData */
  const { accountData, primaryData } = useLoaderData();
  const films = useMemo(() => (primaryData[0] as Namespace_Tmdb.Prefabs_Obj).now_playing.results, [primaryData]);

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

  type ToggleVisibilityParam = RefObject<HTMLFieldSetElement | null>;
  let previousRef: ToggleVisibilityParam;

  const toggleSectionVisibility = useCallback((ref: ToggleVisibilityParam) => {
    if (!ref.current) return;

    const attribute: string = 'data-visible';
    const getVisibility = (reference: ToggleVisibilityParam): string | null => (reference.current ? reference.current.getAttribute(attribute) : null);

    if (previousRef && previousRef.current) {
      previousRef.current.setAttribute(attribute, 'false');
    }

    const isVisible: boolean = getVisibility(ref) === 'true';
    ref.current.setAttribute(attribute, isVisible ? 'false' : 'true');
    previousRef = ref;
  }, []);

  /** @JSX */
  return (
    <main className='fdAccount' data-layout-carousel>
      <div className='fdAccount__container' ref={accountRef} data-visible='false'>
        <div className='fdAccount__container__wrapper'>
          <form className='fdAccount__container__wrapper__form'>
            {/* <FDAccountRegistry toggleSectionVisibility={toggleSectionVisibility} /> */}
            <FDAccountSignIn toggleSectionVisibility={toggleSectionVisibility} />
          </form>
        </div>
        <FDAccountModalPoster films={films} />
      </div>
    </main>
  );
};

export default FDAccountModal;
