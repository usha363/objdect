
import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player/youtube';

interface VideoPlayerProps {
  onPause: (url: string) => void;
  onFrameCapture: (file: File) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ onPause, onFrameCapture }) => {
  const [url, setUrl] = useState('');
  const [activeUrl, setActiveUrl] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoad = () => {
    if (url.trim()) {
      setActiveUrl(url);
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    setIsPaused(true);
    onPause(activeUrl);
  };

  const handlePlay = () => {
    setIsPaused(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFrameCapture(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL here..."
          className="flex-grow bg-slate-900/50 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
        />
        <button
          onClick={handleLoad}
          className="px-6 py-3 cyan-gradient text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20"
        >
          Load Video
        </button>
      </div>

      <div className="relative aspect-video glass rounded-2xl overflow-hidden group shadow-2xl">
        {activeUrl ? (
          <ReactPlayer
            url={activeUrl}
            width="100%"
            height="100%"
            controls
            onPause={handlePause}
            onPlay={handlePlay}
            config={{
              youtube: {
                playerVars: { showinfo: 0, rel: 0, modestbranding: 1 }
              }
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-4">
            <i className="fa-brands fa-youtube text-6xl opacity-20"></i>
            <p className="text-lg">No video loaded yet</p>
          </div>
        )}

        {isPaused && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm transition-all duration-300">
            <div className="text-center space-y-4 max-w-sm px-6 animate-in fade-in zoom-in duration-300">
              <div className="bg-white/10 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <i className="fa-solid fa-camera text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-white">Capture this moment</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Since direct browser screenshots of YouTube are restricted, please take a quick screenshot and upload it below for AI analysis.
              </p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-cyan-500/20"
              >
                Upload Snapshot
              </button>
            </div>
          </div>
        )}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden" 
        accept="image/*"
      />

      <div className="flex items-center gap-4 text-slate-400 bg-slate-800/30 p-4 rounded-xl border border-white/5">
        <i className="fa-solid fa-circle-info text-cyan-400"></i>
        <p className="text-sm">
          <strong>Tip:</strong> Pause the video at any frame where you see an item you like. Use Cmd+Shift+4 (Mac) or Win+Shift+S (Windows) to capture it.
        </p>
      </div>
    </div>
  );
};
