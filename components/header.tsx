'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { label: 'ブランド', href: '#brand' },
    { label: '商品', href: '#product' },
    { label: 'お客様の声', href: '#testimonials' },
    { label: '価格', href: '#pricing' },
  ]

  // When not on homepage, prepend '/' to navigate back to homepage with hash
  const getNavHref = (href: string) => {
    return pathname === '/' ? href : `/${href}`
  }

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8D4CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-[#C85A54]">南海豊</div>
            <div className="text-xs text-gray-600">NANHAIRICH</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={getNavHref(item.href)}
                className="text-gray-700 hover:text-[#C85A54] transition-colors font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href={getNavHref('#pricing')}>
              <button className="bg-[#C85A54] text-white px-6 py-2 rounded-full hover:bg-[#B34A47] transition-colors font-medium">
                今すぐ購入
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={getNavHref(item.href)}
                className="block text-gray-700 hover:text-[#C85A54] py-2 font-medium"
                onClick={handleNavClick}
              >
                {item.label}
              </Link>
            ))}
            <Link href={getNavHref('#pricing')} onClick={handleNavClick}>
              <button className="w-full bg-[#C85A54] text-white px-6 py-2 rounded-full hover:bg-[#B34A47] transition-colors font-medium mt-4">
                今すぐ購入
              </button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
