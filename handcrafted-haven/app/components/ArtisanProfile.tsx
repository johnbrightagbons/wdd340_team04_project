// app/components/ArtisanProfile.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Star, Calendar, Package, Instagram, Globe, Mail, Heart, Share2 } from 'lucide-react';
import { type Artisan } from '../data/artisans';

interface ArtisanProfileProps {
  artisan: Artisan;
}

// Mock products data - you can replace this with real data later
const mockProducts = [
  {
    id: 1,
    name: "Handcrafted Ceramic Bowl",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    price: 45,
  },
  {
    id: 2,
    name: "Traditional Pottery Vase",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=300&h=300&fit=crop",
    price: 78,
  },
  {
    id: 3,
    name: "Decorative Ceramic Plate",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
    price: 32,
  },
];

export default function ArtisanProfile({ artisan }: ArtisanProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/artisans"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Artisans
        </Link>

        {/* Hero Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Profile Image and Basic Info */}
            <div className="text-center lg:text-left">
              <div className="relative inline-block mb-6">
                <img
                  src={artisan.image}
                  alt={artisan.name}
                  className="w-48 h-48 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-orange-500/50 shadow-xl"
                />
                {artisan.featured && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Featured
                  </div>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
                {artisan.name}
              </h1>
              
              <div className="flex items-center justify-center lg:justify-start text-gray-300 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{artisan.location}</span>
              </div>

              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="flex items-center bg-yellow-500/20 rounded-full px-4 py-2 mr-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                  <span className="text-white font-semibold">{artisan.rating}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{artisan.yearsExperience} years experience</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    isFollowing
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                  {isFollowing ? 'Following' : 'Follow Artisan'}
                </button>
                
                <button className="flex items-center justify-center px-6 py-3 rounded-full font-semibold bg-gray-700 hover:bg-gray-600 text-white transition-colors">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Profile
                </button>
              </div>
            </div>

            {/* Stats and Specialties */}
            <div className="space-y-6">
              {/* Specialties */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Specialties</h3>
                <div className="flex flex-wrap gap-3">
                  {artisan.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full font-medium border border-orange-500/30"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                  <Package className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{artisan.totalProducts}</div>
                  <div className="text-gray-400 text-sm">Products</div>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{artisan.rating}</div>
                  <div className="text-gray-400 text-sm">Rating</div>
                </div>
              </div>

              {/* Social Media Links */}
              {artisan.socialMedia && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Connect & Follow</h3>
                  <div className="flex gap-4">
                    {artisan.socialMedia.instagram && (
                      <a
                        href={`https://instagram.com/${artisan.socialMedia.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Instagram className="w-5 h-5 mr-2" />
                        Instagram
                      </a>
                    )}
                    {artisan.socialMedia.website && (
                      <a
                        href={`https://${artisan.socialMedia.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Globe className="w-5 h-5 mr-2" />
                        Website
                      </a>
                    )}
                    {artisan.socialMedia.email && (
                      <a
                        href={`mailto:${artisan.socialMedia.email}`}
                        className="flex items-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        Email
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-700/50 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">About {artisan.name}</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{artisan.bio}</p>
        </div>

        {/* Featured Products */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-700/50">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Featured Products</h2>
            <Link
              href={`/products?artisan=${artisan.id}`}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-700/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                  <p className="text-orange-400 text-xl font-bold">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}