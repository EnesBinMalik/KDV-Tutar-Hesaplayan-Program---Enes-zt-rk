import React from 'react';
import { Download, FileCode } from 'lucide-react';
import { JAVA_HOMEWORK_CODE } from '../data/javaCodeData';

interface HeaderProps {
  onCopyNotice: (msg: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onCopyNotice }) => {
  const downloadJavaFile = () => {
    const blob = new Blob([JAVA_HOMEWORK_CODE], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'KDVTutariHesaplayici.java';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onCopyNotice('KDVTutariHesaplayici.java dosyası indirildi!');
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a href="#giris" className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2">
          <FileCode className="w-5 h-5 text-amber-400" />
          <span>KDV.java</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <a href="#hesaplayici" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Hesaplayıcı
          </a>
          <a href="#terminal" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Java Konsolu
          </a>
          <a href="#kaynak-kod" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Kaynak Kod
          </a>
          <a href="#rapor" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Ödev Teslim Raporu
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={downloadJavaFile}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm active:scale-95"
            title="KDVTutariHesaplayici.java dosyasını indir"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.java İndir</span>
          </button>
        </div>
      </div>
    </header>
  );
};
