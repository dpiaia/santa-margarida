import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HomeView from './components/HomeView';
import RulesView from './components/RulesView';
import AssistantView from './components/AssistantView';
import AreaDetailView from './components/AreaDetailView';
import NearbyView from './components/NearbyView';
import { View } from './types';
import { SCHEDULES } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    setSelectedAreaId(null);
  };

  const isOpen = (schedule: any) => {
      if (schedule.days === '24 Horas') return true;
      const now = new Date();
      const current = now.getHours() * 60 + now.getMinutes();
      const [oH, oM] = schedule.openTime.split(':').map(Number);
      const [cH, cM] = schedule.closeTime.split(':').map(Number);
      const open = oH * 60 + oM;
      const close = cH * 60 + cM;
      return current >= open && current < close;
  };

  const renderView = () => {
    if (selectedAreaId && currentView === View.HOME) {
      const area = SCHEDULES.find(s => s.id === selectedAreaId);
      if (area) {
        const open = isOpen(area);
        const statusColor = open 
          ? 'text-primary-600 bg-primary-50 border-primary-200 dark:bg-primary-900/30 dark:border-primary-800 dark:text-primary-400' 
          : 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400';
        return (
          <AreaDetailView 
            area={area} 
            onBack={() => setSelectedAreaId(null)} 
            isOpen={open}
            statusColor={statusColor}
          />
        );
      }
    }

    switch (currentView) {
      case View.HOME:
        return <HomeView onNavigate={handleNavigate} onSelectArea={setSelectedAreaId} />;
      case View.NEARBY:
        return <NearbyView />;
      case View.RULES:
        return <RulesView />;
      case View.ASSISTANT:
        return <AssistantView />;
      default:
        return <HomeView onNavigate={handleNavigate} onSelectArea={setSelectedAreaId} />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      onNavigate={handleNavigate}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
    >
      {renderView()}
    </Layout>
  );
};

export default App;