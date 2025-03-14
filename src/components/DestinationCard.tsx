
import React from 'react';
import { Link } from 'react-router-dom';
import { Destination } from '@/data/destinations';
import { MapPin } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <Link to={`/destination/${destination.id}`} className="destination-card block h-full">
      <div className="overflow-hidden rounded-t-lg">
        <img 
          src={destination.image} 
          alt={destination.name}
          className="w-full h-52 object-cover transition-transform duration-300"
        />
      </div>
      <div className="p-4 bg-white rounded-b-lg">
        <h3 className="text-xl font-bold text-gray-800">{destination.name}</h3>
        <div className="flex items-center mt-1 text-gray-600">
          <MapPin size={16} className="mr-1" />
          <p className="text-sm">{destination.state}</p>
        </div>
        <p className="mt-2 text-gray-600 line-clamp-2">{destination.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-india-blue font-semibold">
            ₹{destination.averageBudget.budget}+ 
            <span className="text-gray-600 text-sm font-normal">/day</span>
          </div>
          <span className="inline-block px-3 py-1 bg-india-orange/10 text-india-orange rounded-full text-sm">
            Explore
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
