
import React from 'react';
import { View } from '../types';

interface BottomNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { icon: 'grid_view', label: '首页', view: View.HOME },
    { icon: 'explore', label: '发现', view: View.DISCOVERY },
    { icon: 'play_arrow', label: '开跑', view: View.TRACKING, isAction: true },
    { icon: 'group', label: '社区', view: View.COMMUNITY },
    { icon: 'person', label: '设置', view: View.SETTINGS },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-[#f4eae7] dark:border-[#25282c] px-6 py-2 flex justify-between items-center max-w-md mx-auto z-50">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => onNavigate(item.view)}
          className={`flex flex-col items-center gap-1 transition-all ${
            item.isAction ? '' : currentView === item.view ? 'text-primary' : 'text-[#9c5e49] dark:text-[#c4a195]'
          }`}
        >
          {item.isAction ? (
            <div className="-mt-8 size-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/40 border-4 border-white dark:border-background-dark active:scale-95">
              <span className="material-symbols-outlined text-3xl">play_arrow</span>
            </div>
          ) : (
            <>
              <span className={`material-symbols-outlined ${currentView === item.view ? 'fill-1' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-bold">{item.label}</span>
            </>
          )}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
