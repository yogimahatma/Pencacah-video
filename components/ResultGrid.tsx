import React from 'react';
import { FrameData } from '../types';
import { Download, Copy, Sparkles } from 'lucide-react';

interface ResultGridProps {
  frames: FrameData[];
  onGeneratePrompts?: () => void;
  isGenerating?: boolean;
}

export const ResultGrid: React.FC<ResultGridProps> = ({ frames, onGeneratePrompts, isGenerating }) => {
  if (frames.length === 0) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const hasPrompts = frames.some(f => f.aiPrompt);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          Hasil Frame & Prompt AI
        </h3>
        
        {!hasPrompts && onGeneratePrompts && (
          <button 
            onClick={onGeneratePrompts}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 text-sm font-medium"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Menganalisis Frame...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Generate Prompt Video (AI)
              </>
            )}
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {frames.map((frame) => (
          <div key={frame.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 flex flex-col">
            <div className="relative aspect-video bg-slate-100">
              <img 
                src={frame.url} 
                alt={frame.fileName} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <div className="px-2 py-1 bg-black/60 text-white text-[10px] rounded backdrop-blur-sm">
                  {frame.timestamp.toFixed(1)}s
                </div>
              </div>
            </div>
            
            <div className="p-4 flex flex-col flex-grow space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">{frame.fileName}</span>
                <a 
                  href={frame.url} 
                  download={frame.fileName}
                  className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Unduh Gambar"
                >
                  <Download size={16} />
                </a>
              </div>

              {frame.aiPrompt ? (
                <div className="relative bg-slate-50 p-3 rounded-lg border border-slate-100 flex-grow">
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-4 hover:line-clamp-none transition-all">
                    {frame.aiPrompt}
                  </p>
                  <button 
                    onClick={() => handleCopy(frame.aiPrompt!)}
                    className="absolute top-2 right-2 p-1 bg-white shadow-sm border border-slate-200 rounded text-slate-400 hover:text-purple-600 transition-colors"
                    title="Salin Prompt"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              ) : (
                <div className="flex-grow flex items-center justify-center p-4 bg-slate-50 border border-slate-100 border-dashed rounded-lg">
                   <span className="text-xs text-slate-400 italic text-center">
                     Klik "Generate Prompt" untuk membuat deskripsi video AI
                   </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};