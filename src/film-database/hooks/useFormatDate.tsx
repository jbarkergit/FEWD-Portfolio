export const useFormatDate = (date: string): string => {
  // Today's date
  const currentDate: Date = new Date();
  // Parameter date conversion
  const releaseDate: Date = new Date(date);

  // Check if releaseDate is future or past
  if (releaseDate > currentDate) return `Coming ${`${releaseDate.getMonth() + 1}/${releaseDate.getDate()}/${releaseDate.getFullYear().toString().slice(2)}`}`;
  else return 'Now Available on...';
};
