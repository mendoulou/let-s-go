
import React, { useState } from 'react';

interface SettingsViewProps {
  weeklyGoal: number;
  onGoalChange: (goal: number) => void;
  onPublishRoute?: (data: { distance: string; type: string }) => void;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredValue: number;
  currentValue: number;
  unit: string;
  color: string;
}

const SettingsView: React.FC<SettingsViewProps> = ({ weeklyGoal, onGoalChange, onPublishRoute }) => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const stats = {
    totalDistance: 24.8,
    totalRuns: 12,
    streak: 3
  };

  const achievements: Achievement[] = [
    { id: '1', name: '起步达人', description: '累计跑步超过 5 公里', icon: 'directions_walk', requiredValue: 5, currentValue: stats.totalDistance, unit: 'KM', color: 'bg-emerald-500' },
    { id: '2', name: '破风者', description: '累计跑步超过 20 公里', icon: 'bolt', requiredValue: 20, currentValue: stats.totalDistance, unit: 'KM', color: 'bg-primary' },
    { id: '3', name: '半马英雄', description: '累计跑步超过 50 公里', icon: 'military_tech', requiredValue: 50, currentValue: stats.totalDistance, unit: 'KM', color: 'bg-amber-500' },
    { id: '4', name: '晨曦猎人', description: '在早上 6:00 前完成一次跑步', icon: 'wb_sunny', requiredValue: 1, currentValue: 1, unit: '次', color: 'bg-sky-500' },
    { id: '5', name: '不懈追求', description: '连续跑步达到 7 天', icon: 'repeat', requiredValue: 7, currentValue: stats.streak, unit: '天', color: 'bg-indigo-500' },
  ];

  const historyData = [
    { id: '1', date: '2024-05-20', distance: 12.4, time: '01:05:22', pace: '5\'16"', type: '户外跑' },
    { id: '2', date: '2024-05-18', distance: 5.0, time: '00:24:15', pace: '4\'51"', type: '间歇跑' },
    { id: '3', date: '2024-05-15', distance: 8.2, time: '00:45:10', pace: '5\'30"', type: '越野跑' },
  ];

  return (
    <div className="flex flex-col pb-24 max-w-md mx-auto min-h-screen relative">
      <header className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 justify-between border-b border-black/5">
        <div className="flex-1"></div>
        <h2 className="text-lg font-black tracking-tight flex-[2] text-center text-gray-800 dark:text-gray-100">我的</h2>
        <div className="flex-1 text-right">
           <button className="material-symbols-outlined text-gray-400">settings</button>
        </div>
      </header>

      <main className="space-y-6 p-4">
        {/* Profile Card */}
        <section>
          <div className="bg-white dark:bg-[#25282c] rounded-android shadow-sm border border-black/5 p-5 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-full bg-cover border-4 border-primary/10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCH6PxUng0xYcaIVi9SLBqanqW77nTvuOOWjumQ4yoz4T92SEp_Ru5BuXXhlZbq20K21A8JAr8tkBk4NEsSsuljjkVDbzpex5EBEaggX4HE7yOVLWEn6ZvBrRdUOB-Y4xQVOv1bzF6oMOgrp7SEUHq9flcKX22jPw2wJFPZQZANVV0oq3yFwVW6zyYu7oXNlp_KVTp0E9lLHqNi08u6vVNwuYQiA6YjOOEVlIi5wgNUo6vH2MVqnQfQjdZLHSyXXCExoMVmVmmypko")' }}></div>
              <div>
                <p className="font-black text-xl">Runner_Alex</p>
                <p className="text-xs text-[#9c5e49] font-bold">白银等级跑者 • LV.12</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400">edit</span>
          </div>
        </section>

        {/* Achievements Section */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest">勋章馆</h3>
            <span className="text-primary text-[10px] font-black">{achievements.filter(a => a.currentValue >= a.requiredValue).length}/{achievements.length} 已解锁</span>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 px-1">
            {achievements.map((a) => {
              const isUnlocked = a.currentValue >= a.requiredValue;
              return (
                <div key={a.id} onClick={() => setSelectedAchievement(a)} className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer">
                  <div className={`size-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm border-2 ${isUnlocked ? `${a.color} text-white border-white/20 scale-100` : 'bg-gray-100 dark:bg-white/5 text-gray-400 border-transparent grayscale'} group-active:scale-90`}>
                    <span className="material-symbols-outlined text-3xl">{a.icon}</span>
                  </div>
                  <span className={`text-[10px] font-black text-center w-16 truncate ${isUnlocked ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>{a.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Weekly Goal */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest">本周目标</h3>
            <span className="text-primary text-[10px] font-black">{weeklyGoal} KM</span>
          </div>
          <div className="bg-white dark:bg-[#25282c] rounded-android p-6 shadow-sm border border-black/5">
            <input type="range" min="5" max="100" step="5" value={weeklyGoal} onChange={(e) => onGoalChange(parseInt(e.target.value))} className="w-full h-2 bg-gray-100 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"/>
          </div>
        </section>

        {/* History with Publish Integration */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest">运动历史</h3>
            <button className="text-primary text-[10px] font-black uppercase tracking-widest">查看全部</button>
          </div>
          <div className="space-y-3">
            {historyData.map((item) => (
              <div key={item.id} className="bg-white dark:bg-[#25282c] rounded-2xl p-4 shadow-sm border border-black/5 flex flex-col gap-3 group">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => alert(`查看详情: ${item.date}`)}>
                  <div className="flex items-center gap-4">
                    <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary"><span className="material-symbols-outlined">directions_run</span></div>
                    <div>
                      <p className="font-bold text-sm">{item.type}</p>
                      <p className="text-[10px] text-gray-400 font-bold">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-base italic">{item.distance}<span className="text-[10px] ml-1 not-italic">KM</span></p>
                    <p className="text-[10px] text-[#9c5e49] font-bold uppercase">{item.time}</p>
                  </div>
                </div>
                <div className="flex justify-end pt-2 border-t border-black/5">
                  <button 
                    onClick={() => onPublishRoute?.({ distance: item.distance.toString(), type: item.type })}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest active:bg-primary active:text-white transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">share</span>
                    发布路线
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Achievement Dialog */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedAchievement(null)}></div>
          <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-sm rounded-[32px] p-8 z-10 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex flex-col items-center text-center">
              <div className={`size-24 rounded-full flex items-center justify-center text-white mb-6 shadow-lg ${selectedAchievement.currentValue >= selectedAchievement.requiredValue ? selectedAchievement.color : 'bg-gray-300'}`}>
                <span className="material-symbols-outlined text-5xl">{selectedAchievement.icon}</span>
              </div>
              <h4 className="text-2xl font-black mb-2">{selectedAchievement.name}</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{selectedAchievement.description}</p>
              <button onClick={() => setSelectedAchievement(null)} className="w-full bg-primary text-white py-4 rounded-2xl font-black">好的</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsView;
