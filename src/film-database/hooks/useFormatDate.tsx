export const useFormatDate = (date: string): string => {
  const currentDate: Date = new Date();
  const newDate: Date = new Date(date);
  if (newDate > currentDate) return `Coming ${`${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear().toString().slice(2)}`}`;
  else return 'Now Available on...';
};
