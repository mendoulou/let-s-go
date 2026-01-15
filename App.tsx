
import React, { useState } from 'react';
import { View } from './types';
import HomeView from './views/HomeView';
import TrackingView from './views/TrackingView';
import DiscoveryView from './views/DiscoveryView';
import CommunityView from './views/CommunityView';
import SettingsView from './views/SettingsView';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <HomeView />;
      case View.TRACKING:
        return <TrackingView />;
      case View.DISCOVERY:
        return <DiscoveryView />;
      case View.COMMUNITY:
        return <CommunityView />;
      case View.SETTINGS:
        return <SettingsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background-light dark:bg-background-dark overflow-x-hidden transition-colors duration-300">
      <div className="relative">
        {renderView()}
      </div>
      <BottomNav currentView={currentView} onNavigate={setCurrentView} />
    </div>
  );
};

export default App;
