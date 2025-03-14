
import React, { useState } from 'react';
import { Destination } from '@/data/destinations';
import { CreditCard, Calendar, Users, Home } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface BudgetCalculatorProps {
  destination: Destination;
}

const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ destination }) => {
  const [days, setDays] = useState(3);
  const [people, setPeople] = useState(2);
  const [accommodationType, setAccommodationType] = useState<'budget' | 'standard' | 'luxury'>('standard');
  const [includeTransport, setIncludeTransport] = useState(true);
  const [calculatedBudget, setCalculatedBudget] = useState<number | null>(null);

  const calculateBudget = () => {
    let total = 0;
    
    // Accommodation cost
    const accommodationCost = destination.averageBudget[accommodationType] * days;
    
    // Food cost (estimated as 20% of accommodation cost for budget, 30% for standard, 40% for luxury)
    const foodMultiplier = accommodationType === 'budget' ? 0.2 : accommodationType === 'standard' ? 0.3 : 0.4;
    const foodCost = accommodationCost * foodMultiplier;
    
    // Sightseeing cost (entry fees for attractions, estimated as 500 per person per day)
    const sightseeingCost = 500 * people * days;
    
    // Transport cost if included
    const transportCost = includeTransport ? 
      destination.transportOptions.reduce((min, option) => Math.min(min, option.cost), Infinity) * people : 0;
    
    // Local transport cost (estimated as 300 per person per day)
    const localTransportCost = 300 * people * days;
    
    // Calculate total
    total = accommodationCost + foodCost + sightseeingCost + transportCost + localTransportCost;
    
    // Add buffer (10%)
    total *= 1.1;
    
    setCalculatedBudget(Math.round(total));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-india-blue text-white">
        <h3 className="text-lg font-semibold">Budget Calculator</h3>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="days">Number of Days</Label>
            <div className="flex items-center mt-1">
              <Calendar size={18} className="text-gray-400 mr-2" />
              <Input 
                id="days"
                type="number" 
                min={1}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="people">Number of People</Label>
            <div className="flex items-center mt-1">
              <Users size={18} className="text-gray-400 mr-2" />
              <Input 
                id="people"
                type="number" 
                min={1}
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="accommodation">Accommodation Type</Label>
            <div className="flex items-center mt-1">
              <Home size={18} className="text-gray-400 mr-2" />
              <Select 
                value={accommodationType}
                onValueChange={(value) => setAccommodationType(value as 'budget' | 'standard' | 'luxury')}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select accommodation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="transport">Include Transport to Destination</Label>
            <div className="flex items-center mt-3">
              <input 
                id="transport"
                type="checkbox" 
                className="mr-2 h-4 w-4 rounded border-gray-300"
                checked={includeTransport}
                onChange={() => setIncludeTransport(!includeTransport)}
              />
              <span>Yes, include transport costs</span>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={calculateBudget}
          className="w-full bg-india-orange hover:bg-orange-600 mt-2"
        >
          Calculate Budget
        </Button>
        
        {calculatedBudget !== null && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium">Estimated Total Budget</h4>
              <div className="flex items-center text-india-blue font-bold text-xl">
                <CreditCard size={20} className="mr-1" />
                <span>₹{calculatedBudget.toLocaleString()}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              This is an approximate estimate for {days} days and {people} people with {accommodationType} accommodation
              {includeTransport ? ', including transport to the destination' : ''}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetCalculator;
