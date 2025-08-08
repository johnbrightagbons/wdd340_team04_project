import Header from '../components/Header'
import Footer from '../components/Footer'
import { Heart, Users, Globe, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            About Handcrafted Haven
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Connecting talented artisans with appreciative collectors worldwide. 
            We believe in preserving traditional craftsmanship while supporting sustainable, 
            ethical production methods.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
              <p className="text-lg text-secondary mb-6">
                Handcrafted Haven is dedicated to creating a global marketplace where artisans 
                can showcase their unique creations and customers can discover one-of-a-kind 
                pieces that tell a story.
              </p>
              <p className="text-secondary mb-6">
                We believe that every handcrafted item carries the passion, skill, and cultural 
                heritage of its creator. By connecting artisans directly with customers, we help 
                preserve traditional techniques while supporting sustainable livelihoods.
              </p>
              <div className="flex items-center space-x-4">
                <Heart className="w-6 h-6 text-accent" />
                <span className="text-secondary">Supporting artisans worldwide</span>
              </div>
            </div>
            <div className="bg-tertiary rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">500+</div>
                  <div className="text-secondary">Artisans</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">10K+</div>
                  <div className="text-secondary">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">50+</div>
                  <div className="text-secondary">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">4.9★</div>
                  <div className="text-secondary">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Authenticity</h3>
              <p className="text-secondary">
                Every piece is genuinely handcrafted with care and attention to detail.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Community</h3>
              <p className="text-secondary">
                Building connections between artisans and customers worldwide.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Sustainability</h3>
              <p className="text-secondary">
                Supporting ethical, sustainable practices and traditional techniques.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Quality</h3>
              <p className="text-secondary">
                Ensuring every product meets our high standards of craftsmanship.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <div className="bg-tertiary rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-secondary mb-4">
                  Handcrafted Haven was born from a simple belief: that the world needs more 
                  authentic, handcrafted items that carry the soul and story of their creators.
                </p>
                <p className="text-secondary mb-4">
                  Founded by a team passionate about preserving traditional crafts, we set out 
                  to create a platform where artisans could reach customers directly, without 
                  the barriers of traditional retail.
                </p>
                <p className="text-secondary">
                  Today, we're proud to connect thousands of talented artisans with customers 
                  who appreciate the beauty and meaning behind every handcrafted piece.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">2020</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Founded</h4>
                    <p className="text-secondary text-sm">Started with a vision to connect artisans</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">2022</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Growth</h4>
                    <p className="text-secondary text-sm">Expanded to 50+ countries</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">2024</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Today</h4>
                    <p className="text-secondary text-sm">500+ artisans, 10K+ products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">Get in Touch</h2>
          <p className="text-secondary mb-8 max-w-2xl mx-auto">
            Have questions about our platform or want to learn more about becoming an artisan? 
            We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Contact Us
            </a>
            <a href="/artisans" className="btn-secondary">
              Meet Our Artisans
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 