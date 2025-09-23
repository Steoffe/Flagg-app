export function cn(...classes) {
  return classes
    .flatMap((c) => (Array.isArray(c) ? c : [c]))
    .filter(Boolean)
    .join(" ");
}
