
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Phone, Globe, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import AttractionCard from '@/components/AttractionCard';
import WeatherCard from '@/components/WeatherCard';
import TransportOptions from '@/components/TransportOptions';
import AccommodationCard from '@/components/AccommodationCard';
import BudgetCalculator from '@/components/BudgetCalculator';
import { getDestinationById, Destination } from '@/data/destinations';
import { useNavigate } from 'react-router-dom';

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      const destinationData = getDestinationById(id);
      setDestination(destinationData || null);
      setLoading(false);
    }
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-india-blue"></div>
      </div>
    );
  }
  
  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-grow p-8">
          <h1 className="text-3xl font-bold mb-4">Destination Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the destination you're looking for.</p>
          <Button onClick={() => navigate(-1)} className="flex items-center bg-india-blue hover:bg-blue-700">
            <ArrowLeft size={16} className="mr-2" />
            Go Back
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection 
          backgroundImage={destination.image}
          title={destination.name}
          subtitle={destination.state}
        />
        
        {/* Quick Info */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <MapPin size={20} className="text-india-orange mr-2" />
                <span>{destination.state}, India</span>
              </div>
              
              <div className="flex items-center mb-4 sm:mb-0">
                <Phone size={20} className="text-india-orange mr-2" />
                <span>Local Emergency: 112</span>
              </div>
              
              <div className="flex items-center mb-4 sm:mb-0">
                <Globe size={20} className="text-india-orange mr-2" />
                <span>Best Time: {destination.bestTimeToVisit}</span>
              </div>
              
              <div className="flex items-center">
                <Star size={20} className="text-india-orange mr-2" />
                <span>4.7/5 (352 reviews)</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Description */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
              <p className="text-gray-700 leading-relaxed">{destination.description}</p>
            </div>
          </div>
        </section>
        
        {/* Tabs Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="attractions" className="w-full">
              <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="attractions">Attractions</TabsTrigger>
                <TabsTrigger value="transport">Transportation</TabsTrigger>
                <TabsTrigger value="stay">Where to Stay</TabsTrigger>
                <TabsTrigger value="plan">Plan & Budget</TabsTrigger>
              </TabsList>
              
              {/* Attractions Tab */}
              <TabsContent value="attractions" className="mt-6">
                <h3 className="text-2xl font-bold mb-6">Top Attractions in {destination.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destination.attractions.map((attraction) => (
                    <AttractionCard key={attraction.id} attraction={attraction} />
                  ))}
                </div>
                
                <div className="mt-8">
                  <WeatherCard weather={destination.weather} />
                </div>
              </TabsContent>
              
              {/* Transportation Tab */}
              <TabsContent value="transport" className="mt-6">
                <h3 className="text-2xl font-bold mb-6">Getting to {destination.name}</h3>
                <TransportOptions options={destination.transportOptions} />
                
                <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 bg-india-blue text-white">
                    <h3 className="text-lg font-semibold">Local Transportation</h3>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700 mb-4">
                      Once in {destination.name}, you can get around using various local transportation options:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Local buses run frequently between major attractions</li>
                      <li>Auto-rickshaws are available for short distances</li>
                      <li>Taxis can be booked for full-day sightseeing</li>
                      <li>Rental bikes and cars are available for self-driving</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              {/* Where to Stay Tab */}
              <TabsContent value="stay" className="mt-6">
                <h3 className="text-2xl font-bold mb-6">Accommodations in {destination.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destination.accommodations.map((accommodation) => (
                    <AccommodationCard key={accommodation.id} accommodation={accommodation} />
                  ))}
                </div>
              </TabsContent>
              
              {/* Plan & Budget Tab */}
              <TabsContent value="plan" className="mt-6">
                <h3 className="text-2xl font-bold mb-6">Plan Your Trip to {destination.name}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 bg-india-blue text-white">
                      <h3 className="text-lg font-semibold">Suggested Itinerary</h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-lg">Day 1: Arrival & Exploration</h4>
                          <ul className="list-disc pl-5 mt-2 text-gray-700">
                            <li>Arrive in {destination.name} and check into your hotel</li>
                            <li>Take a leisurely stroll around the area</li>
                            <li>Visit one of the nearby attractions</li>
                            <li>Enjoy a local dinner experience</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-lg">Day 2: Main Attractions</h4>
                          <ul className="list-disc pl-5 mt-2 text-gray-700">
                            <li>Visit the top attractions in the morning</li>
                            <li>Try local cuisine for lunch</li>
                            <li>Explore more sights in the afternoon</li>
                            <li>Evening cultural experience or shopping</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-lg">Day 3: Off the Beaten Path</h4>
                          <ul className="list-disc pl-5 mt-2 text-gray-700">
                            <li>Visit lesser-known but charming spots</li>
                            <li>Interact with locals</li>
                            <li>Souvenir shopping</li>
                            <li>Farewell dinner at a recommended restaurant</li>
                          </ul>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4 bg-india-orange hover:bg-orange-600">
                        Save This Itinerary
                      </Button>
                    </div>
                  </div>
                  
                  <BudgetCalculator destination={destination} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DestinationDetail;
