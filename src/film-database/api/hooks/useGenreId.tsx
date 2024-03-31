export const useGenreId = (type: string, genre: string): number | undefined => {
  const lowercaseType = type.toLowerCase();
  const lowercaseGenre = genre.toLowerCase();

  switch (lowercaseType) {
    case 'movie':
      switch (lowercaseGenre) {
        case 'action':
          return 28;
        case 'adventure':
          return 12;
        case 'animation':
          return 16;
        case 'comedy':
          return 35;
        case 'crime':
          return 80;
        case 'documentary':
          return 99;
        case 'drama':
          return 18;
        case 'family':
          return 10751;
        case 'fantasy':
          return 14;
        case 'history':
          return 36;
        case 'horror':
          return 27;
        case 'music':
          return 10402;
        case 'mystery':
          return 9648;
        case 'romance':
          return 10749;
        case 'science fiction':
          return 878;
        case 'tv movie':
          return 10770;
        case 'thriller':
          return 53;
        case 'war':
          return 10752;
        case 'western':
          return 37;
        default:
          return undefined;
      }
    case 'tv':
      switch (lowercaseGenre) {
        case 'action & adventure':
          return 10759;
        case 'animation':
          return 16;
        case 'comedy':
          return 35;
        case 'crime':
          return 80;
        case 'documentary':
          return 99;
        case 'drama':
          return 18;
        case 'family':
          return 10751;
        case 'kids':
          return 10762;
        case 'mystery':
          return 9648;
        case 'news':
          return 10763;
        case 'reality':
          return 10764;
        case 'sci-fi & fantasy':
          return 10765;
        case 'soap':
          return 10766;
        case 'talk':
          return 10767;
        case 'war & politics':
          return 10768;
        case 'western':
          return 37;
        default:
          return undefined;
      }
    default:
      return undefined;
  }
};
