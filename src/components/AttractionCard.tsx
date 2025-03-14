
import React from 'react';
import { Attraction } from '@/data/destinations';
import { Clock, MapPin, Star } from 'lucide-react';

interface AttractionCardProps {
  attraction: Attraction;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img 
          src={attraction.image} 
          alt={attraction.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center">
          <Star size={16} className="text-yellow-500 mr-1" />
          <span className="text-sm font-medium">{attraction.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{attraction.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{attraction.description}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin size={14} className="mr-1" />
          <span>{attraction.location}</span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm">
          <Clock size={14} className="mr-1" />
          <span>{attraction.openingHours}</span>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <div className="text-sm">
            <span className="font-medium text-india-blue">
              {attraction.entryFee === 0 ? 'Free Entry' : `₹${attraction.entryFee}`}
            </span>
          </div>
          <span className="text-xs bg-india-orange/10 text-india-orange px-2 py-1 rounded">
            {attraction.bestTimeToVisit}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;
