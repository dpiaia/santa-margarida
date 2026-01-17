import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Sun, Moon, MapPin } from 'lucide-react';
import { View } from '../types';

interface LayoutProps {
  currentView: View;
  onNavigate: (view: View) => void;
  children: React.ReactNode;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Layout: React.FC<LayoutProps> = ({ currentView, onNavigate, children, isDarkMode, toggleDarkMode }) => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setGreeting('Bom dia');
      else if (hour >= 12 && hour < 18) setGreeting('Boa tarde');
      else setGreeting('Boa noite');
    };
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);
  
  const navItems = [
    { view: View.HOME, label: 'Início', icon: Home },
    { view: View.NEARBY, label: 'Por Perto', icon: MapPin },
    { view: View.RULES, label: 'Regras', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col md:flex-row transition-colors duration-300">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-primary-900 text-primary-50 h-screen sticky top-0 p-6 shadow-xl z-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center">
            <span className="font-bold text-primary-900">E</span>
          </div>
          <h1 className="font-bold text-lg tracking-tight">Ecovila</h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => onNavigate(item.view)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary-800 text-white shadow-lg shadow-primary-900/50 translate-x-1' 
                    : 'hover:bg-primary-800/50 text-primary-200 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="pt-6 border-t border-primary-800/50">
          <p className="text-xs text-primary-400 text-center">
            © 2024 Santa Margarida
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Dynamic Header (Mobile & Desktop) */}
        <header className="px-6 py-6 md:px-8 md:py-8 flex justify-between items-end bg-transparent z-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-900 dark:text-primary-50 tracking-tight">
              {greeting},
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">
              Bem-vindo ao Ecovila Santa Margarida
            </p>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-full bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-md hover:shadow-lg transition-all border border-slate-100 dark:border-slate-700"
            aria-label="Alternar modo noturno"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 pb-24 md:pb-8 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50 safe-area-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => onNavigate(item.view)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 dark:text-slate-600'
              }`}
            >
              <div className={`p-1.5 rounded-full transition-all ${
                isActive ? 'bg-primary-50 dark:bg-primary-900/20' : 'bg-transparent'
              }`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;