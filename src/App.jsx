
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

export default function App() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Navbar />
      <main className="mx-auto w-full max-w-[1440px] px-6 md:px-10 py-8 md:py-12 pt-24">
        <Outlet />
      </main>
    </div>
  );
}
