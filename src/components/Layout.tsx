
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { ReadingLevelProvider } from '@/context/ReadingLevelContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <ReadingLevelProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </ReadingLevelProvider>
    </ThemeProvider>
  );
};

export default Layout;
