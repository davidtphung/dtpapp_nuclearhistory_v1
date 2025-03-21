
import React from 'react';
import Navbar from './Navbar';
import { ThemeProvider } from '../context/ThemeContext';
import { AccessibilityProvider } from '../context/AccessibilityContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <AccessibilityProvider>
        <div className="min-h-screen flex flex-col transition-colors duration-300">
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="py-6 border-t border-border">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Nuclear History Interactive. All rights reserved.</p>
              <p className="mt-2">This application is designed to be educational and accessible to all users.</p>
            </div>
          </footer>
        </div>
      </AccessibilityProvider>
    </ThemeProvider>
  );
};

export default Layout;
