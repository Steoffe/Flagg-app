import { useEffect, useMemo, useState } from "react";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import CountryCard from "@/components/CountryCard";

const FIELDS = "name,cca3,region,flags,population,capital";
const API_ALL = `https://restcountries.com/v3.1/all?fields=${FIELDS}`;

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(API_ALL);
        if (!res.ok) throw new Error("Failed to fetch countries");
        const data = await res.json();
        if (!cancelled) setCountries(data);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to fetch countries");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return countries.filter((c) => {
      const matchesQuery = q ? c.name?.common?.toLowerCase()?.includes(q) : true;
      const matchesRegion = region === "all" ? true : c.region === region;
      return matchesQuery && matchesRegion;
    });
  }, [countries, query, region]);

  return (
    <section className="space-y-8 md:space-y-10 text-[14px]">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search for a country..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search countries"
          className="md:max-w-[420px]"
        />
        <Select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          options={[
            { value: "all", label: "All regions" },
            { value: "Africa", label: "Africa" },
            { value: "Americas", label: "Americas" },
            { value: "Asia", label: "Asia" },
            { value: "Europe", label: "Europe" },
            { value: "Oceania", label: "Oceania" },
            { value: "Antarctic", label: "Antarctic" },
          ]}
        />
      </div>

      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg bg-card shadow-sm overflow-hidden animate-pulse"
            >

              <div className="aspect-[4/3] bg-muted" />

              <div className="p-4 space-y-2">
                <div className="h-4 w-2/3 rounded bg-muted" />
                <div className="h-3 w-1/2 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No countries match your filters.
            </p>
          ) : (
            <div
              className="
                grid gap-10
                sm:grid-cols-2
                md:grid-cols-3
                lg:[grid-template-columns:repeat(4,minmax(0,1fr))]
              "
            >
              {filtered.map((country) => (
                <CountryCard key={country.cca3} country={country} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
