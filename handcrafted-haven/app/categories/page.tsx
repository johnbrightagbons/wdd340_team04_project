import { prisma } from '@/app/lib/prisma'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import { ArrowRight, Package, Star } from 'lucide-react'

export default async function CategoriesPage() {
  // Fetch categories with product counts
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          products: true
        }
      },
      products: {
        take: 3, // Get first 3 products for preview
        include: {
          artisan: {
            select: {
              name: true
            }
          }
        }
      }
    },
    orderBy: {
      featured: 'desc'
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Product Categories
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Explore our handcrafted treasures organized by category. 
            Each category represents a unique craft tradition and style.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category: any) => (
            <div key={category.id} className="bg-tertiary rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-custom">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{category.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">{category.name}</h3>
                    <p className="text-secondary text-sm">{category.description}</p>
                  </div>
                </div>
                {category.featured && (
                  <div className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
              </div>

              {/* Product Count */}
              <div className="flex items-center space-x-2 mb-4">
                <Package className="w-4 h-4 text-secondary" />
                <span className="text-secondary">
                  {category._count.products} products
                </span>
              </div>

              {/* Sample Products */}
              {category.products.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-primary mb-3">Sample Products</h4>
                  <div className="space-y-2">
                    {category.products.map((product: any) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <div className="flex items-center space-x-3">
                          {product.imageUrl && (
                            <img 
                              src={product.imageUrl} 
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <p className="text-sm font-medium text-primary">{product.name}</p>
                            <p className="text-xs text-secondary">by {product.artisan.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-secondary">{Number(product.rating).toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Actions */}
              <div className="flex space-x-3">
                <Link
                  href={`/products?category=${category.slug}`}
                  className="flex-1 bg-accent hover:bg-accent/90 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-center flex items-center justify-center"
                >
                  <span>Browse Products</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href={`/artisans?specialty=${category.name}`}
                  className="flex-1 bg-secondary hover:bg-hover-bg text-primary py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-center"
                >
                  Meet Artisans
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏺</div>
            <h2 className="text-2xl font-bold text-primary mb-4">No Categories Available</h2>
            <p className="text-secondary mb-8">
              We're working on adding categories to help you discover amazing handcrafted products.
            </p>
            <Link
              href="/products"
              className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Browse All Products
            </Link>
          </div>
        )}

        {/* Category Stats */}
        {categories.length > 0 && (
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-primary mb-8">Category Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-tertiary rounded-lg p-6">
                <div className="text-3xl font-bold text-accent">{categories.length}</div>
                <div className="text-secondary">Categories</div>
              </div>
              <div className="bg-tertiary rounded-lg p-6">
                <div className="text-3xl font-bold text-accent">
                  {categories.reduce((total: number, cat: any) => total + cat._count.products, 0)}
                </div>
                <div className="text-secondary">Total Products</div>
              </div>
              <div className="bg-tertiary rounded-lg p-6">
                <div className="text-3xl font-bold text-accent">
                  {categories.filter((cat: any) => cat.featured).length}
                </div>
                <div className="text-secondary">Featured Categories</div>
              </div>
              <div className="bg-tertiary rounded-lg p-6">
                <div className="text-3xl font-bold text-accent">
                  {Math.max(...categories.map((cat: any) => cat._count.products))}
                </div>
                <div className="text-secondary">Most Products</div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
} 