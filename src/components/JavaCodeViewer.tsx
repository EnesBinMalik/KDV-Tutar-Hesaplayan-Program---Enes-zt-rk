import React, { useState } from 'react';
import { Code2, Copy, Check, Download, BookOpen, Layers } from 'lucide-react';
import {
  JAVA_HOMEWORK_CODE,
  JAVA_TERNARY_CODE,
  JAVA_BASIC_CODE,
  CODE_EXPLANATIONS
} from '../data/javaCodeData';

interface JavaCodeViewerProps {
  onCopyNotice: (msg: string) => void;
}

export const JavaCodeViewer: React.FC<JavaCodeViewerProps> = ({ onCopyNotice }) => {
  const [activeTab, setActiveTab] = useState<'homework' | 'ternary' | 'basic'>('homework');
  const [copied, setCopied] = useState<boolean>(false);

  const getActiveCode = () => {
    switch (activeTab) {
      case 'homework':
        return JAVA_HOMEWORK_CODE;
      case 'ternary':
        return JAVA_TERNARY_CODE;
      case 'basic':
        return JAVA_BASIC_CODE;
    }
  };

  const getFileName = () => {
    switch (activeTab) {
      case 'homework':
        return 'KDVTutariHesaplayici.java';
      case 'ternary':
        return 'KDVTutariHesaplayiciTernary.java';
      case 'basic':
        return 'BasitKDVHesaplayici.java';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    onCopyNotice(`${getFileName()} panoya kopyalandı!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([getActiveCode()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = getFileName();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onCopyNotice(`${getFileName()} indirildi!`);
  };

  // Syntax highlighter for Java lines
  const renderCodeLines = (code: string) => {
    const lines = code.split('\n');
    return lines.map((line, index) => {
      // Very basic keyword styling
      let formatted = line;
      const isComment = line.trim().startsWith('//') || line.trim().startsWith('*') || line.trim().startsWith('/*');

      return (
        <div key={index} className="table-row hover:bg-slate-800/40 font-mono text-xs sm:text-[13px] leading-6">
          <span className="table-cell select-none text-right pr-4 text-slate-600 font-mono text-xs w-10">
            {index + 1}
          </span>
          <span className={`table-cell whitespace-pre ${isComment ? 'text-slate-400 italic' : 'text-slate-200'}`}>
            {line}
          </span>
        </div>
      );
    });
  };

  return (
    <section id="kaynak-kod" className="py-12 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
              <Code2 className="w-4 h-4" />
              <span>Kaynak Kod & İnceleme</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Java Kaynak Kodu (Enes Öztürk)
            </h2>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.java İndir</span>
            </button>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-lg w-fit mb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('homework')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'homework'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Ödev Çözümü (if - else)
          </button>
          <button
            onClick={() => setActiveTab('ternary')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'ternary'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Alternatif Çözüm (Ternary ? :)
          </button>
          <button
            onClick={() => setActiveTab('basic')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'basic'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Sabit %18 Başlangıç
          </button>
        </div>

        {/* Code display card */}
        <div className="bg-[#0b101b] border border-slate-800 rounded-xl overflow-hidden shadow-2xl mb-8">
          <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-semibold">{getFileName()}</span>
              <span>·</span>
              <span>UTF-8</span>
              <span>·</span>
              <span>Enes Öztürk İmzalı</span>
            </div>
            <span className="text-slate-500">Java Standard Edition</span>
          </div>

          <div className="p-4 sm:p-6 overflow-x-auto max-h-[550px] overflow-y-auto">
            <div className="table w-full">{renderCodeLines(getActiveCode())}</div>
          </div>
        </div>

        {/* Technical Explanations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CODE_EXPLANATIONS.map((item, idx) => (
            <div key={idx} className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-amber-300 mb-2">{item.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
