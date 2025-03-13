import type { JSX } from 'react';
import { EmptyStar, FullStar, HalfStar } from '../assets/google-material-symbols/GoogleMaterialIcons';
import { useCatalogProvider } from '../context/CatalogContext';

/**
 * @function useVoteAvgVisual
 * @returns Vote average in svg star visual reference
 */
const useVoteAvgVisual = (): JSX.Element[] | undefined => {
  const { heroData } = useCatalogProvider();
  if (!heroData) return undefined;

  // 0-10 vote scale (contains floating point value)
  const voteAverage: number = heroData.vote_average;

  // Vote average floored and converted to 0-5 vote scale
  const flooredVoteAverage: number = Math.floor(voteAverage / 2);

  // Helpers
  const hasFloatingValue: boolean = voteAverage % 2 >= 1;
  const maxStars: number = 5;

  const fullStars: number = flooredVoteAverage;
  const halfStars: 1 | 0 = hasFloatingValue ? 1 : 0;
  const emptyStars: number = maxStars - fullStars - halfStars;

  return [...Array(fullStars).fill(<FullStar />), ...Array(halfStars).fill(<HalfStar />), ...Array(emptyStars).fill(<EmptyStar />)].map((Star, index) => {
    return <span key={`vote-average-star-${index}`}>{Star}</span>;
  });
};

export default useVoteAvgVisual;
