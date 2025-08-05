// app/artisans/[id]/not-found.tsx
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function ArtisanNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="text-8xl font-bold text-gray-600 mb-4">404</div>
          <h1 className="text-3xl font-bold text-white mb-4">Artisan Not Found</h1>
          <p className="text-gray-300 text-lg mb-8">
            Sorry, we couldn't find the artisan you're looking for. They might have moved their workshop or the link might be incorrect.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/artisans"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Search className="w-5 h-5 mr-2" />
            Browse All Artisans
          </Link>
          
          <br />
          
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}