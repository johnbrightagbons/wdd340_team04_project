import { notFound } from 'next/navigation'
import { prisma } from '@/app/lib/prisma'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import ProductCard from '@/app/components/ProductCard'
import { MapPin, Star, Award, Mail, Globe, Instagram } from 'lucide-react'

interface ArtisanDetailPageProps {
  params: Promise<{
    id: string
  }>
}

async function getArtisan(id: string) {
  try {
    const artisan = await prisma.user.findUnique({
      where: {
        id,
        isArtisan: true
      },
      include: {
        artisanProfile: {
          include: {
            specialties: true
          }
        },
        products: {
          include: {
            category: true,
            tags: true
          }
        },
        _count: {
          select: {
            products: true
          }
        }
      }
    })

    if (!artisan) {
      return null
    }

    return {
      id: artisan.id,
      name: artisan.name,
      location: artisan.artisanProfile?.location || 'Unknown',
      specialties: artisan.artisanProfile?.specialties.map((s: any) => s.specialty) || [],
      bio: artisan.artisanProfile?.bio || '',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      rating: Number(artisan.artisanProfile?.rating || 0),
      totalProducts: artisan._count.products,
      yearsExperience: Math.floor(Math.random() * 20) + 5, // Placeholder for now
      featured: artisan.artisanProfile?.verified || false,
      verified: artisan.artisanProfile?.verified || false,
      totalSales: artisan.artisanProfile?.totalSales || 0,
      products: artisan.products.map((product: any) => ({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        originalPrice: product.originalPrice ? Number(product.originalPrice) : undefined,
        description: product.description,
        imageUrl: product.imageUrl,
        featured: product.featured,
        premium: product.premium,
        rating: Number(product.rating),
        reviews: product.reviews,
        inStock: product.inStock,
        category: product.category,
        artisan: {
          id: artisan.id,
          name: artisan.name
        },
        tags: product.tags.map((tag: any) => tag.tag),
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }))
    }
  } catch (error) {
    console.error('Error fetching artisan:', error)
    return null
  }
}

export default async function ArtisanDetailPage({ params }: ArtisanDetailPageProps) {
  const { id } = await params
  const artisan = await getArtisan(id)

  if (!artisan) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Artisan Header */}
        <div className="bg-tertiary rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Artisan Image */}
            <div className="lg:col-span-1">
              <div className="relative">
                <img
                  src={artisan.image}
                  alt={artisan.name}
                  className="w-full h-80 object-cover rounded-xl"
                />
                {artisan.featured && (
                  <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
              </div>
            </div>

            {/* Artisan Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-primary mb-2">{artisan.name}</h1>
                  <div className="flex items-center text-secondary mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    {artisan.location}
                  </div>
                </div>
                {artisan.verified && (
                  <div className="flex items-center bg-accent/20 text-accent px-3 py-1 rounded-full">
                    <Award className="w-4 h-4 mr-2" />
                    Verified
                  </div>
                )}
              </div>

              {/* Rating and Stats */}
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                  <span className="text-xl font-bold text-primary">{artisan.rating}</span>
                </div>
                <div className="text-secondary">
                  {artisan.yearsExperience} years experience
                </div>
                <div className="text-secondary">
                  {artisan.totalProducts} products
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {artisan.specialties.map((specialty: string, index: number) => (
                    <span
                      key={index}
                      className="bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-3">About</h3>
                <p className="text-secondary leading-relaxed">{artisan.bio}</p>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 bg-secondary hover:bg-hover-bg text-primary px-4 py-2 rounded-lg transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </button>
                <button className="flex items-center space-x-2 bg-secondary hover:bg-hover-bg text-primary px-4 py-2 rounded-lg transition-colors">
                  <Globe className="w-4 h-4" />
                  <span>Website</span>
                </button>
                <button className="flex items-center space-x-2 bg-secondary hover:bg-hover-bg text-primary px-4 py-2 rounded-lg transition-colors">
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Products by {artisan.name}
          </h2>
          
          {artisan.products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artisan.products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-secondary text-lg">No products available yet.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}