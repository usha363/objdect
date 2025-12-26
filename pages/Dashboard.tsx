
import React, { useState } from 'react';
import { VideoPlayer } from '../components/VideoPlayer';
import { AnalysisPanel } from '../components/AnalysisPanel';
import { analyzeFrame } from '../services/geminiService';
import { AnalysisResult } from '../types';

export const Dashboard: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFrameCapture = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        try {
          const result = await analyzeFrame(base64String);
          setAnalysisResult(result);
        } catch (err: any) {
          setError(err.message || "Failed to analyze frame. Please try again.");
          console.error(err);
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Failed to read image file.");
      setIsAnalyzing(false);
    }
  };

  const handleVideoPause = (url: string) => {
    console.log('Video paused:', url);
    // Visual feedback handled within the player
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Column: Player & Controls */}
        <div className="w-full lg:w-3/5 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Smart Analysis</h1>
            <p className="text-slate-400">Load a video, find a style, and let AI reveal the details.</p>
          </div>
          
          <VideoPlayer 
            onPause={handleVideoPause} 
            onFrameCapture={handleFrameCapture} 
          />

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right Column: Analysis Results */}
        <div className="w-full lg:w-2/5 sticky top-28">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Detection Panel</h2>
            {analysisResult && (
              <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">
                PROCESSED {new Date(analysisResult.timestamp).toLocaleTimeString()}
              </span>
            )}
          </div>

          {!isAnalyzing && !analysisResult ? (
            <div className="glass rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-6 min-h-[500px] border-dashed border-white/10">
              <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center">
                <i className="fa-solid fa-magnifying-glass text-slate-500 text-3xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Awaiting Snapshot</h3>
                <p className="text-slate-400 max-w-xs mx-auto">
                  Pause the video and upload a frame to see the AI magic happen here.
                </p>
              </div>
            </div>
          ) : (
            <AnalysisPanel result={analysisResult!} isLoading={isAnalyzing} />
          )}
        </div>
      </div>
    </div>
  );
};
