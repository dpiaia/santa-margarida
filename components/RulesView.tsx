import React, { useState, useMemo } from 'react';
import { RULES, SCHEDULES } from '../constants';
import { 
  Volume2, Trees, Trash2, Check, X, Search, 
  Clock, Calendar, BookOpen, Info, ChevronDown,
  Hammer, Car, Shield, Dog
} from 'lucide-react';

const iconMap: Record<string, React.FC<any>> = {
  Volume2,
  Trees,
  Trash2,
  Hammer,
  Car,
  Shield,
  Dog
};

const RulesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rules' | 'schedules'>('rules');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set([RULES[0].id]));

  // Toggle Accordion
  const toggleCategory = (id: string) => {
    const newSet = new Set(expandedCategories);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedCategories(newSet);
  };

  // Filter Logic
  const filteredRules = useMemo(() => {
    if (!searchTerm) return RULES;
    const lowerTerm = searchTerm.toLowerCase();
    return RULES.filter(cat => 
      cat.title.toLowerCase().includes(lowerTerm) ||
      cat.allowed.some(r => r.text.toLowerCase().includes(lowerTerm)) ||
      cat.prohibited.some(r => r.text.toLowerCase().includes(lowerTerm))
    );
  }, [searchTerm]);

  const filteredSchedules = useMemo(() => {
    if (!searchTerm) return SCHEDULES;
    const lowerTerm = searchTerm.toLowerCase();
    return SCHEDULES.filter(sch => 
      sch.area.toLowerCase().includes(lowerTerm) ||
      sch.days.toLowerCase().includes(lowerTerm)
    );
  }, [searchTerm]);

  // If searching, automatically switch tabs based on results if one is empty
  React.useEffect(() => {
    if (searchTerm) {
        // Expand all categories when searching to make results visible
        setExpandedCategories(new Set(RULES.map(r => r.id)));
        
        if (filteredRules.length === 0 && filteredSchedules.length > 0) {
            setActiveTab('schedules');
        } else if (filteredRules.length > 0 && filteredSchedules.length === 0) {
            setActiveTab('rules');
        }
    }
  }, [searchTerm, filteredRules.length, filteredSchedules.length]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header Section */}
      <div className="text-center md:text-left space-y-2">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3 justify-center md:justify-start">
          <BookOpen className="text-primary-600 dark:text-primary-500" size={32} />
          Manual do Morador
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400">
          Pesquise o que pode, o que não pode e confira os horários de funcionamento.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-primary-500 transition-colors">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Ex: piscina, barulho, reforma..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all shadow-sm"
        />
      </div>

      {/* Custom Tabs */}
      <div className="flex p-1 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => setActiveTab('rules')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
            activeTab === 'rules'
              ? 'bg-white dark:bg-zinc-800 text-primary-700 dark:text-primary-400 shadow-sm'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
          }`}
        >
          <Info size={18} />
          Normas e Regras
          {searchTerm && filteredRules.length > 0 && (
            <span className="ml-2 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400 text-[10px] px-2 py-0.5 rounded-full">
              {filteredRules.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('schedules')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
            activeTab === 'schedules'
              ? 'bg-white dark:bg-zinc-800 text-primary-700 dark:text-primary-400 shadow-sm'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
          }`}
        >
          <Clock size={18} />
          Horários e Áreas
          {searchTerm && filteredSchedules.length > 0 && (
            <span className="ml-2 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400 text-[10px] px-2 py-0.5 rounded-full">
              {filteredSchedules.length}
            </span>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="min-h-[300px]">
        
        {/* Rules Tab */}
        {activeTab === 'rules' && (
          <div className="space-y-4">
            {filteredRules.length === 0 ? (
              <div className="text-center py-12 text-zinc-400 bg-white dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                <Search size={48} className="mx-auto mb-3 opacity-20" />
                <p>Nenhuma regra encontrada para "{searchTerm}"</p>
              </div>
            ) : (
              filteredRules.map((category) => {
                const Icon = iconMap[category.iconName] || Volume2;
                const isExpanded = expandedCategories.has(category.id);
                
                return (
                  <div 
                    key={category.id} 
                    className={`bg-white dark:bg-zinc-900 rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isExpanded ? 'border-primary-200 dark:border-primary-800 shadow-md ring-1 ring-primary-500/10' : 'border-zinc-100 dark:border-zinc-800 shadow-sm'
                    }`}
                  >
                    <button 
                      onClick={() => toggleCategory(category.id)}
                      className="w-full p-5 flex items-center justify-between hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl ${isExpanded ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400' : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'}`}>
                          <Icon size={24} />
                        </div>
                        <h3 className={`text-lg font-bold ${isExpanded ? 'text-primary-900 dark:text-primary-100' : 'text-zinc-700 dark:text-zinc-300'}`}>
                          {category.title}
                        </h3>
                      </div>
                      <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary-600 dark:text-primary-400' : 'text-zinc-400'}`}>
                        <ChevronDown size={20} />
                      </div>
                    </button>

                    {/* Accordion Content */}
                    <div className={`grid md:grid-cols-2 gap-0 overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-[800px] opacity-100 border-t border-zinc-100 dark:border-zinc-800' : 'max-h-0 opacity-0'
                    }`}>
                      
                      {/* Allowed Column */}
                      <div className="p-6 bg-primary-50/30 dark:bg-primary-900/10">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-primary-700 dark:text-primary-400 uppercase tracking-wider mb-4">
                          <Check size={16} className="stroke-[3]" />
                          O que pode
                        </h4>
                        <ul className="space-y-3">
                          {category.allowed.map((rule) => (
                            <li key={rule.id} className="flex gap-3 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0 shadow-sm shadow-primary-200 dark:shadow-none"></span>
                              {searchTerm ? highlightText(rule.text, searchTerm) : rule.text}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Prohibited Column */}
                      <div className="p-6 bg-red-50/30 dark:bg-red-900/10 md:border-l border-zinc-100 dark:border-zinc-800">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-4">
                          <X size={16} className="stroke-[3]" />
                          O que não pode
                        </h4>
                        <ul className="space-y-3">
                          {category.prohibited.map((rule) => (
                            <li key={rule.id} className="flex gap-3 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 shadow-sm shadow-red-200 dark:shadow-none"></span>
                              {searchTerm ? highlightText(rule.text, searchTerm) : rule.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Schedules Tab */}
        {activeTab === 'schedules' && (
          <div className="grid md:grid-cols-2 gap-4">
             {filteredSchedules.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-zinc-400 bg-white dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                <Search size={48} className="mx-auto mb-3 opacity-20" />
                <p>Nenhuma área encontrada para "{searchTerm}"</p>
              </div>
            ) : (
              filteredSchedules.map((schedule) => (
                <div key={schedule.id} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm hover:border-primary-200 dark:hover:border-primary-700 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                      {searchTerm ? highlightText(schedule.area, searchTerm) : schedule.area}
                    </h3>
                    <div className="p-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg">
                      <Clock size={20} />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                      <Clock size={16} className="text-zinc-400 dark:text-zinc-600" />
                      <span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-200">Abre:</span> {schedule.openTime} <span className="mx-1 text-zinc-300 dark:text-zinc-700">|</span> 
                        <span className="font-medium text-zinc-900 dark:text-zinc-200">Fecha:</span> {schedule.closeTime}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                      <Calendar size={16} className="text-zinc-400 dark:text-zinc-600" />
                      <span>{schedule.days}</span>
                    </div>

                    {schedule.maintenance && (
                      <div className="mt-3 py-2 px-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-lg flex items-start gap-2 text-xs text-amber-700 dark:text-amber-500">
                        <Info size={14} className="mt-0.5 shrink-0" />
                        <span>Manutenção: {schedule.maintenance}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper to highlight search terms
const highlightText = (text: string, highlight: string) => {
  if (!highlight.trim()) return text;
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="bg-primary-200 dark:bg-primary-900 text-primary-900 dark:text-primary-100 px-0.5 rounded">{part}</span>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default RulesView;