// app/components/ArtisanCard.tsx
import Link from 'next/link';
import { MapPin, Star, Eye } from 'lucide-react';
import { type Artisan } from '../data/artisans';

interface ArtisanCardProps {
  artisan: Artisan;
}

export default function ArtisanCard({ artisan }: ArtisanCardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-gray-700/50">
      {/* Artisan Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={artisan.image}
          alt={artisan.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {artisan.featured && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-xl font-bold text-white mb-1">{artisan.name}</h3>
          <div className="flex items-center text-gray-300 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {artisan.location}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Rating and Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-white font-medium">{artisan.rating}</span>
          </div>
          <div className="text-gray-400 text-sm">
            {artisan.yearsExperience} years experience
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {artisan.specialties.slice(0, 3).map((specialty, index) => (
              <span
                key={index}
                className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-xs font-medium"
              >
                {specialty}
              </span>
            ))}
            {artisan.specialties.length > 3 && (
              <span className="text-gray-400 text-xs px-2 py-1">
                +{artisan.specialties.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {artisan.bio}
        </p>

        {/* Products Count */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-400 text-sm">
            {artisan.totalProducts} products available
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/artisans/${artisan.id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-center flex items-center justify-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Profile
          </Link>
          <Link
            href={`/products?artisan=${artisan.id}`}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-center"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
}