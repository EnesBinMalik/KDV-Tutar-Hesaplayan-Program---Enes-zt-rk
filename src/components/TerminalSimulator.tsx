import React, { useState } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, Trash2, Send } from 'lucide-react';
import { TEST_CASES } from '../data/javaCodeData';

interface TerminalRun {
  id: string;
  timestamp: string;
  inputAmount: number;
  rate: number;
  kdvAmount: number;
  total: number;
}

export const TerminalSimulator: React.FC = () => {
  const [terminalInput, setTerminalInput] = useState<string>('10');
  const [runs, setRuns] = useState<TerminalRun[]>([
    {
      id: 'default-run',
      timestamp: '14:50:01',
      inputAmount: 10,
      rate: 0.18,
      kdvAmount: 1.8,
      total: 11.8
    }
  ]);
  const [mode, setMode] = useState<'tiered' | 'fixed'>('tiered');

  const executeJavaProgram = (amountToRun?: number) => {
    const val = amountToRun !== undefined ? amountToRun : parseFloat(terminalInput);
    if (isNaN(val) || val < 0) {
      return;
    }

    const rate = mode === 'fixed' ? 0.18 : val <= 1000 ? 0.18 : 0.08;
    const kdv = val * rate;
    const tot = val + kdv;

    const newRun: TerminalRun = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString('tr-TR'),
      inputAmount: val,
      rate,
      kdvAmount: kdv,
      total: tot
    };

    setRuns((prev) => [...prev, newRun]);
    setTerminalInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeJavaProgram();
    }
  };

  const clearTerminal = () => {
    setRuns([]);
  };

  const resetTerminal = () => {
    setRuns([
      {
        id: 'initial-run',
        timestamp: new Date().toLocaleTimeString('tr-TR'),
        inputAmount: 10,
        rate: 0.18,
        kdvAmount: 1.8,
        total: 11.8
      }
    ]);
    setTerminalInput('10');
  };

  const formatNumber = (num: number) => {
    return num.toFixed(2);
  };

  return (
    <section id="terminal" className="py-12 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
              <TerminalIcon className="w-4 h-4" />
              <span>Java CLI Konsol Simülatörü</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Konsol Çıktısını Canlı Deneyimle
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode((m) => (m === 'tiered' ? 'fixed' : 'tiered'))}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            >
              Mod: {mode === 'tiered' ? 'Ödev (%18 / %8)' : 'Sabit (%18)'}
            </button>
            <button
              onClick={resetTerminal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              title="İlk duruma sıfırla"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Sıfırla</span>
            </button>
            <button
              onClick={clearTerminal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-red-400 hover:border-red-900/50 transition-colors cursor-pointer"
              title="Konsol geçmişini temizle"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Temizle</span>
            </button>
          </div>
        </div>

        {/* Quick Test Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs text-slate-400">Hızlı Çalıştır:</span>
          {TEST_CASES.map((tc) => (
            <button
              key={tc.id}
              onClick={() => {
                setTerminalInput(tc.amount.toString());
                executeJavaProgram(tc.amount);
              }}
              className="px-2.5 py-1 text-xs rounded border border-slate-800 bg-slate-900/90 hover:bg-slate-850 hover:text-amber-400 text-slate-300 transition-colors cursor-pointer tabular-nums"
            >
              {tc.amount} TL ({tc.expectedRate === 0.18 ? '%18' : '%8'})
            </button>
          ))}
        </div>

        {/* Terminal Window Box */}
        <div className="bg-[#0b101b] border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs sm:text-sm">
          {/* Top Bar of Window */}
          <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-xs text-slate-400 font-medium hidden sm:inline">
                enes@linux-dev: ~/workspace/KDVTutariHesaplayici.java
              </span>
            </div>
            <div className="text-xs text-slate-400">
              Java OpenJDK 21 (Scanner STDIN / STDOUT)
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 space-y-6 max-h-[480px] overflow-y-auto">
            {/* Initial Shell Command */}
            <div className="text-slate-400">
              <span className="text-emerald-400">enes@dev:~$</span> javac KDVTutariHesaplayici.java && java KDVTutariHesaplayici
            </div>

            {runs.length === 0 ? (
              <div className="text-slate-500 italic py-4">
                Konsol ekranı temizlendi. Aşağıdaki alana bir tutar yazıp Enter'a basarak programı çalıştırabilirsiniz.
              </div>
            ) : (
              runs.map((run, idx) => (
                <div key={run.id} className="space-y-1.5 border-b border-slate-900/80 pb-5 last:border-b-0 last:pb-0">
                  {idx > 0 && (
                    <div className="text-slate-500 text-xs pt-2">
                      <span className="text-emerald-400">enes@dev:~$</span> java KDVTutariHesaplayici [{run.timestamp}]
                    </div>
                  )}

                  <div className="text-slate-300">=================================================</div>
                  <div className="text-amber-400 font-semibold tracking-wide">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; KDV TUTARI HESAPLAMA PROGRAMI
                  </div>
                  <div className="text-slate-300">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Geliştirici: <span className="text-white font-bold">Enes Öztürk</span>
                  </div>
                  <div className="text-slate-300">=================================================</div>

                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="text-cyan-300">Lütfen para tutarını (TL) giriniz:</span>
                    <span className="bg-slate-800 text-amber-300 font-bold px-2 py-0.5 rounded tabular-nums">
                      {run.inputAmount}
                    </span>
                  </div>

                  <div className="text-slate-300">-------------------------------------------------</div>
                  <div className="text-slate-200">
                    KDV'siz Tutar : <span className="text-white font-bold tabular-nums">{formatNumber(run.inputAmount)} TL</span>
                  </div>
                  <div className="text-slate-200">
                    KDV Oranı     : <span className="text-amber-400 font-bold tabular-nums">%{Math.round(run.rate * 100)}</span>
                    <span className="text-slate-400 text-xs ml-2">
                      ({run.inputAmount <= 1000 ? '0-1000 TL aralığı' : '1000 TL üzeri'})
                    </span>
                  </div>
                  <div className="text-slate-200">
                    KDV Tutarı    : <span className="text-amber-300 font-bold tabular-nums">{formatNumber(run.kdvAmount)} TL</span>
                  </div>
                  <div className="text-slate-200">
                    KDV'li Fiyat  : <span className="text-emerald-400 font-bold tabular-nums">{formatNumber(run.total)} TL</span>
                  </div>
                  <div className="text-slate-300">=================================================</div>
                  <div className="text-slate-400 text-xs">
                    İmza: Enes Öztürk - Başarıyla tamamlandı. (Process finished with exit code 0)
                  </div>
                </div>
              ))
            )}

            {/* Live Input Prompt Row */}
            <div className="pt-2 flex items-center gap-2">
              <span className="text-emerald-400 shrink-0">enes@dev:~$</span>
              <span className="text-slate-400 shrink-0 hidden sm:inline">java KDVTutariHesaplayici &gt;</span>
              <div className="relative flex-1 flex items-center">
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Para tutarını girin (Örn: 10, 500, 1000, 1500)..."
                  className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded px-3 py-1.5 text-white font-mono text-xs sm:text-sm outline-none tabular-nums"
                />
              </div>
              <button
                onClick={() => executeJavaProgram()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded text-xs transition-colors cursor-pointer shrink-0"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Çalıştır (Enter)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
