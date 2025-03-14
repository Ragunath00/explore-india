
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Map, Home, Info, Search, Calendar, Plane, Hotel, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const TripPlannerContent = () => (
    <>
      <div className="space-y-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 text-india-orange mr-2" />
              <h4 className="text-lg font-medium">Plan Itinerary</h4>
            </div>
            <p className="text-sm text-gray-500">Create a custom day-by-day itinerary for your trip</p>
          </div>
          
          <div className="rounded-lg border p-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center mb-2">
              <Plane className="h-5 w-5 text-india-orange mr-2" />
              <h4 className="text-lg font-medium">Transportation</h4>
            </div>
            <p className="text-sm text-gray-500">Find the best way to get to your destination</p>
          </div>
          
          <div className="rounded-lg border p-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center mb-2">
              <Hotel className="h-5 w-5 text-india-orange mr-2" />
              <h4 className="text-lg font-medium">Accommodation</h4>
            </div>
            <p className="text-sm text-gray-500">Discover perfect places to stay during your trip</p>
          </div>
          
          <div className="rounded-lg border p-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center mb-2">
              <Wallet className="h-5 w-5 text-india-orange mr-2" />
              <h4 className="text-lg font-medium">Budget</h4>
            </div>
            <p className="text-sm text-gray-500">Estimate costs and plan your travel budget</p>
          </div>
        </div>
      </div>
    </>
  );

  // Use Dialog for desktop and Drawer for mobile
  const PlanTripButton = () => {
    if (isDesktop) {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-4 bg-india-orange hover:bg-orange-600 text-white">
              Plan Your Trip
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Plan Your Perfect Trip</DialogTitle>
              <DialogDescription>
                Use our tools to create your dream vacation to India.
              </DialogDescription>
            </DialogHeader>
            <TripPlannerContent />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }
    
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="w-full bg-india-orange hover:bg-orange-600 text-white">
            Plan Your Trip
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Plan Your Perfect Trip</DrawerTitle>
            <DrawerDescription>
              Use our tools to create your dream vacation to India.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <TripPlannerContent />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-india-blue">
                Explore<span className="text-india-orange">India</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-india-blue hover:bg-gray-50 transition-colors">
              Home
            </Link>
            <Link to="/destinations" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-india-blue hover:bg-gray-50 transition-colors">
              Destinations
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-india-blue hover:bg-gray-50 transition-colors">
              About
            </Link>
            <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-india-blue hover:bg-gray-50 transition-colors">
              Contact
            </Link>
            <PlanTripButton />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-india-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-india-blue"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-2 px-2 pt-2 pb-3 sm:px-3">
            <Link 
              to="/" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-india-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} className="mr-2" />
              Home
            </Link>
            <Link 
              to="/destinations" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-india-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <Map size={18} className="mr-2" />
              Destinations
            </Link>
            <Link 
              to="/about" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-india-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <Info size={18} className="mr-2" />
              About
            </Link>
            <Link 
              to="/contact" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-india-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <Search size={18} className="mr-2" />
              Contact
            </Link>
            <div onClick={() => setIsMenuOpen(false)}>
              <PlanTripButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
