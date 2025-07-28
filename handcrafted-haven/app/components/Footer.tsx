import Link from 'next/link'
import { Palette, Heart, Mail, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-primary">ArtisanHub</span>
            </div>
            <p className="text-secondary mb-6 max-w-md leading-relaxed">
              Connecting talented artisans with customers who appreciate handcrafted quality and unique designs. 
              Discover the beauty of handmade treasures.
            </p>
            <div className="flex items-center space-x-2 text-gold">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-semibold">Supporting artisans worldwide</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-primary mb-6">Quick Links</h4>
            <div className="flex flex-col space-y-3">
              <Link href="/products" className="text-secondary hover:text-accent transition-colors hover:translate-x-1 transform duration-200">
                Browse Products
              </Link>
              <Link href="/artisans" className="text-secondary hover:text-accent transition-colors hover:translate-x-1 transform duration-200">
                Meet Artisans
              </Link>
              <Link href="/categories" className="text-secondary hover:text-accent transition-colors hover:translate-x-1 transform duration-200">
                Categories
              </Link>
              <Link href="/about" className="text-secondary hover:text-accent transition-colors hover:translate-x-1 transform duration-200">
                About Us
              </Link>
            </div>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-lg font-semibold text-primary mb-6">Support</h4>
            <div className="flex flex-col space-y-3">
              <Link href="/help" className="text-secondary hover:text-accent transition-colors hover:translate-x-1 transform duration-200">
                Help Center
              </Link>
              <Link href="/contact" className="text-secondary hover:text-accent transition-colors hover:translate-x-1 transform duration-200">
                Contact Us
              </Link>
              <Link href="/shipping" className="text-secondary hover:text-accent transition-colors hover:translate-x-1 transform duration-200">
                Shipping Info
              </Link>
              <Link href="/returns" className="text-secondary hover:text-accent transition-colors hover:translate-x-1 transform duration-200">
                Returns & Refunds
              </Link>
            </div>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-2 text-muted">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@artisanhub.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-custom mt-12 pt-8">
          <div className="text-center mb-8">
            <h4 className="text-lg font-semibold text-primary mb-2">Stay Updated</h4>
            <p className="text-secondary mb-4">Get the latest updates on new artisans and products</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-tertiary border border-custom rounded-lg text-primary placeholder-muted focus:outline-none focus:border-accent"
              />
              <button className="btn-primary px-6 py-2">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-custom mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-muted">&copy; {currentYear} ArtisanHub. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="text-muted hover:text-accent transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted hover:text-accent transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-muted hover:text-accent transition-colors text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}