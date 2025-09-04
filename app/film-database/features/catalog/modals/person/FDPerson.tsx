import { useEffect, useState } from 'react';
import { tmdbCall } from '~/film-database/composables/tmdbCall';
import type { TmdbResponseFlat } from '~/film-database/composables/types/TmdbResponse';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import GenericCarousel from '~/film-database/components/carousel/GenericCarousel';

const FDPerson = () => {
  const { personRef } = useCatalogProvider();

  const [person, setPerson] = useState<{
    details: TmdbResponseFlat['personDetails'] | undefined;
    credits: TmdbResponseFlat['personCredits'] | undefined;
  }>({ details: undefined, credits: undefined });

  const { details, credits } = person;

  const [castCreditsGrouped, setCastCreditsGrouped] = useState<
    {
      year: string;
      films: TmdbResponseFlat['personCredits']['cast'] | undefined;
    }[]
  >([]);

  useEffect(() => {
    if (!credits) return;

    type Cast = TmdbResponseFlat['personCredits']['cast'][number];

    // Flatten if nested
    const allCast: Cast[] = Array.isArray(credits.cast[0]) ? credits.cast.flat(1) : credits.cast;

    // Filter out TV and missing release dates
    const filteredCast = allCast.filter((film) => film.media_type !== 'tv' && film.release_date);

    // Group by year
    const grouped: Record<string, Cast[]> = {};

    for (const i of filteredCast) {
      const year = new Date(i.release_date!).getFullYear().toString();
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(i);
    }

    // Convert grouped to an to array of { year, films } sorted by year
    const castCreditsGroupedByYear = Object.keys(grouped)
      .sort((a, b) => Number(b) - Number(a))
      .map((year) => ({ year, films: grouped[year] }));

    setCastCreditsGrouped(castCreditsGroupedByYear);
  }, [credits]);

  const fetchPerson = async () => {
    if (personRef.current) {
      const details = await tmdbCall({ personDetails: personRef.current });
      const credits = await tmdbCall({ personCredits: personRef.current });
      setPerson({ details: details.response, credits: credits.response });
    }
  };

  useEffect(() => {
    fetchPerson();
  }, []);

  if (details && credits)
    return (
      <article className='fdPerson'>
        <div className='fdPerson__section'>
          <picture data-missing={details.profile_path ? 'false' : 'true'}>
            {details.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w780/${details.profile_path}`}
                alt={`${details.name}`}
                fetchPriority='high'
              />
            ) : (
              <img
                src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`}
                alt={`${details.name}`}
                fetchPriority='low'
              />
            )}
          </picture>
          <ul>
            <li>
              <h2>{details.name}</h2>
            </li>
            <li>
              <span>Known For</span>
              <span>{details.known_for_department}</span>
            </li>
            <li>
              <span>Known Credits</span>
              <span>{credits.cast.length + credits.crew.length}</span>
            </li>
            <li>
              <span>Gender</span>
              <span>{details.gender === 2 ? 'Male' : 'Female'}</span>
            </li>
            <li>
              <span>Birthday</span>
              <span>{details.birthday}</span>
            </li>
            {details.deathday && (
              <li>
                <span>Death Day</span>
                <span>{details.deathday}</span>
              </li>
            )}
            <li>
              <span>Place of Birth</span>
              <span>{details.place_of_birth}</span>
            </li>
            <li>
              <span>Also Known As</span>
              {details.also_known_as.map((name, index) => (
                <span>{`${name}${index !== details.also_known_as.length ? ', ' : null}`}</span>
              ))}
            </li>
          </ul>
        </div>

        <div className='fdPerson__section'>
          <div className='fdPerson__section__bio'>
            <span>Biography</span>
            <span>{details.biography}</span>
          </div>

          <div className='fdPerson__section__knownFor'>
            <GenericCarousel
              carouselIndex={1}
              carouselName={'media'}
              heading={'Movies'}
              data={credits.cast}
            />
          </div>

          <table className='fdPerson__table'>
            <tbody className='fdPerson__table__tbody'>
              {castCreditsGrouped.map((group, index) => (
                <tr
                  className='fdPerson__table__tbody__tr'
                  key={`person-casted-group-${index}`}>
                  <td className='fdPerson__table__tbody__tr__td'>
                    <table className='fdPerson__table__tbody__tr__td__table'>
                      <tbody className='fdPerson__table__tbody__tr__td__table__tbody'>
                        {group.films?.map((film) => (
                          <tr key={`person-casted-group-${index}-movieId-${film.id}`}>
                            <td>{group.year}</td>
                            <td>{film.title}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    );
};

export default FDPerson;
