
import React from 'react';

interface SettingsViewProps {
  weeklyGoal: number;
  onGoalChange: (goal: number) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ weeklyGoal, onGoalChange }) => {
  return (
    <div className="flex flex-col pb-24 max-w-md mx-auto min-h-screen">
      <header className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 justify-between">
        <div className="flex-1"></div>
        <h2 className="text-lg font-black tracking-tight flex-[2] text-center">设置</h2>
        <div className="flex-1"></div>
      </header>

      <main className="space-y-4 p-4">
        {/* Profile */}
        <section>
          <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-3 px-1">个人中心</h3>
          <div className="bg-white dark:bg-[#25282c] rounded-2xl shadow-sm border border-black/5 p-4 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-full bg-cover border-2 border-primary/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCH6PxUng0xYcaIVi9SLBqanqW77nTvuOOWjumQ4yoz4T92SEp_Ru5BuXXhlZbq20K21A8JAr8tkBk4NEsSsuljjkVDbzpex5EBEaggX4HE7yOVLWEn6ZvBrRdUOB-Y4xQVOv1bzF6oMOgrp7SEUHq9flcKX22jPw2wJFPZQZANVV0oq3yFwVW6zyYu7oXNlp_KVTp0E9lLHqNi08u6vVNwuYQiA6YjOOEVlIi5wgNUo6vH2MVqnQfQjdZLHSyXXCExoMVmVmmypko")' }}></div>
              <div>
                <p className="font-black text-base">账户设置</p>
                <p className="text-xs text-[#9c5e49]">管理您的个人资料和安全</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
          </div>
        </section>

        {/* Goal Setting */}
        <section className="pt-2">
          <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-3 px-1">运动目标</h3>
          <div className="bg-white dark:bg-[#25282c] rounded-3xl p-6 shadow-sm border border-black/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-black text-lg">每周跑步目标</p>
                <p className="text-xs text-gray-400 font-bold">设定一个富有挑战的周里程</p>
              </div>
              <div className="bg-primary/10 px-3 py-1 rounded-full">
                <span className="text-primary font-black text-xl">{weeklyGoal}</span>
                <span className="text-primary text-[10px] font-bold ml-1 uppercase">km</span>
              </div>
            </div>
            
            <div className="px-1 py-4">
              <input 
                type="range" 
                min="5" 
                max="100" 
                step="5"
                value={weeklyGoal}
                onChange={(e) => onGoalChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-3 px-1">
                <span className="text-[10px] font-black text-gray-300">5km</span>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                  {weeklyGoal <= 20 ? '初级' : weeklyGoal <= 50 ? '进阶' : '挑战'}
                </span>
                <span className="text-[10px] font-black text-gray-300">100km</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {[20, 40, 60].map(val => (
                <button 
                  key={val}
                  onClick={() => onGoalChange(val)}
                  className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all border ${weeklyGoal === val ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-gray-50 dark:bg-white/5 text-gray-400 border-transparent'}`}
                >
                  {val}km
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="pt-2">
          <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-3 px-1">应用偏好</h3>
          <div className="bg-white dark:bg-[#25282c] rounded-2xl shadow-sm border border-black/5 divide-y divide-gray-50 dark:divide-white/5 overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary"><span className="material-symbols-outlined">notifications</span></div>
                <p className="font-bold">通知推送</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer active:bg-gray-50 dark:active:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className="size-10 bg-accent-teal/10 rounded-lg flex items-center justify-center text-accent-teal"><span className="material-symbols-outlined">straighten</span></div>
                <p className="font-bold">单位设置</p>
              </div>
              <div className="flex items-center gap-1 text-gray-400 text-sm font-bold">
                <span>公里 (km)</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </div>
            </div>
          </div>
        </section>

        {/* Info */}
        <section className="pt-6 text-center pb-8">
           <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 mx-auto mb-4">
            <span className="material-symbols-outlined text-white text-4xl">directions_run</span>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">RunnersHub v2.4.0</p>
          <div className="flex justify-center gap-6 mt-3">
            <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">服务条款</button>
            <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">隐私政策</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SettingsView;
