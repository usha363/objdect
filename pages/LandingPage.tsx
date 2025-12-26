
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../types';

export const LandingPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero Section */}
      <div className="py-20 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-4 animate-in fade-in slide-in-from-bottom-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Next-Gen AI Video Analysis
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
          See something you love? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Shop it instantly.</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The smart shopping assistant that watches videos with you. Pause any scene, analyze the frame with AI, and find the look on your favorite stores.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            to={AppRoute.Dashboard}
            className="w-full sm:w-auto cyan-gradient text-white px-8 py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-xl shadow-cyan-500/25"
          >
            Get Started Free
          </Link>
          <a 
            href="#how-it-works"
            className="w-full sm:w-auto glass text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/5 transition-all"
          >
            How it works
          </a>
        </div>
      </div>

      {/* Stats/Social Proof */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/5">
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-1">99%</div>
          <div className="text-sm text-slate-500 uppercase tracking-widest">Detection Rate</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-1">&lt; 2s</div>
          <div className="text-sm text-slate-500 uppercase tracking-widest">Analysis Speed</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-1">50k+</div>
          <div className="text-sm text-slate-500 uppercase tracking-widest">Items Found</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-1">24/7</div>
          <div className="text-sm text-slate-500 uppercase tracking-widest">AI Support</div>
        </div>
      </div>

      {/* Features */}
      <section id="how-it-works" className="py-24 space-y-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Three simple steps</h2>
          <p className="text-slate-400">From screen to cart in seconds.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: 'fa-link',
              title: 'Paste Video URL',
              desc: 'Import any YouTube video or movie trailer into our smart analyzer player.'
            },
            {
              icon: 'fa-pause',
              title: 'Pause & Capture',
              desc: 'Find a look you like, pause the video, and upload the frame with one click.'
            },
            {
              icon: 'fa-cart-shopping',
              title: 'Shop the Look',
              desc: 'AI detects clothing, shoes, and accessories and finds them on Amazon or Flipkart.'
            }
          ].map((step, idx) => (
            <div key={idx} className="glass p-8 rounded-3xl space-y-6 hover:border-cyan-500/30 transition-colors group">
              <div className="w-16 h-16 cyan-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                <i className={`fa-solid ${step.icon} text-2xl text-white`}></i>
              </div>
              <h3 className="text-2xl font-bold text-white">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20">
        <div className="glass rounded-[2rem] p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 blur-[100px] -mr-32 -mt-32"></div>
          <div className="grid md:grid-cols-2 items-center gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white leading-tight">Ready to upgrade your shopping experience?</h2>
              <p className="text-slate-400">Stop asking "where can I buy that?" in the comments. Let VisionShop AI do the work for you.</p>
              <Link 
                to={AppRoute.Dashboard}
                className="inline-flex items-center gap-3 cyan-gradient text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-cyan-500/20"
              >
                Launch Dashboard <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://picsum.photos/id/1012/600/400" 
                alt="Product Demo" 
                className="rounded-2xl shadow-2xl border border-white/10"
              />
              <div className="absolute -bottom-6 -left-6 glass p-4 rounded-xl border-l-4 border-cyan-500 animate-bounce duration-[3000ms]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-xs text-white">1</div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Detected Item</div>
                    <div className="text-sm font-bold text-white">Classic Denim Jacket</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
