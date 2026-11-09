import React, { useEffect, useState } from 'react';
import { Reveal } from './Reveal';
import { DEFAULT_IMAGES, getCustomImages, syncImagesFromSupabase } from '../services/imageService';
import { useLanguage } from '../context/LanguageContext';

export function Gallery() {
  const [images, setImages] = useState(getCustomImages());
  const { t } = useLanguage();

  useEffect(() => {
    syncImagesFromSupabase().then(setImages);
    const handleUpdate = () => setImages(getCustomImages());
    window.addEventListener('emdpn_images_updated', handleUpdate);
    return () => window.removeEventListener('emdpn_images_updated', handleUpdate);
  }, []);

  const galleryPhotos = images.galleryPhotos || DEFAULT_IMAGES.galleryPhotos;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1160px] mx-auto px-7">
        <div className="text-center mb-11">
          <h2 className="text-3xl md:text-4xl mb-2.5">{t.gallery.title}</h2>
          <p className="text-neutral-500 text-lg">{t.gallery.subtitle}</p>
          <div className="w-14 h-[3px] bg-accent-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {galleryPhotos.map((url, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl group aspect-video md:aspect-[4/3] bg-neutral-100 border border-neutral-200">
                <img 
                  src={url}
                  alt={`${t.gallery.photoAlt} ${idx + 1}`}
                  className="w-full h-full object-contain md:object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white font-bold text-sm md:text-base translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  {idx === 0
                    ? t.gallery.officeCaption
                    : idx === 1
                      ? t.gallery.documentsCaption
                      : `${t.gallery.photoAlt} ${idx + 1}`}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
