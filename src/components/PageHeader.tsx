import React from 'react';
import { Reveal } from './Reveal';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-primary-950 relative text-white py-15 pb-13 text-center border-b-4 border-[#16845B] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #fff 0%, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="max-w-[1160px] mx-auto px-7 relative z-10">
        <Reveal>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold font-serif">{title}</h1>
          {subtitle && <p className="mt-2.5 opacity-70 text-[1.02rem] font-normal">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}
