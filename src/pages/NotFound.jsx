import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Sidan hittades inte</h1>
      <p className="text-muted-foreground">Kanske skrevs en felaktig URL?</p>
      <Link to="/" className="underline">
        Till startsidan
      </Link>
    </div>
  );
}
