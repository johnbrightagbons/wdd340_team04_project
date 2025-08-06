'use client'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import CategoryCard from './components/CategoryCard'
import ProductCard from './components/ProductCard'
import { Category, Product } from './types'

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch('/api/categories?featured=true')
        const categoriesData = await categoriesResponse.json()
        
        if (categoriesData.success) {
          setCategories(categoriesData.data)
        }

        // Fetch featured products
        const productsResponse = await fetch('/api/products?featured=true&limit=6')
        const productsData = await productsResponse.json()
        
        if (productsData.success) {
          setFeaturedProducts(productsData.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Discover Unique
              <span className="block text-accent">Handcrafted Treasures</span>
            </h1>
            <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
              Connect with talented artisans and discover one-of-a-kind handcrafted items that tell a story. 
              Every piece is made with passion and traditional craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/products" className="btn-primary text-lg px-8 py-4">
                Browse Products
              </a>
              <a href="/artisans" className="btn-secondary text-lg px-8 py-4">
                Meet Artisans
              </a>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">
              Explore Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <a href="/products" className="btn-primary">
                View All Products
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary mb-8">
                Supporting Artisans Worldwide
              </h2>
              <p className="text-lg text-secondary mb-8">
                ArtisanHub is dedicated to connecting talented artisans with appreciative collectors. 
                We believe in preserving traditional craftsmanship while supporting sustainable, 
                ethical production methods.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Unique Creations</h3>
                  <p className="text-secondary">Each piece is one-of-a-kind, crafted with care and attention to detail.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Direct Connection</h3>
                  <p className="text-secondary">Connect directly with artisans and learn the story behind each creation.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Sustainable</h3>
                  <p className="text-secondary">Supporting ethical, sustainable practices and traditional techniques.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}