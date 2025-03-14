
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DestinationForm } from '@/components/admin/DestinationForm';
import { AttractionForm } from '@/components/admin/AttractionForm';
import { TransportForm } from '@/components/admin/TransportForm';
import { AccommodationForm } from '@/components/admin/AccommodationForm';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Simple admin check (in a real app, use proper authentication)
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>

      <Tabs defaultValue="destinations" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
          <TabsTrigger value="attractions">Attractions</TabsTrigger>
          <TabsTrigger value="transports">Transport Options</TabsTrigger>
          <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="destinations" className="p-4 border rounded-lg">
          <DestinationForm />
        </TabsContent>
        
        <TabsContent value="attractions" className="p-4 border rounded-lg">
          <AttractionForm />
        </TabsContent>
        
        <TabsContent value="transports" className="p-4 border rounded-lg">
          <TransportForm />
        </TabsContent>
        
        <TabsContent value="accommodations" className="p-4 border rounded-lg">
          <AccommodationForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
