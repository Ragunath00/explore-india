
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import DestinationCard from '@/components/DestinationCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAllDestinations, Destination } from '@/data/destinations';

const Destinations = () => {
  const allDestinations = getAllDestinations();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(allDestinations);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setFilteredDestinations(allDestinations);
      return;
    }
    
    const results = allDestinations.filter(destination => 
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredDestinations(results);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection 
          backgroundImage="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000&auto=format&fit=crop"
          title="Explore All Destinations"
          subtitle="Discover the diverse landscapes and cultural treasures of India"
        />
        
        {/* Search and Filter Section */}
        <section className="py-8 bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow flex rounded-md border overflow-hidden">
                <Input 
                  type="text" 
                  placeholder="Search destinations..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0 flex-grow"
                />
                <Button type="submit" className="rounded-none bg-india-blue hover:bg-blue-700">
                  <Search size={18} />
                </Button>
              </div>
              
              <Button 
                type="button" 
                className="flex items-center bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              >
                <Filter size={18} className="mr-2" />
                Filters
              </Button>
            </form>
          </div>
        </section>
        
        {/* Destinations List */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredDestinations.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold mb-4">No destinations found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setFilteredDestinations(allDestinations);
                  }} 
                  className="mt-4 bg-india-orange hover:bg-orange-600"
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-8">
                  {searchTerm ? `Search Results (${filteredDestinations.length})` : 'All Destinations'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredDestinations.map((destination) => (
                    <DestinationCard key={destination.id} destination={destination} />
                  ))}
                </div>
              </>
            )}
            
            {/* Popular Regions Section */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6">Explore by Region</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {["North India", "South India", "East India", "West India"].map((region) => (
                  <div 
                    key={region} 
                    className="relative rounded-lg overflow-hidden h-40 shadow-md cursor-pointer"
                  >
                    <img 
                      src={`https://source.unsplash.com/random/300x200?india,${region.toLowerCase().replace(' ', '')}`} 
                      alt={region} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h4 className="text-xl font-semibold">{region}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Destinations;
