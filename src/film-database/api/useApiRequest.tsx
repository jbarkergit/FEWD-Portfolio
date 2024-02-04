export const useApiRequest = async (endPoint: string) => {
  try {
    const apiKey: string = '';
    const response: Response = await fetch(`${endPoint}`);

    if (!response.ok) {
      //refire
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    } else {
      return (await response.json()) as [] | {} | unknown;
    }
  } catch (error) {
    console.error('Request failure status', error);
    throw error;
  }
};
