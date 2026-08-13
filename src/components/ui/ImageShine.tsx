// Decorative light sweep for photo tiles — parked off-screen left, glides
// across to off-screen right on hover of the `group` ancestor. Mirrors light
// catching a tilted metal surface rather than a plain hover fade.
export function ImageShine() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent_40%,color-mix(in_srgb,var(--accent-copper-hover)_45%,transparent)_50%,transparent_60%)] transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden"
    />
  );
}
