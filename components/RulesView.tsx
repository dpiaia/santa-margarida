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
        <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 justify-center md:justify-start">
          <BookOpen className="text-primary-600" size={32} />
          Manual do Morador
        </h2>
        <p className="text-slate-500">
          Pesquise o que pode, o que não pode e confira os horários de funcionamento.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Ex: piscina, barulho, reforma..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all shadow-sm"
        />
      </div>

      {/* Custom Tabs */}
      <div className="flex p-1 bg-slate-100 rounded-xl">
        <button
          onClick={() => setActiveTab('rules')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
            activeTab === 'rules'
              ? 'bg-white text-primary-700 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Info size={18} />
          Normas e Regras
          {searchTerm && filteredRules.length > 0 && (
            <span className="ml-2 bg-primary-100 text-primary-700 text-[10px] px-2 py-0.5 rounded-full">
              {filteredRules.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('schedules')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
            activeTab === 'schedules'
              ? 'bg-white text-primary-700 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Clock size={18} />
          Horários e Áreas
          {searchTerm && filteredSchedules.length > 0 && (
            <span className="ml-2 bg-primary-100 text-primary-700 text-[10px] px-2 py-0.5 rounded-full">
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
              <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
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
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isExpanded ? 'border-primary-200 shadow-md ring-1 ring-primary-500/10' : 'border-slate-100 shadow-sm'
                    }`}
                  >
                    <button 
                      onClick={() => toggleCategory(category.id)}
                      className="w-full p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl ${isExpanded ? 'bg-primary-100 text-primary-700' : 'bg-slate-50 text-slate-500'}`}>
                          <Icon size={24} />
                        </div>
                        <h3 className={`text-lg font-bold ${isExpanded ? 'text-primary-900' : 'text-slate-700'}`}>
                          {category.title}
                        </h3>
                      </div>
                      <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary-600' : 'text-slate-400'}`}>
                        <ChevronDown size={20} />
                      </div>
                    </button>

                    {/* Accordion Content */}
                    <div className={`grid md:grid-cols-2 gap-0 overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-[800px] opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0'
                    }`}>
                      
                      {/* Allowed Column */}
                      <div className="p-6 bg-primary-50/30">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-primary-700 uppercase tracking-wider mb-4">
                          <Check size={16} className="stroke-[3]" />
                          O que pode
                        </h4>
                        <ul className="space-y-3">
                          {category.allowed.map((rule) => (
                            <li key={rule.id} className="flex gap-3 text-slate-700 text-sm leading-relaxed">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0 shadow-sm shadow-primary-200"></span>
                              {searchTerm ? highlightText(rule.text, searchTerm) : rule.text}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Prohibited Column */}
                      <div className="p-6 bg-red-50/30 md:border-l border-slate-100">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-red-600 uppercase tracking-wider mb-4">
                          <X size={16} className="stroke-[3]" />
                          O que não pode
                        </h4>
                        <ul className="space-y-3">
                          {category.prohibited.map((rule) => (
                            <li key={rule.id} className="flex gap-3 text-slate-700 text-sm leading-relaxed">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 shadow-sm shadow-red-200"></span>
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
              <div className="col-span-2 text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                <Search size={48} className="mx-auto mb-3 opacity-20" />
                <p>Nenhuma área encontrada para "{searchTerm}"</p>
              </div>
            ) : (
              filteredSchedules.map((schedule) => (
                <div key={schedule.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-primary-200 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-slate-800 group-hover:text-primary-700 transition-colors">
                      {searchTerm ? highlightText(schedule.area, searchTerm) : schedule.area}
                    </h3>
                    <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
                      <Clock size={20} />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Clock size={16} className="text-slate-400" />
                      <span>
                        <span className="font-medium text-slate-900">Abre:</span> {schedule.openTime} <span className="mx-1 text-slate-300">|</span> 
                        <span className="font-medium text-slate-900">Fecha:</span> {schedule.closeTime}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Calendar size={16} className="text-slate-400" />
                      <span>{schedule.days}</span>
                    </div>

                    {schedule.maintenance && (
                      <div className="mt-3 py-2 px-3 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-2 text-xs text-amber-700">
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
          <span key={i} className="bg-primary-200 text-primary-900 px-0.5 rounded">{part}</span>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default RulesView;