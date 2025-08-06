// app/types/artisan.ts
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

export interface ArtisanCardProps {
  artisan: Artisan;
}