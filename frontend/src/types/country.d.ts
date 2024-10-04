export interface PopulationData {
  year: number;
  value: number;
}

export interface CountryInfo {
  commonName: string;
  flagUrl: string;
  borders: {
    commonName: string;
    countryCode: string;
  }[];
  population: PopulationData[];
}
