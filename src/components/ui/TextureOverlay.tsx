import Image from "next/image";

const COPPER_TEXTURE = "https://images.unsplash.com/photo-1428194949883-cafda571f3c4?w=800&q=70&auto=format&fit=crop";

// A real macro shot of layered copper panels, not a synthetic noise SVG —
// blended in at low opacity so it reads as material grain (brushed,
// slightly uneven) rather than a photo. `mix-blend-mode: overlay` lets the
// underlying theme color show through instead of imposing the photo's own
// warm cast, so it works in both light and dark sections.
export function TextureOverlay() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay">
      <Image src={COPPER_TEXTURE} alt="" fill sizes="100vw" className="object-cover" />
    </div>
  );
}
