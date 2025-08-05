// app/data/artisans.ts
export interface Artisan {
  id: number;
  name: string;
  location: string;
  specialties: string[];
  bio: string;
  image: string;
  rating: number;
  totalProducts: number;
  yearsExperience: number;
  featured: boolean;
  socialMedia?: {
    instagram?: string;
    website?: string;
    email?: string;
  };
}

export const artisansData: Artisan[] = [
  {
    id: 1,
    name: "Elena Rodriguez",
    location: "Talavera, Spain",
    specialties: ["Pottery", "Ceramics", "Traditional Glazing"],
    bio: "Elena carries on a 300-year family tradition of Talavera pottery, creating vibrant hand-painted ceramics using techniques passed down through generations. Her work celebrates the rich cultural heritage of Spanish pottery.",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop",
    rating: 4.9,
    totalProducts: 45,
    yearsExperience: 15,
    featured: true,
    socialMedia: {
      instagram: "@elena_pottery",
      website: "www.elenaceramics.com"
    }
  },
  {
    id: 2,
    name: "Marcus Thompson",
    location: "Asheville, North Carolina",
    specialties: ["Woodwork", "Furniture", "Wood Carving"],
    bio: "Marcus is a master woodworker who transforms locally sourced hardwoods into functional art pieces. His sustainable approach and attention to natural wood grain patterns make each piece truly unique.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.8,
    totalProducts: 32,
    yearsExperience: 20,
    featured: true,
    socialMedia: {
      instagram: "@marcus_woodcraft",
      website: "www.thompsonwoodworks.com"
    }
  },
  {
    id: 3,
    name: "Asha Patel",
    location: "Jaipur, India",
    specialties: ["Jewelry", "Silver Work", "Gemstone Setting"],
    bio: "Asha creates stunning silver jewelry inspired by traditional Rajasthani designs. Her intricate work features hand-selected gemstones and incorporates ancient techniques with contemporary aesthetics.",
    image: "https://images.unsplash.com/photo-1494790108755-2616c3e1e5d1?w=400&h=400&fit=crop",
    rating: 4.9,
    totalProducts: 78,
    yearsExperience: 12,
    featured: false,
    socialMedia: {
      instagram: "@asha_silvercraft",
      email: "asha@silvercrafts.in"
    }
  },
  {
    id: 4,
    name: "Lars Andersen",
    location: "Bergen, Norway",
    specialties: ["Glasswork", "Glass Blowing", "Sculptural Glass"],
    bio: "Lars creates breathtaking glass sculptures and functional pieces using traditional Scandinavian glassblowing techniques. His work captures the ethereal beauty of Nordic landscapes in glass.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    rating: 4.7,
    totalProducts: 28,
    yearsExperience: 18,
    featured: false,
    socialMedia: {
      website: "www.larsglassstudio.no",
      email: "lars@glassstudio.no"
    }
  },
  {
    id: 5,
    name: "Amara Okafor",
    location: "Lagos, Nigeria",
    specialties: ["Textiles", "Weaving", "Natural Dyes"],
    bio: "Amara specializes in traditional West African textile arts, using natural dyes and hand-weaving techniques to create vibrant fabrics. Her work celebrates African heritage while embracing modern design sensibilities.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
    rating: 4.8,
    totalProducts: 56,
    yearsExperience: 10,
    featured: true,
    socialMedia: {
      instagram: "@amara_textiles",
      website: "www.amaratextiles.ng"
    }
  },
  {
    id: 6,
    name: "Giovanni Rossi",
    location: "Florence, Italy",
    specialties: ["Metalwork", "Bronze Casting", "Restoration"],
    bio: "Giovanni is a master metalworker specializing in bronze casting and restoration. Working from his historic Florentine workshop, he creates both contemporary sculptures and restores Renaissance-era pieces.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
    rating: 4.9,
    totalProducts: 23,
    yearsExperience: 25,
    featured: false,
    socialMedia: {
      website: "www.rossimetalworks.it",
      email: "giovanni@metalworks.it"
    }
  },
  {
    id: 7,
    name: "Keiko Tanaka",
    location: "Kyoto, Japan",
    specialties: ["Pottery", "Raku Ceramics", "Tea Ceremony Ware"],
    bio: "Keiko is a renowned ceramicist specializing in traditional Japanese Raku pottery. Her tea bowls and ceremonial pieces embody the principles of wabi-sabi, finding beauty in imperfection and impermanence.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 4.9,
    totalProducts: 41,
    yearsExperience: 16,
    featured: true,
    socialMedia: {
      instagram: "@keiko_raku",
      website: "www.tanaka-ceramics.jp"
    }
  },
  {
    id: 8,
    name: "Samuel Rivers",
    location: "Santa Fe, New Mexico",
    specialties: ["Jewelry", "Turquoise Work", "Native American Techniques"],
    bio: "Samuel creates authentic Native American-inspired jewelry using traditional techniques and locally sourced turquoise. His work honors indigenous craftsmanship while supporting sustainable mining practices.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 4.7,
    totalProducts: 67,
    yearsExperience: 14,
    featured: false,
    socialMedia: {
      instagram: "@samuel_turquoise",
      website: "www.riversturquoise.com"
    }
  }
];