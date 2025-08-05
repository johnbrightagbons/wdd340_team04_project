'use client';

import { useState } from 'react';
import ArtisanCard from './ArtisanCard';
import { artisansData, type Artisan } from '../data/artisans';

const categories = ['All', 'Pottery', 'Jewelry', 'Woodwork', 'Textiles', 'Metalwork', 'Glasswork'];

export default function ArtisanGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArtisans = selectedCategory === 'All' 
    ? artisansData 
    : artisansData.filter((artisan: Artisan) => 
        artisan.specialties.some((specialty: string) => 
          specialty.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );

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
                ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
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
          <p className="text-xl text-gray-400">
            No artisans found in the {selectedCategory} category.
          </p>
        </div>
      )}
    </div>
  );
}