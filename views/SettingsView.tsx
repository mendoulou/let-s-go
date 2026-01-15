
import React from 'react';

const SettingsView: React.FC = () => {
  return (
    <div className="flex flex-col pb-24 max-w-md mx-auto min-h-screen">
      <header className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 justify-between">
        <button className="flex-1 flex justify-start"><span className="material-symbols-outlined">arrow_back_ios</span></button>
        <h2 className="text-lg font-black tracking-tight flex-[2] text-center">设置</h2>
        <div className="flex-1"></div>
      </header>

      <main className="space-y-2 p-4">
        {/* Profile */}
        <section>
          <h3 className="text-[#0e171b] dark:text-gray-300 text-[10px] font-black uppercase tracking-widest mb-3 px-1">个人中心</h3>
          <div className="bg-white dark:bg-[#1a2a30] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between active:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-full bg-cover border-2 border-primary/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCH6PxUng0xYcaIVi9SLBqanqW77nTvuOOWjumQ4yoz4T92SEp_Ru5BuXXhlZbq20K21A8JAr8tkBk4NEsSsuljjkVDbzpex5EBEaggX4HE7yOVLWEn6ZvBrRdUOB-Y4xQVOv1bzF6oMOgrp7SEUHq9flcKX22jPw2wJFPZQZANVV0oq3yFwVW6zyYu7oXNlp_KVTp0E9lLHqNi08u6vVNwuYQiA6YjOOEVlIi5wgNUo6vH2MVqnQfQjdZLHSyXXCExoMVmVmmypko")' }}></div>
              <div>
                <p className="font-black text-base">账户设置</p>
                <p className="text-xs text-[#508495]">管理您的个人资料和安全</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
          </div>
        </section>

        {/* Preferences */}
        <section className="pt-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest mb-3 px-1">应用偏好</h3>
          <div className="bg-white dark:bg-[#1a2a30] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 divide-y divide-gray-50 overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary"><span className="material-symbols-outlined">notifications</span></div>
                <p className="font-bold">通知</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer active:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary"><span className="material-symbols-outlined">straighten</span></div>
                <p className="font-bold">单位设置</p>
              </div>
              <div className="flex items-center gap-1 text-[#508495] text-sm">
                <span>公里 (km)</span>
                <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </div>
          </div>
        </section>

        {/* Info */}
        <section className="pt-4 text-center pb-8">
           <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 mx-auto mb-3">
            <span className="material-symbols-outlined text-white text-3xl">directions_run</span>
          </div>
          <p className="text-xs font-bold text-[#508495]">版本信息 v2.4.0</p>
          <div className="flex justify-center gap-4 mt-2">
            <button className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">服务条款</button>
            <span className="text-gray-300">|</span>
            <button className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">隐私政策</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SettingsView;
