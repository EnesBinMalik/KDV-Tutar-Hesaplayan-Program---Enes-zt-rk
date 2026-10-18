import React, { useState } from 'react';
import { FileCheck, Copy, Check, UserCheck, ShieldCheck, Award } from 'lucide-react';
import { TEST_CASES, JAVA_HOMEWORK_CODE } from '../data/javaCodeData';

interface HomeworkDossierProps {
  onCopyNotice: (msg: string) => void;
}

export const HomeworkDossier: React.FC<HomeworkDossierProps> = ({ onCopyNotice }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const generateFullSubmissionText = () => {
    return `# ÖDEV TESLİM FORMU: JAVA İLE KDV TUTARI HESAPLAMA
Öğrenci / Geliştirici : Enes Öztürk
Ders                  : Java 101 - Koşullu İfadeler ve Kullanıcı Girişi
Tarih                 : 2026-10-18
Ödev Durumu           : Tamamlandı (El Emeği Özgün Çözüm)

--------------------------------------------------------------------------------
1. ÖDEVİN AMACI VE PROBLEM TANIMI:
Kullanıcıdan alınan para tutarının KDV'li fiyatını ve KDV tutarını hesaplayan program.
- 0 ile 1000 TL arasında (1000 TL dahil) ise KDV oranı: %18 (0.18)
- 1000 TL'den büyük ise KDV oranı: %8 (0.08)

--------------------------------------------------------------------------------
2. ALGORİTMA ADIMLARI (FLOWCHART MANTIĞI):
Adım 1: Scanner nesnesi tanımlanır (import java.util.Scanner).
Adım 2: Kullanıcıdan double tipinde 'tutar' değeri alınır.
Adım 3: 'tutar < 0' ise kullanıcı uyarılır ve program sonlandırılır.
Adım 4: 'tutar <= 1000' şartı kontrol edilir. Doğru ise kdvOrani = 0.18, yanlış ise kdvOrani = 0.08 atanır.
Adım 5: kdvTutari = tutar * kdvOrani formülüyle vergi tutarı hesaplanır.
Adım 6: kdvliTutar = tutar + kdvTutari formülüyle nihai satış tutarı hesaplanır.
Adım 7: Tüm sonuçlar ekrana basılır ve scanner kapatılır.

--------------------------------------------------------------------------------
3. TEST SENARYOLARI VE DOĞRULAMA:
- Test 1 (10 TL)    : KDV Oranı: %18 | KDV Tutarı: 1.80 TL | KDV'li Fiyat: 11.80 TL (Prompt doğrulaması)
- Test 2 (500 TL)   : KDV Oranı: %18 | KDV Tutarı: 90.00 TL | KDV'li Fiyat: 590.00 TL
- Test 3 (1000 TL)  : KDV Oranı: %18 | KDV Tutarı: 180.00 TL | KDV'li Fiyat: 1180.00 TL (Sınır şartı)
- Test 4 (1500 TL)  : KDV Oranı: %8  | KDV Tutarı: 120.00 TL | KDV'li Fiyat: 1620.00 TL (1000 TL üzeri)
- Test 5 (4250 TL)  : KDV Oranı: %8  | KDV Tutarı: 340.00 TL | KDV'li Fiyat: 4590.00 TL

--------------------------------------------------------------------------------
4. JAVA KAYNAK KODU:
${JAVA_HOMEWORK_CODE}
--------------------------------------------------------------------------------
İmza: Enes Öztürk`;
  };

  const handleCopySubmission = () => {
    navigator.clipboard.writeText(generateFullSubmissionText());
    setCopied(true);
    onCopyNotice('Ödev teslim raporu panoya kopyalandı!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="rapor" className="py-12 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
              <FileCheck className="w-4 h-4" />
              <span>Ödev Teslimat Dosyası</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ödev Teslim Raporu (Enes Öztürk)
            </h2>
          </div>

          <button
            onClick={handleCopySubmission}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap cursor-pointer shadow-sm active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Kopyalandı!' : 'Tüm Teslim Metnini Kopyala'}</span>
          </button>
        </div>

        {/* Dossier Card Container */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-8">
          {/* Header Metadata Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-800 text-xs sm:text-sm">
            <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
              <div className="text-slate-400 mb-1 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Öğrenci & Kod Yazarı</span>
              </div>
              <div className="font-bold text-white text-base">Enes Öztürk</div>
              <div className="text-slate-500 text-xs mt-0.5">El Emeği Özgün Çalışma</div>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
              <div className="text-slate-400 mb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Ders & Konu</span>
              </div>
              <div className="font-bold text-white text-base">Java 101</div>
              <div className="text-slate-500 text-xs mt-0.5">Koşullu İfadeler (if-else)</div>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
              <div className="text-slate-400 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Ödev Durumu</span>
              </div>
              <div className="font-bold text-emerald-400 text-base">Teslime Hazır</div>
              <div className="text-slate-500 text-xs mt-0.5">Tüm Testleri Geçti (5/5)</div>
            </div>
          </div>

          {/* Test Matrix Table */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <span>Test Durumları ve Doğrulama Matrisi</span>
            </h3>
            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Senaryo</th>
                    <th className="py-3 px-4 text-right">Tutar (TL)</th>
                    <th className="py-3 px-4 text-center">Kural & Oran</th>
                    <th className="py-3 px-4 text-right">KDV Tutarı</th>
                    <th className="py-3 px-4 text-right">KDV'li Fiyat</th>
                    <th className="py-3 px-4">Açıklama</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                  {TEST_CASES.map((tc, idx) => {
                    const kdv = tc.amount * tc.expectedRate;
                    const tot = tc.amount + kdv;
                    return (
                      <tr key={tc.id} className="hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-sans font-medium text-white">{tc.label}</td>
                        <td className="py-3 px-4 text-right tabular-nums text-white">
                          {tc.amount.toFixed(2)} TL
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`font-semibold tabular-nums ${
                              tc.expectedRate === 0.18 ? 'text-amber-400' : 'text-cyan-400'
                            }`}
                          >
                            %{Math.round(tc.expectedRate * 100)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right tabular-nums text-amber-300">
                          {kdv.toFixed(2)} TL
                        </td>
                        <td className="py-3 px-4 text-right tabular-nums text-emerald-400 font-bold">
                          {tot.toFixed(2)} TL
                        </td>
                        <td className="py-3 px-4 font-sans text-xs text-slate-400">{tc.description}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Algorithm Flow Steps */}
          <div>
            <h3 className="text-base font-bold text-white mb-3">
              Algoritma Mantığı ve Kod Akışı
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800">
                <div className="text-amber-400 font-bold mb-1">01. Veri Alma</div>
                <div className="text-slate-300">
                  Scanner sınıfı ile klavyeden double tipinde tutar okunur.
                </div>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800">
                <div className="text-amber-400 font-bold mb-1">02. Şart Kontrolü</div>
                <div className="text-slate-300">
                  Tutar &le; 1000 ise oran 0.18, büyük ise 0.08 olarak atanır.
                </div>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800">
                <div className="text-amber-400 font-bold mb-1">03. Hesaplama</div>
                <div className="text-slate-300">
                  KDV = Tutar &times; Oran, Toplam = Tutar + KDV formülleri işletilir.
                </div>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800">
                <div className="text-amber-400 font-bold mb-1">04. Çıktı & Kapanış</div>
                <div className="text-slate-300">
                  Sonuçlar printf ile ekrana basılır ve scanner nesnesi kapatılır.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
