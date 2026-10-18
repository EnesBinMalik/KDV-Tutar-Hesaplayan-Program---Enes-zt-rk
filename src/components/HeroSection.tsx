import React from 'react';
import { Terminal, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onSelectAmount: (val: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectAmount }) => {
  return (
    <section id="giris" className="pt-8 pb-12 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Developer Attribution Kicker without pill styling */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <span className="text-amber-400 font-semibold">Java 101 Ödevi</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-300 font-medium">Öğrenci: Enes Öztürk</span>
          <span aria-hidden="true">·</span>
          <span>Özgün ve El Emeği Çözüm</span>
        </div>

        {/* Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              KDV Tutarı Hesaplayan <span className="text-amber-400">Java Programı</span>
            </h1>
            <p className="text-base text-slate-300 leading-relaxed max-w-2xl mb-6">
              Kullanıcıdan alınan para tutarının KDV oranını dinamik şartlara göre belirleyen, KDV tutarını ve KDV dahil nihai fiyatı ekrana yazdıran Java uygulaması ve interaktif web konsolu.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#hesaplayici"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-lg text-sm transition-colors cursor-pointer shadow-sm active:scale-95"
              >
                <span>Hemen Test Et</span>
              </a>
              <a
                href="#terminal"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium rounded-lg text-sm transition-colors cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Konsol Simülatörü</span>
              </a>
              <a
                href="#kaynak-kod"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium rounded-lg text-sm transition-colors cursor-pointer"
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Java Kaynak Kodu</span>
              </a>
            </div>
          </div>

          {/* Prompt Ödev Kriterleri Özeti Kartı */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Ödev Kriterleri & Şartlar
              </span>
              <span className="text-xs text-slate-400">
                Enes Öztürk İmzalı
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">0 TL – 1000 TL Arası:</span>{' '}
                  <span className="text-amber-300 font-medium">%18 KDV Oranı</span> uygulanır.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">1000 TL Üzeri:</span>{' '}
                  <span className="text-cyan-300 font-medium">%8 KDV Oranı</span> uygulanır.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Referans Test Değeri:</span>{' '}
                  10 TL girdiğinde KDV 1.8 TL, Toplam 11.8 TL olmalıdır.
                </div>
              </div>
            </div>

            {/* Quick Test Prompt Example */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 bg-slate-950/60 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Prompt Örneği:</span>
                <button
                  onClick={() => onSelectAmount(10)}
                  className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer underline underline-offset-2"
                >
                  Bu Değeri Yükle (10 TL)
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                  <div className="text-slate-400">KDV'siz</div>
                  <div className="font-bold text-white tabular-nums">10.00 TL</div>
                </div>
                <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                  <div className="text-slate-400">KDV Tutarı</div>
                  <div className="font-bold text-amber-400 tabular-nums">1.80 TL</div>
                </div>
                <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                  <div className="text-slate-400">KDV'li</div>
                  <div className="font-bold text-emerald-400 tabular-nums">11.80 TL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
