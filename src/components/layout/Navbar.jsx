import { useTheme } from "@/lib/theme";
import logoLight from "@/assets/techover-logo.png"; 
import logoDark from "@/assets/techover-logo-dark.png"; 
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { theme, toggle } = useTheme();

  const logo = theme === "dark" ? logoLight : logoDark;
  const bgColor = "bg-card";

  return (
    <header className={`${bgColor} shadow-fade sticky top-0 z-50`}>
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-10">

        <h1 className="text-lg font-extrabold">The Flag App</h1>


        <img
          src={logo}
          alt=""
          className="hidden md:block h-6 object-contain"
          aria-hidden="true"
        />

        <button
          onClick={toggle}
          className="flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-md
             duration-300 ease-in-out
             transition-[transform,background-color]
             hover:scale-110 hover:[background-color:var(--hover)]"
        >
          {theme === "dark" ? (
            <>
              <Sun className="h-5 w-5" /> Light Mode
            </>
          ) : (
            <>
              <Moon className="h-5 w-5" /> Dark Mode
            </>
          )}
        </button>
      </nav>
    </header>
  );
}
