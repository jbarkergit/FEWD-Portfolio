import { MaterialSymbolsChevronLeft, MaterialSymbolsChevronRight } from '../../assets/google-material-symbols/carouselSymbols';
import { Namespace_Tmdb } from '../../composables/tmdb-api/hooks/useTmdbFetcher';

const FDMovieCast = ({ credits, details }: { details: Namespace_Tmdb.Details_Obj['details']; credits: Namespace_Tmdb.Credits_Obj['credits'] }) => {
  type CastMember = Namespace_Tmdb.Credits_Obj['credits']['cast'][number];
  type CrewMember = Namespace_Tmdb.Credits_Obj['credits']['crew'][number];

  return (
    <>
      {[
        { heading: 'Cast', data: credits.cast },
        { heading: 'Crew', data: credits.crew },
      ].map((objArr) => (
        <section className='fdMovie__aside__credits__cast'>
          <h2>{objArr.heading}</h2>
          <ul className='fdMovie__aside__credits__cast__ul'>
            {objArr.data.map((dataObj) => (
              <li className='fdMovie__aside__credits__cast__ul__individual'>
                <picture className='fdMovie__aside__credits__cast__ul__individual__icon'>
                  <img
                    src={
                      dataObj.profile_path
                        ? `https://image.tmdb.org/t/p/w185/${dataObj.profile_path}`
                        : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`
                    }
                    alt={`${details.title}`}
                    fetchPriority='high'
                  />
                </picture>
                <div className='fdMovie__aside__credits__cast__ul__individual__info'>
                  <span className='fdMovie__aside__credits__cast__ul__individual__info--name'>{dataObj.name}</span>
                  <span className='fdMovie__aside__credits__cast__ul__individual__info--character'>
                    {objArr.heading === 'Cast' ? (dataObj as CastMember).character : (dataObj as CrewMember).department}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <nav className='fdMovie__aside__credits__nav'>
        <button className='fdMovie__aside__credits__nav--btn' aria-label='View Previous' onClick={() => {}}>
          <MaterialSymbolsChevronLeft />
        </button>
        <button className='fdMovie__aside__credits__nav--btn' aria-label='View More' onClick={() => {}}>
          <MaterialSymbolsChevronRight />
        </button>
      </nav>
    </>
  );
};

export default FDMovieCast;
