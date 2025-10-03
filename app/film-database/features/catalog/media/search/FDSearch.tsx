import { useState, memo } from 'react';
import type { TmdbResponseFlat } from '~/film-database/composables/types/TmdbResponse';
import FDSearchHeader from '~/film-database/features/catalog/media/search/FDSearchHeader';
import FDSearchResults from '~/film-database/features/catalog/media/search/FDSearchResults';

const FDSearch = memo(({ orientation }: { orientation: 'desktop' | 'mobile' }) => {
  const [searchResults, setSearchResults] = useState<TmdbResponseFlat['search']['results'] | undefined>(undefined);

  return (
    <section
      className='fdSearchBar'
      data-orientation={orientation}>
      <FDSearchHeader setSearchResults={setSearchResults} />
      <FDSearchResults searchResults={searchResults} />
    </section>
  );
});

export default FDSearch;
