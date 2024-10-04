const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCountries = async () => {
  const response = await fetch(`${API_URL}/countries`);
  return response.json();
};

export const getCountryInfo = async (code: string) => {
  const response = await fetch(`${API_URL}/country/${code}`);
  return response.json();
};
