
import React from 'react';
import { Weather } from '@/data/destinations';
import { Cloud, Sun, CloudRain } from 'lucide-react';

interface WeatherCardProps {
  weather: Weather;
  currentSeason?: 'summer' | 'winter' | 'monsoon';
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, currentSeason = 'summer' }) => {
  const getSeasonIcon = (season: 'summer' | 'winter' | 'monsoon') => {
    switch (season) {
      case 'summer':
        return <Sun size={32} className="text-yellow-500" />;
      case 'winter':
        return <Cloud size={32} className="text-gray-400" />;
      case 'monsoon':
        return <CloudRain size={32} className="text-blue-400" />;
      default:
        return <Sun size={32} className="text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-india-blue text-white">
        <h3 className="text-lg font-semibold">Weather Information</h3>
      </div>
      
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Summer */}
        <div className={`p-3 rounded-lg ${currentSeason === 'summer' ? 'bg-yellow-50 ring-2 ring-yellow-200' : ''}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Summer</h4>
            {getSeasonIcon('summer')}
          </div>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Temperature:</span> {weather.summer.temperature}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Conditions:</span> {weather.summer.conditions}
          </p>
        </div>
        
        {/* Winter */}
        <div className={`p-3 rounded-lg ${currentSeason === 'winter' ? 'bg-blue-50 ring-2 ring-blue-200' : ''}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Winter</h4>
            {getSeasonIcon('winter')}
          </div>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Temperature:</span> {weather.winter.temperature}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Conditions:</span> {weather.winter.conditions}
          </p>
        </div>
        
        {/* Monsoon */}
        <div className={`p-3 rounded-lg ${currentSeason === 'monsoon' ? 'bg-blue-50 ring-2 ring-blue-200' : ''}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Monsoon</h4>
            {getSeasonIcon('monsoon')}
          </div>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Temperature:</span> {weather.monsoon.temperature}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Conditions:</span> {weather.monsoon.conditions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
