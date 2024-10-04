"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCountries } from "../services/api";

interface Country {
  name: string;
  countryCode: string;
}

export default function CountryList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        setError("Error to get countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">List of countries</h1>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {countries.map((country) => (
          <li
            key={country.countryCode}
            className="p-4 rounded-xl bg-green-100 shadow-md"
          >
            <Link
              href={`/country/${country.countryCode}`}
              className="text-lg font-semibold"
            >
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
