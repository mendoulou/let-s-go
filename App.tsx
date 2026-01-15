
import React, { useState, useEffect } from 'react';
import { View } from './types';
import HomeView from './views/HomeView';
import TrackingView from './views/TrackingView';
import DiscoveryView from './views/DiscoveryView';
import CommunityView from './views/CommunityView';
import SettingsView from './views/SettingsView';
import ReportsView from './views/ReportsView';
import BottomNav from './components/BottomNav';

/**
 * MainActivity: 应用的主入口容器
 * 遵循 Android Single-Activity Architecture
 */
const App: React.FC = () => {
  const [currentFragment, setCurrentFragment] = useState<View>(View.HOME);
  const [backStack, setBackStack] = useState<View[]>([]);
  const [weeklyGoal, setWeeklyGoal] = useState<number>(40);

  // 模拟 Android Fragment 事务：addToBackStack
  const navigateTo = (view: View) => {
    if (view === currentFragment) return;
    setBackStack(prev => [...prev, currentFragment]);
    setCurrentFragment(view);
  };

  // 模拟原生 Back 键处理逻辑
  const handleOnBackPressed = () => {
    if (backStack.length > 0) {
      const newStack = [...backStack];
      const previousView = newStack.pop();
      setBackStack(newStack);
      if (previousView) setCurrentFragment(previousView);
    } else {
      console.log("Android: Exit Application");
    }
  };

  useEffect(() => {
    // 监听原生环境发送的 Back 事件 (如果运行在真实的 WebView 中)
    const handleNativeBack = (e: any) => {
        e.preventDefault();
        handleOnBackPressed();
    };
    window.addEventListener('popstate', handleNativeBack);
    return () => window.removeEventListener('popstate', handleNativeBack);
  }, [backStack, currentFragment]);

  const renderCurrentFragment = () => {
    const commonProps = {
      onQuickStart: () => navigateTo(View.TRACKING),
      onOpenReports: () => navigateTo(View.REPORTS),
      onBack: handleOnBackPressed,
      weeklyGoal,
      onGoalChange: setWeeklyGoal
    };

    return (
      <div className="fragment-container h-full w-full fragment-enter">
        {(() => {
          switch (currentFragment) {
            case View.HOME: return <HomeView {...commonProps} />;
            case View.TRACKING: return <TrackingView onBack={handleOnBackPressed} />;
            case View.REPORTS: return <ReportsView onBack={handleOnBackPressed} />;
            case View.DISCOVERY: return <DiscoveryView />;
            case View.COMMUNITY: return <CommunityView />;
            case View.SETTINGS: return <SettingsView weeklyGoal={weeklyGoal} onGoalChange={setWeeklyGoal} />;
            default: return <HomeView {...commonProps} />;
          }
        })()}
      </div>
    );
  };

  const isFullScreenFragment = [View.TRACKING, View.REPORTS].includes(currentFragment);

  return (
    <div className="android-root max-w-md mx-auto min-h-screen flex flex-col bg-android-bg-light dark:bg-android-bg-dark">
      {/* 系统状态栏占位 */}
      <div className="status-bar h-[env(safe-area-inset-top)] w-full bg-transparent"></div>
      
      <main className="flex-1 relative overflow-hidden">
        {renderCurrentFragment()}
      </main>

      {/* 底部导航栏 */}
      {!isFullScreenFragment && (
        <div className="navigation-bar-container">
          <BottomNav currentView={currentFragment} onNavigate={navigateTo} />
          <div className="nav-gesture-area h-[env(safe-area-inset-bottom)] bg-white dark:bg-[#1e1e1e]"></div>
        </div>
      )}
    </div>
  );
};

export default App;
