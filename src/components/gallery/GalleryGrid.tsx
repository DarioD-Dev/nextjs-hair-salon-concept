import Image from "next/image";

export function GalleryGrid({
  images,
}: {
  images: { src: string; stylistName: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
      {images.map((image, index) => (
        <div key={`${image.src}-${index}`} className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={image.src}
            alt=""
            fill
            sizes="(min-width: 640px) 33vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-editorial/70 via-transparent to-transparent" />
          <p className="absolute bottom-3 left-3 font-sans text-xs uppercase tracking-wide text-text-on-editorial">
            {image.stylistName}
          </p>
        </div>
      ))}
    </div>
  );
}
