'use client';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { Grid2x2, Maximize2 } from 'lucide-react';

interface PropertyGalleryProps {
  images: { id: string; url: string; alt?: string }[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (images.length === 0) return null;

  const slides = images.map((img) => ({ src: img.url, alt: img.alt || title }));

  function openAt(index: number) {
    setLightboxIndex(index);
    setOpenLightbox(true);
  }

  // Airbnb-style grid: 1 large left + 2x2 right (up to 5 images)
  const main = images[0];
  const side = images.slice(1, 5);

  return (
    <>
      {/* Desktop: Airbnb grid */}
      <div className="hidden md:block">
        <div className="relative rounded-2xl overflow-hidden">
          <div className={`grid gap-2 ${side.length > 0 ? 'grid-cols-2' : 'grid-cols-1'}`} style={{ height: 460 }}>
            {/* Main image */}
            <div
              className="relative overflow-hidden cursor-pointer group"
              onClick={() => openAt(0)}
            >
              <img
                src={main.url}
                alt={main.alt || title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
            </div>

            {/* Side grid */}
            {side.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {side.map((img, i) => (
                  <div
                    key={img.id}
                    className="relative overflow-hidden cursor-pointer group"
                    onClick={() => openAt(i + 1)}
                  >
                    <img
                      src={img.url}
                      alt={img.alt || ''}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* "Ver todas" button */}
          {images.length > 1 && (
            <button
              onClick={() => openAt(0)}
              className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm text-text-main text-sm font-semibold px-4 py-2.5 rounded-xl shadow-hover hover:bg-white transition-all hover:scale-105"
            >
              <Grid2x2 className="w-4 h-4" />
              Ver todas las fotos ({images.length})
            </button>
          )}
        </div>
      </div>

      {/* Mobile: slider */}
      <div className="md:hidden">
        <MobileGallery images={images} title={title} onOpenLightbox={openAt} />
      </div>

      {/* Lightbox */}
      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom, Thumbnails]}
        carousel={{ finite: images.length <= 1 }}
        render={{
          buttonPrev: images.length <= 1 ? () => null : undefined,
          buttonNext: images.length <= 1 ? () => null : undefined,
        }}
        styles={{ container: { backgroundColor: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(10px)' } }}
      />
    </>
  );
}

function MobileGallery({
  images,
  title,
  onOpenLightbox,
}: {
  images: { id: string; url: string; alt?: string }[];
  title: string;
  onOpenLightbox: (i: number) => void;
}) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-3">
      <div
        className="relative rounded-2xl overflow-hidden h-72 bg-gray-100 group cursor-pointer"
        onClick={() => onOpenLightbox(current)}
      >
        <img
          src={images[current].url}
          alt={images[current].alt || title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize2 className="w-4 h-4 text-primary" />
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
            {current + 1} / {images.length}
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                i === current ? 'border-primary' : 'border-transparent opacity-60'
              }`}
            >
              <img src={img.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
