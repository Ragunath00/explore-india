
import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { getAllDestinations } from '@/data/destinations';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formSchema = z.object({
  destinationId: z.string({
    required_error: "Please select a destination",
  }),
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  type: z.enum(["budget", "standard", "luxury"], {
    required_error: "Please select accommodation type",
  }),
  pricePerNight: z.coerce.number().min(0, "Price must be a positive number"),
  rating: z.coerce.number().min(1).max(5, "Rating must be between 1 and 5"),
  amenities: z.string().min(1, "At least one amenity is required"),
  image: z.string().url("Must be a valid URL"),
  location: z.string().min(1, "Location is required"),
});

export const AccommodationForm = () => {
  const destinations = getAllDestinations();
  const [selectedDestination, setSelectedDestination] = useState(destinations[0]?.id || "");
  const [mode, setMode] = useState<'add' | 'edit'>('add');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destinationId: destinations[0]?.id || "",
      id: "",
      name: "",
      type: "standard",
      pricePerNight: 0,
      rating: 4,
      amenities: "",
      image: "",
      location: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would make an API call to save to the database
    console.log('Accommodation data to save:', {
      ...values,
      amenities: values.amenities.split(',').map(a => a.trim()),
    });
    
    // Mock saving for demo
    const destination = destinations.find(d => d.id === values.destinationId);
    const exists = destination?.accommodations.find(a => a.id === values.id);
    
    if (mode === 'add' && exists) {
      toast.error(`Accommodation with ID "${values.id}" already exists for this destination`);
      return;
    }
    
    toast.success(`Accommodation ${mode === 'add' ? 'added' : 'updated'} successfully!`);
    
    if (mode === 'add') {
      form.reset({
        ...form.getValues(),
        id: "",
        name: "",
        type: "standard",
        pricePerNight: 0,
        rating: 4,
        amenities: "",
        image: "",
        location: "",
      });
    } else {
      setMode('add');
      form.reset();
    }
  };

  const handleDestinationChange = (value: string) => {
    setSelectedDestination(value);
    form.setValue("destinationId", value);
  };

  const handleEdit = (accommodationId: string) => {
    const destination = destinations.find(d => d.id === selectedDestination);
    const accommodation = destination?.accommodations.find(a => a.id === accommodationId);
    
    if (accommodation) {
      form.reset({
        destinationId: selectedDestination,
        id: accommodation.id,
        name: accommodation.name,
        type: accommodation.type,
        pricePerNight: accommodation.pricePerNight,
        rating: accommodation.rating,
        amenities: accommodation.amenities.join(', '),
        image: accommodation.image,
        location: accommodation.location,
      });
      setMode('edit');
    }
  };

  const currentDestination = destinations.find(d => d.id === selectedDestination);
  const accommodations = currentDestination?.accommodations || [];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">{mode === 'add' ? 'Add New' : 'Edit'} Accommodation</h2>
      
      <div className="mb-6">
        <FormLabel>Select Destination</FormLabel>
        <Select 
          value={selectedDestination} 
          onValueChange={handleDestinationChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a destination" />
          </SelectTrigger>
          <SelectContent>
            {destinations.map(destination => (
              <SelectItem key={destination.id} value={destination.id}>
                {destination.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accommodation ID</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., hotel-taj, hilton-goa" 
                      {...field} 
                      disabled={mode === 'edit'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Accommodation name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select accommodation type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pricePerNight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Per Night (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating (1-5)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1" 
                      max="5" 
                      step="0.1" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Address or location details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="amenities"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Amenities</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Comma-separated list of amenities, e.g., WiFi, Pool, Restaurant" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex gap-4">
            <Button type="submit">
              {mode === 'add' ? 'Add Accommodation' : 'Update Accommodation'}
            </Button>
            
            {mode === 'edit' && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setMode('add');
                  form.reset();
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Form>
      
      {accommodations.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">
            Accommodations for {currentDestination?.name}
          </h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price/Night</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accommodations.map((accommodation) => (
                  <TableRow key={accommodation.id}>
                    <TableCell>{accommodation.id}</TableCell>
                    <TableCell>{accommodation.name}</TableCell>
                    <TableCell className="capitalize">{accommodation.type}</TableCell>
                    <TableCell>₹{accommodation.pricePerNight}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(accommodation.id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};
