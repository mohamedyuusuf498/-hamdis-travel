'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, Phone, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/packages', label: 'Tour Packages' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || !isHomePage
          ? 'bg-white shadow-lg py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300',
              scrolled || !isHomePage ? 'gradient-primary' : 'bg-white/20 backdrop-blur-sm'
            )}>
              <Globe className={cn(
                'w-6 h-6 transition-colors duration-300',
                scrolled || !isHomePage ? 'text-white' : 'text-white'
              )} />
            </div>
            <div>
              <span className={cn(
                'font-bold text-lg leading-none block transition-colors duration-300',
                scrolled || !isHomePage ? 'text-gray-900' : 'text-white'
              )}>
                Hamdi&apos;s
              </span>
              <span className={cn(
                'text-xs font-medium tracking-widest uppercase transition-colors duration-300',
                scrolled || !isHomePage ? 'text-blue-600' : 'text-blue-200'
              )}>
                Travel Agency
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200',
                  pathname === link.href
                    ? scrolled || !isHomePage
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-white/20 text-white'
                    : scrolled || !isHomePage
                      ? 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+1234567890"
              className={cn(
                'flex items-center gap-2 text-sm font-medium transition-colors duration-300',
                scrolled || !isHomePage ? 'text-gray-600 hover:text-blue-600' : 'text-white/80 hover:text-white'
              )}
            >
              <Phone className="w-4 h-4" />
              +1 (234) 567-890
            </a>
            <Link
              href="/booking"
              className="btn-primary text-sm py-2.5 px-5 rounded-lg shadow-md"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'lg:hidden p-2 rounded-lg transition-colors duration-200',
              scrolled || !isHomePage
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            )}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 bg-white rounded-2xl shadow-xl p-4 animate-fade-in-down">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200',
                    pathname === link.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <Link
                  href="/booking"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full justify-center text-sm"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
