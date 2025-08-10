import { prisma } from '@/app/lib/prisma'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ArtisanGrid from '../components/ArtisanGrid'

export default async function ArtisansPage() {
  // Fetch artisans on the server
  const artisans = await prisma.user.findMany({
    where: {
      isArtisan: true,
      artisanProfile: {
        isNot: null
      }
    },
    include: {
      artisanProfile: {
        include: {
          specialties: true
        }
      },
      _count: {
        select: {
          products: true
        }
      }
    },
    orderBy: {
      artisanProfile: {
        rating: 'desc'
      }
    }
  })

  // Transform the data to match the frontend expectations
  const transformedArtisans = artisans.map((artisan: any) => ({
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
    totalSales: artisan.artisanProfile?.totalSales || 0
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Meet Our Artisans
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Discover the talented creators behind our handcrafted treasures. 
            Each artisan brings their unique story, skills, and passion to every piece they create.
          </p>
        </div>
        
        <ArtisanGrid initialArtisans={transformedArtisans} />
      </main>
      
      <Footer />
    </div>
  )
}