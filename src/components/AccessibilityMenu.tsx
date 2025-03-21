
import React from 'react';
import { ZoomIn, ZoomOut, Sun, AlertCircle, X } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

interface AccessibilityMenuProps {
  onClose: () => void;
}

const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({ onClose }) => {
  const { textSize, contrastMode, setTextSize, toggleContrastMode } = useAccessibility();

  return (
    <div className="absolute right-4 top-16 w-64 glass-panel shadow-lg p-4 animate-scale-in z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold">Accessibility Options</h3>
        <button onClick={onClose} className="icon-button h-8 w-8">
          <X size={16} />
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium block mb-2">Text Size</label>
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setTextSize('small')}
              className={`px-3 py-1 rounded ${textSize === 'small' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
              aria-label="Small text size"
            >
              <span className="text-xs">Small</span>
            </button>
            <button 
              onClick={() => setTextSize('medium')}
              className={`px-3 py-1 rounded ${textSize === 'medium' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
              aria-label="Medium text size"
            >
              <span className="text-sm">Medium</span>
            </button>
            <button 
              onClick={() => setTextSize('large')}
              className={`px-3 py-1 rounded ${textSize === 'large' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
              aria-label="Large text size"
            >
              <span className="text-base">Large</span>
            </button>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium block mb-2">Contrast</label>
          <button 
            onClick={toggleContrastMode}
            className="button-secondary w-full"
            aria-label={contrastMode === 'normal' ? 'Enable high contrast' : 'Disable high contrast'}
          >
            <AlertCircle size={16} className="mr-2" />
            {contrastMode === 'normal' ? 'Enable High Contrast' : 'Disable High Contrast'}
          </button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-3">
          These settings help make content more accessible and are saved in your browser.
        </p>
      </div>
    </div>
  );
};

export default AccessibilityMenu;
