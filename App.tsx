
import React, { useState, useEffect } from 'react';
import { View } from './types';
import HomeView from './views/HomeView';
import TrackingView from './views/TrackingView';
import DiscoveryView from './views/DiscoveryView';
import CommunityView from './views/CommunityView';
import SettingsView from './views/SettingsView';
import ReportsView from './views/ReportsView';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [currentFragment, setCurrentFragment] = useState<View>(View.HOME);
  const [backStack, setBackStack] = useState<View[]>([]);
  const [weeklyGoal, setWeeklyGoal] = useState<number>(40);
  const [pendingPublishData, setPendingPublishData] = useState<{distance: string, type: string} | null>(null);

  const navigateTo = (view: View) => {
    if (view === currentFragment) return;
    setBackStack(prev => [...prev, currentFragment]);
    setCurrentFragment(view);
  };

  const handleOnBackPressed = () => {
    if (backStack.length > 0) {
      const newStack = [...backStack];
      const previousView = newStack.pop();
      setBackStack(newStack);
      if (previousView) setCurrentFragment(previousView);
    }
  };

  const handlePublishFromView = (data: {distance: string, type: string}) => {
    setPendingPublishData(data);
    setCurrentFragment(View.COMMUNITY);
  };

  const clearPendingPublish = () => setPendingPublishData(null);

  const renderCurrentFragment = () => {
    const commonProps = {
      onQuickStart: () => navigateTo(View.TRACKING),
      onOpenReports: () => navigateTo(View.REPORTS),
      onBack: handleOnBackPressed,
      weeklyGoal,
      onGoalChange: setWeeklyGoal,
      onPublishRoute: handlePublishFromView
    };

    switch (currentFragment) {
      case View.HOME: return <HomeView {...commonProps} />;
      case View.TRACKING: return <TrackingView onBack={handleOnBackPressed} onPublishRoute={handlePublishFromView} />;
      case View.REPORTS: return <ReportsView onBack={handleOnBackPressed} />;
      case View.DISCOVERY: return <DiscoveryView />;
      case View.COMMUNITY: return <CommunityView pendingData={pendingPublishData} onClearPending={clearPendingPublish} />;
      case View.SETTINGS: return <SettingsView weeklyGoal={weeklyGoal} onGoalChange={setWeeklyGoal} onPublishRoute={handlePublishFromView} />;
      default: return <HomeView {...commonProps} />;
    }
  };

  const isFullScreenFragment = [View.TRACKING, View.REPORTS].includes(currentFragment);

  return (
    <div className="android-root max-w-md mx-auto min-h-screen flex flex-col bg-android-bg-light dark:bg-android-bg-dark">
      <div className="status-bar h-[env(safe-area-inset-top)] w-full bg-transparent"></div>
      <main className="flex-1 relative overflow-hidden fragment-enter">
        {renderCurrentFragment()}
      </main>
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
