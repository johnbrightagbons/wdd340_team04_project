// app/artisans/page.tsx
import ArtisanGrid from '../components/ArtisanGrid';

export default function ArtisansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Meet Our Artisans
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the talented creators behind our handcrafted treasures. 
            Each artisan brings their unique story, skills, and passion to every piece they create.
          </p>
        </div>
        
        <ArtisanGrid />
      </div>
    </div>
  );
}