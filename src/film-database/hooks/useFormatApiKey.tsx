export const useFormatApiKey = (string: string) => {
  return string.split(/(?=[A-Z])/).join(' ');
};
