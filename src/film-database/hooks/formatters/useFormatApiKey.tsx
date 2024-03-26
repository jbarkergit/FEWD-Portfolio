export const useFormatApiKey = (string: string): string => {
  return string.split(/(?=[A-Z])/).join(' ');
};
