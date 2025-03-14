
import React, { useState } from 'react';
import { TransportOption } from '@/data/destinations';
import { Bus, Train, Plane, Car, Clock, IndianRupee, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TransportOptionsProps {
  options: TransportOption[];
}

const TransportOptions: React.FC<TransportOptionsProps> = ({ options }) => {
  const [selectedTab, setSelectedTab] = useState<string>(options[0]?.type || 'bus');

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'bus':
        return <Bus size={20} className="mr-2" />;
      case 'train':
        return <Train size={20} className="mr-2" />;
      case 'flight':
        return <Plane size={20} className="mr-2" />;
      case 'car':
        return <Car size={20} className="mr-2" />;
      default:
        return <Bus size={20} className="mr-2" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-india-blue text-white">
        <h3 className="text-lg font-semibold">Transport Options</h3>
      </div>
      
      <div className="p-4">
        <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
            {options.map(option => (
              <TabsTrigger 
                key={option.type} 
                value={option.type}
                className="flex items-center justify-center"
              >
                {getTransportIcon(option.type)}
                <span className="capitalize">{option.type}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {options.map(option => (
            <TabsContent key={option.type} value={option.type} className="mt-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div className="mb-2 md:mb-0">
                    <span className="text-gray-500">From</span>
                    <h4 className="font-medium">{option.from}</h4>
                  </div>
                  <div className="hidden md:block text-gray-400">➝</div>
                  <div>
                    <span className="text-gray-500">To</span>
                    <h4 className="font-medium">{option.to}</h4>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center">
                    <Clock size={18} className="text-india-blue mr-2" />
                    <div>
                      <span className="text-gray-500 text-sm">Duration</span>
                      <p className="font-medium">{option.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <IndianRupee size={18} className="text-india-blue mr-2" />
                    <div>
                      <span className="text-gray-500 text-sm">Average Cost</span>
                      <p className="font-medium">₹{option.cost}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar size={18} className="text-india-blue mr-2" />
                    <div>
                      <span className="text-gray-500 text-sm">Frequency</span>
                      <p className="font-medium">{option.frequency}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <span className="text-gray-500 text-sm">Operators</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {option.operators.map((operator, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {operator}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default TransportOptions;
