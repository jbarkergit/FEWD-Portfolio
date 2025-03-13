import type { JSX } from 'react';

/**
 * @function useFormattedDate
 * @returns Movie release date OR 'Now Available'
 * Compares current date to movie release date to determine if the film has been released
 */
const useFormattedDate = (release: string): JSX.Element => {
  // Handle dates
  const currentDate: string = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const releaseDate: string = release.replaceAll('-', '');

  // Convert releaseDate to Date object
  const releaseDateObj = new Date(`${releaseDate.slice(0, 4)}-${releaseDate.slice(4, 6)}-${releaseDate.slice(6, 8)}`);

  // Return JSX.Element indicating release status
  if (releaseDate > currentDate) {
    return (
      <li>{`Available ${releaseDateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}`}</li>
    );
  }

  return <li data-status='green'>{'Now Available'}</li>;
};

export default useFormattedDate;
