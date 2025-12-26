
import React from 'react';

export const HistoryPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-2">Analysis History</h1>
        <p className="text-slate-400">Review your past detections and shopping finds.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="glass rounded-2xl overflow-hidden group hover:border-cyan-500/30 transition-all">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={`https://picsum.photos/id/${item + 20}/600/400`} 
                alt="History Frame" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white py-2 rounded-lg font-bold text-sm">
                  View Full Details
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase">Detection Session</span>
                <span className="text-xs text-slate-500">2h ago</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Office Attire Analysis</h3>
              <p className="text-slate-400 text-sm mb-4">Detected 4 items including a luxury watch and navy blue blazer.</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                  <i className="fa-solid fa-check text-green-400 text-xs"></i>
                </div>
                <span className="text-xs text-slate-300 font-medium">Successfully matched 2/4 items</span>
              </div>
            </div>
          </div>
        ))}

        <div className="glass rounded-2xl border-dashed border-white/10 flex flex-col items-center justify-center p-12 text-center min-h-[300px]">
          <i className="fa-solid fa-clock-rotate-left text-slate-700 text-4xl mb-4"></i>
          <p className="text-slate-500 italic">Analysis history is stored locally in your current session.</p>
        </div>
      </div>
    </div>
  );
};
