
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  backgroundImage: string;
  title: string;
  subtitle?: string;
  showSearch?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  backgroundImage, 
  title, 
  subtitle, 
  showSearch = false 
}) => {
  return (
    <div className="hero-section">
      <img src={backgroundImage} alt="Hero background" className="hero-image" />
      <div className="hero-overlay"></div>
      <div className="hero-content animate-fade-in">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{subtitle}</p>}
        
        {showSearch && (
          <div className="max-w-2xl mx-auto w-full">
            <div className="flex bg-white rounded-full overflow-hidden shadow-lg">
              <input 
                type="text" 
                placeholder="Search for destinations, activities..." 
                className="flex-grow px-6 py-4 focus:outline-none text-gray-800"
              />
              <Button type="submit" className="m-1 px-6 rounded-full bg-india-orange hover:bg-orange-600">
                <Search size={20} />
                <span className="ml-2">Search</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
