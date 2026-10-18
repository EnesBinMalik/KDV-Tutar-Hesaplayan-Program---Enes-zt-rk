import React, { useState } from 'react';
import { Calculator, Info, Check, RefreshCw, FileText, ArrowRight } from 'lucide-react';
import { TEST_CASES } from '../data/javaCodeData';

interface VisualCalculatorProps {
  amount: number;
  setAmount: (val: number) => void;
  onCopyNotice: (msg: string) => void;
}

export const VisualCalculator: React.FC<VisualCalculatorProps> = ({
  amount,
  setAmount,
  onCopyNotice
}) => {
  const [mode, setMode] = useState<'homework' | 'fixed18'>('homework');
  const [inputValue, setInputValue] = useState<string>(amount.toString());

  // KDV Oranı Hesaplama
  const effectiveRate = mode === 'fixed18' ? 0.18 : amount <= 1000 ? 0.18 : 0.08;
  const kdvTutari = amount * effectiveRate;
  const kdvliToplam = amount + kdvTutari;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);
    const parsed = parseFloat(raw);
    if (!isNaN(parsed) && parsed >= 0) {
      setAmount(parsed);
    }
  };

  const handlePresetSelect = (val: number) => {
    setAmount(val);
    setInputValue(val.toString());
  };

  // Format currency
  const formatTL = (num: number) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  // Percent of total
  const kdvPercentOfTotal = kdvliToplam > 0 ? (kdvTutari / kdvliToplam) * 100 : 0;
  const basePercentOfTotal = 100 - kdvPercentOfTotal;

  // Position on 0-2500 slider representation
  const thresholdPercentage = Math.min(Math.max((amount / 2000) * 100, 0), 100);

  const copyReceiptSummary = () => {
    const summary = `--- KDV HESAPLAMA RAPORU ---
Geliştirici: Enes Öztürk
Mod: ${mode === 'homework' ? 'Kademeli Ödev Kuralı (0-1000 TL %18, >1000 TL %8)' : 'Sabit %18'}
KDV'siz Tutar : ${formatTL(amount)} TL
KDV Oranı     : %${Math.round(effectiveRate * 100)}
KDV Tutarı    : ${formatTL(kdvTutari)} TL
KDV'li Toplam : ${formatTL(kdvliToplam)} TL
----------------------------`;
    navigator.clipboard.writeText(summary);
    onCopyNotice('Hesaplama özeti panoya kopyalandı!');
  };

  return (
    <section id="hesaplayici" className="py-12 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
              <Calculator className="w-4 h-4" />
              <span>İnteraktif Görsel Simülatör</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              KDV Değerlerini Canlı Hesapla
            </h2>
          </div>

          {/* Mode Switcher Segmented Control */}
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setMode('homework')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                mode === 'homework'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Ödev Kuralı: Kademeli (%18 / %8)
            </button>
            <button
              onClick={() => setMode('fixed18')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                mode === 'fixed18'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Temel Versiyon: Sabit (%18)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input and Threshold Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Input Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
              <label htmlFor="amount-input" className="block text-sm font-semibold text-slate-200 mb-2">
                Para Tutarını Giriniz (TL):
              </label>

              <div className="relative mb-4">
                <input
                  id="amount-input"
                  type="number"
                  step="any"
                  min="0"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-lg px-4 py-3.5 text-2xl font-bold text-white tabular-nums outline-none transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-lg">
                  ₺ TL
                </span>
              </div>

              {/* Slider Controller */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>0 TL</span>
                  <span className="text-amber-400 font-medium">1.000 TL (Eşik Sınırı)</span>
                  <span>2.500+ TL</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2500"
                  step="10"
                  value={Math.min(amount, 2500)}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setAmount(val);
                    setInputValue(val.toString());
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div>
                <span className="text-xs text-slate-400 font-medium block mb-2">
                  Hızlı Test Değerleri (Tıkla ve Dene):
                </span>
                <div className="flex flex-wrap gap-2">
                  {TEST_CASES.map((tc) => (
                    <button
                      key={tc.id}
                      onClick={() => handlePresetSelect(tc.amount)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer tabular-nums whitespace-nowrap ${
                        amount === tc.amount
                          ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {tc.label}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePresetSelect(10)}
                    className="px-3 py-1.5 text-xs rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-slate-700 cursor-pointer"
                  >
                    10 TL (Prompt)
                  </button>
                  <button
                    onClick={() => handlePresetSelect(100)}
                    className="px-3 py-1.5 text-xs rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-slate-700 cursor-pointer"
                  >
                    100 TL
                  </button>
                </div>
              </div>
            </div>

            {/* Threshold Rule Graphic Visualizer */}
            {mode === 'homework' && (
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-semibold text-white">Eşik Kuralı Görselleştirici (Ödev Şartı)</span>
                  <span className="text-slate-400">
                    Durum:{' '}
                    <strong className={amount <= 1000 ? 'text-amber-400' : 'text-cyan-400'}>
                      {amount <= 1000 ? '0 - 1.000 TL Aralığı' : '1.000 TL Üzeri'}
                    </strong>
                  </span>
                </div>

                {/* Visual Band Bar */}
                <div className="relative h-7 rounded-lg overflow-hidden flex text-xs font-semibold mb-2 bg-slate-950 border border-slate-800">
                  <div
                    className={`w-1/2 flex items-center justify-center transition-opacity ${
                      amount <= 1000
                        ? 'bg-amber-500/20 text-amber-300 border-r-2 border-amber-400'
                        : 'bg-slate-900 text-slate-500 border-r border-slate-800'
                    }`}
                  >
                    0 TL – 1.000 TL (%18 KDV)
                  </div>
                  <div
                    className={`w-1/2 flex items-center justify-center transition-opacity ${
                      amount > 1000
                        ? 'bg-cyan-500/20 text-cyan-300'
                        : 'bg-slate-900 text-slate-500'
                    }`}
                  >
                    &gt; 1.000 TL (%8 KDV)
                  </div>

                  {/* Marker Pin */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none transition-all duration-200"
                    style={{ left: `${thresholdPercentage}%` }}
                    title={`Mevcut Tutar: ${formatTL(amount)} TL`}
                  />
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {amount <= 1000 ? (
                    <span>
                      Girilen <strong>{formatTL(amount)} TL</strong> tutarı 1000 TL sınırının altında veya eşit olduğu için ödev şartı gereği{' '}
                      <span className="text-amber-400 font-semibold">%18 (0.18) KDV oranı</span> uygulanmaktadır.
                    </span>
                  ) : (
                    <span>
                      Girilen <strong>{formatTL(amount)} TL</strong> tutarı 1000 TL sınırını aştığı için ödev şartı gereği{' '}
                      <span className="text-cyan-400 font-semibold">%8 (0.08) KDV oranı</span> uygulanmaktadır.
                    </span>
                  )}
                </p>
              </div>
            )}

            {/* Step-by-Step Math Walkthrough */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                <span>Adım Adım Matematiksel Hesaplama</span>
              </h3>
              <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-300">
                <div className="flex items-center justify-between p-2 bg-slate-950/60 rounded border border-slate-800/80">
                  <span className="text-slate-400">1. KDV Oranı:</span>
                  <span className="font-semibold text-amber-300 tabular-nums">
                    %{Math.round(effectiveRate * 100)} = {effectiveRate}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-950/60 rounded border border-slate-800/80">
                  <span className="text-slate-400">2. KDV Tutarı Formülü:</span>
                  <span className="font-semibold text-white tabular-nums">
                    {formatTL(amount)} × {effectiveRate} ={' '}
                    <span className="text-amber-400">{formatTL(kdvTutari)} TL</span>
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-950/60 rounded border border-slate-800/80">
                  <span className="text-slate-400">3. KDV'li Fiyat Formülü:</span>
                  <span className="font-semibold text-white tabular-nums">
                    {formatTL(amount)} + {formatTL(kdvTutari)} ={' '}
                    <span className="text-emerald-400">{formatTL(kdvliToplam)} TL</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Output Metrics and Receipt Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* 4 Primary Output Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400 mb-1">KDV'siz Tutar</div>
                <div className="text-lg sm:text-xl font-bold text-white tabular-nums">
                  {formatTL(amount)} <span className="text-xs text-slate-400 font-normal">TL</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Ana Para</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400 mb-1">KDV Oranı</div>
                <div className="text-lg sm:text-xl font-bold text-amber-400 tabular-nums">
                  %{Math.round(effectiveRate * 100)}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {mode === 'homework'
                    ? amount <= 1000
                      ? '≤ 1000 TL Kuralı'
                      : '> 1000 TL Kuralı'
                    : 'Sabit Kural'}
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400 mb-1">KDV Tutarı</div>
                <div className="text-lg sm:text-xl font-bold text-amber-300 tabular-nums">
                  {formatTL(kdvTutari)} <span className="text-xs text-slate-400 font-normal">TL</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Vergi Payı</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400 mb-1">KDV'li Toplam Fiyat</div>
                <div className="text-lg sm:text-xl font-bold text-emerald-400 tabular-nums">
                  {formatTL(kdvliToplam)} <span className="text-xs text-slate-400 font-normal">TL</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Ödenecek Tutar</div>
              </div>
            </div>

            {/* Proportion Bar */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Ana Para Payı (%{basePercentOfTotal.toFixed(1)})</span>
                <span>KDV Payı (%{kdvPercentOfTotal.toFixed(1)})</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
                <div
                  className="bg-slate-400 h-full transition-all duration-300"
                  style={{ width: `${basePercentOfTotal}%` }}
                />
                <div
                  className="bg-amber-400 h-full transition-all duration-300"
                  style={{ width: `${kdvPercentOfTotal}%` }}
                />
              </div>
            </div>

            {/* Receipt / Mali Fiş Card with Enes Öztürk Signature */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-xl relative overflow-hidden font-mono text-xs">
              <div className="border-b border-dashed border-slate-800 pb-3 mb-3 text-center">
                <div className="font-bold text-sm tracking-wider text-white">T.C. HESAP FİŞİ</div>
                <div className="text-[11px] text-slate-400">JAVA 101 KDV HESAPLAYICI</div>
                <div className="text-[11px] text-amber-400 font-semibold mt-1">
                  KOD YAZARI: ENES ÖZTÜRK
                </div>
              </div>

              <div className="space-y-2 text-slate-300 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">HESAPLAMA MODU:</span>
                  <span className="text-right text-white">
                    {mode === 'homework' ? 'KADEMELI ODEV' : 'SABIT %18'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">KDV'SIZ TUTAR:</span>
                  <span className="font-bold tabular-nums text-white">{formatTL(amount)} TL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">KDV ORANI:</span>
                  <span className="font-bold tabular-nums text-amber-400">
                    %{Math.round(effectiveRate * 100)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">KDV TUTARI:</span>
                  <span className="font-bold tabular-nums text-amber-300">{formatTL(kdvTutari)} TL</span>
                </div>
                <div className="border-t border-dashed border-slate-800 pt-2 flex justify-between text-sm">
                  <span className="font-bold text-white">TOPLAM TUTAR:</span>
                  <span className="font-extrabold text-emerald-400 tabular-nums">
                    {formatTL(kdvliToplam)} TL
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">El Emeği Kodlama</span>
                <button
                  onClick={copyReceiptSummary}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded text-xs transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Fişi Kopyala</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
