import React from 'react';
import { Schedule } from '../types';
import { ArrowLeft, Clock, AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface AreaDetailViewProps {
  area: Schedule;
  onBack: () => void;
  isOpen: boolean;
}

const AreaDetailView: React.FC<AreaDetailViewProps> = ({ area, onBack, isOpen }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-zinc-500 hover:text-primary-700 dark:text-zinc-400 dark:hover:text-primary-400 transition-colors font-medium"
      >
        <ArrowLeft size={20} />
        Voltar para Início
      </button>

      {/* Hero Section */}
      <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-xl mb-8 group">
        <img 
          src={area.image} 
          alt={area.area} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-primary-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{area.area}</h1>
              <p className="text-primary-100 text-lg opacity-90 max-w-xl">{area.description}</p>
            </div>
            <div className={`px-4 py-2 rounded-full border backdrop-blur-md shadow-lg ${
              isOpen 
                ? 'bg-primary-500/20 border-primary-400 text-primary-50' 
                : 'bg-red-500/20 border-red-400 text-red-50'
            }`}>
              <span className="font-bold tracking-wide text-sm flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-primary-400 animate-pulse' : 'bg-red-400'}`}></span>
                {isOpen ? 'ABERTO AGORA' : 'FECHADO'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
            <h3 className="font-bold text-zinc-800 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <Clock className="text-primary-600 dark:text-primary-500" />
              Horário de Funcionamento
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-zinc-50 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400 text-sm">Abertura</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{area.openTime}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-zinc-50 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400 text-sm">Fechamento</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{area.closeTime}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-zinc-50 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400 text-sm">Dias</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{area.days}</span>
              </div>
              {area.maintenance && (
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-900/30 text-amber-800 dark:text-amber-500 text-sm flex gap-3">
                  <AlertTriangle size={18} className="shrink-0" />
                  <span>Manutenção: <strong>{area.maintenance}</strong></span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Rules */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
            <h3 className="font-bold text-xl text-zinc-800 dark:text-zinc-100 mb-6 flex items-center gap-2">
              <Info className="text-primary-600 dark:text-primary-500" />
              Regras Específicas
            </h3>
            <ul className="grid gap-4">
              {area.specificRules.map((rule, idx) => (
                <li key={idx} className="flex gap-4 items-start group">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <CheckCircle size={14} />
                  </div>
                  <span className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-center text-zinc-400 text-xs">
              O desrespeito às normas está sujeito a notificação e multa conforme o Regimento Interno.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaDetailView;