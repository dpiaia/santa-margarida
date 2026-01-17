import React, { useState, useEffect } from 'react';
import { Clock, ArrowUpRight, CloudSun, Loader2 } from 'lucide-react';
import { SCHEDULES } from '../constants';
import { Schedule } from '../types';

interface HomeViewProps {
  onSelectArea: (areaId: string) => void;
}

interface WeatherData {
  temperature: number;
  description: string;
  isDay: boolean;
}

const HomeView: React.FC<HomeViewProps> = ({ onSelectArea }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Weather for Paulínia, SP
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Paulínia Coordinates: -22.7561, -47.1537
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-22.7561&longitude=-47.1537&current=temperature_2m,is_day,weather_code&timezone=America%2FSao_Paulo'
        );
        const data = await res.json();
        
        if (data.current) {
          setWeather({
            temperature: Math.round(data.current.temperature_2m),
            isDay: data.current.is_day === 1,
            description: getWeatherDescription(data.current.weather_code)
          });
        }
      } catch (error) {
        console.error("Failed to fetch weather", error);
      } finally {
        setLoadingWeather(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherDescription = (code: number) => {
    if (code === 0) return 'Céu Limpo';
    if (code >= 1 && code <= 3) return 'Parcialmente Nublado';
    if (code >= 45 && code <= 48) return 'Nevoeiro';
    if (code >= 51 && code <= 67) return 'Chuva Leve';
    if (code >= 80 && code <= 99) return 'Chuva Forte';
    return 'Nublado';
  };

  const isOpen = (schedule: Schedule) => {
    if (schedule.days === '24 Horas') return true;
    
    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const [openH, openM] = schedule.openTime.split(':').map(Number);
    const [closeH, closeM] = schedule.closeTime.split(':').map(Number);
    
    const timeInMinutes = currentHour * 60 + currentMinute;
    const openInMinutes = openH * 60 + openM;
    const closeInMinutes = closeH * 60 + closeM;

    return timeInMinutes >= openInMinutes && timeInMinutes < closeInMinutes;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Weather/Info Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-sm border border-zinc-100 dark:border-zinc-800 transition-colors">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
          
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
              <span className="w-2 h-8 bg-primary-600 rounded-full"></span>
              Morumbi, Paulínia/SP
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm ml-4">
              {currentTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>

          <div className="flex items-center gap-6 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-700/50">
            {loadingWeather ? (
              <div className="flex items-center gap-2 text-zinc-400">
                <Loader2 size={24} className="animate-spin" />
                <span className="text-sm">Carregando clima...</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
                    <CloudSun size={32} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
                      {weather?.temperature}°C
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                      {weather?.description}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>

      {/* Areas Grid */}
      <div>
        <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-6 flex items-center gap-2">
          <Clock className="text-primary-600 dark:text-primary-500" size={24} />
          Áreas Comuns
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SCHEDULES.map((area) => {
            const open = isOpen(area);
            return (
              <div 
                key={area.id} 
                onClick={() => onSelectArea(area.id)}
                className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Background Image */}
                <img 
                  src={area.image} 
                  alt={area.area} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Green Multiply Layer */}
                <div className="absolute inset-0 bg-primary-900/80 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-90" />
                
                {/* Gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                      open 
                        ? 'bg-primary-500/20 border-primary-300/50 text-primary-50' 
                        : 'bg-red-500/20 border-red-300/50 text-red-50'
                    }`}>
                      {open ? 'Aberto' : 'Fechado'}
                    </span>
                    <div className="bg-white/10 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                      <ArrowUpRight className="text-white" size={20} />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">{area.area}</h4>
                    <p className="text-primary-100 text-xs flex items-center gap-1 opacity-90">
                      <Clock size={12} />
                      {open ? `Fecha às ${area.closeTime}` : `Abre às ${area.openTime}`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeView;