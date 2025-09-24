import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="text-muted-foreground">Maybe an incorrect URL was typed?</p>
      <Link to="/" className="underline">
        Back to home
      </Link>
    </div>
  );
}
