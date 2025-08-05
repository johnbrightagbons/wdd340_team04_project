import Footer from './components/Footer'
import ProductCard from './components/ProductCard'
import CategoryCard from './components/CategoryCard'
import Link from 'next/link'
import { 
  HandHeart, 
  Shield, 
  Crown, 
  Sparkles,
  ArrowRight,
  Star,
  Users,
  Globe,
  CheckCircle2
} from 'lucide-react'
import { featuredProducts, categories } from './data/sampleData'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* <Header /> */}
      
      <main>
        {/* Hero Section */}
        <section className="hero-gradient text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Handcrafted Haven
                <span className="block bg-gradient-gold bg-clip-text">
                  Handcrafted Treasures
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Connect with talented artisans and discover one-of-a-kind handcrafted items that tell a story. 
                Every piece is made with passion and attention to detail.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/products" className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2">
                  <span>Browse Products</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/artisans" className="btn-secondary text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600">
                  Meet Artisans
                </Link>
              </div>
            </div>
          </div>
          {/* Decorative floating elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-gold/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-accent mr-2" />
                  <div className="text-4xl font-bold text-accent group-hover:text-gold transition-colors">500+</div>
                </div>
                <div className="text-secondary">Talented Artisans</div>
              </div>
              <div className="group">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-accent mr-2" />
                  <div className="text-4xl font-bold text-accent group-hover:text-gold transition-colors">2,000+</div>
                </div>
                <div className="text-secondary">Unique Products</div>
              </div>
              <div className="group">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-6 h-6 text-accent mr-2" />
                  <div className="text-4xl font-bold text-accent group-hover:text-gold transition-colors">10,000+</div>
                </div>
                <div className="text-secondary">Happy Customers</div>
              </div>
              <div className="group">
                <div className="flex items-center justify-center mb-2">
                  <Globe className="w-6 h-6 text-accent mr-2" />
                  <div className="text-4xl font-bold text-accent group-hover:text-gold transition-colors">25+</div>
                </div>
                <div className="text-secondary">Countries Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Shop by Category</h2>
              <p className="text-xl text-secondary max-w-2xl mx-auto">
                Explore our diverse collection of handcrafted items, each category filled with unique treasures
              </p>
            </div>
            <div className="category-grid">
              {categories.map((category, index) => (
                <CategoryCard key={index} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
              <div>
                <div className="flex items-center mb-4">
                  <Star className="w-8 h-8 text-gold mr-3" />
                  <h2 className="text-4xl md:text-5xl font-bold text-gold">Featured Products</h2>
                </div>
                <p className="text-xl text-accent max-w-2xl">
                  Handpicked by our curators, these exceptional pieces showcase the finest craftsmanship
                </p>
              </div>
              <Link href="/products" className="mt-6 md:mt-0 btn-gold text-lg px-8 py-3 flex items-center space-x-2">
                <span>View All Products</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="product-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Why Choose ArtisanHub?</h2>
              <p className="text-xl text-secondary max-w-3xl mx-auto">
                We're more than just a marketplace - we're a community dedicated to preserving artisanal traditions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="support-icon mx-auto mb-6">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">Quality Guaranteed</h3>
                <p className="text-secondary text-lg leading-relaxed mb-4">
                  Every item is carefully crafted by skilled artisans with attention to detail and quality materials. We stand behind every purchase.
                </p>
                <div className="quality-indicator justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Premium Quality</span>
                </div>
              </div>
              <div className="card text-center">
                <div className="support-icon mx-auto mb-6">
                  <HandHeart className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">Support Artisans</h3>
                <p className="text-secondary text-lg leading-relaxed mb-4">
                  Directly support independent creators and help preserve traditional craftsmanship for future generations. Make a meaningful impact.
                </p>
                <div className="quality-indicator justify-center">
                  <HandHeart className="w-5 h-5" />
                  <span>Community Support</span>
                </div>
              </div>
              <div className="card text-center">
                <div className="support-icon mx-auto mb-6">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">Unique & Original</h3>
                <p className="text-secondary text-lg leading-relaxed mb-4">
                  Find one-of-a-kind pieces that can't be found anywhere else, each with its own story and character. Own something truly special.
                </p>
                <div className="quality-indicator justify-center">
                  <Crown className="w-5 h-5" />
                  <span>Exclusive Items</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-tertiary mb-6">What Our Customers Say</h2>
              <p className="text-xl text-tertiary max-w-2xl mx-auto">
                Real stories from real customers who found their perfect handcrafted treasures
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card border border-custom">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-secondary text-lg mb-6 leading-relaxed">
                  "The ceramic bowl I purchased is absolutely stunning! The craftsmanship is incredible and it's become the centerpiece of my dining table."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    S
                  </div>
                  <div>
                    <div className="font-semibold text-primary">Sarah Johnson</div>
                    <div className="text-secondary text-sm">Verified Customer</div>
                  </div>
                </div>
              </div>
              <div className="card border border-custom">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-secondary text-lg mb-6 leading-relaxed">
                  "I love supporting individual artisans through this platform. The leather journal I bought is not only beautiful but tells a story."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    M
                  </div>
                  <div>
                    <div className="font-semibold text-primary">Michael Chen</div>
                    <div className="text-secondary text-sm">Verified Customer</div>
                  </div>
                </div>
              </div>
              <div className="card border border-custom">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-secondary text-lg mb-6 leading-relaxed">
                  "The quality exceeded my expectations! Fast shipping and excellent customer service. Will definitely be shopping here again."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    E
                  </div>
                  <div>
                    <div className="font-semibold text-primary">Emily Rodriguez</div>
                    <div className="text-secondary text-sm">Verified Customer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="card card-featured text-center p-12 md:p-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Shopping?</h2>
              <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of customers who have discovered the joy of owning handcrafted treasures. 
                Start your journey today and find something truly special that speaks to your soul.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/products" className="btn-gold text-lg px-10 py-4 flex items-center justify-center space-x-2">
                  <span>Start Shopping Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/registration" className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-10 py-4">
                  Become an Artisan
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}