import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-slate-200 font-semibold">KDV Tutarı Hesaplayan Program</span>
          <span className="mx-2 text-slate-600">·</span>
          <span>Öğrenci & Geliştirici: <strong className="text-white">Enes Öztürk</strong></span>
        </div>
        <div className="text-slate-500">
          Java 101 Temel Programlama ve Algoritma Ödevi Çözümü
        </div>
      </div>
    </footer>
  );
};
