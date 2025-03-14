
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
  type: z.enum(["bus", "train", "flight", "car"], {
    required_error: "Please select a transport type",
  }),
  from: z.string().min(1, "Origin is required"),
  to: z.string().min(1, "Destination is required"),
  duration: z.string().min(1, "Duration is required"),
  cost: z.coerce.number().min(0, "Cost must be a positive number"),
  frequency: z.string().min(1, "Frequency is required"),
  operators: z.string().min(1, "At least one operator is required"),
});

export const TransportForm = () => {
  const destinations = getAllDestinations();
  const [selectedDestination, setSelectedDestination] = useState(destinations[0]?.id || "");
  const [mode, setMode] = useState<'add' | 'edit'>('add');
  const [editIndex, setEditIndex] = useState<number>(-1);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destinationId: destinations[0]?.id || "",
      type: "bus",
      from: "",
      to: "",
      duration: "",
      cost: 0,
      frequency: "",
      operators: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would make an API call to save to the database
    console.log('Transport data to save:', {
      ...values,
      operators: values.operators.split(',').map(op => op.trim()),
    });
    
    toast.success(`Transport option ${mode === 'add' ? 'added' : 'updated'} successfully!`);
    
    if (mode === 'add') {
      form.reset({
        ...form.getValues(),
        from: "",
        to: "",
        duration: "",
        cost: 0,
        frequency: "",
        operators: "",
      });
    } else {
      setMode('add');
      setEditIndex(-1);
      form.reset();
    }
  };

  const handleDestinationChange = (value: string) => {
    setSelectedDestination(value);
    form.setValue("destinationId", value);
  };

  const handleEdit = (index: number) => {
    const destination = destinations.find(d => d.id === selectedDestination);
    const transport = destination?.transportOptions[index];
    
    if (transport) {
      form.reset({
        destinationId: selectedDestination,
        type: transport.type,
        from: transport.from,
        to: transport.to,
        duration: transport.duration,
        cost: transport.cost,
        frequency: transport.frequency,
        operators: transport.operators.join(', '),
      });
      setMode('edit');
      setEditIndex(index);
    }
  };

  const currentDestination = destinations.find(d => d.id === selectedDestination);
  const transportOptions = currentDestination?.transportOptions || [];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">{mode === 'add' ? 'Add New' : 'Edit'} Transport Option</h2>
      
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transport Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transport type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bus">Bus</SelectItem>
                      <SelectItem value="train">Train</SelectItem>
                      <SelectItem value="flight">Flight</SelectItem>
                      <SelectItem value="car">Car</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <Input placeholder="Origin city/location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <Input placeholder="Destination city/location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 4 hours, 2 days" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Daily, Twice a week" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="operators"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Operators</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Comma-separated list of operators" 
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
              {mode === 'add' ? 'Add Transport Option' : 'Update Transport Option'}
            </Button>
            
            {mode === 'edit' && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setMode('add');
                  setEditIndex(-1);
                  form.reset();
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Form>
      
      {transportOptions.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">
            Transport Options for {currentDestination?.name}
          </h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transportOptions.map((transport, index) => (
                  <TableRow key={index}>
                    <TableCell className="capitalize">{transport.type}</TableCell>
                    <TableCell>{transport.from} to {transport.to}</TableCell>
                    <TableCell>{transport.duration}</TableCell>
                    <TableCell>₹{transport.cost}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(index)}
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
