
export interface Destination {
  id: string;
  name: string;
  state: string;
  description: string;
  image: string;
  attractions: Attraction[];
  transportOptions: TransportOption[];
  accommodations: Accommodation[];
  weather: Weather;
  bestTimeToVisit: string;
  averageBudget: {
    budget: number;
    standard: number;
    luxury: number;
  };
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  entryFee: number;
  openingHours: string;
  bestTimeToVisit: string;
  location: string;
  rating: number;
}

export interface TransportOption {
  type: "bus" | "train" | "flight" | "car";
  from: string;
  to: string;
  duration: string;
  cost: number;
  frequency: string;
  operators: string[];
}

export interface Accommodation {
  id: string;
  name: string;
  type: "budget" | "standard" | "luxury";
  pricePerNight: number;
  rating: number;
  amenities: string[];
  image: string;
  location: string;
}

export interface Weather {
  summer: {
    temperature: string;
    conditions: string;
  };
  winter: {
    temperature: string;
    conditions: string;
  };
  monsoon: {
    temperature: string;
    conditions: string;
  };
}

export const destinations: Destination[] = [
  {
    id: "ooty",
    name: "Ooty",
    state: "Tamil Nadu",
    description: "Nestled in the Nilgiri Hills, Ooty (also known as Udagamandalam) is a popular hill station in Tamil Nadu. Known for its tea gardens, rolling hills, and pleasant climate, Ooty offers a refreshing retreat from the heat of the plains.",
    image: "https://images.unsplash.com/photo-1585136917228-a4dfcacb29f2?q=80&w=1000",
    attractions: [
      {
        id: "botanical-gardens",
        name: "Botanical Gardens",
        description: "Spread over 55 acres, the Government Botanical Gardens houses a variety of plants, including exotic and rare species. The garden also features a fossilized tree trunk estimated to be 20 million years old.",
        image: "https://images.unsplash.com/photo-1544212575-6e248e63ec31?q=80&w=1000",
        entryFee: 50,
        openingHours: "8:00 AM - 6:30 PM",
        bestTimeToVisit: "Morning",
        location: "Udagamandalam, Tamil Nadu",
        rating: 4.5
      },
      {
        id: "ooty-lake",
        name: "Ooty Lake",
        description: "Created in 1824, Ooty Lake is an artificial lake that offers boating facilities. Surrounded by eucalyptus trees and beautiful landscapes, it's a popular spot for tourists and locals alike.",
        image: "https://images.unsplash.com/photo-1595815771614-ade1576442d8?q=80&w=1000",
        entryFee: 30,
        openingHours: "9:00 AM - 6:00 PM",
        bestTimeToVisit: "Evening",
        location: "North Lake Road, Udagamandalam",
        rating: 4.2
      },
      {
        id: "nilgiri-mountain-railway",
        name: "Nilgiri Mountain Railway",
        description: "A UNESCO World Heritage Site, this railway offers a scenic journey through hills, tunnels, and bridges. The train runs from Mettupalayam to Ooty, providing breathtaking views of the Nilgiri Hills.",
        image: "https://images.unsplash.com/photo-1565014904929-09c274a28170?q=80&w=1000",
        entryFee: 200,
        openingHours: "Varies based on schedule",
        bestTimeToVisit: "Morning departure",
        location: "Ooty Railway Station",
        rating: 4.8
      }
    ],
    transportOptions: [
      {
        type: "bus",
        from: "Bangalore",
        to: "Ooty",
        duration: "8 hours",
        cost: 600,
        frequency: "Multiple departures daily",
        operators: ["KSRTC", "TNSTC", "Private operators"]
      },
      {
        type: "train",
        from: "Mettupalayam",
        to: "Ooty",
        duration: "4-5 hours",
        cost: 200,
        frequency: "One departure daily",
        operators: ["Nilgiri Mountain Railway"]
      },
      {
        type: "flight",
        from: "Chennai",
        to: "Coimbatore",
        duration: "1 hour + 3 hours by road",
        cost: 5000,
        frequency: "Multiple flights daily",
        operators: ["IndiGo", "Air India", "SpiceJet"]
      }
    ],
    accommodations: [
      {
        id: "savoy",
        name: "The Savoy",
        type: "luxury",
        pricePerNight: 7500,
        rating: 4.7,
        amenities: ["Restaurant", "Spa", "Room service", "Free Wi-Fi", "Bar"],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000",
        location: "Ooty-Coonoor Road"
      },
      {
        id: "fortune",
        name: "Fortune Resort Sullivan Court",
        type: "standard",
        pricePerNight: 4500,
        rating: 4.3,
        amenities: ["Restaurant", "Room service", "Free parking", "Wi-Fi"],
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000",
        location: "Fernhill, Ooty"
      },
      {
        id: "hotel-darshan",
        name: "Hotel Darshan",
        type: "budget",
        pricePerNight: 1500,
        rating: 3.8,
        amenities: ["Restaurant", "Room service", "Free Wi-Fi"],
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000",
        location: "Commercial Road, Ooty"
      }
    ],
    weather: {
      summer: {
        temperature: "12°C - 25°C",
        conditions: "Pleasant with occasional rainfall"
      },
      winter: {
        temperature: "5°C - 18°C",
        conditions: "Cold and foggy"
      },
      monsoon: {
        temperature: "10°C - 20°C",
        conditions: "Heavy rainfall"
      }
    },
    bestTimeToVisit: "April to June and September to November",
    averageBudget: {
      budget: 2000,
      standard: 4000,
      luxury: 8000
    }
  },
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    description: "Known as the Pink City, Jaipur is the capital of Rajasthan. Famous for its vibrant culture, grand palaces, and historic forts, Jaipur forms an important part of the Golden Triangle tourist circuit along with Delhi and Agra.",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000",
    attractions: [
      {
        id: "amber-fort",
        name: "Amber Fort",
        description: "A majestic fort overlooking Maota Lake, known for its artistic style elements. The fort is built with red sandstone and marble and is laid out on four levels, each with a courtyard.",
        image: "https://images.unsplash.com/photo-1599661046289-e3ec1a230c0c?q=80&w=1000",
        entryFee: 200,
        openingHours: "8:00 AM - 5:30 PM",
        bestTimeToVisit: "Early morning",
        location: "Devisinghpura, Amer, Jaipur",
        rating: 4.7
      },
      {
        id: "hawa-mahal",
        name: "Hawa Mahal",
        description: "A palace built with red and pink sandstone, known for its unique five-story exterior with 953 small windows called jharokhas decorated with intricate latticework.",
        image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1000",
        entryFee: 50,
        openingHours: "9:00 AM - 4:30 PM",
        bestTimeToVisit: "Morning for best photographs",
        location: "Hawa Mahal Rd, Badi Choupad, Jaipur",
        rating: 4.5
      },
      {
        id: "city-palace",
        name: "City Palace",
        description: "A palace complex with courtyards, gardens, and buildings. It now houses a museum with a collection of royal costumes, weapons, and art.",
        image: "https://images.unsplash.com/photo-1506874005505-b98bf26eb8a1?q=80&w=1000",
        entryFee: 500,
        openingHours: "9:30 AM - 5:00 PM",
        bestTimeToVisit: "Afternoon",
        location: "Tulsi Marg, Gangori Bazaar, Jaipur",
        rating: 4.6
      }
    ],
    transportOptions: [
      {
        type: "flight",
        from: "Delhi",
        to: "Jaipur",
        duration: "1 hour",
        cost: 4000,
        frequency: "Multiple flights daily",
        operators: ["IndiGo", "Air India", "SpiceJet"]
      },
      {
        type: "train",
        from: "Delhi",
        to: "Jaipur",
        duration: "4-5 hours",
        cost: 500,
        frequency: "Multiple departures daily",
        operators: ["Indian Railways"]
      },
      {
        type: "bus",
        from: "Delhi",
        to: "Jaipur",
        duration: "6 hours",
        cost: 400,
        frequency: "Multiple departures daily",
        operators: ["RSRTC", "Private operators"]
      }
    ],
    accommodations: [
      {
        id: "rambagh-palace",
        name: "Rambagh Palace",
        type: "luxury",
        pricePerNight: 20000,
        rating: 4.9,
        amenities: ["Restaurant", "Spa", "Pool", "Room service", "Free Wi-Fi", "Bar"],
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=1000",
        location: "Bhawani Singh Road, Jaipur"
      },
      {
        id: "jai-mahal",
        name: "Jai Mahal Palace",
        type: "luxury",
        pricePerNight: 15000,
        rating: 4.8,
        amenities: ["Restaurant", "Spa", "Pool", "Room service", "Free Wi-Fi", "Bar"],
        image: "https://images.unsplash.com/photo-1605713024064-30405a9b1bbc?q=80&w=1000",
        location: "Jacob Road, Civil Lines, Jaipur"
      },
      {
        id: "zostel",
        name: "Zostel Jaipur",
        type: "budget",
        pricePerNight: 800,
        rating: 4.3,
        amenities: ["Free Wi-Fi", "Common area", "Terrace", "Cafe"],
        image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=1000",
        location: "Pink Square Mall, Govind Marg, Raja Park, Jaipur"
      }
    ],
    weather: {
      summer: {
        temperature: "25°C - 45°C",
        conditions: "Very hot and dry"
      },
      winter: {
        temperature: "8°C - 25°C",
        conditions: "Pleasant and mild"
      },
      monsoon: {
        temperature: "25°C - 35°C",
        conditions: "Moderate rainfall"
      }
    },
    bestTimeToVisit: "October to March",
    averageBudget: {
      budget: 2500,
      standard: 5000,
      luxury: 15000
    }
  },
  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    description: "India's smallest state and one of its most popular tourist destinations, Goa is known for its pristine beaches, vibrant nightlife, and Portuguese-influenced architecture. The state offers a unique blend of Indian and Portuguese cultures.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000",
    attractions: [
      {
        id: "calangute-beach",
        name: "Calangute Beach",
        description: "Often referred to as the 'Queen of Beaches', Calangute Beach is the largest and most popular beach in North Goa. It offers a range of water sports and is lined with shacks serving fresh seafood and drinks.",
        image: "https://images.unsplash.com/photo-1590080875515-8e0e7f5b615f?q=80&w=1000",
        entryFee: 0,
        openingHours: "24 hours",
        bestTimeToVisit: "Early morning or late afternoon",
        location: "Calangute, North Goa",
        rating: 4.2
      },
      {
        id: "basilica-bom-jesus",
        name: "Basilica of Bom Jesus",
        description: "A UNESCO World Heritage Site, this basilica contains the mortal remains of St. Francis Xavier and is known for its exemplary baroque architecture.",
        image: "https://images.unsplash.com/photo-1629968417850-8e37c7723490?q=80&w=1000",
        entryFee: 0,
        openingHours: "9:00 AM - 6:30 PM",
        bestTimeToVisit: "Morning",
        location: "Old Goa Road, Bainguinim, Goa",
        rating: 4.6
      },
      {
        id: "dudhsagar-falls",
        name: "Dudhsagar Falls",
        description: "Located on the Mandovi River, Dudhsagar is one of India's tallest waterfalls. The name 'Dudhsagar' literally translates to 'sea of milk', derived from the white spray and foam the cascading water creates.",
        image: "https://images.unsplash.com/photo-1599402185954-d3e2075a883a?q=80&w=1000",
        entryFee: 400,
        openingHours: "7:00 AM - 5:00 PM",
        bestTimeToVisit: "Post monsoon (September to January)",
        location: "Sonaulim, Goa",
        rating: 4.7
      }
    ],
    transportOptions: [
      {
        type: "flight",
        from: "Mumbai",
        to: "Goa",
        duration: "1 hour",
        cost: 4500,
        frequency: "Multiple flights daily",
        operators: ["IndiGo", "Air India", "SpiceJet"]
      },
      {
        type: "train",
        from: "Mumbai",
        to: "Goa",
        duration: "10-12 hours",
        cost: 800,
        frequency: "Multiple departures daily",
        operators: ["Indian Railways"]
      },
      {
        type: "bus",
        from: "Mumbai",
        to: "Goa",
        duration: "12 hours",
        cost: 1200,
        frequency: "Multiple departures daily",
        operators: ["MSRTC", "Private operators"]
      }
    ],
    accommodations: [
      {
        id: "taj-exotica",
        name: "Taj Exotica Resort & Spa",
        type: "luxury",
        pricePerNight: 18000,
        rating: 4.8,
        amenities: ["Beach access", "Swimming pool", "Spa", "Restaurant", "Bar", "Free Wi-Fi"],
        image: "https://images.unsplash.com/photo-1518291344630-4857135fb581?q=80&w=1000",
        location: "Benaulim, South Goa"
      },
      {
        id: "alila-diwa",
        name: "Alila Diwa Goa",
        type: "luxury",
        pricePerNight: 12000,
        rating: 4.7,
        amenities: ["Swimming pool", "Spa", "Restaurant", "Bar", "Free Wi-Fi"],
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000",
        location: "Majorda, South Goa"
      },
      {
        id: "zostel-goa",
        name: "Zostel Goa",
        type: "budget",
        pricePerNight: 700,
        rating: 4.3,
        amenities: ["Free Wi-Fi", "Common area", "Terrace", "Cafe"],
        image: "https://images.unsplash.com/photo-1595877244574-e90ce41ce089?q=80&w=1000",
        location: "Calangute, North Goa"
      }
    ],
    weather: {
      summer: {
        temperature: "25°C - 35°C",
        conditions: "Hot and humid"
      },
      winter: {
        temperature: "21°C - 32°C",
        conditions: "Pleasant and mild"
      },
      monsoon: {
        temperature: "22°C - 30°C",
        conditions: "Heavy rainfall"
      }
    },
    bestTimeToVisit: "November to February",
    averageBudget: {
      budget: 3000,
      standard: 6000,
      luxury: 15000
    }
  }
];

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find(dest => dest.id === id);
}

export function getAllDestinations(): Destination[] {
  return destinations;
}
