"use client";
import { useEffect, useState } from "react";
import { getCountryInfo } from "../services/api";
import { CountryInfo } from "../types/country";
import { Line } from "react-chartjs-2";
import Image from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CountryInfoProps {
  countryCode: string;
}

export default function CountryInfo({ countryCode }: CountryInfoProps) {
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const data = await getCountryInfo(countryCode);
        setCountryInfo(data);
      } catch (err) {
        setError("Error to get country info");
      } finally {
        setLoading(false);
      }
    };

    fetchCountryInfo();
  }, [countryCode]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!countryInfo) return null;

  const populationYears = countryInfo.population.map((pop) => pop.year);
  const populationValues = countryInfo.population.map((pop) => pop.value);

  const populationData = {
    labels: populationYears,
    datasets: [
      {
        label: "Population",
        data: populationValues,
        fill: false,
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(0,0,0,1)",
      },
    ],
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <Image
          src={countryInfo.flagUrl}
          alt={`${countryInfo.commonName} flag`}
          width={128}
          height={80}
          className="mr-4"
        />
        <h1 className="text-3xl font-bold">{countryInfo.commonName}</h1>
      </div>

      <h2 className="text-lg font-semibold">Border Countries:</h2>
      <ul className="list-disc list-inside">
        {countryInfo.borders.map((border) => (
          <li key={border.countryCode} className="mt-2">
            <a
              href={`/country/${border.countryCode}`}
              className="text-green-700 font-bold"
            >
              {border.commonName}
            </a>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-4">Population (historic):</h2>
      <div className="my-4 bg-white rounded-lg p-4">
        <Line data={populationData} />
      </div>
    </div>
  );
}
