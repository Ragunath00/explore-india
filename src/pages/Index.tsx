
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, CreditCard, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import DestinationCard from '@/components/DestinationCard';
import { getAllDestinations } from '@/data/destinations';

const features = [
  {
    icon: <MapPin size={24} className="text-india-orange" />,
    title: "Curated Destinations",
    description: "Discover handpicked destinations across India with detailed travel guides."
  },
  {
    icon: <Calendar size={24} className="text-india-orange" />,
    title: "Detailed Itineraries",
    description: "Plan your trip with our comprehensive day-by-day travel itineraries."
  },
  {
    icon: <CreditCard size={24} className="text-india-orange" />,
    title: "Budget Planning",
    description: "Estimate your travel expenses with our interactive budget calculator."
  },
  {
    icon: <Star size={24} className="text-india-orange" />,
    title: "Authentic Reviews",
    description: "Make informed decisions with genuine reviews from fellow travelers."
  }
];

const Index = () => {
  const destinations = getAllDestinations();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection 
          backgroundImage="https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=2936&auto=format&fit=crop"
          title="Discover India's Magic"
          subtitle="Explore the diverse landscapes, rich culture and unforgettable experiences across incredible India."
          showSearch={true}
        />
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-heading">Why Choose Us</h2>
            <p className="section-subheading">
              We make your travel experience seamless and memorable with our comprehensive services.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-india-blue/10 rounded-full flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Popular Destinations */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-heading">Popular Destinations</h2>
            <p className="section-subheading">
              Explore India's most beloved destinations and start planning your next adventure.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {destinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild className="bg-india-blue hover:bg-blue-700">
                <Link to="/destinations" className="flex items-center">
                  View All Destinations
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section className="py-16 bg-india-blue text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              What Our Travelers Say
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <p className="text-white/90 italic mb-4">
                  "The detailed itineraries and budget calculator helped me plan my Rajasthan trip perfectly. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-india-orange rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-semibold">Priya Sharma</h4>
                    <p className="text-white/70 text-sm">Bangalore, India</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <p className="text-white/90 italic mb-4">
                  "ExploreIndia made our family trip to Ooty so easy to plan. The transportation options were spot on!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-india-orange rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-semibold">Rajesh Kumar</h4>
                    <p className="text-white/70 text-sm">Chennai, India</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <p className="text-white/90 italic mb-4">
                  "The local insights and attraction details were invaluable for our Goa vacation. We discovered hidden gems!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-india-orange rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-semibold">Ananya Patel</h4>
                    <p className="text-white/70 text-sm">Mumbai, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Explore India?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start planning your dream Indian adventure today with our comprehensive guides and tools.
            </p>
            <Button className="bg-india-orange hover:bg-orange-600 text-lg px-8 py-6">
              Plan Your Trip Now
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
