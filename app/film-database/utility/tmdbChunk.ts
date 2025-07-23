export const tmdbChunk = <T>(data: T[], chunkSize: number): T[][] => {
  const chunked: T[][] = [];

  for (let i = 0; i < data.length; i += chunkSize + 1) {
    chunked.push(data.slice(i, i + chunkSize + 1));
  }

  return chunked;
};
