import React, { useRef } from 'react';
import { UploadCloud, FileVideo } from 'lucide-react';

interface UploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  disabled?: boolean;
}

export const Uploader: React.FC<UploaderProps> = ({ onFileSelect, selectedFile, disabled }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        onFileSelect(file);
      } else {
        alert("Mohon unggah file video saja.");
      }
    }
  };

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  return (
    <div 
      className={`relative border-2 border-dashed rounded-xl p-8 transition-colors text-center cursor-pointer
        ${disabled ? 'bg-slate-50 border-slate-200 cursor-not-allowed' : 'hover:bg-blue-50/50 border-slate-300 hover:border-blue-400'}
        ${selectedFile ? 'bg-blue-50/30 border-blue-200' : ''}
      `}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="video/*"
        onChange={(e) => e.target.files && onFileSelect(e.target.files[0])}
        disabled={disabled}
      />

      <div className="flex flex-col items-center gap-3">
        {selectedFile ? (
          <>
            <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
              <FileVideo size={32} />
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-lg">{selectedFile.name}</p>
              <p className="text-slate-500 text-sm">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <p className="text-xs text-slate-400 mt-2">Klik untuk mengganti file</p>
          </>
        ) : (
          <>
            <div className="p-4 bg-slate-100 text-slate-400 rounded-full">
              <UploadCloud size={32} />
            </div>
            <div>
              <p className="font-semibold text-slate-700 text-lg">Unggah Video Anda</p>
              <p className="text-slate-500 text-sm mt-1">
                Seret dan lepas file di sini, atau klik untuk memilih.
              </p>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              Mendukung MP4, WEBM, MOV, MKV (tergantung browser)
            </p>
          </>
        )}
      </div>
    </div>
  );
};