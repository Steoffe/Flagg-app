
import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/lib/theme";
import arrowLeft from "@/assets/arrow-left.svg";
import arrowLeftDark from "@/assets/arrow-left-dark.svg";

const DETAIL_FIELDS =
  "name,cca3,region,subregion,capital,population,languages,currencies,flags,borders,tld";

export default function Country() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [country, setCountry] = useState(null);
  const [neighbors, setNeighbors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError("");
        setCountry(null);
        setNeighbors([]);

        const res = await fetch(
          `https://restcountries.com/v3.1/alpha/${code}?fields=${DETAIL_FIELDS}`
        );
        if (!res.ok) throw new Error("Could not fetch country");
        const data = await res.json();
        const c = Array.isArray(data) ? data[0] : data;
        if (!cancelled) setCountry(c);

        if (c?.borders?.length) {
          const codes = c.borders.join(",");
          const neighRes = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${codes}&fields=name,cca3`
          );
          if (neighRes.ok) {
            const neigh = await neighRes.json();
            if (!cancelled) setNeighbors(neigh);
          }
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [code]);

  const langs = useMemo(
    () =>
      country?.languages ? Object.values(country.languages).join(", ") : "—",
    [country]
  );
  const currs = useMemo(
    () =>
      country?.currencies
        ? Object.values(country.currencies)
            .map((c) => c.name)
            .join(", ")
        : "—",
    [country]
  );

  if (loading) {
    return (
      <section className="space-y-8 text-[16px]">
        <div className="h-9 w-36 rounded-lg bg-card/70 animate-pulse" />
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="aspect-[4/3] w-full rounded-lg bg-card/70 animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 w-64 rounded bg-card/70 animate-pulse" />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-40 rounded bg-card/70 animate-pulse" />
              <div className="h-40 rounded bg-card/70 animate-pulse" />
            </div>
            <div className="h-9 w-80 rounded bg-card/70 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (error) return <p className="text-sm text-destructive">{error}</p>;
  if (!country) return <p>Country not found.</p>;

  return (
    <article className="space-y-8 text-[16px]">

      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center gap-3 text-[17px] md:text-[18px] font-bold hover:opacity-80 transition"
      >
        <img
          src={theme === "dark" ? arrowLeft : arrowLeftDark} 
          alt=""
          aria-hidden="true"
          className="h-6 w-6"
        />
        <span>Back</span>
      </button>

    
      <div className="grid gap-10 md:grid-cols-2 md:items-center">

        <div className="flex md:block justify-center">
          <img
            src={country.flags?.svg || country.flags?.png}
            alt={country.flags?.alt || country.name?.common}
            className="w-full max-w-[560px] aspect-[4/3] object-cover rounded-lg shadow-sm"
          />
        </div>

 
        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold">{country.name?.common}</h1>


          <div className="grid gap-6 md:grid-cols-2 leading-relaxed">
            <ul className="space-y-2 text-foreground/90">
              <li>
                <span className="font-semibold">Official name:</span>{" "}
                {country.name?.official || "—"}
              </li>
              <li>
                <span className="font-semibold">Population:</span>{" "}
                {country.population?.toLocaleString?.() || "—"}
              </li>
              <li>
                <span className="font-semibold">Region:</span>{" "}
                {country.region || "—"}
              </li>
              <li>
                <span className="font-semibold">Subregion:</span>{" "}
                {country.subregion || "—"}
              </li>
              <li>
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital?.join(", ") || "—"}
              </li>
            </ul>

            <ul className="space-y-2 text-foreground/90">
              <li>
                <span className="font-semibold">Top level domain:</span>{" "}
                {country.tld?.join(", ") || "—"}
              </li>
              <li>
                <span className="font-semibold">Currencies:</span> {currs}
              </li>
              <li>
                <span className="font-semibold">Languages:</span> {langs}
              </li>
            </ul>
          </div>


          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Border countries:</h2>
            {neighbors.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No border countries found.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {neighbors.map((n) => (
                  <Link
                    key={n.cca3}
                    to={`/country/${n.cca3}`}
                    className="px-4 py-1.5 rounded-md bg-card shadow-sm text-sm hover:shadow-md transition
                     border-0 outline-none"
                  >
                    {n.name?.common}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
