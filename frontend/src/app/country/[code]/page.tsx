import CountryInfo from "../../../components/CountryInfo";

export default function CountryPage({ params }: { params: { code: string } }) {
  return (
    <main className="container mx-auto p-4">
      <CountryInfo countryCode={params.code} />
    </main>
  );
}
