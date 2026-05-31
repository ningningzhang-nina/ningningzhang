'use client';

import { useEffect, useState } from 'react';

type TravelImage = {
  src: string;
  alt: string;
};

export default function TravelGallery({ images }: { images: readonly TravelImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') setActiveIndex((activeIndex + 1) % images.length);
      if (event.key === 'ArrowLeft') setActiveIndex((activeIndex - 1 + images.length) % images.length);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, images.length]);

  return (
    <>
      <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-3">
        {images.map((image, index) => (
          <figure
            key={image.src}
            className={`group overflow-hidden bg-white shadow-[0_14px_40px_rgba(37,55,78,0.08)] ${
              index === 0 && images.length > 1 ? 'md:col-span-2 md:row-span-2' : ''
            }`}
          >
            <button
              type="button"
              className="block h-full w-full cursor-zoom-in"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </button>
          </figure>
        ))}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06101d]/90 px-4 py-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-[22px] leading-none text-white transition-colors hover:bg-white/20"
            onClick={() => setActiveIndex(null)}
            aria-label="Close image"
          >
            ×
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-[26px] leading-none text-white transition-colors hover:bg-white/20"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex((activeIndex! - 1 + images.length) % images.length);
                }}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-[26px] leading-none text-white transition-colors hover:bg-white/20"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex((activeIndex! + 1) % images.length);
                }}
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}
          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className="max-h-full max-w-full object-contain shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
