import React from 'react';
import { MapPin, Navigation, ShoppingBag, Utensils, Stethoscope, GraduationCap, Building2, Store } from 'lucide-react';
import { NEARBY_PLACES } from '../constants';

const categoryIcons: Record<string, React.FC<any>> = {
  'Shopping': ShoppingBag,
  'Food': Utensils,
  'Health': Stethoscope,
  'Education': GraduationCap,
  'Service': Store,
  'Culture': Building2
};

const NearbyView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header Section */}
      <div className="text-center md:text-left space-y-2 mb-8">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3 justify-center md:justify-start">
          <MapPin className="text-primary-600 dark:text-primary-500" size={32} />
          Explorar Arredores
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Confira os principais serviços e locais de lazer próximos à <span className="font-semibold text-zinc-700 dark:text-zinc-300">Rua Alexandre Martins Laroca, 650</span>.
        </p>
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {NEARBY_PLACES.map((place) => {
          const Icon = categoryIcons[place.category] || MapPin;
          
          return (
            <div 
              key={place.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group"
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={place.image} 
                  alt={place.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <span className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium flex items-center gap-1.5">
                    <Icon size={12} />
                    {place.category}
                  </span>
                  <span className="text-white text-xs font-medium bg-black/40 px-2 py-1 rounded-lg backdrop-blur-sm">
                    {place.distance}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100 mb-1 line-clamp-1">{place.name}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4 line-clamp-1 flex items-center gap-1">
                  <MapPin size={12} className="shrink-0" />
                  {place.address}
                </p>

                <a 
                  href={place.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2 py-2.5 rounded-xl border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
                >
                  <Navigation size={16} />
                  Como chegar
                </a>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default NearbyView;