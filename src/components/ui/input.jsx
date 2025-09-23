import { cn } from "@/lib/utils"

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-xl px-4 text-[14px]",
        "bg-card text-card-foreground placeholder:text-foreground/60",
        "border border-border/40 shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-transparent",
        className
      )}
      {...props}
    />
  )
}