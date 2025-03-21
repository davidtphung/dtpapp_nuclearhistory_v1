
import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Maximize, ZoomIn, ZoomOut, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAccessibility } from '../context/AccessibilityContext';
import AccessibilityMenu from './AccessibilityMenu';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccessibilityMenuOpen, setIsAccessibilityMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAccessibilityMenu = () => setIsAccessibilityMenuOpen(!isAccessibilityMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight">Nuclear History</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <a href="#timeline" className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md transition-colors">
              Timeline
            </a>
            <a href="#chat" className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md transition-colors">
              Ask Questions
            </a>
            <a href="#about" className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md transition-colors">
              About
            </a>
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleTheme}
              className="icon-button"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button 
              onClick={toggleAccessibilityMenu}
              className="icon-button"
              aria-label="Accessibility options"
            >
              <ZoomIn size={18} />
            </button>
            <button 
              className="icon-button md:hidden"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <a href="#timeline" className="block text-foreground/80 hover:text-foreground px-3 py-2 rounded-md transition-colors">
              Timeline
            </a>
            <a href="#chat" className="block text-foreground/80 hover:text-foreground px-3 py-2 rounded-md transition-colors">
              Ask Questions
            </a>
            <a href="#about" className="block text-foreground/80 hover:text-foreground px-3 py-2 rounded-md transition-colors">
              About
            </a>
          </div>
        )}

        {/* Accessibility Menu */}
        {isAccessibilityMenuOpen && (
          <AccessibilityMenu onClose={toggleAccessibilityMenu} />
        )}
      </div>
    </header>
  );
};

export default Navbar;
