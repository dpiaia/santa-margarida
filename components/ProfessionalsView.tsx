import React, { useState } from 'react';
import { UserCheck, Search, Phone, Briefcase } from 'lucide-react';
import { PROFESSIONALS } from '../constants';

const ProfessionalsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfessionals = PROFESSIONALS.filter(prof => 
    prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPhone = (phone: string) => {
    if (phone.length === 11) {
      return `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.substring(7)}`;
    }
    return phone;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header Section */}
      <div className="text-center md:text-left space-y-2 mb-8">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3 justify-center md:justify-start">
          <UserCheck className="text-primary-600 dark:text-primary-500" size={32} />
          Indicações de Profissionais
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Rede de confiança: Profissionais testados e aprovados pelos seus vizinhos.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative group max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-primary-500 transition-colors">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Busque por eletricista, pintor, nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all shadow-sm"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfessionals.length === 0 ? (
           <div className="col-span-full text-center py-12 text-zinc-400 bg-white dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
             <Briefcase size={48} className="mx-auto mb-3 opacity-20" />
             <p>Nenhum profissional encontrado para "{searchTerm}"</p>
           </div>
        ) : (
          filteredProfessionals.map((prof) => (
            <div 
              key={prof.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-primary-200 dark:hover:border-primary-800 transition-all flex flex-col justify-between h-full"
            >
              <div className="flex flex-col gap-3 mb-6">
                <span className="self-start inline-block px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-xs font-bold uppercase tracking-wide">
                  {prof.category}
                </span>
                
                <div>
                  <h3 className="font-bold text-lg md:text-xl text-zinc-800 dark:text-zinc-100 leading-tight mb-1">
                    {prof.name}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium flex items-center gap-2">
                    <Phone size={14} className="text-zinc-400" />
                    {formatPhone(prof.phone)}
                  </p>
                </div>
              </div>

              <a 
                href={`https://wa.me/55${prof.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:-translate-y-0.5"
              >
                <Phone size={18} />
                Chamar no WhatsApp
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfessionalsView;