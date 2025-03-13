import type { JSX } from 'react';
import { EmptyStar, FullStar, HalfStar } from '../assets/google-material-symbols/GoogleMaterialIcons';

/**
 * @function useVoteAvgVisual
 * @returns Vote average in svg star visual reference
 */
const useVoteAvgVisual = (voteAvg: number): JSX.Element | undefined => {
  // 0-10 vote scale (contains floating point value) floored and converted to 0-5 vote scale
  const flooredVoteAverage: number = Math.floor(voteAvg / 2);

  // Helpers
  const hasFloatingValue: boolean = voteAvg % 2 >= 1;
  const maxStars: number = 5;

  const fullStars: number = flooredVoteAverage;
  const halfStars: 1 | 0 = hasFloatingValue ? 1 : 0;
  const emptyStars: number = maxStars - fullStars - halfStars;

  const stars: JSX.Element[] = [...Array(fullStars).fill(<FullStar />), ...Array(halfStars).fill(<HalfStar />), ...Array(emptyStars).fill(<EmptyStar />)];

  return (
    <ul className='voteAvgVisual' aria-label={`Vote Average ${voteAvg / 2} out of 5`}>
      {stars.map((Star, index) => (
        <li className='voteAvgVisual__star' key={`star-${index}`}>
          {Star}
        </li>
      ))}
    </ul>
  );
};

export default useVoteAvgVisual;
