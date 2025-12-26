
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../types';

export const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to={AppRoute.Landing} className="flex items-center gap-3 group">
          <div className="w-10 h-10 cyan-gradient rounded-xl flex items-center justify-center cyan-glow group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-video text-white text-xl"></i>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Vision<span className="text-cyan-400">Shop</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to={AppRoute.Dashboard} 
            className={`font-medium transition-colors ${isActive(AppRoute.Dashboard) ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
          >
            Dashboard
          </Link>
          <Link 
            to={AppRoute.History} 
            className={`font-medium transition-colors ${isActive(AppRoute.History) ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
          >
            History
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
            Help
          </button>
          <Link 
            to={AppRoute.Dashboard}
            className="cyan-gradient text-white px-5 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20"
          >
            Analyze Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export const Footer: React.FC = () => (
  <footer className="py-12 px-6 border-t border-white/5 bg-slate-950">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 cyan-gradient rounded-lg flex items-center justify-center">
          <i className="fa-solid fa-video text-white text-sm"></i>
        </div>
        <span className="text-lg font-bold text-white">VisionShop</span>
      </div>
      <p className="text-slate-500 text-sm">
        © 2024 VisionShop AI. Powered by Gemini.
      </p>
      <div className="flex gap-6">
        <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors"><i className="fa-brands fa-github text-xl"></i></a>
        <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors"><i className="fa-brands fa-twitter text-xl"></i></a>
      </div>
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        {children}
      </main>
      <Footer />
    </div>
  );
};
