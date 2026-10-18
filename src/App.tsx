/**
 * KDV Tutarı Hesaplayan Program - Enes Öztürk
 * Java 101 Ödevi & İnteraktif Web Simülatörü
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { VisualCalculator } from './components/VisualCalculator';
import { TerminalSimulator } from './components/TerminalSimulator';
import { JavaCodeViewer } from './components/JavaCodeViewer';
import { HomeworkDossier } from './components/HomeworkDossier';
import { Footer } from './components/Footer';
import { Check } from 'lucide-react';

export default function App() {
  const [amount, setAmount] = useState<number>(10);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-500 text-slate-950 font-semibold text-xs rounded-lg shadow-2xl transition-all animate-bounce">
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Header onCopyNotice={showToast} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection onSelectAmount={setAmount} />
        <VisualCalculator amount={amount} setAmount={setAmount} onCopyNotice={showToast} />
        <TerminalSimulator />
        <JavaCodeViewer onCopyNotice={showToast} />
        <HomeworkDossier onCopyNotice={showToast} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
