import Link from 'next/link'
import { 
  Palette, 
  Gem, 
  Scissors, 
  Hammer, 
  Glasses, 
  Wrench,
  LucideIcon 
} from 'lucide-react'
import { Category } from '../types'

interface CategoryCardProps {
  category: Category
}

// Map category icons to Lucide icons
const categoryIconMap: Record<string, LucideIcon> = {
  'pottery': Palette,
  'jewelry': Gem,
  'textiles': Scissors,
  'woodwork': Hammer,
  'glass art': Glasses,
  'metalwork': Wrench,
  // Fallback mappings based on category names
  'ceramics': Palette,
  'fabric': Scissors,
  'wood': Hammer,
  'glass': Glasses,
  'metal': Wrench,
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const slug = category.slug || category.name.toLowerCase().replace(/\s+/g, '-')
  
  // Get the appropriate icon component
  const getIconComponent = (): LucideIcon => {
    const categoryKey = category.name.toLowerCase()
    return categoryIconMap[categoryKey] || Palette // Default to Palette
  }
  
  const IconComponent = getIconComponent()
  
  return (
    <Link href={`/categories/${slug}`} className="group">
      <div className="card text-center group-hover:scale-105 transform transition-all duration-300">
        {/* Icon Container */}
        <div className="support-icon mx-auto mb-4 group-hover:animate-float">
          {/* Use Lucide icon if available, otherwise fall back to emoji */}
          {IconComponent ? (
            <IconComponent className="w-8 h-8" />
          ) : (
            <div className="text-4xl">{category.icon}</div>
          )}
        </div>
        
        {/* Category Info */}
        <h3 className="font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
          {category.name}
        </h3>
        
        {/* Item Count */}
        <div className="flex items-center justify-center">
          <span className="text-sm bg-tertiary text-secondary px-3 py-1 rounded-full border border-custom">
            {(category as any).productCount || category.count || 0} items
          </span>
        </div>
        
        {/* Hover Effect Badge */}
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs text-accent font-semibold">
            Explore Collection →
          </span>
        </div>
      </div>
    </Link>
  )
}