'use client';
import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface PropertyGalleryProps {
  images: { id: string; url: string; alt?: string }[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [openLightbox, setOpenLightbox] = useState(false);

  if (images.length === 0) return null;

  const slides = images.map(img => ({ src: img.url, alt: img.alt || title }));

  return (
    <div className="space-y-4">
      {/* Main image with hover to expand */}
      <div
        className="relative rounded-2xl overflow-hidden h-80 sm:h-[450px] bg-gray-100 group cursor-pointer shadow-card"
        onClick={() => setOpenLightbox(true)}
      >
        <img
          src={images[current].url}
          alt={images[current].alt || title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Fullscreen icon */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-95 group-hover:scale-100">
          <Maximize2 className="w-5 h-5 text-primary" />
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + images.length) % images.length); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-primary p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % images.length); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-primary p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white font-medium text-sm px-3.5 py-1.5 rounded-full shadow-md">
              {current + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 w-28 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${i === current ? 'border-primary ring-2 ring-primary/20 scale-95 opacity-100' : 'border-transparent hover:border-border opacity-70 hover:opacity-100'
                }`}
            >
              <img src={img.url} alt={img.alt || ''} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        index={current}
        slides={slides}
        plugins={[Zoom, Thumbnails]}
        carousel={{ finite: images.length <= 1 }}
        render={{
          buttonPrev: images.length <= 1 ? () => null : undefined,
          buttonNext: images.length <= 1 ? () => null : undefined,
        }}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.92)", backdropFilter: "blur(10px)" } }}
      />
    </div>
  );
}
