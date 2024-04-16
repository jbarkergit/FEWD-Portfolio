import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { movieGenres } from '../../../api/hooks/useDiscoverGenre';

const FDGenreNavigation = () => {
  const searchBar = useRef<HTMLElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [genre, setGenre] = useState<string>('Browse by Genre');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  /** Exterior click handler */
  const exteriorClickHandler = (event: PointerEvent): void => {
    switch (true) {
      case !searchBar.current?.contains((event.target as HTMLElement) || (event.target as HTMLButtonElement)):
        setIsMenuOpen(false);
        break;

      default:
        null;
        break;
    }
  };

  useEffect(() => {
    searchBar.current?.addEventListener('pointerup', exteriorClickHandler);
    document.body.addEventListener('pointerup', exteriorClickHandler);

    return () => {
      searchBar.current?.removeEventListener('pointerup', exteriorClickHandler);
      document.body.removeEventListener('pointerup', exteriorClickHandler);
    };
  }, []);

  return (
    <section className='fdNavigation' ref={searchBar}>
      <fieldset className='fdNavigation__fieldset'>
        <legend>Navigate by Genre</legend>

        <input
          className='fdNavigation__fieldset__input'
          id='fdNavigation__fieldset__input'
          ref={input}
          data-focus={searchTerm.length > 0 ? true : false}
          type='text'
          placeholder=''
          value={searchTerm.replace('-', ' ')}
          autoCapitalize='none'
          autoComplete='none'
          autoCorrect='off'
          spellCheck='false'
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e?.target.value.replace(' ', '-'))}
          onFocus={() => setIsMenuOpen(true)}
          data-status='disabled'
        />

        <label className='fdNavigation__fieldset__label' htmlFor='fdNavigation__fieldset__input' data-status={searchTerm.length === 0 ? 'active' : 'disabled'}>
          {searchTerm.length > 0 ? searchTerm : genre}
        </label>

        <button className='fdNavigation__fieldset__icon' onClick={() => setIsMenuOpen(true)}>
          <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
            <path
              fill='#888888'
              d='M2.753 18h18.5a.75.75 0 0 1 .101 1.493l-.101.007h-18.5a.75.75 0 0 1-.102-1.494zh18.5zm0-6.497h18.5a.75.75 0 0 1 .101 1.493l-.101.007h-18.5a.75.75 0 0 1-.102-1.494zh18.5zm-.001-6.5h18.5a.75.75 0 0 1 .102 1.493l-.102.007h-18.5A.75.75 0 0 1 2.65 5.01zh18.5z'></path>
          </svg>
        </button>
      </fieldset>

      <ul className='fdNavigation__results' data-status={isMenuOpen ? 'active' : 'disabled'}>
        {Object.entries(movieGenres).map(([key]) => {
          return (
            <li id='navigate-to-genre' key={key}>
              <button
                onClick={() => {
                  setGenre(key);
                  setIsMenuOpen(false);
                }}
                aria-label={key}>
                {key.replace('_', ' ')}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default FDGenreNavigation;
