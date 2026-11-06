import React from 'react';
import { Reveal } from './Reveal';

const galleryImages = [
  { url: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_08.54.54_565fca33.jpeg', caption: 'Escritório Oficial EMDPN-GB - Juntos por um futuro melhor.' },
  { url: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_09.03.22_4befee8f.jpeg', caption: 'Documentação e Requisitos Oficiais da Conservatória.' },
];

export function Gallery() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1160px] mx-auto px-7">
        <div className="text-center mb-11">
          <h2 className="text-3xl md:text-4xl mb-2.5">Nossa Presença</h2>
          <p className="text-neutral-500 text-lg">Compromisso com a transparência e integridade.</p>
          <div className="w-14 h-[3px] bg-accent-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {galleryImages.map((img, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl group aspect-video md:aspect-[4/3] bg-neutral-100 border border-neutral-200">
                <img 
                  src={img.url} 
                  alt={img.caption} 
                  className="w-full h-full object-contain md:object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white font-bold text-sm md:text-base translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  {img.caption}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
