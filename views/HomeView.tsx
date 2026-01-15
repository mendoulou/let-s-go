
import React, { useState, useEffect } from 'react';

interface HomeViewProps {
  onQuickStart: () => void;
  onOpenReports: () => void;
  weeklyGoal: number;
}

const HomeView: React.FC<HomeViewProps> = ({ onQuickStart, onOpenReports, weeklyGoal }) => {
  const [greeting, setGreeting] = useState('你好');
  const [progressValue, setProgressValue] = useState(0);
  const currentDistance = 24.8; // 模拟当前已跑距离

  useEffect(() => {
    // 动态问候语
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('早上好');
    else if (hour < 18) setGreeting('下午好');
    else setGreeting('晚上好');

    // 根据目标计算进度
    const calculatedProgress = Math.min(Math.round((currentDistance / weeklyGoal) * 100), 100);
    const timer = setTimeout(() => setProgressValue(calculatedProgress), 500);
    return () => clearTimeout(timer);
  }, [weeklyGoal]);

  // 计算圆环进度
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progressValue / 100) * circumference;
  const remaining = Math.max(0, weeklyGoal - currentDistance).toFixed(1);

  return (
    <div className="flex flex-col space-y-6 pb-24 animate-in fade-in duration-500">
      {/* Header */}
      <header className="flex items-center p-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-full bg-cover border-2 border-primary/20 shadow-inner" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBIJ5xcZGGfZQJS7xGbIoysGOqfsHRi7KtJaaNK72v0x-trftYwV7VtvlDP2jd8k9LOdrN9x65sSQx6qBenwq7_0u-MyjAYMUcQm8vmZ19A9h-dN08CTUhyb0aTKyLNHcIA0BUMBHj_mHjeDIQ7WQNE4u8wnwTJKQoRD47pxV9cqqbXFW3ME0hoRwJYaYIM1CTmXudko7a9RQqlOPokD_paiSAsGvOLrVzo9nIvTsN-MDHDFwmB_m4t72YK5A1pzJzB8KudD2EIgWA")' }}></div>
          <div>
            <p className="text-[#9c5e49] text-[10px] font-black uppercase tracking-widest leading-none mb-1">RUNNERS HUB</p>
            <h2 className="text-xl font-black tracking-tight">{greeting}, Alex!</h2>
          </div>
        </div>
        <button className="relative size-10 flex items-center justify-center rounded-full bg-white dark:bg-[#25282c] shadow-sm border border-[#f4eae7] dark:border-none active:scale-90 transition-all">
          <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">notifications</span>
          <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-primary ring-2 ring-white dark:ring-[#25282c]"></span>
        </button>
      </header>

      {/* Quick Start Card */}
      <div className="px-4">
        <button 
          onClick={onQuickStart}
          className="group relative w-full h-24 bg-primary text-white rounded-3xl flex items-center justify-between px-6 shadow-xl shadow-primary/30 active:scale-[0.97] transition-all overflow-hidden"
        >
          <div className="flex items-center gap-4 z-10">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">play_arrow</span>
            </div>
            <div className="text-left">
              <span className="text-xl font-black tracking-tight block">快速开始</span>
              <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest">记录今天的运动</span>
            </div>
          </div>
          <span className="material-symbols-outlined opacity-50 z-10 group-hover:translate-x-1 transition-transform">chevron_right</span>
          <div className="absolute top-0 right-0 w-48 h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="100" cy="50" r="40" fill="none" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="100" cy="50" r="25" fill="none" stroke="white" strokeWidth="2" />
            </svg>
          </div>
        </button>
      </div>

      {/* Weather Section */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">今日天气</h3>
          <span className="text-[10px] font-bold text-accent-teal uppercase">上海, 浦东</span>
        </div>
        <div className="flex gap-4 rounded-3xl bg-white dark:bg-[#25282c] p-5 shadow-sm border border-[#f4eae7] dark:border-none">
          <div className="flex-1 flex flex-col justify-between py-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500 text-3xl animate-pulse">light_mode</span>
              <p className="text-3xl font-black tabular-nums">22°C <span className="text-xs font-bold text-[#9c5e49] dark:text-gray-400 align-top ml-1">晴</span></p>
            </div>
            <p className="text-accent-teal text-xs font-black mt-2 leading-relaxed">
              空气质量：极佳<br/>
              <span className="opacity-70 font-bold">非常适合今天的户外长跑</span>
            </p>
            <div className="flex gap-4 mt-4">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#9c5e49] uppercase bg-[#f4eae7]/50 dark:bg-black/20 px-2 py-1 rounded-md">
                <span className="material-symbols-outlined text-sm">air</span> 6km/h
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#9c5e49] uppercase bg-[#f4eae7]/50 dark:bg-black/20 px-2 py-1 rounded-md">
                <span className="material-symbols-outlined text-sm">humidity_percentage</span> 42%
              </span>
            </div>
          </div>
          <div className="w-28 h-28 rounded-2xl bg-cover bg-center border border-black/5 shadow-inner" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBYEhL3vUas79FmWihHpVFIUTc3meTRF0LdQ7XHXvumLh-0LCowno_XNj_r9f4RNZ3Ai3RM89SojZi6cX9N1rnIoJsEuPQ9GP2NJdsVDtugRx8XjmMtXCFK3m-9nZhF3400IOQ3A_zyWEZRKPodwZ1M3vaxVe7sDMgjShaLW07nUoYgB-RIUZaIHcEakvhYSmKdoRmG4st3zaO1rNPjyu3A0MUXDE84EA0eqcCYjLoY5nViqJvITyWHDrljxLg6bDTjxT_u6LaUXtM")' }}></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">本周目标</h3>
          <button 
            onClick={onOpenReports}
            className="text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/5 px-2 py-1 rounded-md transition-colors"
          >
            详细报表
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="row-span-2 bg-white dark:bg-[#25282c] rounded-3xl p-6 shadow-sm border border-[#f4eae7] dark:border-none flex flex-col items-center justify-center relative overflow-hidden">
            <div className="text-center z-10">
              <p className="text-[#9c5e49] text-[10px] font-black uppercase tracking-widest mb-1">完成度</p>
              <p className="text-3xl font-black tabular-nums">{progressValue}%</p>
            </div>
            
            <div className="relative size-32 my-4">
              <svg className="size-full -rotate-90">
                <circle 
                  cx="64" cy="64" r={radius} 
                  fill="transparent" 
                  stroke="currentColor" 
                  className="text-gray-100 dark:text-zinc-800" 
                  strokeWidth="8" 
                />
                <circle 
                  cx="64" cy="64" r={radius} 
                  fill="transparent" 
                  stroke="currentColor" 
                  className="text-primary transition-all duration-1000 ease-out" 
                  strokeWidth="8" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={offset} 
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-4xl opacity-20">flag</span>
              </div>
            </div>
            <p className="text-[10px] text-center text-[#9c5e49] font-bold leading-tight px-2">还差 {remaining} km<br/>达成 {weeklyGoal}km 目标</p>
            <div className="absolute -top-10 -right-10 size-24 bg-primary/5 blur-3xl rounded-full"></div>
          </div>

          <div className="bg-white dark:bg-[#25282c] rounded-3xl p-5 shadow-sm border border-[#f4eae7] dark:border-none flex flex-col justify-between group active:scale-95 transition-all">
            <div className="flex items-center gap-2">
              <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-lg">route</span>
              </div>
              <p className="text-[#9c5e49] text-[10px] font-black uppercase tracking-widest">总距离</p>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black tabular-nums tracking-tighter">{currentDistance}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">KILOMETERS</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#25282c] rounded-3xl p-5 shadow-sm border border-[#f4eae7] dark:border-none flex flex-col justify-between group active:scale-95 transition-all">
            <div className="flex items-center gap-2">
              <div className="size-8 bg-accent-teal/10 rounded-lg flex items-center justify-center text-accent-teal group-hover:bg-accent-teal group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-lg">timer</span>
              </div>
              <p className="text-[#9c5e49] text-[10px] font-black uppercase tracking-widest">总时长</p>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-black tabular-nums tracking-tighter">3:12:45</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">HH:MM:SS</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
