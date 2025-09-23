
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme"
import arrowDownLight from "@/assets/arrow-down-light.svg"
import arrowDownDark from "@/assets/arrow-down-dark.svg"

export default function Select({ value, onChange, options = [], className }) {
  const { theme } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = options.find((opt) => opt.value === value)

  const menuOptions = options.filter(
    (opt) => !(opt.value === "all" && value === "all")
  )

  useEffect(() => {
    function onDocClick(e) {
      if (!ref.current) return
      if (!ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [])

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div ref={ref} className={cn("relative inline-block w-full md:w-60", className)}>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "relative w-full rounded-md bg-card px-4 py-2 pr-10 text-sm font-semibold shadow-sm text-left",
          "text-foreground placeholder:text-muted-foreground"
        )}
      >
        {current ? current.label : "Select..."}
        <img
          src={theme === "dark" ? arrowDownLight : arrowDownDark}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute mt-1 w-full rounded-md bg-card shadow-lg z-10 overflow-hidden"
        >
          {menuOptions.map((opt) => {
            const selected = opt.value === value
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange({ target: { value: opt.value } })
                  setOpen(false)
                }}
                className={cn(
                  "cursor-pointer px-4 py-2 text-sm font-medium hover:bg-muted",
                  selected && "opacity-60"
                )}
              >
                {opt.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
