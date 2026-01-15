
import React from 'react';

const HomeView: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6 pb-24">
      {/* Header */}
      <header className="flex items-center p-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-cover border-2 border-primary/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBIJ5xcZGGfZQJS7xGbIoysGOqfsHRi7KtJaaNK72v0x-trftYwV7VtvlDP2jd8k9LOdrN9x65sSQx6qBenwq7_0u-MyjAYMUcQm8vmZ19A9h-dN08CTUhyb0aTKyLNHcIA0BUMBHj_mHjeDIQ7WQNE4u8wnwTJKQoRD47pxV9cqqbXFW3ME0hoRwJYaYIM1CTmXudko7a9RQqlOPokD_paiSAsGvOLrVzo9nIvTsN-MDHDFwmB_m4t72YK5A1pzJzB8KudD2EIgWA")' }}></div>
          <div>
            <p className="text-[#9c5e49] text-[10px] font-bold uppercase tracking-wider">准备好去跑步了吗？</p>
            <h2 className="text-xl font-black">你好, Alex!</h2>
          </div>
        </div>
        <button className="relative size-10 flex items-center justify-center rounded-full bg-white dark:bg-[#25282c] shadow-sm border border-[#f4eae7] dark:border-none">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 rounded-full bg-primary"></span>
        </button>
      </header>

      {/* Quick Start Card */}
      <div className="px-4">
        <button className="group relative w-full h-20 bg-primary text-white rounded-xl flex items-center justify-between px-6 shadow-lg shadow-primary/20 active:scale-95 transition-all overflow-hidden">
          <div className="flex items-center gap-4 z-10">
            <div className="bg-white/20 p-2 rounded-lg"><span className="material-symbols-outlined text-3xl">play_arrow</span></div>
            <span className="text-xl font-bold tracking-tight">快速开始</span>
          </div>
          <span className="material-symbols-outlined opacity-50 z-10">chevron_right</span>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/10 to-transparent"></div>
        </button>
      </div>

      {/* Weather Section */}
      <section className="px-4">
        <h3 className="text-lg font-bold mb-3">今日天气</h3>
        <div className="flex gap-4 rounded-xl bg-white dark:bg-[#25282c] p-5 shadow-sm border border-[#f4eae7] dark:border-none">
          <div className="flex-1 flex flex-col justify-between py-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">light_mode</span>
              <p className="text-2xl font-black">22°C <span className="text-sm font-medium text-[#9c5e49] ml-1">· 晴朗</span></p>
            </div>
            <p className="text-accent-teal text-sm font-semibold mt-1">非常适合今天的户外运动</p>
            <div className="flex gap-4 mt-3">
              <span className="flex items-center gap-1 text-[10px] font-bold text-[#9c5e49] uppercase"><span className="material-symbols-outlined text-sm">air</span> 6公里/小时</span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-[#9c5e49] uppercase"><span className="material-symbols-outlined text-sm">humidity_percentage</span> 42%</span>
            </div>
          </div>
          <div className="w-24 h-24 rounded-lg bg-cover bg-center border border-black/5" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBYEhL3vUas79FmWihHpVFIUTc3meTRF0LdQ7XHXvumLh-0LCowno_XNj_r9f4RNZ3Ai3RM89SojZi6cX9N1rnIoJsEuPQ9GP2NJdsVDtugRx8XjmMtXCFK3m-9nZhF3400IOQ3A_zyWEZRKPodwZ1M3vaxVe7sDMgjShaLW07nUoYgB-RIUZaIHcEakvhYSmKdoRmG4st3zaO1rNPjyu3A0MUXDE84EA0eqcCYjLoY5nViqJvITyWHDrljxLg6bDTjxT_u6LaUXtM")' }}></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4">
        <div className="flex items-end justify-between mb-3">
          <h3 className="text-lg font-bold">每周统计</h3>
          <span className="text-primary text-sm font-bold">详细数据</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="row-span-2 bg-white dark:bg-[#25282c] rounded-xl p-5 shadow-sm border border-[#f4eae7] dark:border-none flex flex-col justify-between">
            <div>
              <p className="text-[#9c5e49] text-[10px] font-bold uppercase tracking-widest">目标进度</p>
              <p className="text-xl font-black mt-1">75%</p>
            </div>
            <div className="relative aspect-square flex items-center justify-center my-4">
              <svg className="w-full h-full -rotate-90">
                <circle cx="50%" cy="50%" r="40%" fill="transparent" stroke="currentColor" className="text-gray-100 dark:text-zinc-800" strokeWidth="8" />
                <circle cx="50%" cy="50%" r="40%" fill="transparent" stroke="currentColor" className="text-primary" strokeWidth="8" strokeDasharray="251" strokeDashoffset="63" strokeLinecap="round" />
              </svg>
              <span className="absolute material-symbols-outlined text-primary text-3xl">trending_up</span>
            </div>
            <p className="text-[10px] text-center text-[#9c5e49] font-medium">还差12.5公里即可达成目标</p>
          </div>
          <div className="bg-white dark:bg-[#25282c] rounded-xl p-4 shadow-sm border border-[#f4eae7] dark:border-none">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-lg">route</span>
              <p className="text-[#9c5e49] text-[10px] font-bold uppercase">距离</p>
            </div>
            <p className="text-2xl font-black">24.8 <span className="text-xs">公里</span></p>
          </div>
          <div className="bg-white dark:bg-[#25282c] rounded-xl p-4 shadow-sm border border-[#f4eae7] dark:border-none">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-lg">timer</span>
              <p className="text-[#9c5e49] text-[10px] font-bold uppercase">时间</p>
            </div>
            <p className="text-2xl font-black">3时 12分</p>
          </div>
        </div>
        
        {/* Calories Card */}
        <div className="mt-4 bg-white dark:bg-[#25282c] rounded-xl p-4 flex items-center justify-between shadow-sm border border-[#f4eae7] dark:border-none">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg"><span className="material-symbols-outlined text-primary">local_fire_department</span></div>
            <div>
              <p className="text-[#9c5e49] text-[10px] font-bold uppercase tracking-widest">卡路里</p>
              <p className="text-xl font-black">1,850 千卡</p>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="w-6 h-1 bg-primary rounded-full"></div>
            <div className="w-4 h-1 bg-primary/30 rounded-full"></div>
            <div className="w-2 h-1 bg-primary/30 rounded-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
