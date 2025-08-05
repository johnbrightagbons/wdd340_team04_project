'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Palette, Search, ShoppingCart, User, Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-primary p-2 rounded-lg group-hover:shadow-lg transition-all duration-300">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
              Handcrafted Haven
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="nav-link">
              Products
            </Link>
            <Link href="/artisans" className="nav-link">
              Artisans
            </Link>
            <Link href="/categories" className="nav-link">
              Categories
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <button className="p-2 text-secondary hover:text-primary transition-colors rounded-lg hover:bg-tertiary">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-secondary hover:text-primary transition-colors rounded-lg hover:bg-tertiary relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-accent-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
              <button className="p-2 text-secondary hover:text-primary transition-colors rounded-lg hover:bg-tertiary">
                <User className="w-5 h-5" />
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link href="/login" className="text-secondary hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-tertiary">
                Login
              </Link>
              <Link href="/signup" className="btn-primary">
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-secondary hover:text-primary transition-colors rounded-lg hover:bg-tertiary"
              onClick={toggleMenu}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-custom pt-4">
            <div className="flex flex-col space-y-2">
              <Link href="/products" className="nav-link block py-3 px-4 rounded-lg">
                Products
              </Link>
              <Link href="/artisans" className="nav-link block py-3 px-4 rounded-lg">
                Artisans
              </Link>
              <Link href="/categories" className="nav-link block py-3 px-4 rounded-lg">
                Categories
              </Link>
              <Link href="/about" className="nav-link block py-3 px-4 rounded-lg">
                About
              </Link>
              
              {/* Mobile Actions */}
              <div className="flex items-center justify-around py-4 border-t border-custom mt-4">
                <button className="p-3 text-secondary hover:text-primary transition-colors rounded-lg hover:bg-tertiary">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-3 text-secondary hover:text-primary transition-colors rounded-lg hover:bg-tertiary relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-accent-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </button>
                <button className="p-3 text-secondary hover:text-primary transition-colors rounded-lg hover:bg-tertiary">
                  <User className="w-5 h-5" />
                </button>
              </div>
              
              {/* Mobile Auth */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-custom">
                <Link href="/login" className="btn-secondary text-center py-3">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary text-center py-3">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}