
import React, { useState } from 'react';
import { AnalysisResult, DetectedItem } from '../types';

interface AnalysisPanelProps {
  result: AnalysisResult;
  isLoading: boolean;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ result, isLoading }) => {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px] gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fa-solid fa-brain text-cyan-500 text-xl animate-pulse"></i>
          </div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-white">Scanning Frame...</h3>
          <p className="text-slate-400">Gemini is identifying items and fashion trends.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl overflow-hidden">
        <div className="relative group">
          <img 
            src={result.imageUrl} 
            alt="Analyzed Frame" 
            className="w-full h-auto max-h-[500px] object-contain bg-slate-900" 
          />
          
          {/* SVG Overlay for Bounding Boxes */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            viewBox="0 0 1000 1000" 
            preserveAspectRatio="none"
          >
            {result.items.map((item) => (
              <g 
                key={item.id} 
                className={`transition-all duration-300 ${hoveredItemId === item.id ? 'opacity-100' : 'opacity-40'}`}
              >
                <rect
                  x={item.boundingBox.xmin}
                  y={item.boundingBox.ymin}
                  width={item.boundingBox.xmax - item.boundingBox.xmin}
                  height={item.boundingBox.ymax - item.boundingBox.ymin}
                  fill="none"
                  stroke="#2dd4bf"
                  strokeWidth="4"
                  className="animate-in fade-in duration-500"
                />
                {hoveredItemId === item.id && (
                  <foreignObject
                    x={item.boundingBox.xmin}
                    y={Math.max(0, item.boundingBox.ymin - 40)}
                    width="200"
                    height="40"
                  >
                    <div className="bg-cyan-500 text-white text-[24px] font-bold px-3 py-1 rounded inline-block">
                      {item.name}
                    </div>
                  </foreignObject>
                )}
              </g>
            ))}
          </svg>
        </div>
        <div className="p-6 border-t border-white/5 bg-slate-900/50">
          <h4 className="text-cyan-400 font-semibold mb-2 flex items-center gap-2">
            <i className="fa-solid fa-wand-magic-sparkles"></i> AI Summary
          </h4>
          <p className="text-slate-300 leading-relaxed italic">
            "{result.summary}"
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {result.items.map((item) => (
          <div 
            key={item.id}
            onMouseEnter={() => setHoveredItemId(item.id)}
            onMouseLeave={() => setHoveredItemId(null)}
            className={`glass p-4 rounded-xl border-l-4 transition-all hover:scale-[1.02] cursor-default ${
              hoveredItemId === item.id ? 'border-l-cyan-500 bg-cyan-500/5' : 'border-l-transparent'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h5 className="font-bold text-white text-lg">{item.name}</h5>
              <span className="text-[10px] uppercase tracking-wider bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                {item.category}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-4 line-clamp-2">{item.description}</p>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex gap-2">
                <a 
                  href={`https://www.amazon.in/s?k=${encodeURIComponent(item.name + ' ' + (item.color || ''))}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-xs font-bold py-2 px-3 rounded-lg transition-colors flex items-center gap-2"
                >
                  <i className="fa-brands fa-amazon"></i> Amazon
                </a>
                <a 
                  href={`https://www.flipkart.com/search?q=${encodeURIComponent(item.name + ' ' + (item.color || ''))}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-bold py-2 px-3 rounded-lg transition-colors flex items-center gap-2"
                >
                  <i className="fa-solid fa-cart-shopping"></i> Flipkart
                </a>
              </div>
              {item.color && (
                <div 
                  className="w-5 h-5 rounded-full border border-white/20 shadow-inner" 
                  style={{ backgroundColor: item.color }}
                  title={`Color: ${item.color}`}
                ></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
