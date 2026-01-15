
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Android 平台初始化逻辑
 */
const initAndroidEnv = () => {
  // 模拟原生硬件加速检测
  console.log("RunnerHub: Android Environment Initialized");
  
  // 监听安卓系统深色模式切换
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
    if (e.matches) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };
  mediaQuery.addEventListener('change', handleThemeChange);
  handleThemeChange(mediaQuery);
};

const rootElement = document.getElementById('root');
if (rootElement) {
  initAndroidEnv();
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
