// app/artisans/[id]/page.tsx
import { notFound } from 'next/navigation';
import { artisansData } from '../../data/artisans';
import ArtisanProfile from '../../components/ArtisanProfile';

interface ArtisanPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArtisanPage({ params }: ArtisanPageProps) {
  const { id } = await params;
  const artisan = artisansData.find(a => a.id === parseInt(id));

  if (!artisan) {
    notFound();
  }

  return <ArtisanProfile artisan={artisan} />;
}

// Generate static params for all artisans (optional - for better performance)
export async function generateStaticParams() {
  return artisansData.map((artisan) => ({
    id: artisan.id.toString(),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArtisanPageProps) {
  const { id } = await params;
  const artisan = artisansData.find(a => a.id === parseInt(id));

  if (!artisan) {
    return {
      title: 'Artisan Not Found',
    };
  }

  return {
    title: `${artisan.name} - ${artisan.specialties[0]} Artisan | ArtisanHub`,
    description: `Discover ${artisan.name}'s handcrafted ${artisan.specialties.join(', ')} from ${artisan.location}. ${artisan.bio.substring(0, 150)}...`,
  };
}