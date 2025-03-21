
import React, { createContext, useContext, useEffect, useState } from 'react';

type TextSize = 'small' | 'medium' | 'large';
type ContrastMode = 'normal' | 'high';

interface AccessibilityContextType {
  textSize: TextSize;
  contrastMode: ContrastMode;
  setTextSize: (size: TextSize) => void;
  setContrastMode: (mode: ContrastMode) => void;
  toggleContrastMode: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSize] = useState<TextSize>('medium');
  const [contrastMode, setContrastMode] = useState<ContrastMode>('normal');

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedTextSize = localStorage.getItem('textSize') as TextSize | null;
    const savedContrastMode = localStorage.getItem('contrastMode') as ContrastMode | null;
    
    if (savedTextSize) {
      setTextSize(savedTextSize);
    }
    
    if (savedContrastMode) {
      setContrastMode(savedContrastMode);
    }
  }, []);

  useEffect(() => {
    // Apply text size to document
    document.documentElement.dataset.textSize = textSize;
    localStorage.setItem('textSize', textSize);
    
    // Apply text size classes to body
    const bodyClasses = document.body.classList;
    bodyClasses.remove('text-sm', 'text-base', 'text-lg');
    
    switch (textSize) {
      case 'small':
        bodyClasses.add('text-sm');
        break;
      case 'medium':
        bodyClasses.add('text-base');
        break;
      case 'large':
        bodyClasses.add('text-lg');
        break;
    }
  }, [textSize]);

  useEffect(() => {
    // Apply contrast mode to document
    if (contrastMode === 'high') {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    localStorage.setItem('contrastMode', contrastMode);
  }, [contrastMode]);

  const toggleContrastMode = () => {
    setContrastMode(prev => prev === 'normal' ? 'high' : 'normal');
  };

  return (
    <AccessibilityContext.Provider 
      value={{ 
        textSize, 
        contrastMode, 
        setTextSize, 
        setContrastMode, 
        toggleContrastMode 
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
