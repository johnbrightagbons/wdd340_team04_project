'use client';

import { useState, useEffect } from 'react';
import ArtisanCard from './ArtisanCard';

interface Artisan {
  id: string;
  name: string;
  location: string;
  specialties: string[];
  bio: string;
  image: string;
  rating: number;
  totalProducts: number;
  yearsExperience: number;
  featured: boolean;
  verified: boolean;
  totalSales: number;
}

interface ArtisanGridProps {
  initialArtisans?: Artisan[];
}

const categories = ['All', 'Pottery', 'Jewelry', 'Woodwork', 'Textiles', 'Metalwork', 'Glasswork'];

export default function ArtisanGrid({ initialArtisans = [] }: ArtisanGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [artisans, setArtisans] = useState<Artisan[]>(initialArtisans);
  const [loading, setLoading] = useState(!initialArtisans.length);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch if we don't have initial data
    if (initialArtisans.length === 0) {
      const fetchArtisans = async () => {
        try {
          setLoading(true);
          const response = await fetch('/api/artisans');
          const data = await response.json();
          
          if (data.success) {
            setArtisans(data.data);
          } else {
            setError('Failed to load artisans');
          }
        } catch (error) {
          console.error('Error fetching artisans:', error);
          setError('Failed to load artisans');
        } finally {
          setLoading(false);
        }
      };

      fetchArtisans();
    }
  }, [initialArtisans.length]);

  const filteredArtisans = selectedCategory === 'All' 
    ? artisans 
    : artisans.filter((artisan: Artisan) => 
        artisan.specialties.some((specialty: string) => 
          specialty.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-secondary">Loading artisans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-accent text-white shadow-lg transform scale-105'
                : 'bg-tertiary text-secondary hover:bg-hover-bg hover:text-primary'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Artisans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArtisans.map((artisan: Artisan) => (
          <ArtisanCard key={artisan.id} artisan={artisan} />
        ))}
      </div>

      {filteredArtisans.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-secondary">
            No artisans found in the {selectedCategory} category.
          </p>
        </div>
      )}
    </div>
  );
}