
import React from 'react';
import { Accommodation } from '@/data/destinations';
import { Star, MapPin, IndianRupee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AccommodationCardProps {
  accommodation: Accommodation;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'budget':
        return 'bg-green-100 text-green-800';
      case 'standard':
        return 'bg-blue-100 text-blue-800';
      case 'luxury':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img 
          src={accommodation.image} 
          alt={accommodation.name} 
          className="w-full h-48 object-cover"
        />
        <Badge 
          className={`absolute top-2 right-2 ${getTypeColor(accommodation.type)}`}
        >
          {accommodation.type.charAt(0).toUpperCase() + accommodation.type.slice(1)}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{accommodation.name}</h3>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin size={14} className="mr-1" />
          <span>{accommodation.location}</span>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center mr-2">
            <Star size={16} className="text-yellow-500 mr-1" />
            <span className="font-medium">{accommodation.rating}</span>
          </div>
          <span className="text-sm text-gray-500">
            ({Math.floor(accommodation.rating * 10)} reviews)
          </span>
        </div>
        
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {accommodation.amenities.slice(0, 3).map((amenity, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-gray-100 rounded-full text-xs"
              >
                {amenity}
              </span>
            ))}
            {accommodation.amenities.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                +{accommodation.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div>
            <div className="flex items-center text-india-blue font-bold">
              <IndianRupee size={16} />
              <span>{accommodation.pricePerNight}</span>
            </div>
            <span className="text-xs text-gray-500">per night</span>
          </div>
          <Button className="bg-india-orange hover:bg-orange-600">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;
