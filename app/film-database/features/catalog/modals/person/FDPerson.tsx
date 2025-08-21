import { useEffect, useState } from 'react';
import { tmdbCall } from '~/film-database/composables/tmdbCall';
import type { TmdbResponseFlat } from '~/film-database/composables/types/TmdbResponse';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import PersonMovieCarousel from '~/film-database/features/catalog/modals/person/PersonMovieCarousel';

const FDPerson = () => {
  const { personRef } = useCatalogProvider();

  const [person, setPerson] = useState<{
    details: TmdbResponseFlat['personDetails'] | undefined;
    credits: TmdbResponseFlat['personCredits'] | undefined;
  }>({ details: undefined, credits: undefined });

  const { details, credits } = person;

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
        <section className='fdPerson__section'>
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
          <ul className='fdPerson__section__general'>
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
        </section>
        <section className='fdPerson__section'>
          <div className='fdPerson__section__bio'>
            <span>Biography</span>
            <span>{details.biography}</span>
          </div>
          <div className='fdPerson__section__carousels'>
            {[credits.cast, credits.crew].map((entry, index) => (
              <PersonMovieCarousel
                heading={index === 0 ? 'Movies' : 'Shows'}
                data={entry}
                key={`person-cast-crew-map-${index}`}
              />
            ))}
          </div>
        </section>
      </article>
    );
};

export default FDPerson;
