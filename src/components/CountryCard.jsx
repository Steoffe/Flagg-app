import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export default function CountryCard({ country }) {
  const { name, flags, region, population, capital, cca3 } = country;
  const flagSrc = flags?.svg || flags?.png;
  const alt = `Flag of ${name?.common}`;

  return (
    <Link to={`/country/${cca3}`} aria-label={`Open ${name?.common}`}>
      <Card
        className="overflow-hidden rounded-xl bg-card text-card-foreground shadow-sm 
             transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border-0"
      >
        <div className="relative">
          <img
            src={flagSrc}
            alt={alt}
            className="h-40 w-full object-cover"
            loading="lazy"
          />
        </div>
        <CardContent className="p-6 text-[14px]">
          <h3 className="text-[18px] font-extrabold tracking-wide mb-2">
            {name?.common}
          </h3>
          <ul className="space-y-1 text-foreground/80 leading-relaxed">
            <li>
              <span className="font-semibold">Population:</span>{" "}
              {population?.toLocaleString?.() || "—"}
            </li>
            <li>
              <span className="font-semibold">Region:</span> {region || "—"}
            </li>
            <li>
              <span className="font-semibold">Capital:</span>{" "}
              {capital?.[0] || "—"}
            </li>
          </ul>
        </CardContent>
      </Card>
    </Link>
  );
}
