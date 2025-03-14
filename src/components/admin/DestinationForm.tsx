
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  state: z.string().min(1, "State is required"),
  description: z.string().min(10, "Description is required (min 10 chars)"),
  image: z.string().url("Must be a valid URL"),
  bestTimeToVisit: z.string().min(1, "Best time to visit is required"),
  budgetMin: z.coerce.number().min(0, "Budget must be a positive number"),
  budgetStandard: z.coerce.number().min(0, "Budget must be a positive number"),
  budgetLuxury: z.coerce.number().min(0, "Budget must be a positive number"),
});

export const DestinationForm = () => {
  const destinations = getAllDestinations();
  const [mode, setMode] = useState<'add' | 'edit'>('add');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      state: "",
      description: "",
      image: "",
      bestTimeToVisit: "",
      budgetMin: 0,
      budgetStandard: 0,
      budgetLuxury: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would make an API call to save to the database
    console.log('Destination data to save:', values);
    
    // Mock saving for demo
    const exists = destinations.find(d => d.id === values.id);
    
    if (mode === 'add' && exists) {
      toast.error(`Destination with ID "${values.id}" already exists`);
      return;
    }
    
    toast.success(`Destination ${mode === 'add' ? 'added' : 'updated'} successfully!`);
    form.reset();
  };

  const handleEdit = (id: string) => {
    const destination = destinations.find(d => d.id === id);
    if (destination) {
      form.reset({
        id: destination.id,
        name: destination.name,
        state: destination.state,
        description: destination.description,
        image: destination.image,
        bestTimeToVisit: destination.bestTimeToVisit,
        budgetMin: destination.averageBudget.budget,
        budgetStandard: destination.averageBudget.standard,
        budgetLuxury: destination.averageBudget.luxury,
      });
      setMode('edit');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">{mode === 'add' ? 'Add New' : 'Edit'} Destination</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination ID</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., delhi, goa" 
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
                    <Input placeholder="Destination name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State name" {...field} />
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
              name="bestTimeToVisit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Best Time to Visit</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., October to March" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="budgetMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="budgetStandard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Standard (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="budgetLuxury"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Luxury (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Detailed description of the destination" 
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
              {mode === 'add' ? 'Add Destination' : 'Update Destination'}
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
      
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Existing Destinations</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {destinations.map((destination) => (
                <TableRow key={destination.id}>
                  <TableCell>{destination.id}</TableCell>
                  <TableCell>{destination.name}</TableCell>
                  <TableCell>{destination.state}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(destination.id)}
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
    </div>
  );
};
