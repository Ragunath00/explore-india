
import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { getAllDestinations } from '@/data/destinations';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  description: z.string().min(10, "Description is required (min 10 chars)"),
  image: z.string().url("Must be a valid URL"),
  entryFee: z.coerce.number().min(0, "Entry fee must be a positive number"),
  openingHours: z.string().min(1, "Opening hours are required"),
  bestTimeToVisit: z.string().min(1, "Best time to visit is required"),
  location: z.string().min(1, "Location is required"),
  rating: z.coerce.number().min(1).max(5, "Rating must be between 1 and 5"),
});

export const AttractionForm = () => {
  const destinations = getAllDestinations();
  const [selectedDestination, setSelectedDestination] = useState(destinations[0]?.id || "");
  const [mode, setMode] = useState<'add' | 'edit'>('add');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destinationId: destinations[0]?.id || "",
      id: "",
      name: "",
      description: "",
      image: "",
      entryFee: 0,
      openingHours: "",
      bestTimeToVisit: "",
      location: "",
      rating: 4,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would make an API call to save to the database
    console.log('Attraction data to save:', values);
    
    // Mock saving for demo
    const destination = destinations.find(d => d.id === values.destinationId);
    const exists = destination?.attractions.find(a => a.id === values.id);
    
    if (mode === 'add' && exists) {
      toast.error(`Attraction with ID "${values.id}" already exists for this destination`);
      return;
    }
    
    toast.success(`Attraction ${mode === 'add' ? 'added' : 'updated'} successfully!`);
    
    if (mode === 'add') {
      form.reset({
        ...form.getValues(),
        id: "",
        name: "",
        description: "",
        image: "",
        entryFee: 0,
        openingHours: "",
        bestTimeToVisit: "",
        location: "",
        rating: 4,
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

  const handleEdit = (attractionId: string) => {
    const destination = destinations.find(d => d.id === selectedDestination);
    const attraction = destination?.attractions.find(a => a.id === attractionId);
    
    if (attraction) {
      form.reset({
        destinationId: selectedDestination,
        id: attraction.id,
        name: attraction.name,
        description: attraction.description,
        image: attraction.image,
        entryFee: attraction.entryFee,
        openingHours: attraction.openingHours,
        bestTimeToVisit: attraction.bestTimeToVisit,
        location: attraction.location,
        rating: attraction.rating,
      });
      setMode('edit');
    }
  };

  const currentDestination = destinations.find(d => d.id === selectedDestination);
  const attractions = currentDestination?.attractions || [];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">{mode === 'add' ? 'Add New' : 'Edit'} Attraction</h2>
      
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
                  <FormLabel>Attraction ID</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., botanical-gardens, ooty-lake" 
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
                    <Input placeholder="Attraction name" {...field} />
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
              name="entryFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entry Fee (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="openingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opening Hours</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 9:00 AM - 5:00 PM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bestTimeToVisit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Best Time to Visit</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Morning, Evening" {...field} />
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
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Detailed description of the attraction" 
                    className="min-h-32"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex gap-4">
            <Button type="submit">
              {mode === 'add' ? 'Add Attraction' : 'Update Attraction'}
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
      
      {attractions.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">
            Attractions for {currentDestination?.name}
          </h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Entry Fee</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attractions.map((attraction) => (
                  <TableRow key={attraction.id}>
                    <TableCell>{attraction.id}</TableCell>
                    <TableCell>{attraction.name}</TableCell>
                    <TableCell>₹{attraction.entryFee}</TableCell>
                    <TableCell>{attraction.rating}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(attraction.id)}
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
