
import React, { useState } from 'react';

interface ReportsViewProps {
  onBack: () => void;
}

type Tab = 'WEEK' | 'YEAR' | 'TOTAL';

const ReportsView: React.FC<ReportsViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('WEEK');

  // 模拟数据
  const weekData = [
    { day: '一', val: 5.2 },
    { day: '二', val: 8.4 },
    { day: '三', val: 0 },
    { day: '四', val: 12.1 },
    { day: '五', val: 4.5 },
    { day: '六', val: 15.0 },
    { day: '日', val: 6.2 },
  ];

  const yearData = [
    { month: '1月', val: 120 }, { month: '2月', val: 145 }, { month: '3月', val: 98 },
    { month: '4月', val: 180 }, { month: '5月', val: 210 }, { month: '6月', val: 155 },
    { month: '7月', val: 190 }, { month: '8月', val: 220 }, { month: '9月', val: 200 },
    { month: '10月', val: 185 }, { month: '11月', val: 140 }, { month: '12月', val: 160 },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-background-light dark:bg-background-dark animate-in slide-in-from-right duration-300">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 flex items-center gap-4">
        <button onClick={onBack} className="size-10 rounded-full flex items-center justify-center bg-white dark:bg-white/5 shadow-sm active:scale-90 transition-all">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-black tracking-tight">运动报表</h1>
      </header>

      <main className="px-4 space-y-6 pt-2">
        {/* Tab Switcher */}
        <div className="flex bg-[#f4eae7] dark:bg-white/5 p-1 rounded-2xl">
          {(['WEEK', 'YEAR', 'TOTAL'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeTab === tab 
                ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-sm' 
                : 'text-[#9c5e49] dark:text-gray-500'
              }`}
            >
              {tab === 'WEEK' ? '本周' : tab === 'YEAR' ? '全年' : '累计'}
            </button>
          ))}
        </div>

        {activeTab === 'WEEK' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#25282c] rounded-3xl p-6 shadow-sm border border-black/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#9c5e49] mb-6">本周距离 (KM)</p>
              <div className="flex items-end justify-between h-40 gap-2">
                {weekData.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="relative w-full flex items-end justify-center h-32">
                      <div 
                        className={`w-full rounded-t-lg transition-all duration-700 ease-out ${d.val > 10 ? 'bg-primary' : 'bg-primary/40'}`}
                        style={{ height: `${(d.val / 15) * 100}%` }}
                      >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                          {d.val}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/5 p-5 rounded-3xl border border-primary/10">
                <p className="text-[10px] font-black text-primary uppercase mb-1">平均配速</p>
                <p className="text-2xl font-black italic">5'12"</p>
              </div>
              <div className="bg-accent-teal/5 p-5 rounded-3xl border border-accent-teal/10">
                <p className="text-[10px] font-black text-accent-teal uppercase mb-1">消耗热量</p>
                <p className="text-2xl font-black">3,420 <span className="text-xs">Kcal</span></p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'YEAR' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#25282c] rounded-3xl p-6 shadow-sm border border-black/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#9c5e49] mb-4">2024 年度趋势</p>
              <div className="h-48 w-full relative flex items-end gap-1">
                {yearData.map((m) => (
                  <div key={m.month} className="flex-1 bg-primary/20 hover:bg-primary rounded-sm transition-colors relative group" style={{ height: `${(m.val / 250) * 100}%` }}>
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-20">
                        {m.val} km
                     </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 px-1">
                <span className="text-[8px] font-bold text-gray-400">1月</span>
                <span className="text-[8px] font-bold text-gray-400">6月</span>
                <span className="text-[8px] font-bold text-gray-400">12月</span>
              </div>
            </div>
            <div className="bg-white dark:bg-[#25282c] rounded-3xl p-6 shadow-sm border border-black/5 flex items-center justify-between">
               <div>
                 <p className="text-[10px] font-black text-[#9c5e49] uppercase mb-1">年度总距离</p>
                 <p className="text-3xl font-black">1,824.5 <span className="text-sm font-bold text-gray-400">KM</span></p>
               </div>
               <div className="size-14 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-amber-500 text-3xl">emoji_events</span>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'TOTAL' && (
          <div className="space-y-4">
             <div className="bg-primary p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary/20 relative overflow-hidden">
                <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80 mb-2">Total Lifetime Distance</p>
                <p className="text-6xl font-black tracking-tighter">4,280<span className="text-xl ml-2 opacity-60">KM</span></p>
                <div className="mt-8 flex gap-8">
                   <div>
                      <p className="text-[10px] font-bold opacity-60 uppercase">Runs</p>
                      <p className="text-xl font-black">342</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-bold opacity-60 uppercase">Hours</p>
                      <p className="text-xl font-black">856</p>
                   </div>
                </div>
                <span className="absolute -bottom-10 -right-10 material-symbols-outlined text-[12rem] opacity-10 rotate-12">history_edu</span>
             </div>

             <div className="grid grid-cols-2 gap-4">
                {[
                  { label: '海拔总爬升', val: '12,450', unit: 'M', icon: 'terrain' },
                  { label: '平均步频', val: '168', unit: 'SPM', icon: 'Electric_Bolt' },
                  { label: '记录保持', val: '42.195', unit: 'KM', icon: 'military_tech' },
                  { label: '活跃城市', val: '12', unit: 'Cities', icon: 'location_city' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white dark:bg-[#25282c] p-5 rounded-3xl border border-black/5 shadow-sm">
                    <span className="material-symbols-outlined text-primary mb-2">{stat.icon}</span>
                    <p className="text-[10px] font-black text-[#9c5e49] uppercase mb-1">{stat.label}</p>
                    <p className="text-xl font-black">{stat.val} <span className="text-[10px] font-bold text-gray-400">{stat.unit}</span></p>
                  </div>
                ))}
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ReportsView;
