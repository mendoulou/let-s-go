
import React from 'react';

const TrackingView: React.FC = () => {
  return (
    <div className="flex flex-col h-full min-h-screen pb-24">
      <header className="flex items-center justify-between px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="text-xs font-bold uppercase tracking-widest">实时追踪</span>
        </div>
        <div className="flex gap-4">
          <button><span className="material-symbols-outlined">music_note</span></button>
          <button><span className="material-symbols-outlined">settings</span></button>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-4 pt-4">
        {/* Timer Card */}
        <div className="mb-6 bg-white dark:bg-[#25282c] rounded-xl p-8 shadow-sm border border-black/5 dark:border-white/5 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">运动用时</p>
          <div className="flex justify-center items-baseline gap-2">
            <div className="flex flex-col items-center">
              <span className="text-6xl font-black tracking-tighter">00</span>
              <span className="text-[10px] uppercase font-bold text-gray-400">小时</span>
            </div>
            <span className="text-4xl font-black text-primary mb-4">:</span>
            <div className="flex flex-col items-center">
              <span className="text-6xl font-black tracking-tighter">42</span>
              <span className="text-[10px] uppercase font-bold text-gray-400">分钟</span>
            </div>
            <span className="text-4xl font-black text-primary mb-4">:</span>
            <div className="flex flex-col items-center">
              <span className="text-6xl font-black tracking-tighter">15</span>
              <span className="text-[10px] uppercase font-bold text-gray-400">秒</span>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-emerald-500">
            <span className="material-symbols-outlined text-sm">signal_cellular_alt</span>
            <span className="text-[10px] font-bold uppercase tracking-tight">GPS 信号强</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#f4eae7] dark:bg-primary/20 p-6 rounded-xl border-b-4 border-primary/30">
            <p className="text-xs font-bold uppercase tracking-wider opacity-70">距离 (公里)</p>
            <p className="text-4xl font-black tracking-tight leading-none">6.42</p>
          </div>
          <div className="bg-[#f4eae7] dark:bg-primary/20 p-6 rounded-xl border-b-4 border-primary/30">
            <p className="text-xs font-bold uppercase tracking-wider opacity-70">当前配速</p>
            <p className="text-4xl font-black tracking-tight leading-none">5'12"</p>
          </div>
        </div>

        {/* Map View */}
        <div className="relative flex-1 min-h-[300px] mb-6 overflow-hidden rounded-xl border border-black/5 shadow-inner">
          <div className="absolute inset-0 bg-cover grayscale-[0.2]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAUS7euLlezCCbp9mthdpRKgaCyaAleVT9L1G2o_-NdOvX_h9w3iyVii9bgARyJ25pA84alJCHciHOB39LrYdgM68BjJkcBhM_G_HtRwxvk3V4YRJkGTDB6BSFFjO_mhcsMcwyLg5JHkM2IFXg-mC4TQqFw7b0iX5zfMtO0zlq3Jvcpx-q2mpKp3DnwqbsxcuNy1Sd-uy_qOCnwQAJFWVCjeV5V_LI2pP_IXTU80jlUWjynorWo8agAHXcylB-5HKdNk_za5aBkJMY")' }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 10 90 L 30 70 L 50 75 L 70 40 L 85 55" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="85" cy="55" r="3" fill="#2dd4bf" />
              <circle cx="85" cy="55" r="6" fill="#2dd4bf" fillOpacity="0.3" />
            </svg>
          </div>
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="bg-white/90 dark:bg-black/90 p-2 rounded-lg shadow-md"><span className="material-symbols-outlined">my_location</span></button>
            <button className="bg-white/90 dark:bg-black/90 p-2 rounded-lg shadow-md"><span className="material-symbols-outlined">layers</span></button>
          </div>
          <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-black/5">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-primary text-sm">terrain</span>
              <span className="text-[10px] font-black tracking-tight">+142m 海拔</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button className="flex-[2] bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 py-5 rounded-xl font-black text-lg uppercase tracking-widest transition-all">
            <span className="material-symbols-outlined">pause_circle</span> 暂停
          </button>
          <button className="flex-1 bg-[#1c110d] dark:bg-[#32363b] text-white flex items-center justify-center gap-2 py-5 rounded-xl font-black text-lg uppercase tracking-widest relative overflow-hidden active:scale-95 transition-all">
            <span className="material-symbols-outlined">stop_circle</span> 停止
            <div className="absolute bottom-0 left-0 h-1 bg-primary/40 w-full opacity-50"></div>
          </button>
        </div>
      </main>
    </div>
  );
};

export default TrackingView;
